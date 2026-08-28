/*
    Verifica que autenticarToken não consulta o banco em
    toda requisição autenticada.

    O banco é um plano gratuito com conexões limitadas, e
    abrir o perfil dispara três chamadas em paralelo. Sem
    cache, seriam três consultas idênticas.

    Uso:
        node --test testes/
*/

const test = require("node:test");
const assert = require("node:assert");
const jwt = require("jsonwebtoken");


// --- banco falso, injetado antes de carregar o server ---

let consultas = [];

const poolFalso = {

    query: async (sql, params) => {

        consultas.push({ sql, params });

        if (sql.includes("senha_alterada_em")) {
            // Usuário existe e nunca trocou a senha.
            return [[{ senhaAlteradaEm: null }]];
        }

        if (sql.includes("FROM usuarios")) {
            return [[{
                id: 1,
                username: "teste",
                email: null,
                avatar_id: 1,
                data_cadastro: null
            }]];
        }

        return [[]];

    },

    getConnection: async () => ({
        query: poolFalso.query,
        beginTransaction: async () => {},
        commit: async () => {},
        rollback: async () => {},
        release: () => {}
    })

};


process.env.JWT_SECRET = "segredo-de-teste";
process.env.PORT = "0";

require.cache[require.resolve("../database.js")] = {
    id: require.resolve("../database.js"),
    filename: require.resolve("../database.js"),
    loaded: true,
    exports: poolFalso
};

const app = require("../server.js");


function tokenDe(id) {
    return jwt.sign({ id, username: "teste" }, process.env.JWT_SECRET);
}


async function comServidor(fn) {

    const servidor = app.listen(0);

    await new Promise(r => servidor.once("listening", r));

    const base = `http://127.0.0.1:${servidor.address().port}`;

    try {
        return await fn(base);
    }
    finally {
        await new Promise(r => servidor.close(r));
    }

}


test("tres chamadas autenticadas em paralelo fazem uma consulta de senha", async () => {

    await comServidor(async base => {

        consultas = [];

        const token = tokenDe(1);
        const cabecalho = { Authorization: `Bearer ${token}` };

        // Mesmo padrão do showProfile no frontend.
        await Promise.all([
            fetch(`${base}/api/perfil`, { headers: cabecalho }),
            fetch(`${base}/api/records/me`, { headers: cabecalho }),
            fetch(`${base}/api/perfil/rankings`, { headers: cabecalho })
        ]);

        const consultasDeSenha = consultas.filter(
            c => c.sql.includes("senha_alterada_em")
        );

        assert.strictEqual(
            consultasDeSenha.length,
            1,
            `esperava 1 consulta de senha, houve ${consultasDeSenha.length}`
        );

    });

});


test("requisicao sem token nao toca no banco", async () => {

    await comServidor(async base => {

        consultas = [];

        const resposta = await fetch(`${base}/api/perfil`);

        assert.strictEqual(resposta.status, 401);
        assert.strictEqual(consultas.length, 0);

    });

});


test("token de usuario inexistente e recusado", async () => {

    await comServidor(async base => {

        const original = poolFalso.query;

        poolFalso.query = async sql => {
            if (sql.includes("senha_alterada_em")) {
                return [[]];
            }
            return original(sql);
        };

        try {

            const resposta = await fetch(`${base}/api/perfil`, {
                headers: { Authorization: `Bearer ${tokenDe(999)}` }
            });

            assert.strictEqual(resposta.status, 403);

        }

        finally {
            poolFalso.query = original;
        }

    });

});
