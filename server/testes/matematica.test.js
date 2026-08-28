/*
    Testes da geração de questões de Matemática.

    O ponto crítico é o determinismo: o servidor manda só
    as expressões e, no encerramento, regera a sequência a
    partir da semente para conferir as respostas. Se a
    mesma semente produzisse sequências diferentes, todo
    mundo levaria zero.
*/

const test = require("node:test");
const assert = require("node:assert");

const {
    OPERACOES,
    criarGerador,
    nivelPorPlacar,
    gerarSequencia
} = require("../jogos/matematica");


function sequencia(extra = {}) {
    return gerarSequencia({
        operacao: "addition",
        semente: 12345,
        quantidade: 60,
        ...extra
    });
}


// ------------------------------------------------------
// Determinismo — a base de todo o mecanismo
// ------------------------------------------------------

test("a mesma semente produz exatamente a mesma sequencia", () => {

    assert.deepStrictEqual(
        sequencia(),
        sequencia()
    );

});


test("sementes diferentes produzem sequencias diferentes", () => {

    assert.notDeepStrictEqual(
        sequencia({ semente: 1 }),
        sequencia({ semente: 2 })
    );

});


test("regerar so o inicio bate com a sequencia completa", () => {

    // É o que o encerramento faz: regera e compara.
    const completa = sequencia({ quantidade: 60 });
    const parcial = sequencia({ quantidade: 10 });

    assert.deepStrictEqual(
        parcial,
        completa.slice(0, 10)
    );

});


// ------------------------------------------------------
// Corretude aritmética
// ------------------------------------------------------

function avaliar(expressao) {

    const contas = expressao
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

    // As expressões só têm números e + - * / com espaços.
    assert.match(
        contas,
        /^[0-9+\-*/ ]+$/,
        `expressao inesperada: ${expressao}`
    );

    return Function(`"use strict"; return (${contas});`)();

}


test("a resposta declarada bate com a expressao, em todas as operacoes", () => {

    for (const operacao of OPERACOES) {

        for (const q of sequencia({ operacao, quantidade: 120 })) {

            assert.strictEqual(
                avaliar(q.expressao),
                q.resposta,
                `${operacao}: ${q.expressao} deveria dar ${q.resposta}`
            );

        }

    }

});


test("divisao sempre da resultado inteiro", () => {

    for (const q of sequencia({ operacao: "division", quantidade: 200 })) {

        assert.ok(
            Number.isInteger(q.resposta),
            `${q.expressao} deu ${q.resposta}`
        );

    }

});


test("subtracao nunca da resultado negativo", () => {

    for (const q of sequencia({ operacao: "subtraction", quantidade: 200 })) {

        assert.ok(
            q.resposta >= 0,
            `${q.expressao} deu ${q.resposta}`
        );

    }

});


// ------------------------------------------------------
// Progressão de dificuldade
// ------------------------------------------------------

test("o nivel acompanha o placar e para em 10", () => {

    assert.strictEqual(nivelPorPlacar(0), 1);
    assert.strictEqual(nivelPorPlacar(4), 1);
    assert.strictEqual(nivelPorPlacar(5), 2);
    assert.strictEqual(nivelPorPlacar(59), 9);
    assert.strictEqual(nivelPorPlacar(60), 10);
    assert.strictEqual(nivelPorPlacar(5000), 10);

});


test("as questoes ficam mais dificeis ao longo da partida", () => {

    const questoes = sequencia({ operacao: "addition", quantidade: 80 });

    const primeira = questoes[0].nivel;
    const ultima = questoes[79].nivel;

    assert.ok(
        ultima > primeira,
        `comecou no nivel ${primeira} e terminou no ${ultima}`
    );

});


test("expressoes de tres termos so aparecem depois de 30 acertos", () => {

    const questoes = sequencia({ operacao: "addition", quantidade: 30 });

    const comTresTermos = questoes.filter(
        q => (q.expressao.match(/\+/g) || []).length > 1
    );

    assert.deepStrictEqual(
        comTresTermos.map(q => q.expressao),
        []
    );

});


test("em placares altos aparecem expressoes de tres termos", () => {

    const questoes = sequencia({ operacao: "addition", quantidade: 120 });

    const tardias = questoes.slice(60).filter(
        q => (q.expressao.match(/\+/g) || []).length > 1
    );

    assert.ok(
        tardias.length > 0,
        "nenhuma expressao de tres termos apos 60 acertos"
    );

});


// ------------------------------------------------------
// Modo sobrevivência
// ------------------------------------------------------

test("sobrevivencia mistura as quatro operacoes", () => {

    const questoes = sequencia({
        sobrevivencia: true,
        quantidade: 120
    });

    const usadas = new Set(questoes.map(q => q.operacao));

    assert.deepStrictEqual(
        [...usadas].sort(),
        [...OPERACOES].sort()
    );

});


test("sobrevivencia continua deterministica", () => {

    assert.deepStrictEqual(
        sequencia({ sobrevivencia: true }),
        sequencia({ sobrevivencia: true })
    );

});


// ------------------------------------------------------
// Gerador
// ------------------------------------------------------

test("o gerador devolve valores em [0, 1)", () => {

    const rng = criarGerador(999);

    for (let i = 0; i < 1000; i++) {
        const v = rng();
        assert.ok(v >= 0 && v < 1, `valor fora da faixa: ${v}`);
    }

});
