/*
    Teste de ponta a ponta das rotas de partida, com um
    banco falso em memória.

    É a prova do que a Fase 1 existe para garantir: não há
    caminho pelo qual o cliente consiga gravar um recorde
    que não jogou.
*/

const test = require("node:test");
const assert = require("node:assert");
const jwt = require("jsonwebtoken");


// ------------------------------------------------------
// Banco falso
// ------------------------------------------------------

const QUESTOES = [];

for (let nivel = 1; nivel <= 8; nivel++) {
    for (let i = 0; i < 12; i++) {
        const id = nivel * 100 + i;
        QUESTOES.push({
            id,
            nivel,
            frase: `Frase ${id} com a palavra alvo.`,
            palavra: "alvo",
            classe: i % 2 === 0 ? "Substantivo" : "Adjetivo",
            alternativas: JSON.stringify([
                "Substantivo", "Adjetivo", "Verbo", "Advérbio"
            ]),
            explicacao: `Explicacao da questao ${id}.`
        });
    }
}

let partidasDb = [];
let recordsDb = [];


const poolFalso = {

    query: async (sql, params = []) => {

        const s = sql.replace(/\s+/g, " ").trim();

        if (s.includes("senha_alterada_em") && s.startsWith("SELECT")) {
            return [[{ senhaAlteradaEm: null }]];
        }

        if (s.startsWith("DELETE FROM partidas")) {
            partidasDb = partidasDb.filter(
                p => p.usuario_id !== params[0]
            );
            return [{ affectedRows: 0 }];
        }

        if (s.startsWith("INSERT INTO partidas")) {

            const campos = s.includes("semente")
                ? ["id", "usuario_id", "jogo", "modo",
                   "operacao", "sobrevivencia", "semente"]
                : ["id", "usuario_id", "jogo", "modo", "questoes"];

            const linha = { iniciada_em: Date.now(), encerrada_em: null };
            campos.forEach((c, i) => { linha[c] = params[i]; });
            partidasDb.push(linha);

            return [{ affectedRows: 1 }];

        }

        if (s.startsWith("SELECT id, usuario_id, jogo, modo, questoes")) {

            const p = partidasDb.find(
                x => x.id === params[0] && x.usuario_id === params[1]
            );

            if (!p) return [[]];

            return [[{
                ...p,
                segundos: Math.round((Date.now() - p.iniciada_em) / 1000) + 120
            }]];

        }

        if (s.startsWith("UPDATE partidas SET acertos")) {
            const p = partidasDb.find(x => x.id === params[1]);
            if (p) p.acertos = params[0];
            return [{ affectedRows: 1 }];
        }

        if (s.includes("FROM questoes_portugues") && s.includes("WHERE id = ?")) {
            const q = QUESTOES.find(x => x.id === Number(params[0]));
            return [q ? [q] : []];
        }

        if (s.startsWith("SELECT id, usuario_id, jogo, modo, operacao")) {

            const p = partidasDb.find(
                x => x.id === params[0] && x.usuario_id === params[1]
            );

            if (!p) return [[]];

            return [[{
                ...p,
                segundos: Math.round((Date.now() - p.iniciada_em) / 1000) + 120
            }]];

        }

        if (s.startsWith("UPDATE partidas")) {
            const p = partidasDb.find(x => x.id === params[1]);
            if (p) {
                p.acertos = params[0];
                p.encerrada_em = Date.now();
            }
            return [{ affectedRows: 1 }];
        }

        if (s.includes("FROM questoes_portugues") && s.includes("WHERE nivel >=")) {
            return [QUESTOES.filter(q => q.nivel >= params[0])
                .map(q => ({ id: q.id, nivel: q.nivel }))];
        }

        if (s.includes("FROM questoes_portugues") && s.includes("id IN")) {
            const ids = params[0].map(Number);
            return [QUESTOES.filter(q => ids.includes(q.id))];
        }

        if (s.startsWith("SELECT recorde FROM records")) {
            const r = recordsDb.find(
                x => x.usuario_id === params[0] &&
                     x.jogo === params[1] && x.modo === params[2]
            );
            return [r ? [{ recorde: r.recorde }] : []];
        }

        if (s.startsWith("INSERT INTO records")) {
            recordsDb.push({
                usuario_id: params[0], jogo: params[1],
                modo: params[2], recorde: params[3]
            });
            return [{ affectedRows: 1 }];
        }

        if (s.startsWith("UPDATE records")) {
            const r = recordsDb.find(
                x => x.usuario_id === params[1] &&
                     x.jogo === params[2] && x.modo === params[3]
            );
            if (r) r.recorde = params[0];
            return [{ affectedRows: 1 }];
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

require.cache[require.resolve("../database.js")] = {
    id: require.resolve("../database.js"),
    filename: require.resolve("../database.js"),
    loaded: true,
    exports: poolFalso
};

const app = require("../server.js");


const TOKEN = jwt.sign(
    { id: 1, username: "teste" },
    process.env.JWT_SECRET
);

const CABECALHO = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`
};


async function comServidor(fn) {

    partidasDb = [];
    recordsDb = [];

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


async function criarPartida(base, corpo) {

    const r = await fetch(`${base}/api/partidas`, {
        method: "POST",
        headers: CABECALHO,
        body: JSON.stringify(corpo)
    });

    return { status: r.status, dados: await r.json() };

}


async function encerrar(base, id, respostas) {

    const r = await fetch(`${base}/api/partidas/${id}/encerrar`, {
        method: "POST",
        headers: CABECALHO,
        body: JSON.stringify({ respostas })
    });

    return { status: r.status, dados: await r.json() };

}


// ------------------------------------------------------
// O que o cliente recebe
// ------------------------------------------------------

test("matematica: o cliente recebe expressoes, nunca respostas", async () => {

    await comServidor(async base => {

        const { status, dados } = await criarPartida(base, {
            jogo: "matematica",
            modo: "brutal",
            operacao: "addition"
        });

        assert.strictEqual(status, 201);
        assert.ok(dados.questoes.length > 0);

        const bruto = JSON.stringify(dados);

        assert.ok(!bruto.includes("resposta"));

        for (const q of dados.questoes) {
            assert.ok(q.expressao);
            assert.strictEqual(q.resposta, undefined);
        }

    });

});


test("portugues: o cliente recebe enunciados, nunca o gabarito", async () => {

    await comServidor(async base => {

        const { status, dados } = await criarPartida(base, {
            jogo: "portugues",
            modo: "brutal"
        });

        assert.strictEqual(status, 201);
        assert.ok(dados.questoes.length > 0);

        for (const q of dados.questoes) {
            assert.ok(q.frase);
            assert.ok(Array.isArray(q.alternativas));

            // Era exatamente isto que vazava antes.
            assert.strictEqual(q.classe, undefined);
            assert.strictEqual(q.explicacao, undefined);
        }

    });

});


// ------------------------------------------------------
// O placar sai do servidor
// ------------------------------------------------------

/*
    Resolve a expressao da esquerda para a direita, como o
    navegador faz. Cada expressao usa um unico operador.
*/
function calcular(expressao) {

    const partes = expressao.trim().split(/\s+/);
    let total = Number(partes[0]);

    for (let i = 1; i < partes.length; i += 2) {
        const valor = Number(partes[i + 1]);
        if (partes[i] === "+") total += valor;
        else if (partes[i] === "-") total -= valor;
        else if (partes[i] === "×") total *= valor;
        else if (partes[i] === "÷") total /= valor;
    }

    return total;

}


test("matematica: jogar certo grava o recorde correto", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "matematica",
            modo: "brutal"
        });

        const respostas = dados.questoes.slice(0, 12).map(q => ({
            resposta: calcular(q.expressao)
        }));

        const fim = await encerrar(base, dados.partidaId, respostas);

        assert.strictEqual(fim.status, 200);
        assert.strictEqual(fim.dados.acertos, 12);
        assert.strictEqual(fim.dados.recorde, 12);
        assert.strictEqual(fim.dados.novoRecorde, true);

    });

});


test("matematica: respostas inventadas nao viram recorde", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "matematica",
            modo: "brutal",
            operacao: "addition"
        });

        const forjadas = Array.from(
            { length: 300 },
            () => ({ resposta: 42 })
        );

        const fim = await encerrar(base, dados.partidaId, forjadas);

        assert.ok(
            fim.dados.acertos < 5,
            `placar forjado obteve ${fim.dados.acertos}`
        );

    });

});


// ------------------------------------------------------
// Tentativas de burlar
// ------------------------------------------------------

test("nao da para encerrar a partida de outra pessoa", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "matematica",
            modo: "brutal",
            operacao: "addition"
        });

        const tokenOutro = jwt.sign(
            { id: 2, username: "outro" },
            process.env.JWT_SECRET
        );

        const r = await fetch(
            `${base}/api/partidas/${dados.partidaId}/encerrar`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenOutro}`
                },
                body: JSON.stringify({ respostas: [] })
            }
        );

        assert.strictEqual(r.status, 404);

    });

});


test("nao da para encerrar a mesma partida duas vezes", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "matematica",
            modo: "brutal",
            operacao: "addition"
        });

        const respostas = dados.questoes.slice(0, 3).map(q => {
            const [a, b] = q.expressao.split(" + ").map(Number);
            return { resposta: a + b };
        });

        await encerrar(base, dados.partidaId, respostas);

        const segunda = await encerrar(base, dados.partidaId, respostas);

        assert.strictEqual(segunda.status, 409);

    });

});


test("partida inexistente devolve 404", async () => {

    await comServidor(async base => {

        const fim = await encerrar(
            base,
            "00000000-0000-0000-0000-000000000000",
            []
        );

        assert.strictEqual(fim.status, 404);

    });

});


test("as rotas de partida exigem autenticacao", async () => {

    await comServidor(async base => {

        const r = await fetch(`${base}/api/partidas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jogo: "matematica", modo: "brutal" })
        });

        assert.strictEqual(r.status, 401);

    });

});


test("jogo e modo invalidos sao recusados", async () => {

    await comServidor(async base => {

        assert.strictEqual(
            (await criarPartida(base, { jogo: "xadrez", modo: "brutal" })).status,
            400
        );

        /*
            Em Matematica o modo e imposto pelo servidor,
            entao o valor enviado nem chega a ser validado.
            A validacao vale para Portugues.
        */
        assert.strictEqual(
            (await criarPartida(base, { jogo: "portugues", modo: "impossivel" })).status,
            400
        );

    });

});


/*
    O cliente conseguia criar uma partida marcada como
    "brutal" mas contendo so somas, muito mais facil que a
    Sobrevivencia, e gravar o resultado em matematica/brutal
    — a mesma chave que alimenta o ranking.
*/
test("matematica ignora modo, operacao e sobrevivencia do cliente", async () => {

    await comServidor(async base => {

        const { status, dados } = await criarPartida(base, {
            jogo: "matematica",
            modo: "tranquilo",
            sobrevivencia: false,
            operacao: "addition"
        });

        assert.strictEqual(status, 201);

        /*
            Continua sendo Sobrevivencia: as quatro
            operacoes. Expressoes de tres termos repetem o
            operador, entao basta o primeiro.
        */
        const operacoes = new Set(
            dados.questoes.slice(0, 80).map(q =>
                q.expressao.replace(/[\d\s]/g, "").charAt(0)
            )
        );

        assert.strictEqual(
            operacoes.size, 4,
            "a partida deveria misturar as quatro operacoes"
        );

    });

});


test("uma partida forjada nao vira recorde mais facil", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "matematica",
            modo: "brutal",
            sobrevivencia: false,
            operacao: "addition"
        });

        // Tenta resolver como se fossem so somas.
        const comoSeFosseSoma = dados.questoes.slice(0, 40).map(q => {
            const n = q.expressao.split(" + ").map(Number);
            return { resposta: n.reduce((a, b) => a + b, 0) };
        });

        const fim = await encerrar(base, dados.partidaId, comoSeFosseSoma);

        assert.ok(
            fim.dados.acertos < 40,
            `partida forjada aceitou ${fim.dados.acertos} acertos`
        );

    });

});


// ------------------------------------------------------
// As rotas antigas, que eram os buracos
// ------------------------------------------------------

test("POST /api/records nao existe mais", async () => {

    await comServidor(async base => {

        const r = await fetch(`${base}/api/records`, {
            method: "POST",
            headers: CABECALHO,
            body: JSON.stringify({
                jogo: "matematica", modo: "brutal", recorde: 99999
            })
        });

        assert.strictEqual(r.status, 404);

    });

});


test("GET /api/questoes/portugues nao existe mais", async () => {

    await comServidor(async base => {

        const r = await fetch(`${base}/api/questoes/portugues`);

        assert.strictEqual(r.status, 404);

    });

});



// ------------------------------------------------------
// Português: uma resposta por vez
// ------------------------------------------------------

/*
    Português precisa responder questão a questão porque
    errar encerra a partida na hora, e o cliente não tem o
    gabarito para saber sozinho.
*/
async function responder(base, id, questaoId, resposta) {

    const r = await fetch(`${base}/api/partidas/${id}/responder`, {
        method: "POST",
        headers: CABECALHO,
        body: JSON.stringify({ questaoId, resposta })
    });

    return { status: r.status, dados: await r.json() };

}


// No banco de teste a classe alterna pelo id.
function classeCerta(id) {
    return (id % 100) % 2 === 0 ? "Substantivo" : "Adjetivo";
}


test("portugues: acertar avanca o placar", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "portugues",
            modo: "brutal"
        });

        for (let i = 0; i < 6; i++) {

            const q = dados.questoes[i];

            const r = await responder(
                base, dados.partidaId, q.id, classeCerta(q.id)
            );

            assert.strictEqual(r.dados.correto, true);
            assert.strictEqual(r.dados.acertos, i + 1);

        }

    });

});


test("portugues: errar encerra e devolve a explicacao", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "portugues",
            modo: "brutal"
        });

        const q = dados.questoes[0];

        const errada =
            classeCerta(q.id) === "Substantivo"
                ? "Adjetivo"
                : "Substantivo";

        const r = await responder(base, dados.partidaId, q.id, errada);

        assert.strictEqual(r.dados.correto, false);
        assert.strictEqual(r.dados.acertos, 0);
        assert.ok(r.dados.revisao.explicacao);
        assert.strictEqual(r.dados.revisao.classe, classeCerta(q.id));

        // Encerrada: nao aceita mais respostas.
        const depois = await responder(
            base, dados.partidaId, dados.questoes[1].id, "Substantivo"
        );

        assert.strictEqual(depois.status, 409);

    });

});


test("portugues: nao da para pular questao dificil", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "portugues",
            modo: "brutal"
        });

        // Tenta responder a terceira antes da primeira.
        const r = await responder(
            base,
            dados.partidaId,
            dados.questoes[2].id,
            classeCerta(dados.questoes[2].id)
        );

        assert.strictEqual(r.status, 400);

    });

});


test("portugues: o recorde vem do placar acumulado no servidor", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "portugues",
            modo: "brutal"
        });

        for (let i = 0; i < 4; i++) {
            const q = dados.questoes[i];
            await responder(base, dados.partidaId, q.id, classeCerta(q.id));
        }

        // Encerra por tempo esgotado, sem enviar placar.
        const fim = await encerrar(base, dados.partidaId, []);

        assert.strictEqual(fim.dados.acertos, 4);
        assert.strictEqual(fim.dados.recorde, 4);

    });

});


test("portugues: enviar respostas no encerramento nao infla o placar", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "portugues",
            modo: "brutal"
        });

        // Nenhuma resposta foi dada, mas o cliente tenta
        // mandar um placar alto no encerramento.
        const forjadas = dados.questoes.map(q => ({
            questaoId: q.id,
            resposta: classeCerta(q.id)
        }));

        const fim = await encerrar(base, dados.partidaId, forjadas);

        assert.strictEqual(
            fim.dados.acertos, 0,
            "o encerramento nao pode aceitar placar do cliente"
        );

    });

});


test("matematica nao aceita a rota de resposta unitaria", async () => {

    await comServidor(async base => {

        const { dados } = await criarPartida(base, {
            jogo: "matematica",
            modo: "brutal",
            operacao: "addition"
        });

        const r = await responder(base, dados.partidaId, 1, "4");

        assert.strictEqual(r.status, 400);

    });

});
