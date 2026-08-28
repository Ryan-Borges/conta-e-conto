/*
    Testes do validador de questões e do banco de questões
    versionado em seeds/.

    O ponto mais importante aqui é a busca por palavra
    inteira: o jogo destaca a palavra analisada na frase, e
    uma busca por pedaço destacaria a letra errada — o "o"
    dentro de "comprou", o "a" dentro de "aluno". Isso
    atinge justamente artigos, preposições e conjunções.
*/

const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const {
    validar,
    encontrarPalavraInteira,
    CLASSES
} = require("../validar-questoes");


const SEED = path.join(
    __dirname, "..", "seeds", "questoes-portugues-extra.json"
);

const questoes = JSON.parse(
    fs.readFileSync(SEED, "utf8")
);


// ------------------------------------------------------
// Busca por palavra inteira
// ------------------------------------------------------

/*
    Compara o trecho vizinho em vez do índice, que seria
    frágil e fácil de errar ao contar caracteres na mão.
*/
function trechoDestacado(frase, palavra) {

    const i = encontrarPalavraInteira(frase, palavra);

    if (i === -1) {
        return null;
    }

    return {
        antes: frase[i - 1] ?? "",
        palavra: frase.slice(i, i + palavra.length),
        depois: frase[i + palavra.length] ?? ""
    };

}


test("encontra a palavra isolada, nao um pedaco de outra", () => {

    // Os dois casos que motivaram a correção.
    assert.deepStrictEqual(
        trechoDestacado("Ela comprou o livro ontem.", "o"),
        { antes: " ", palavra: "o", depois: " " },
        "deveria achar o artigo, nao o 'o' de 'comprou'"
    );

    assert.deepStrictEqual(
        trechoDestacado("O aluno estudou para a prova.", "a"),
        { antes: " ", palavra: "a", depois: " " },
        "deveria achar a preposicao, nao o 'a' de 'aluno'"
    );

    // Pontuacao tambem e limite de palavra.
    assert.deepStrictEqual(
        trechoDestacado("Ela nao veio, mas avisou.", "mas"),
        { antes: " ", palavra: "mas", depois: " " }
    );

    assert.deepStrictEqual(
        trechoDestacado("Vi o filme ontem.", "ontem"),
        { antes: " ", palavra: "ontem", depois: "." }
    );

});


test("respeita acentuacao nas bordas", () => {

    // \b do JavaScript e ASCII e trataria "e" como limite.
    assert.notStrictEqual(
        encontrarPalavraInteira("Ele é muito rápido.", "é"),
        -1
    );

    assert.strictEqual(
        encontrarPalavraInteira("A água estava gelada.", "água"),
        2
    );

    // "agua" nao deve casar dentro de "aguardou".
    assert.strictEqual(
        encontrarPalavraInteira("Ele aguardou a resposta.", "agua"),
        -1
    );

});


test("ignora diferenca de caixa", () => {

    assert.strictEqual(
        encontrarPalavraInteira("Ninguem faltou.", "ninguem"),
        0
    );

});


test("devolve -1 quando a palavra nao existe", () => {

    assert.strictEqual(
        encontrarPalavraInteira("Uma frase qualquer.", "ausente"),
        -1
    );

});


// ------------------------------------------------------
// Validador
// ------------------------------------------------------

test("aceita uma questao bem formada", () => {

    const { erros } = validar([{
        nivel: 3,
        frase: "Ela chegou cedo.",
        palavra: "Ela",
        classe: "Pronome",
        alternativas: ["Pronome", "Verbo", "Artigo", "Advérbio"],
        explicacao: "Ela e um pronome pessoal porque substitui o nome."
    }]);

    assert.deepStrictEqual(erros, []);

});


test("recusa questao cuja resposta nao esta nas alternativas", () => {

    const { erros } = validar([{
        nivel: 3,
        frase: "Ela chegou cedo.",
        palavra: "Ela",
        classe: "Pronome",
        alternativas: ["Verbo", "Artigo", "Advérbio", "Numeral"],
        explicacao: "Explicacao com tamanho suficiente para passar."
    }]);

    assert.strictEqual(erros.length, 1);
    assert.match(erros[0], /nao esta entre as alternativas/);

});


test("recusa palavra que nao aparece isolada na frase", () => {

    const { erros } = validar([{
        nivel: 3,
        frase: "Ele aguardou a resposta.",
        palavra: "agua",
        classe: "Substantivo",
        alternativas: ["Substantivo", "Verbo", "Artigo", "Advérbio"],
        explicacao: "Explicacao com tamanho suficiente para passar."
    }]);

    assert.strictEqual(erros.length, 1);
    assert.match(erros[0], /nao aparece isolada/);

});


test("recusa frases duplicadas", () => {

    const questao = {
        nivel: 1,
        frase: "A menina leu.",
        palavra: "menina",
        classe: "Substantivo",
        alternativas: ["Substantivo", "Verbo", "Artigo", "Advérbio"],
        explicacao: "Explicacao com tamanho suficiente para passar."
    };

    const { erros } = validar([questao, { ...questao }]);

    assert.strictEqual(erros.length, 1);
    assert.match(erros[0], /duplicada/);

});


test("recusa nivel fora de 1 a 8", () => {

    const { erros } = validar([{
        nivel: 9,
        frase: "A menina leu.",
        palavra: "menina",
        classe: "Substantivo",
        alternativas: ["Substantivo", "Verbo", "Artigo", "Advérbio"],
        explicacao: "Explicacao com tamanho suficiente para passar."
    }]);

    assert.strictEqual(erros.length, 1);
    assert.match(erros[0], /nivel invalido/);

});


// ------------------------------------------------------
// O banco versionado precisa estar sempre valido
// ------------------------------------------------------

test("o arquivo de seed nao tem erro estrutural", () => {

    const { erros } = validar(questoes);

    assert.deepStrictEqual(
        erros, [],
        "seeds/questoes-portugues-extra.json ficou invalido"
    );

});


test("todas as questoes do seed destacam a palavra certa", () => {

    const falhas = questoes.filter(
        q => encontrarPalavraInteira(q.frase, q.palavra) === -1
    );

    assert.deepStrictEqual(
        falhas.map(q => q.frase), [],
        "estas frases nao destacariam a palavra analisada"
    );

});


test("o seed cobre os oito niveis", () => {

    const niveis = new Set(questoes.map(q => q.nivel));

    for (let n = 1; n <= 8; n++) {
        assert.ok(
            niveis.has(n),
            `nenhuma questao no nivel ${n}`
        );
    }

});


test("o nivel 8 tem mais questoes, pois o jogador fica preso nele", () => {

    const conta = n => questoes.filter(q => q.nivel === n).length;

    assert.ok(
        conta(8) > conta(1),
        `nivel 8 tem ${conta(8)}, nivel 1 tem ${conta(1)}`
    );

});


test("as alternativas usam apenas as dez classes gramaticais", () => {

    const fora = new Set();

    for (const q of questoes) {
        for (const a of q.alternativas) {
            if (!CLASSES.includes(a)) {
                fora.add(a);
            }
        }
    }

    assert.deepStrictEqual([...fora], []);

});
