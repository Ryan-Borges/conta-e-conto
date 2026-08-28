/*
    Executor de migrações do Conta & Conto.

    Lê os arquivos .sql de server/migrations em ordem
    alfabética e aplica os que ainda não foram aplicados.
    O controle é feito pela tabela "migracoes", então
    rodar o comando mais de uma vez é seguro.

    Uso:
        npm run migrate           aplica o que estiver pendente
        npm run migrate -- --lista   só mostra o estado

    As credenciais vêm do mesmo server/.env usado pela API.
*/

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

require("dotenv").config();


const PASTA =
    path.join(__dirname, "migrations");


async function conectar() {

    const obrigatorias = [
        "DB_HOST",
        "DB_USER",
        "DB_PASSWORD",
        "DB_NAME"
    ];

    const faltando =
        obrigatorias.filter(
            nome => !process.env[nome]
        );

    if (faltando.length > 0) {

        throw new Error(
            `Faltam variáveis no server/.env: ${faltando.join(", ")}`
        );

    }

    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,

        ssl: {
            rejectUnauthorized: false
        },

        // Cada arquivo pode conter vários comandos.
        multipleStatements: true
    });

}


async function main() {

    const apenasListar =
        process.argv.includes("--lista");


    if (!fs.existsSync(PASTA)) {
        console.log("Nenhuma pasta de migrações encontrada.");
        return;
    }


    const arquivos =
        fs.readdirSync(PASTA)
            .filter(nome => nome.endsWith(".sql"))
            .sort();


    if (arquivos.length === 0) {
        console.log("Nenhuma migração encontrada.");
        return;
    }


    const conexao = await conectar();

    try {

        await conexao.query(
            `CREATE TABLE IF NOT EXISTS migracoes (
                nome        VARCHAR(255) NOT NULL,
                aplicada_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (nome)
             ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
        );


        const [linhas] =
            await conexao.query(
                "SELECT nome FROM migracoes"
            );

        const aplicadas =
            new Set(
                linhas.map(linha => linha.nome)
            );


        const pendentes =
            arquivos.filter(
                nome => !aplicadas.has(nome)
            );


        if (apenasListar) {

            console.log("\nMigrações:\n");

            arquivos.forEach(nome => {
                console.log(
                    `  ${aplicadas.has(nome) ? "[x]" : "[ ]"} ${nome}`
                );
            });

            console.log(
                `\n${pendentes.length} pendente(s).\n`
            );

            return;

        }


        if (pendentes.length === 0) {
            console.log("Banco já está atualizado.");
            return;
        }


        for (const nome of pendentes) {

            const sql =
                fs.readFileSync(
                    path.join(PASTA, nome),
                    "utf8"
                );

            process.stdout.write(`Aplicando ${nome}... `);

            /*
                DDL no MySQL faz commit implícito, então uma
                transação aqui daria falsa segurança. Em vez
                disso, cada arquivo é aplicado sozinho e o
                processo para no primeiro erro.
            */
            await conexao.query(sql);

            await conexao.query(
                "INSERT INTO migracoes (nome) VALUES (?)",
                [nome]
            );

            console.log("ok");

        }


        console.log(
            `\n${pendentes.length} migração(ões) aplicada(s).`
        );

    }

    finally {
        await conexao.end();
    }

}


main().catch(erro => {
    console.error("\nFalhou:", erro.message);
    process.exitCode = 1;
});
