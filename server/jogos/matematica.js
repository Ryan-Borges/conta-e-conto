/*
    Geração das questões de Matemática, no servidor.

    Antes isso vivia só no navegador, e o placar era
    enviado pronto para a API — qualquer pessoa podia
    gravar o recorde que quisesse.

    A geração é determinística a partir de uma semente:
    o servidor sorteia a semente ao criar a partida, manda
    apenas as expressões, e no encerramento regera a mesma
    sequência para conferir as respostas. Assim não é
    preciso guardar as respostas no banco.

    A dificuldade e a operação dependem apenas do placar,
    e o placar é igual ao índice da questão, porque um erro
    encerra a partida. Por isso a sequência inteira é
    função de (operação, semente, índice).

    As faixas de valores são as mesmas que estavam no
    frontend, para o jogo não mudar de dificuldade.
*/


const OPERACOES = [
    "addition",
    "subtraction",
    "multiplication",
    "division"
];


/*
    mulberry32: gerador pequeno e determinístico.
    Math.random() não serve porque o servidor precisa
    reproduzir exatamente a mesma sequência depois.
*/
function criarGerador(semente) {

    let estado = semente >>> 0;

    return function proximo() {

        estado |= 0;
        estado = (estado + 0x6D2B79F5) | 0;

        let t = Math.imul(
            estado ^ (estado >>> 15),
            1 | estado
        );

        t = (t + Math.imul(
            t ^ (t >>> 7),
            61 | t
        )) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;

    };

}


function inteiroEntre(rng, min, max) {
    return Math.floor(rng() * (max - min + 1)) + min;
}


function nivelPorPlacar(placar) {

    if (placar < 5) return 1;
    if (placar < 10) return 2;
    if (placar < 15) return 3;
    if (placar < 20) return 4;
    if (placar < 25) return 5;
    if (placar < 30) return 6;
    if (placar < 40) return 7;
    if (placar < 50) return 8;
    if (placar < 60) return 9;

    return 10;

}


function usarTresTermos(rng, placar) {

    if (placar >= 50) {
        return rng() < 0.70;
    }

    if (placar >= 30) {
        return rng() < 0.35;
    }

    return false;

}


// ------------------------------------------------------
// Geradores por operação
// ------------------------------------------------------

const FAIXAS_SOMA = [
    [1, 10], [5, 20], [10, 50], [20, 100], [50, 200],
    [100, 500], [200, 1000], [500, 2000], [1000, 5000],
    [1500, 9999]
];


function questaoSoma(rng, dificuldade, placar) {

    const [min, max] =
        FAIXAS_SOMA[Math.min(dificuldade, 10) - 1];

    const a = inteiroEntre(rng, min, max);
    const b = inteiroEntre(rng, min, max);

    if (usarTresTermos(rng, placar)) {

        const c = inteiroEntre(rng, min, max);

        return {
            expressao: `${a} + ${b} + ${c}`,
            resposta: a + b + c
        };

    }

    return {
        expressao: `${a} + ${b}`,
        resposta: a + b
    };

}


function questaoSubtracao(rng, dificuldade, placar) {

    const [min, max] =
        FAIXAS_SOMA[Math.min(dificuldade, 10) - 1];

    if (usarTresTermos(rng, placar)) {

        const b = inteiroEntre(rng, min, max);
        const c = inteiroEntre(rng, min, max);
        const resultado = inteiroEntre(rng, min, max);

        return {
            expressao: `${resultado + b + c} - ${b} - ${c}`,
            resposta: resultado
        };

    }

    let a = inteiroEntre(rng, min, max);
    let b = inteiroEntre(rng, min, max);

    if (a < b) {
        [a, b] = [b, a];
    }

    return {
        expressao: `${a} - ${b}`,
        resposta: a - b
    };

}


const FAIXAS_MULTIPLICACAO = [
    [[2, 5], [2, 5]], [[2, 10], [2, 10]], [[4, 12], [2, 10]],
    [[6, 15], [3, 12]], [[8, 20], [4, 15]], [[10, 25], [5, 20]],
    [[12, 30], [6, 20]], [[15, 35], [8, 25]], [[20, 50], [10, 30]],
    [[25, 75], [10, 40]]
];


function questaoMultiplicacao(rng, dificuldade) {

    const [faixaA, faixaB] =
        FAIXAS_MULTIPLICACAO[Math.min(dificuldade, 10) - 1];

    const a = inteiroEntre(rng, faixaA[0], faixaA[1]);
    const b = inteiroEntre(rng, faixaB[0], faixaB[1]);

    return {
        expressao: `${a} × ${b}`,
        resposta: a * b
    };

}


const FAIXAS_DIVISAO = [
    [[2, 5], [2, 5]], [[2, 10], [2, 8]], [[2, 10], [3, 12]],
    [[2, 12], [4, 15]], [[3, 12], [5, 20]], [[4, 15], [6, 25]],
    [[5, 18], [8, 30]], [[6, 20], [10, 40]], [[8, 25], [12, 50]],
    [[10, 30], [15, 70]]
];


function questaoDivisao(rng, dificuldade) {

    const [faixaDivisor, faixaResultado] =
        FAIXAS_DIVISAO[Math.min(dificuldade, 10) - 1];

    const divisor = inteiroEntre(rng, faixaDivisor[0], faixaDivisor[1]);
    const resultado = inteiroEntre(rng, faixaResultado[0], faixaResultado[1]);

    return {
        expressao: `${divisor * resultado} ÷ ${divisor}`,
        resposta: resultado
    };

}


function gerarUma(rng, operacao, dificuldade, placar) {

    switch (operacao) {

        case "subtraction":
            return questaoSubtracao(rng, dificuldade, placar);

        case "multiplication":
            return questaoMultiplicacao(rng, dificuldade);

        case "division":
            return questaoDivisao(rng, dificuldade);

        case "addition":
        default:
            return questaoSoma(rng, dificuldade, placar);

    }

}


/*
    Gera a sequência da partida.

    "sobrevivencia" sorteia a operação de cada questão;
    os demais modos usam a operação escolhida pelo jogador.

    A mesma semente sempre produz a mesma sequência — é o
    que permite conferir as respostas no encerramento sem
    guardar nada além da semente.
*/
function gerarSequencia({
    operacao,
    sobrevivencia = false,
    semente,
    quantidade
}) {

    const rng = criarGerador(semente);
    const questoes = [];

    for (let indice = 0; indice < quantidade; indice++) {

        /*
            O placar no momento da questão é igual ao
            índice: quem errou já encerrou a partida.
        */
        const placar = indice;
        const dificuldade = nivelPorPlacar(placar);

        const operacaoDaVez =
            sobrevivencia
                ? OPERACOES[inteiroEntre(rng, 0, OPERACOES.length - 1)]
                : operacao;

        questoes.push({
            ...gerarUma(rng, operacaoDaVez, dificuldade, placar),
            operacao: operacaoDaVez,
            nivel: dificuldade
        });

    }

    return questoes;

}


module.exports = {
    OPERACOES,
    criarGerador,
    nivelPorPlacar,
    gerarSequencia
};
