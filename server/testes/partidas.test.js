/*
    Testes da correção de partidas.

    Cobre o que o commit inteiro existe para garantir: o
    placar sai do servidor, não do cliente.
*/

const test = require("node:test");
const assert = require("node:assert");

const { gerarSequencia } = require("../jogos/matematica");

const {
    corrigirMatematica,
    corrigirPortugues,
    placarPlausivel,
    sortearQuestoesPortugues,
    nivelInicialPortugues,
    novaSemente
} = require("../jogos/partidas");


const partidaMat = {
    operacao: "addition",
    sobrevivencia: false,
    semente: 4242
};


function respostasCertas(quantidade) {

    return gerarSequencia({
        operacao: partidaMat.operacao,
        sobrevivencia: false,
        semente: partidaMat.semente,
        quantidade
    }).map(q => ({ resposta: q.resposta }));

}


// ------------------------------------------------------
// Matemática
// ------------------------------------------------------

test("conta todos os acertos quando tudo esta certo", () => {

    assert.strictEqual(
        corrigirMatematica(partidaMat, respostasCertas(25)),
        25
    );

});


test("para no primeiro erro, como o jogo faz", () => {

    const respostas = respostasCertas(25);
    respostas[10].resposta = respostas[10].resposta + 1;

    assert.strictEqual(
        corrigirMatematica(partidaMat, respostas),
        10
    );

});


test("respostas inventadas nao pontuam", () => {

    const forjadas = Array.from(
        { length: 100 },
        () => ({ resposta: 42 })
    );

    const acertos = corrigirMatematica(partidaMat, forjadas);

    assert.ok(
        acertos < 5,
        `placar forjado obteve ${acertos} acertos`
    );

});


test("placar de outra semente nao vale", () => {

    // Respostas certas para uma partida diferente.
    const deOutraPartida = gerarSequencia({
        operacao: "addition",
        sobrevivencia: false,
        semente: 999999,
        quantidade: 40
    }).map(q => ({ resposta: q.resposta }));

    const acertos = corrigirMatematica(partidaMat, deOutraPartida);

    assert.ok(
        acertos < 40,
        "respostas de outra partida foram aceitas por inteiro"
    );

});


test("resposta ausente ou nao numerica encerra a contagem", () => {

    for (const valor of [undefined, null, "abc", NaN, Infinity]) {

        const respostas = respostasCertas(10);
        respostas[3].resposta = valor;

        assert.strictEqual(
            corrigirMatematica(partidaMat, respostas),
            3,
            `valor ${String(valor)} deveria interromper em 3`
        );

    }

});


test("enviar mais respostas do que questoes nao infla o placar", () => {

    const respostas = [
        ...respostasCertas(10),
        ...Array.from({ length: 500 }, () => ({ resposta: 0 }))
    ];

    assert.strictEqual(
        corrigirMatematica(partidaMat, respostas),
        10
    );

});


// ------------------------------------------------------
// Português
// ------------------------------------------------------

const gabarito = new Map([
    [1, "Substantivo"],
    [2, "Verbo"],
    [3, "Adjetivo"],
    [4, "Artigo"]
]);

const partidaPt = { questoes: [1, 2, 3, 4] };


test("conta os acertos de portugues", () => {

    const respostas = [
        { questaoId: 1, resposta: "Substantivo" },
        { questaoId: 2, resposta: "Verbo" },
        { questaoId: 3, resposta: "Adjetivo" }
    ];

    assert.strictEqual(
        corrigirPortugues(partidaPt, respostas, gabarito),
        3
    );

});


test("resposta errada de portugues interrompe a contagem", () => {

    const respostas = [
        { questaoId: 1, resposta: "Substantivo" },
        { questaoId: 2, resposta: "Adjetivo" },
        { questaoId: 3, resposta: "Adjetivo" }
    ];

    assert.strictEqual(
        corrigirPortugues(partidaPt, respostas, gabarito),
        1
    );

});


test("responder fora da ordem sorteada nao vale", () => {

    // Tentativa de escolher so as questoes que sabe.
    const respostas = [
        { questaoId: 3, resposta: "Adjetivo" },
        { questaoId: 1, resposta: "Substantivo" }
    ];

    assert.strictEqual(
        corrigirPortugues(partidaPt, respostas, gabarito),
        0
    );

});


test("questao fora da partida nao pontua", () => {

    const respostas = [
        { questaoId: 99, resposta: "Substantivo" }
    ];

    assert.strictEqual(
        corrigirPortugues(partidaPt, respostas, gabarito),
        0
    );

});


test("nao da para pontuar alem das questoes sorteadas", () => {

    const respostas = Array.from(
        { length: 50 },
        () => ({ questaoId: 1, resposta: "Substantivo" })
    );

    assert.ok(
        corrigirPortugues(partidaPt, respostas, gabarito) <= 4
    );

});


// ------------------------------------------------------
// Plausibilidade temporal
// ------------------------------------------------------

test("recusa muitos acertos em tempo curto demais", () => {

    assert.strictEqual(
        placarPlausivel(200, 3),
        false
    );

});


test("aceita um ritmo humano", () => {

    // 50 acertos em 4 minutos.
    assert.strictEqual(
        placarPlausivel(50, 240),
        true
    );

});


test("placar zero e sempre plausivel", () => {

    assert.strictEqual(
        placarPlausivel(0, 0),
        true
    );

});


// ------------------------------------------------------
// Sorteio de questões
// ------------------------------------------------------

test("o sorteio respeita o nivel inicial do modo", () => {

    assert.strictEqual(nivelInicialPortugues("tranquilo"), 1);
    assert.strictEqual(nivelInicialPortugues("velocidade"), 2);
    assert.strictEqual(nivelInicialPortugues("brutal"), 3);

});


test("o sorteio ignora niveis abaixo do inicial", () => {

    const disponiveis = [];

    for (let nivel = 1; nivel <= 8; nivel++) {
        for (let i = 0; i < 5; i++) {
            disponiveis.push({ id: nivel * 100 + i, nivel });
        }
    }

    const ids = sortearQuestoesPortugues(disponiveis, 3);

    const niveisUsados = new Set(
        ids.map(id => Math.floor(id / 100))
    );

    assert.ok(!niveisUsados.has(1));
    assert.ok(!niveisUsados.has(2));
    assert.ok(niveisUsados.has(3));
    assert.ok(niveisUsados.has(8));

});


test("o sorteio nao repete questao", () => {

    const disponiveis = Array.from(
        { length: 40 },
        (v, i) => ({ id: i + 1, nivel: (i % 8) + 1 })
    );

    const ids = sortearQuestoesPortugues(disponiveis, 1);

    assert.strictEqual(
        new Set(ids).size,
        ids.length
    );

});


// ------------------------------------------------------
// Semente
// ------------------------------------------------------

test("a semente cabe em 32 bits sem sinal", () => {

    for (let i = 0; i < 200; i++) {
        const s = novaSemente();
        assert.ok(Number.isInteger(s));
        assert.ok(s >= 0 && s <= 0xFFFFFFFF);
    }

});
