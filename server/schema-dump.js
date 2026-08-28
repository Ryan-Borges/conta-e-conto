/*
    Mostra a estrutura real das tabelas do banco.

    Uso:
        node schema-dump.js

    Só lê (SHOW CREATE TABLE) — não altera nada.
    Serve para conferir se server/schema.sql corresponde
    ao banco de verdade.

    As credenciais vêm do mesmo server/.env usado pela API.
*/

const mysql = require("mysql2/promise");

require("dotenv").config();


const TABELAS = [
    "usuarios",
    "records",
    "questoes_portugues",
    "recuperacao_senha",
    "migracoes"
];


async function main() {

    const conexao =
        await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,

            ssl: {
                rejectUnauthorized: false
            }
        });


    try {

        console.log(
            `\n-- Banco: ${process.env.DB_NAME}\n`
        );


        for (const tabela of TABELAS) {

            try {

                const [linhas] =
                    await conexao.query(
                        `SHOW CREATE TABLE \`${tabela}\``
                    );

                console.log(
                    linhas[0]["Create Table"] + ";\n"
                );

            }

            catch (erro) {

                if (
                    erro.code ===
                    "ER_NO_SUCH_TABLE"
                ) {

                    console.log(
                        `-- (tabela "${tabela}" não existe)\n`
                    );

                }

                else {
                    throw erro;
                }

            }

        }


        // Conferência rápida: linhas duplicadas impediriam
        // criar a chave única sugerida em records.
        const [duplicados] =
            await conexao.query(
                `SELECT usuario_id, jogo, modo, COUNT(*) AS total
                   FROM records
                  GROUP BY usuario_id, jogo, modo
                 HAVING total > 1`
            );

        console.log(
            duplicados.length === 0
                ? "-- records: nenhuma duplicata (UNIQUE pode ser criada)"
                : `-- records: ${duplicados.length} combinação(ões) duplicada(s) — limpar antes do UNIQUE`
        );

        if (duplicados.length > 0) {
            console.log(
                "-- " + JSON.stringify(duplicados)
            );
        }

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
