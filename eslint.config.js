/*
    Configuração do ESLint.

    O objetivo é pegar erro, não impor estilo. O projeto tem
    um padrão de formatação próprio (uma expressão por
    linha, quebras generosas) e reformatá-lo produziria um
    diff gigante sem ganho — por isso nenhuma regra de
    formatação está ligada.

    O arquivo fica na raiz porque o ESLint só enxerga
    arquivos abaixo da pasta onde a configuração está, e
    aqui é preciso cobrir server/ (Node) e js/ (navegador),
    que têm ambientes diferentes.

    O ESLint em si é dependência de server/, para não haver
    package.json na raiz — a Vercel serve esta pasta como
    site estático.

    Uso, dentro de server/:
        npm run lint
        npm run lint:corrigir
*/

const globals = require("./server/node_modules/globals");


const regrasComuns = {

    // Erros de verdade.
    "no-undef": "error",
    "no-unused-vars": ["error", {
        args: "none",
        caughtErrors: "none"
    }],
    "no-dupe-keys": "error",
    "no-dupe-args": "error",
    "no-duplicate-case": "error",
    "no-unreachable": "error",
    "no-fallthrough": "error",
    "no-self-compare": "error",
    "no-unsafe-negation": "error",
    "use-isnan": "error",
    "valid-typeof": "error",

    // Armadilhas que já apareceram neste projeto.
    "no-constant-condition": "error",
    "no-cond-assign": "error",
    "eqeqeq": ["error", "smart"],

    /*
        require-atomic-updates fica desligada.

        Ela foi testada aqui e apontou 4 ocorrências, todas
        falso positivo: atribuir uma propriedade de DOM ou
        de req depois de um await não é corrida de dados em
        JavaScript, que é single-threaded. Manter a regra
        treinaria a ignorar o relatório do linter, que é
        pior do que não tê-la.
    */
    "no-async-promise-executor": "error",

    "no-console": "off",
    "no-empty": ["warn", { allowEmptyCatch: true }]

};


module.exports = [

    {
        ignores: [
            "**/node_modules/**",
            "docs/**",
            "avatars/**"
        ]
    },

    // ---------- Backend ----------
    {
        files: ["server/**/*.js"],

        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                ...globals.node
            }
        },

        rules: regrasComuns
    },

    // ---------- Frontend ----------
    {
        files: ["js/**/*.js"],

        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "script",
            globals: {
                ...globals.browser
            }
        },

        /*
            script.js é um único arquivo carregado por
            <script>, então tudo vive no escopo global por
            construção. A Fase 5 (módulos ES) resolve isso.
        */
        rules: regrasComuns
    }

];
