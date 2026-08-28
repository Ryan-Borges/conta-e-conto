/*
    Insere questões de Português no banco.

    Uso:
        node seed-questoes.js seeds/questoes-portugues-extra.json
        node seed-questoes.js seeds/questoes-portugues-extra.json --simular

    Questões cuja frase já exista no banco são ignoradas,
    então rodar o comando mais de uma vez é seguro.

    Com --simular nada é gravado; apenas mostra o que
    seria inserido.

    As credenciais vêm do mesmo server/.env usado pela API.
*/

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const { validar } = require("./validar-questoes");

require("dotenv").config();


function normalizar(frase) {
    return String(frase).trim().toLowerCase();
}


async function main() {

    const arquivo = process.argv[2];
    const simular = process.argv.includes("--simular");

    if (!arquivo) {
        throw new Error(
            "Informe o arquivo. Ex.: node seed-questoes.js seeds/questoes-portugues-extra.json"
        );
    }


    const questoes = JSON.parse(
        fs.readFileSync(path.resolve(arquivo), "utf8")
    );


    // Não adianta inserir e descobrir o problema no jogo.
    const { erros } = validar(questoes);

    if (erros.length) {
        console.error(`\n${erros.length} erro(s) de validacao. Nada foi inserido:\n`);
        erros.forEach(e => console.error("  x " + e));
        process.exitCode = 1;
        return;
    }


    const conexao = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false }
    });


    try {

        const [existentes] = await conexao.query(
            "SELECT frase FROM questoes_portugues"
        );

        const jaNoBanco = new Set(
            existentes.map(linha => normalizar(linha.frase))
        );

        console.log(`\nBanco tem ${existentes.length} questao(oes).`);
        console.log(`Arquivo tem ${questoes.length}.`);


        const novas = questoes.filter(
            q => !jaNoBanco.has(normalizar(q.frase))
        );

        const repetidas = questoes.length - novas.length;

        if (repetidas > 0) {
            console.log(`${repetidas} ja existem no banco e serao ignoradas.`);
        }

        if (novas.length === 0) {
            console.log("\nNada novo para inserir.\n");
            return;
        }


        if (simular) {
            console.log(`\n[simulacao] ${novas.length} seriam inseridas:\n`);
            novas.slice(0, 10).forEach(q =>
                console.log(`  nivel ${q.nivel} | ${q.classe.padEnd(12)} | ${q.frase}`)
            );
            if (novas.length > 10) {
                console.log(`  ... e mais ${novas.length - 10}`);
            }
            console.log("");
            return;
        }


        await conexao.beginTransaction();

        try {

            for (const q of novas) {

                await conexao.query(
                    `INSERT INTO questoes_portugues
                        (nivel, frase, palavra, classe, alternativas, explicacao)
                     VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        q.nivel,
                        q.frase,
                        q.palavra,
                        q.classe,
                        JSON.stringify(q.alternativas),
                        q.explicacao
                    ]
                );

            }

            await conexao.commit();

        }

        catch (erro) {
            await conexao.rollback();
            throw erro;
        }


        const [total] = await conexao.query(
            "SELECT COUNT(*) AS n FROM questoes_portugues"
        );

        console.log(`\n${novas.length} questao(oes) inserida(s).`);
        console.log(`Banco agora tem ${total[0].n}.\n`);

    }

    finally {
        await conexao.end();
    }

}


main().catch(erro => {
    console.error("\nFalhou:", erro.message);
    process.exitCode = 1;
});
