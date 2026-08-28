/*
    Exporta as questões de Português do banco para
    docs/portugues.json, mantendo o backup em dia.

    Uso:
        node questoes-dump.js

    Só lê o banco. Sobrescreve o arquivo de backup.
*/

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

require("dotenv").config();


const DESTINO =
    path.join(__dirname, "..", "docs", "portugues.json");


async function main() {

    const conexao = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false }
    });


    try {

        const [linhas] = await conexao.query(
            `SELECT id, nivel, frase, palavra, classe,
                    alternativas, explicacao
               FROM questoes_portugues
              ORDER BY nivel, id`
        );


        const questoes = linhas.map(q => ({
            id: q.id,
            nivel: q.nivel,
            frase: q.frase,
            palavra: q.palavra,
            classe: q.classe,

            // A coluna é JSON, mas pode vir como texto
            // dependendo do driver.
            alternativas:
                typeof q.alternativas === "string"
                    ? JSON.parse(q.alternativas)
                    : q.alternativas,

            explicacao: q.explicacao
        }));


        fs.writeFileSync(
            DESTINO,
            JSON.stringify(questoes, null, 2) + "\n",
            "utf8"
        );


        const porNivel = {};
        for (const q of questoes) {
            porNivel[q.nivel] = (porNivel[q.nivel] || 0) + 1;
        }

        console.log(`\n${questoes.length} questao(oes) exportada(s) para docs/portugues.json\n`);

        Object.keys(porNivel).sort((a, b) => a - b).forEach(n =>
            console.log(`  nivel ${n}: ${porNivel[n]}`)
        );

        console.log("");

    }

    finally {
        await conexao.end();
    }

}


main().catch(erro => {
    console.error("\nFalhou:", erro.message);
    process.exitCode = 1;
});
