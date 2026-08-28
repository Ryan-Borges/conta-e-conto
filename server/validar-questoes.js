/*
    Valida um arquivo de questões antes de inserir no banco.

    Uso:
        node validar-questoes.js seeds/questoes-portugues-extra.json

    Verifica o que dá para verificar automaticamente. O
    conteúdo gramatical em si continua exigindo revisão
    humana — este script só impede erros mecânicos.
*/

const fs = require("fs");
const path = require("path");


const CLASSES = [
    "Substantivo",
    "Adjetivo",
    "Artigo",
    "Numeral",
    "Pronome",
    "Verbo",
    "Advérbio",
    "Preposição",
    "Conjunção",
    "Interjeição"
];

const NIVEL_MIN = 1;
const NIVEL_MAX = 8;


/*
    Mesma regra usada pelo jogo para destacar a palavra
    (ver encontrarPalavraInteira em js/script.js). Se aqui
    não encontrar, o destaque na tela também vai falhar.
*/
function encontrarPalavraInteira(frase, palavra) {

    if (!palavra) {
        return -1;
    }

    const alvo = palavra.toLowerCase();
    const texto = frase.toLowerCase();

    const ehLetra = c =>
        c !== undefined && /[\p{L}\p{N}]/u.test(c);

    let posicao = texto.indexOf(alvo);

    while (posicao !== -1) {

        if (
            !ehLetra(texto[posicao - 1]) &&
            !ehLetra(texto[posicao + alvo.length])
        ) {
            return posicao;
        }

        posicao = texto.indexOf(alvo, posicao + 1);

    }

    return -1;

}


function validar(questoes) {

    const erros = [];
    const avisos = [];
    const frasesVistas = new Map();

    questoes.forEach((q, i) => {

        const onde = `[${i}] "${(q.frase || "").slice(0, 45)}..."`;

        // --- campos obrigatórios ---
        for (const campo of [
            "nivel", "frase", "palavra", "classe",
            "alternativas", "explicacao"
        ]) {
            if (q[campo] === undefined || q[campo] === null || q[campo] === "") {
                erros.push(`${onde} campo ausente: ${campo}`);
            }
        }

        if (!q.frase || !q.palavra) {
            return;
        }

        // --- nível ---
        if (
            !Number.isInteger(q.nivel) ||
            q.nivel < NIVEL_MIN ||
            q.nivel > NIVEL_MAX
        ) {
            erros.push(`${onde} nivel invalido: ${q.nivel}`);
        }

        // --- classe válida ---
        if (!CLASSES.includes(q.classe)) {
            erros.push(`${onde} classe desconhecida: "${q.classe}"`);
        }

        // --- a palavra existe na frase, como palavra inteira ---
        if (encontrarPalavraInteira(q.frase, q.palavra) === -1) {
            erros.push(
                `${onde} palavra "${q.palavra}" nao aparece isolada na frase`
            );
        }

        // --- alternativas ---
        if (!Array.isArray(q.alternativas)) {
            erros.push(`${onde} alternativas nao e uma lista`);
        }
        else {

            if (q.alternativas.length !== 4) {
                erros.push(
                    `${onde} tem ${q.alternativas.length} alternativas (esperado 4)`
                );
            }

            if (new Set(q.alternativas).size !== q.alternativas.length) {
                erros.push(`${onde} alternativas repetidas`);
            }

            if (!q.alternativas.includes(q.classe)) {
                erros.push(
                    `${onde} a resposta "${q.classe}" nao esta entre as alternativas`
                );
            }

            const invalidas = q.alternativas.filter(a => !CLASSES.includes(a));
            if (invalidas.length) {
                erros.push(
                    `${onde} alternativas fora das 10 classes: ${invalidas.join(", ")}`
                );
            }

        }

        // --- frase duplicada ---
        const chave = q.frase.trim().toLowerCase();
        if (frasesVistas.has(chave)) {
            erros.push(
                `${onde} frase duplicada (ja usada em [${frasesVistas.get(chave)}])`
            );
        }
        else {
            frasesVistas.set(chave, i);
        }

        // --- avisos (não bloqueiam) ---
        if (!/[.!?]$/.test(q.frase.trim())) {
            avisos.push(`${onde} frase sem pontuacao final`);
        }

        if (q.explicacao && q.explicacao.length < 25) {
            avisos.push(`${onde} explicacao muito curta`);
        }

    });

    return { erros, avisos };

}


function main() {

    const arquivo = process.argv[2];

    if (!arquivo) {
        console.error("Informe o arquivo. Ex.: node validar-questoes.js seeds/questoes-portugues-extra.json");
        process.exitCode = 1;
        return;
    }

    const questoes = JSON.parse(
        fs.readFileSync(path.resolve(arquivo), "utf8")
    );

    const { erros, avisos } = validar(questoes);

    // distribuição
    const porNivel = {};
    const porClasse = {};
    for (const q of questoes) {
        porNivel[q.nivel] = (porNivel[q.nivel] || 0) + 1;
        porClasse[q.classe] = (porClasse[q.classe] || 0) + 1;
    }

    console.log(`\n${questoes.length} questoes em ${arquivo}\n`);

    console.log("Por nivel:");
    Object.keys(porNivel).sort((a, b) => a - b).forEach(n =>
        console.log(`  nivel ${n}: ${String(porNivel[n]).padStart(3)}`)
    );

    console.log("\nPor classe:");
    Object.entries(porClasse).sort((a, b) => b[1] - a[1]).forEach(([c, n]) =>
        console.log(`  ${c.padEnd(13)} ${String(n).padStart(3)}`)
    );

    if (avisos.length) {
        console.log(`\n${avisos.length} aviso(s):`);
        avisos.forEach(a => console.log("  ! " + a));
    }

    if (erros.length) {
        console.log(`\n${erros.length} ERRO(S):`);
        erros.forEach(e => console.log("  x " + e));
        process.exitCode = 1;
    }
    else {
        console.log("\nNenhum erro estrutural.");
    }

    console.log("");

}


module.exports = { validar, encontrarPalavraInteira, CLASSES };

if (require.main === module) {
    main();
}
