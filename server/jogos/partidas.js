/*
    Regras de partida, separadas do Express para poderem
    ser testadas sem banco e sem servidor.

    O placar nunca vem do cliente: ele envia as respostas e
    o servidor as corrige.
*/

const { gerarSequencia } = require("./matematica");


const JOGOS = ["matematica", "portugues"];
const MODOS = ["tranquilo", "velocidade", "brutal"];

const OPERACOES_VALIDAS = [
    "addition",
    "subtraction",
    "multiplication",
    "division"
];

/*
    Quantas questões a partida leva. O jogo de Matemática é
    de sobrevivência e não tem fim natural, então o limite é
    prático: ninguém acerta 300 contas seguidas antes de
    errar uma. Como só as expressões vão para o cliente, o
    custo é de poucos KB.
*/
const MAXIMO_QUESTOES_MATEMATICA = 300;

/*
    Português: o nível sobe a cada 10 acertos e trava em 8.
    Enviar 20 por nível cobre a progressão com folga.
*/
const QUESTOES_POR_NIVEL_PORTUGUES = 20;
const NIVEL_MAXIMO_PORTUGUES = 8;

/*
    Tempo por questão no jogo, mais folga de rede. Serve
    para rejeitar placares impossíveis no tempo decorrido.
*/
const TEMPO_POR_QUESTAO_S = 20;
const FOLGA_REDE_S = 10;


function jogoValido(jogo) {
    return JOGOS.includes(jogo);
}

function modoValido(modo) {
    return MODOS.includes(modo);
}

function operacaoValida(operacao) {
    return OPERACOES_VALIDAS.includes(operacao);
}


/*
    O modo também define o nível inicial de Português:
    tranquilo=1, velocidade=2, brutal=3. Era assim no
    frontend e continua sendo.
*/
function nivelInicialPortugues(modo) {
    return MODOS.indexOf(modo) + 1;
}


function novaSemente() {
    // 32 bits, que é a entrada do gerador.
    return Math.floor(Math.random() * 0xFFFFFFFF) >>> 0;
}


/*
    Monta as questões de Matemática que vão para o cliente:
    só as expressões, nunca as respostas.
*/
function questoesMatematicaParaCliente(partida) {

    return gerarSequencia({
        operacao: partida.operacao,
        sobrevivencia: Boolean(partida.sobrevivencia),
        semente: partida.semente,
        quantidade: MAXIMO_QUESTOES_MATEMATICA
    }).map((q, indice) => ({
        indice,
        expressao: q.expressao,
        nivel: q.nivel,
        operacao: q.operacao
    }));

}


/*
    Escolhe as questões de Português da partida.

    Recebe todas as questões disponíveis e devolve os ids
    na ordem em que serão jogadas, embaralhadas dentro de
    cada nível.
*/
function sortearQuestoesPortugues(disponiveis, nivelInicial) {

    const ids = [];

    for (
        let nivel = nivelInicial;
        nivel <= NIVEL_MAXIMO_PORTUGUES;
        nivel++
    ) {

        const doNivel = disponiveis
            .filter(q => Number(q.nivel) === nivel)
            .map(q => q.id);

        // Embaralhamento de Fisher-Yates.
        for (let i = doNivel.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [doNivel[i], doNivel[j]] = [doNivel[j], doNivel[i]];
        }

        ids.push(
            ...doNivel.slice(0, QUESTOES_POR_NIVEL_PORTUGUES)
        );

    }

    return ids;

}


/*
    Corrige uma partida de Matemática.

    Regera a sequência a partir da semente e compara. Para
    no primeiro erro, que é como o jogo funciona: errar
    encerra a partida.
*/
function corrigirMatematica(partida, respostas) {

    const esperadas = gerarSequencia({
        operacao: partida.operacao,
        sobrevivencia: Boolean(partida.sobrevivencia),
        semente: partida.semente,
        quantidade: Math.min(
            respostas.length,
            MAXIMO_QUESTOES_MATEMATICA
        )
    });

    let acertos = 0;

    for (let i = 0; i < esperadas.length; i++) {

        const enviada = Number(respostas[i]?.resposta);

        if (
            !Number.isFinite(enviada) ||
            enviada !== esperadas[i].resposta
        ) {
            break;
        }

        acertos++;

    }

    return acertos;

}


/*
    Corrige uma partida de Português.

    "gabarito" é um Map de id da questão para a classe
    correta, vindo do banco.
*/
function corrigirPortugues(partida, respostas, gabarito) {

    const ordem = partida.questoes || [];

    let acertos = 0;

    for (let i = 0; i < respostas.length; i++) {

        const idEsperado = ordem[i];

        if (idEsperado === undefined) {
            break;
        }

        const enviada = respostas[i];

        /*
            O cliente informa qual questão respondeu. Se
            não bate com a ordem sorteada, a partida foi
            adulterada.
        */
        if (Number(enviada?.questaoId) !== Number(idEsperado)) {
            break;
        }

        const correta = gabarito.get(Number(idEsperado));

        if (
            correta === undefined ||
            String(enviada.resposta) !== String(correta)
        ) {
            break;
        }

        acertos++;

    }

    return acertos;

}


/*
    Rejeita placares impossíveis no tempo decorrido.

    Não impede fraude na Matemática, em que a resposta é
    derivável — mas obriga o fraudador a gastar o tempo de
    verdade, o que limita o placar ao humanamente possível.
    Fechar isso de todo exigiria uma requisição por questão,
    que não cabe no plano gratuito.
*/
function placarPlausivel(acertos, segundosDecorridos) {

    if (acertos <= 0) {
        return true;
    }

    /*
        Tempo mínimo crível: uma questão não pode ser
        respondida em menos de meio segundo de forma
        sustentada.
    */
    const minimoPorQuestao = 0.5;

    return segundosDecorridos >= acertos * minimoPorQuestao;

}


function tempoMaximoDaPartida(quantidadeRespostas) {
    return quantidadeRespostas * (TEMPO_POR_QUESTAO_S + FOLGA_REDE_S);
}


module.exports = {
    JOGOS,
    MODOS,
    OPERACOES_VALIDAS,
    MAXIMO_QUESTOES_MATEMATICA,
    QUESTOES_POR_NIVEL_PORTUGUES,
    NIVEL_MAXIMO_PORTUGUES,

    jogoValido,
    modoValido,
    operacaoValida,
    nivelInicialPortugues,
    novaSemente,

    questoesMatematicaParaCliente,
    sortearQuestoesPortugues,
    corrigirMatematica,
    corrigirPortugues,
    placarPlausivel,
    tempoMaximoDaPartida
};
