// ======================================================
// CONTA & CONTO
// SCRIPT PRINCIPAL
// ======================================================


// ======================================================
// CONFIGURAÇÕES
// ======================================================

const TEMPO_TOTAL = 20;

/*
    Em desenvolvimento (arquivo aberto pelo Live Server ou
    por localhost) aponta para o backend local; em qualquer
    outro host usa a API publicada.

    Assim dá para testar uma alteração de backend sem
    precisar publicar no Render antes.

    Para forçar a API de produção mesmo rodando local,
    execute no console do navegador:
        localStorage.setItem("apiUrl", "https://conta-e-conto-api.onrender.com")
*/
const API_PRODUCAO =
    "https://conta-e-conto-api.onrender.com";

const API_LOCAL =
    "http://localhost:3000";


function descobrirApiUrl() {

    try {

        const escolhido =
            localStorage.getItem("apiUrl");

        if (escolhido) {

            // Remove barras finais para não gerar "//api/...".
            let limpo = escolhido.trim();

            while (limpo.endsWith("/")) {
                limpo = limpo.slice(0, -1);
            }

            return limpo;

        }

    }

    catch (error) {
        // localStorage indisponível: segue no padrão.
    }


    const host =
        location.hostname;


    const ehLocal =
        host === "localhost" ||
        host === "127.0.0.1" ||
        host === "";


    return ehLocal
        ? API_LOCAL
        : API_PRODUCAO;

}


const API_URL =
    descobrirApiUrl();


// ======================================================
// ELEMENTOS GERAIS
// ======================================================

const authScreen =
    document.getElementById("authScreen");

const app =
    document.getElementById("app");

const home =
    document.getElementById("home");


// ======================================================
// MENU PRINCIPAL
// ======================================================

const mathButton =
    document.getElementById("mathButton");

const portugueseButton =
    document.getElementById("portugueseButton");

const mathModes =
    document.getElementById("mathModes");

const portugueseModes =
    document.getElementById("portugueseModes");


// ======================================================
// MATEMÁTICA
// ======================================================

const game =
    document.getElementById("game");

const mathQuestionElement =
    document.getElementById("question");

const answerInput =
    document.getElementById("answerInput");

const numericKeys =
    document.querySelectorAll(
        ".numeric-key[data-value]"
    );

const numericDelete =
    document.getElementById(
        "numericDelete"
    );

const numericConfirm =
    document.getElementById(
        "numericConfirm"
    );

const submitButton =
    document.getElementById("submitButton");

const scoreElement =
    document.getElementById("score");

const levelElement =
    document.getElementById("level");

const difficultyElement =
    document.getElementById("difficulty");

const timerElement =
    document.getElementById("timer");

const timerBar =
    document.getElementById("timerBar");

const mathRecordElement =
    document.getElementById("record");

const mathRecordLabel =
    document.getElementById("mathRecordLabel");

const mathGameOperationLabel =
    document.getElementById(
        "mathGameOperationLabel"
    );

const mathGameModeLabel =
    document.getElementById(
        "mathGameModeLabel"
    );

const mathOperationSelection =
    document.getElementById(
        "mathOperationSelection"
    );

const mathOperationModes =
    document.getElementById(
        "mathOperationModes"
    );

const mathSelectedOperationTitle =
    document.getElementById(
        "mathSelectedOperationTitle"
    );

const survivalButton =
    document.getElementById(
        "survivalButton"
    );

const survivalMenuRecord =
    document.getElementById(
        "survivalMenuRecord"
    );

const mathOperationButtons =
    document.querySelectorAll(
        ".math-operation-button"
    );

const mathOperationModeButtons =
    document.querySelectorAll(
        ".math-operation-mode"
    );

const backFromMathMenu =
    document.getElementById(
        "backFromMathMenu"
    );

const backFromMathOperationModes =
    document.getElementById(
        "backFromMathOperationModes"
    );

const mathGameBackButton =
    document.getElementById(
        "backFromMathGame"
    );


// ======================================================
// PORTUGUÊS
// ======================================================

const portugueseGame =
    document.getElementById("portugueseGame");

const portugueseQuestionElement =
    document.getElementById(
        "portugueseQuestion"
    );

const portugueseOptionsElement =
    document.getElementById(
        "portugueseOptions"
    );

const portugueseScoreElement =
    document.getElementById(
        "portugueseScore"
    );

const portugueseLevelElement =
    document.getElementById(
        "portugueseLevel"
    );

const portugueseDifficultyElement =
    document.getElementById(
        "portugueseDifficulty"
    );

const portugueseTimerElement =
    document.getElementById(
        "portugueseTimer"
    );

const portugueseTimerBar =
    document.getElementById(
        "portugueseTimerBar"
    );

const portugueseRecordElement =
    document.getElementById(
        "portugueseRecord"
    );

const portugueseGameModeLabel =
    document.getElementById(
        "portugueseGameModeLabel"
    );


// ======================================================
// GAME OVER
// ======================================================

const gameOver =
    document.getElementById("gameOver");

const gameOverMessage =
    document.getElementById(
        "gameOverMessage"
    );

const failedQuestion =
    document.getElementById(
        "failedQuestion"
    );

const failedWord =
    document.getElementById(
        "failedWord"
    );

const failedWordContainer =
    document.getElementById(
        "failedWordContainer"
    );

const correctAnswerElement =
    document.getElementById(
        "correctAnswer"
    );

const answerExplanation =
    document.getElementById(
        "answerExplanation"
    );

const finalScoreElement =
    document.getElementById(
        "finalScore"
    );

const finalRecordElement =
    document.getElementById(
        "finalRecord"
    );

const restartButton =
    document.getElementById(
        "restartButton"
    );

const menuButton =
    document.getElementById(
        "menuButton"
    );

const performanceFeedback =
    document.getElementById(
        "performanceFeedback"
    );

const newRecordBanner =
    document.getElementById(
        "newRecordBanner"
    );


// ======================================================
// RANKING
// ======================================================

const rankingSection =
    document.getElementById("ranking");

const mathRankingButton =
    document.getElementById(
        "mathRankingButton"
    );

const portugueseRankingButton =
    document.getElementById(
        "portugueseRankingButton"
    );

const rankingTitle =
    document.getElementById(
        "rankingTitle"
    );

const rankingList =
    document.getElementById(
        "rankingList"
    );


// ======================================================
// PERFIL
// ======================================================

const profileSection =
    document.getElementById("profile");

const profileUsername =
    document.getElementById(
        "profileUsername"
    );

const profileId =
    document.getElementById(
        "profileId"
    );

const profileDate =
    document.getElementById(
        "profileDate"
    );

const profileMathRecord =
    document.getElementById(
        "profileMathRecord"
    );


const profilePortugueseRecord =
    document.getElementById(
        "profilePortugueseRecord"
    );

const profileUsernameHeading =
    document.getElementById(
        "profileUsernameHeading"
    );

const profileEmail =
    document.getElementById(
        "profileEmail"
    );

const profileMathPosition =
    document.getElementById(
        "profileMathPosition"
    );

const profilePortuguesePosition =
    document.getElementById(
        "profilePortuguesePosition"
    );

const profileAvatarImage =
    document.getElementById(
        "profileAvatarImage"
    );

const editAvatarButton =
    document.getElementById(
        "editAvatarButton"
    );

const editAvatarPanel =
    document.getElementById(
        "editAvatarPanel"
    );

const avatarGrid =
    document.getElementById(
        "avatarGrid"
    );

const editAvatarMessage =
    document.getElementById(
        "editAvatarMessage"
    );

const editUsernameButton =
    document.getElementById(
        "editUsernameButton"
    );

const editEmailButton =
    document.getElementById(
        "editEmailButton"
    );

const editUsernamePanel =
    document.getElementById(
        "editUsernamePanel"
    );

const editEmailPanel =
    document.getElementById(
        "editEmailPanel"
    );

const newUsernameInput =
    document.getElementById(
        "newUsername"
    );

const usernameConfirmationInput =
    document.getElementById(
        "usernameConfirmation"
    );

const usernameCurrentPasswordInput =
    document.getElementById(
        "usernameCurrentPassword"
    );

const editUsernameMessage =
    document.getElementById(
        "editUsernameMessage"
    );

const saveUsernameButton =
    document.getElementById(
        "saveUsernameButton"
    );

const cancelUsernameButton =
    document.getElementById(
        "cancelUsernameButton"
    );

const newEmailInput =
    document.getElementById(
        "newEmail"
    );

const emailCurrentPasswordInput =
    document.getElementById(
        "emailCurrentPassword"
    );

const editEmailMessage =
    document.getElementById(
        "editEmailMessage"
    );

const saveEmailButton =
    document.getElementById(
        "saveEmailButton"
    );

const cancelEmailButton =
    document.getElementById(
        "cancelEmailButton"
    );

const learnSection =
    document.getElementById("learn");

const learnMathButton =
    document.getElementById(
        "learnMathButton"
    );


const learnPortugueseButton =
    document.getElementById(
        "learnPortugueseButton"
    );


const backFromLearnMath =
    document.getElementById(
        "backFromLearnMath"
    );


const backFromLearnPortuguese =
    document.getElementById(
        "backFromLearnPortuguese"
    );

const learnMathSection =
    document.getElementById(
        "learnMath"
    );


const learnPortugueseSection =
    document.getElementById(
        "learnPortuguese"
    );

const aboutSection =
    document.getElementById("about");

const contactSection =
    document.getElementById(
        "contact"
    );

const contactForm =
    document.getElementById(
        "contactForm"
    );

const contactNameInput =
    document.getElementById(
        "contactName"
    );

const contactEmailInput =
    document.getElementById(
        "contactEmail"
    );

const contactSubjectInput =
    document.getElementById(
        "contactSubject"
    );

const contactMessageInput =
    document.getElementById(
        "contactMessage"
    );

const contactFormMessage =
    document.getElementById(
        "contactFormMessage"
    );

// ======================================================
// NAVEGAÇÃO
// ======================================================

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const mainNav =
    document.querySelector(
        "header nav"
    );

const navHome =
    document.getElementById("navHome");

const navMath =
    document.getElementById("navMath");

const navPortuguese =
    document.getElementById(
        "navPortuguese"
    );

const navLearn =
    document.getElementById("navLearn");

const navRanking =
    document.getElementById(
        "navRanking"
    );

const navProfile =
    document.getElementById(
        "navProfile"
    );

const navAbout =
    document.getElementById("navAbout");

const navContact =
    document.getElementById(
        "navContact"
    );

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


// ======================================================
// AUTENTICAÇÃO
// ======================================================

const loginBox =
    document.getElementById("loginBox");

const registerBox =
    document.getElementById(
        "registerBox"
    );

const loginMessage =
    document.getElementById(
        "loginMessage"
    );

const registerMessage =
    document.getElementById(
        "registerMessage"
    );

const profileMessage =
    document.getElementById(
        "profileMessage"
    );

const loginForm =
    document.getElementById(
        "loginForm"
    );

const registerForm =
    document.getElementById(
        "registerForm"
    );

const forgotPasswordForm =
    document.getElementById(
        "forgotPasswordForm"
    );

const resetPasswordForm =
    document.getElementById(
        "resetPasswordForm"
    );

const loginButton =
    document.getElementById(
        "loginButton"
    );

const showRegisterButton =
    document.getElementById(
        "showRegisterButton"
    );

const showLoginButton =
    document.getElementById(
        "showLoginButton"
    );

const registerButton =
    document.getElementById(
        "registerButton"
    );

const showForgotPasswordButton =
    document.getElementById(
        "showForgotPasswordButton"
    );

const forgotPasswordBox =
    document.getElementById(
        "forgotPasswordBox"
    );

const forgotPasswordIdentifier =
    document.getElementById(
        "forgotPasswordIdentifier"
    );

const forgotPasswordButton =
    document.getElementById(
        "forgotPasswordButton"
    );

const forgotPasswordMessage =
    document.getElementById(
        "forgotPasswordMessage"
    );

const backToLoginFromForgot =
    document.getElementById(
        "backToLoginFromForgot"
    );

const resetPasswordBox =
    document.getElementById(
        "resetPasswordBox"
    );

const resetPasswordInput =
    document.getElementById(
        "resetPassword"
    );

const resetPasswordConfirmInput =
    document.getElementById(
        "resetPasswordConfirm"
    );

const resetPasswordButton =
    document.getElementById(
        "resetPasswordButton"
    );

const resetPasswordMessage =
    document.getElementById(
        "resetPasswordMessage"
    );

const backToLoginFromReset =
    document.getElementById(
        "backToLoginFromReset"
    );


// ======================================================
// VARIÁVEIS - MATEMÁTICA
// ======================================================

const MATH_OPERATIONS = {

    addition: {
        label: "Soma",
        emoji: "➕",
        symbol: "+"
    },

    subtraction: {
        label: "Subtração",
        emoji: "➖",
        symbol: "-"
    },

    multiplication: {
        label: "Multiplicação",
        emoji: "✖️",
        symbol: "×"
    },

    division: {
        label: "Divisão",
        emoji: "➗",
        symbol: "÷"
    }

};


const MATH_MODES = {

    tranquilo: {
        label: "Tranquilo",
        emoji: "🌱",
        time: 20
    },

    velocidade: {
        label: "Velocidade",
        emoji: "⚡",
        time: 20
    },

    brutal: {
        label: "Brutal",
        emoji: "🔥",
        time: 20
    }

};


let score = 0;

let level = 1;

let currentQuestion = "";

let currentAnswer = 0;

let timer = TEMPO_TOTAL;

let timerInterval = null;

let mathQuestionTime = TEMPO_TOTAL;

let mathGameType = "survival";

let selectedMathOperation = null;

let selectedMathMode = null;

let currentMathRecordValue = 0;

let mathAnswerLocked = false;

let mathQuestionStartedAt =
    0;

let portugueseQuestionStartedAt =
    0;

let feedbackTimeout =
    null;

const isTouchDevice =
    window.matchMedia(
        "(pointer: coarse)"
    ).matches;



// ======================================================
// HISTÓRICO DE NAVEGAÇÃO DO APP
// ======================================================

function saveAppHistory(
    view,
    data = {},
    replace = false
) {

    const state = {
        view,
        ...data
    };

    const url = `#${view}`;

    if (replace) {

        window.history.replaceState(
            state,
            "",
            url
        );

    }

    else {

        window.history.pushState(
            state,
            "",
            url
        );

    }

}


function restoreAppView(state) {

    const view =
        state?.view || "home";

    switch (view) {

        case "math-menu":
            openMathModes(false);
            break;

        case "math-operation":
            openMathModes(false);
            showMathOperationModes(
                state.operation,
                false
            );
            break;

        case "portuguese-menu":
            openPortugueseModes(false);
            break;

        case "learn":
            showLearn(false);
            break;

        case "learn-math":
            showLearnMath(false);
            break;

        case "learn-portuguese":
            showLearnPortuguese(false);
            break;

        case "ranking":
            showRanking(false);
            break;

        case "profile":
            showProfile(false);
            break;

        case "about":
            showAbout(false);
            break;

        case "contact":
            showContact(false);
            break;

        case "math-game":

            if (
                state.gameType === "operation"
            ) {

                startOperationGame(
                    state.operation,
                    state.mode,
                    false
                );

            }

            else {

                startSurvivalGame(false);

            }

            break;

        case "portuguese-game":
            startPortugueseGame(
                Number(state.level) || 1,
                false
            );
            break;

        case "home":
        default:
            showMenu(false);
            break;

    }

}


window.addEventListener(
    "popstate",
    event => {

        restoreAppView(
            event.state
        );

    }
);


// ======================================================
// VARIÁVEIS - PORTUGUÊS
// ======================================================

let portugueseQuestions = [];

let portugueseCurrentQuestion = null;

let portugueseScore = 0;

let portugueseLevel = 1;

let portugueseStartingLevel = 1;

let portugueseTimer = TEMPO_TOTAL;

let portugueseTimerInterval = null;

// Trava enquanto o servidor confirma a resposta.
let portugueseEsperandoResposta = false;

// Resultado devolvido pelo servidor ao encerrar.
let portugueseResultadoServidor = null;


// ======================================================
// JOGO ATUAL
// ======================================================

let currentSubject = null;


// ======================================================
// RECORDES LOCAIS
// ======================================================

let mathRecordValue =
    Number(
        localStorage.getItem(
            "mathRecord"
        )
    ) || 0;


let portugueseRecordValue =
    Number(
        localStorage.getItem(
            "portugueseRecord"
        )
    ) || 0;


function updateRecordsOnScreen() {

    if (mathRecordElement && mathGameType === "survival") {

        mathRecordElement.textContent =
            mathRecordValue;

    }


    if (survivalMenuRecord) {

        survivalMenuRecord.textContent =
            mathRecordValue;

    }


    if (portugueseRecordElement) {

        portugueseRecordElement.textContent =
            portugueseRecordValue;

    }

}


updateRecordsOnScreen();


// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function randomNumber(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


function shuffleArray(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );

}


// ======================================================
// TEMA CLARO / ESCURO
// ======================================================

function aplicarTema(
    tema
) {

    const temaFinal =
        tema === "dark"
            ? "dark"
            : "light";


    if (
        temaFinal === "dark"
    ) {

        document.documentElement
            .setAttribute(
                "data-theme",
                "dark"
            );

    }

    else {

        document.documentElement
            .removeAttribute(
                "data-theme"
            );

    }


    try {

        localStorage.setItem(
            "contaContoTheme",
            temaFinal
        );

    }

    catch (error) {

        console.warn(
            "Não foi possível salvar o tema."
        );

    }


    if (themeToggle) {

        themeToggle.textContent =
            temaFinal === "dark"
                ? "☀️ Claro"
                : "🌙 Escuro";

    }

}


function carregarTemaSalvo() {

    let tema =
        "light";


    try {

        tema =
            localStorage.getItem(
                "contaContoTheme"
            ) || "light";

    }

    catch (error) {

        tema =
            "light";

    }


    aplicarTema(
        tema
    );

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const escuro =
                document
                    .documentElement
                    .getAttribute(
                        "data-theme"
                    ) === "dark";


            aplicarTema(
                escuro
                    ? "light"
                    : "dark"
            );

        }
    );

}


// ======================================================
// FEEDBACK RÁPIDO DURANTE AS PARTIDAS
// ======================================================

function animarElemento(
    elemento,
    classe = "score-pop"
) {

    if (!elemento) {
        return;
    }


    elemento.classList.remove(
        classe
    );

    void elemento.offsetWidth;

    elemento.classList.add(
        classe
    );


    window.setTimeout(
        () => {

            elemento.classList.remove(
                classe
            );

        },
        500
    );

}


function mostrarFeedbackRapido(
    tempoSegundos,
    sequencia,
    elementoPontuacao
) {

    if (!performanceFeedback) {
        return;
    }


    let mensagem =
        "✅ Boa!";


    const marcos = {
        5:
            "🔥 Pegando ritmo!",
        10:
            "💪 10 seguidas!",
        20:
            "🚀 Imparável!",
        30:
            "👑 Sequência incrível!",
        50:
            "🏆 50 seguidas!"
    };


    if (
        marcos[sequencia]
    ) {

        mensagem =
            marcos[sequencia];

    }

    else if (
        tempoSegundos <= 3
    ) {

        mensagem =
            "⚡ Relâmpago!";

    }

    else if (
        tempoSegundos <= 6
    ) {

        mensagem =
            "🚀 Muito rápido!";

    }

    else if (
        tempoSegundos <= 10
    ) {

        mensagem =
            "🎯 Na mosca!";

    }

    else {

        const mensagens = [
            "✨ Mandou bem!",
            "🧠 Boa!",
            "💥 Acertou em cheio!",
            "👏 Perfeito!"
        ];

        mensagem =
            mensagens[
                randomNumber(
                    0,
                    mensagens.length - 1
                )
            ];

    }


    performanceFeedback
        .textContent =
            mensagem;

    performanceFeedback
        .classList
        .remove(
            "feedback-show"
        );

    void performanceFeedback
        .offsetWidth;

    performanceFeedback
        .classList
        .add(
            "feedback-show"
        );


    clearTimeout(
        feedbackTimeout
    );


    feedbackTimeout =
        window.setTimeout(
            () => {

                performanceFeedback
                    .classList
                    .remove(
                        "feedback-show"
                    );

            },
            850
        );


    animarElemento(
        elementoPontuacao
    );

}


// ======================================================
// UTILIDADES DE CONTA
// ======================================================

function getUsuarioSalvo() {

    try {

        const usuario =
            localStorage.getItem(
                "usuario"
            );

        return usuario
            ? JSON.parse(usuario)
            : null;

    }

    catch (error) {

        return null;

    }

}


function atualizarUsuarioSalvo(
    atualizacoes
) {

    const atual =
        getUsuarioSalvo() ||
        {};


    const novoUsuario = {
        ...atual,
        ...atualizacoes
    };


    localStorage.setItem(
        "usuario",
        JSON.stringify(
            novoUsuario
        )
    );


    return novoUsuario;

}


// ======================================================
// AVATARES
// ======================================================

// Deve corresponder a TOTAL_AVATARES no server.js
// e ao CHECK da coluna usuarios.avatar_id.
const TOTAL_AVATARES = 12;

const AVATAR_PADRAO = 1;


function normalizarAvatarId(
    valor
) {

    const numero =
        Number(valor);


    if (
        !Number.isInteger(
            numero
        ) ||
        numero < 1 ||
        numero > TOTAL_AVATARES
    ) {

        return AVATAR_PADRAO;

    }


    return numero;

}


function avatarUrl(
    avatarId,
    tamanho = "sm"
) {

    const id =
        String(
            normalizarAvatarId(
                avatarId
            )
        ).padStart(2, "0");


    return tamanho === "sm"
        ? `avatars/sm/${id}.webp`
        : `avatars/${id}.webp`;

}


function aplicarAvatarNoPerfil(
    avatarId
) {

    if (!profileAvatarImage) {
        return;
    }


    profileAvatarImage.src =
        avatarUrl(
            avatarId,
            "lg"
        );

}


function renderizarGradeAvatares(
    avatarSelecionado
) {

    if (!avatarGrid) {
        return;
    }


    const atual =
        normalizarAvatarId(
            avatarSelecionado
        );


    avatarGrid.replaceChildren();


    for (
        let id = 1;
        id <= TOTAL_AVATARES;
        id++
    ) {

        const botao =
            document.createElement(
                "button"
            );

        botao.type = "button";

        botao.className =
            "avatar-option";

        botao.dataset.avatarId =
            String(id);

        botao.setAttribute(
            "aria-pressed",
            id === atual
                ? "true"
                : "false"
        );

        botao.setAttribute(
            "aria-label",
            `Avatar ${id}`
        );


        const imagem =
            document.createElement(
                "img"
            );

        imagem.src =
            avatarUrl(id, "sm");

        imagem.width = 72;
        imagem.height = 72;
        imagem.alt = "";

        imagem.loading = "lazy";


        botao.appendChild(
            imagem
        );

        avatarGrid.appendChild(
            botao
        );

    }

}


async function salvarAvatar(
    avatarId
) {

    const token =
        localStorage.getItem("token");


    if (!token) {

        definirMensagem(
            editAvatarMessage,
            "Você precisa estar logado.",
            "error"
        );

        return;

    }


    const anterior =
        normalizarAvatarId(
            getUsuarioSalvo()
                ?.avatar_id
        );


    const novo =
        normalizarAvatarId(
            avatarId
        );


    if (novo === anterior) {
        return;
    }


    const botoes =
        avatarGrid
            ? Array.from(
                avatarGrid.children
            )
            : [];


    // Atualiza a interface antes da resposta
    // e desfaz se a requisição falhar.
    botoes.forEach(
        botao => {

            botao.disabled = true;

            botao.setAttribute(
                "aria-pressed",
                Number(
                    botao.dataset.avatarId
                ) === novo
                    ? "true"
                    : "false"
            );

        }
    );

    aplicarAvatarNoPerfil(novo);

    definirMensagem(
        editAvatarMessage,
        "Salvando…"
    );


    try {

        const response =
            await fetch(
                `${API_URL}/api/perfil/avatar`,
                {
                    method:
                        "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body:
                        JSON.stringify({
                            avatarId: novo
                        })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Não foi possível salvar o avatar."
            );

        }


        atualizarUsuarioSalvo({
            avatar_id: novo
        });


        definirMensagem(
            editAvatarMessage,
            "Foto de perfil atualizada!",
            "success"
        );

    }

    catch (error) {

        console.error(
            "Erro ao salvar avatar:",
            error
        );


        aplicarAvatarNoPerfil(
            anterior
        );

        renderizarGradeAvatares(
            anterior
        );


        definirMensagem(
            editAvatarMessage,
            error.message ||
            "Erro ao conectar com o servidor.",
            "error"
        );

        return;

    }

    finally {

        if (avatarGrid) {

            Array.from(
                avatarGrid.children
            ).forEach(
                botao => {
                    botao.disabled = false;
                }
            );

        }

    }

}


function definirMensagem(
    elemento,
    mensagem,
    tipo = ""
) {

    if (!elemento) {
        return;
    }


    elemento.textContent =
        mensagem || "";

    elemento.classList.remove(
        "success",
        "error"
    );


    if (tipo) {

        elemento.classList.add(
            tipo
        );

    }

}


/*
    PARTIDAS

    O placar deixou de ser enviado pronto pelo navegador.
    O servidor cria a partida, guarda como ela foi montada e
    calcula o placar a partir das respostas.

    Matemática: o servidor manda só as expressões. O
    navegador resolve para saber se continua o jogo, e no
    fim manda as respostas para conferência.

    Português: o servidor manda o enunciado sem a classe
    correta, então cada resposta precisa ser confirmada por
    ele — errar encerra a partida na hora e o cliente não
    teria como saber sozinho.
*/

let partidaId = null;
let partidaQuestoes = [];
let partidaRespostas = [];
let partidaEncerrada = false;


function limparPartida() {
    partidaId = null;
    partidaQuestoes = [];
    partidaRespostas = [];
    partidaEncerrada = false;
}


async function pedirAoServidor(caminho, corpo) {

    const token =
        localStorage.getItem("token");

    if (!token) {
        throw new Error("Você precisa estar logado.");
    }

    const resposta =
        await fetch(
            `${API_URL}${caminho}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(corpo || {})
            }
        );

    const dados =
        await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
        throw new Error(
            dados.message ||
            "Não foi possível falar com o servidor."
        );
    }

    return dados;

}


async function criarPartida(corpo) {

    const dados =
        await pedirAoServidor("/api/partidas", corpo);

    partidaId = dados.partidaId;
    partidaQuestoes = dados.questoes || [];
    partidaRespostas = [];
    partidaEncerrada = false;

    return dados;

}


async function encerrarPartidaNoServidor() {

    if (!partidaId || partidaEncerrada) {
        return null;
    }

    partidaEncerrada = true;

    try {

        return await pedirAoServidor(
            `/api/partidas/${partidaId}/encerrar`,
            { respostas: partidaRespostas }
        );

    }

    catch (error) {

        console.error(
            "Erro ao encerrar a partida:",
            error
        );

        return null;

    }

}


/*
    Resolve a expressão que veio do servidor.

    As expressões têm um único tipo de operador e são
    avaliadas da esquerda para a direita, então não é
    preciso tratar precedência — nem usar eval.
*/
function calcularExpressao(expressao) {

    const partes =
        String(expressao)
            .trim()
            .split(/\s+/);

    let total = Number(partes[0]);

    for (let i = 1; i < partes.length; i += 2) {

        const operador = partes[i];
        const valor = Number(partes[i + 1]);

        if (!Number.isFinite(valor)) {
            return NaN;
        }

        if (operador === "+") {
            total += valor;
        }
        else if (operador === "-") {
            total -= valor;
        }
        else if (operador === "×") {
            total *= valor;
        }
        else if (operador === "÷") {
            total /= valor;
        }
        else {
            return NaN;
        }

    }

    return total;

}



async function carregarMeusRecordes() {

    const token =
        localStorage.getItem("token");


    if (!token) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/records/me`,
                {
                    method: "GET",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`

                    }

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Erro ao carregar recordes:",
                data
            );

            return;

        }


        const records =
            data.records || [];


        const mathBrutal =
            records.find(
                record =>
                    record.jogo === "matematica" &&
                    record.modo === "brutal"
            );


        const portugueseBrutal =
            records.find(
                record =>
                    record.jogo === "portugues" &&
                    record.modo === "brutal"
            );


        mathRecordValue =
            mathBrutal
                ? Number(mathBrutal.recorde)
                : 0;


        portugueseRecordValue =
            portugueseBrutal
                ? Number(portugueseBrutal.recorde)
                : 0;


        updateRecordsOnScreen();

    }

    catch (error) {

        console.error(
            "Erro ao conectar com a API:",
            error
        );

    }

}

// ======================================================
// ESCONDER TELAS PRINCIPAIS
// ======================================================

function hideMainSections() {

    if (home) {
        home.classList.add("hidden");
    }

    if (game) {
        game.classList.add("hidden");
    }

    if (portugueseGame) {
        portugueseGame.classList.add(
            "hidden"
        );
    }

    if (rankingSection) {
        rankingSection.classList.add(
            "hidden"
        );
    }

    if (profileSection) {
        profileSection.classList.add(
            "hidden"
        );
    }

    if (learnSection) {
        learnSection.classList.add("hidden");
    }

    if (learnMathSection) {

    learnMathSection.classList.add(
        "hidden"
    );

    }   


    if (learnPortugueseSection) {

    learnPortugueseSection.classList.add(
        "hidden"
    );

    }

    if (aboutSection) {
        aboutSection.classList.add("hidden");
    }

    if (contactSection) {
        contactSection.classList.add(
            "hidden"
        );
    }

    if (gameOver) {
        gameOver.classList.add("hidden");
    }

}


// ======================================================
// MENU PRINCIPAL
// ======================================================

function showMenu(addToHistory = true) {

    clearInterval(timerInterval);

    clearInterval(
        portugueseTimerInterval
    );


    hideMainSections();


    if (mathModes) {
        mathModes.classList.add("hidden");
    }

    resetMathMenuPanels();

    if (survivalMenuRecord) {
        survivalMenuRecord.textContent =
            mathRecordValue;
    }

    if (portugueseModes) {
        portugueseModes.classList.add(
            "hidden"
        );
    }


    if (home) {
        home.classList.remove("hidden");
    }


    currentSubject = null;

    if (addToHistory) {
        saveAppHistory("home");
    }

}


// ======================================================
// MENU MATEMÁTICA
// ======================================================

function resetMathMenuPanels() {

    if (mathOperationSelection) {
        mathOperationSelection.classList.remove(
            "hidden"
        );
    }

    if (mathOperationModes) {
        mathOperationModes.classList.add(
            "hidden"
        );
    }

    selectedMathOperation = null;

}


function openMathModes(addToHistory = true) {

    hideMainSections();

    if (home) {
        home.classList.remove("hidden");
    }

    if (portugueseModes) {
        portugueseModes.classList.add(
            "hidden"
        );
    }

    if (mathModes) {
        mathModes.classList.remove(
            "hidden"
        );
    }

    resetMathMenuPanels();

    if (survivalMenuRecord) {
        survivalMenuRecord.textContent =
            mathRecordValue;
    }

    if (addToHistory) {
        saveAppHistory("math-menu");
    }

}


function showMathOperationModes(
    operationKey,
    addToHistory = true
) {

    const operation =
        MATH_OPERATIONS[
            operationKey
        ];

    if (!operation) {
        return;
    }

    selectedMathOperation =
        operationKey;

    if (mathOperationSelection) {
        mathOperationSelection.classList.add(
            "hidden"
        );
    }

    if (mathOperationModes) {
        mathOperationModes.classList.remove(
            "hidden"
        );
    }

    if (mathSelectedOperationTitle) {
        mathSelectedOperationTitle.textContent =
            `${operation.emoji} ${operation.label}`;
    }

    if (addToHistory) {
        saveAppHistory(
            "math-operation",
            { operation: operationKey }
        );
    }

}


// ======================================================
// MENU PORTUGUÊS
// ======================================================

function openPortugueseModes(addToHistory = true) {

    hideMainSections();


    if (home) {
        home.classList.remove("hidden");
    }


    if (mathModes) {

        mathModes.classList.add(
            "hidden"
        );

    }


    if (portugueseModes) {

        portugueseModes.classList.remove(
            "hidden"
        );

    }

    if (addToHistory) {
        saveAppHistory(
            "portuguese-menu"
        );
    }

}


// ======================================================
// BOTÃO MATEMÁTICA
// ======================================================

if (mathButton) {

    mathButton.addEventListener(
        "click",
        () => {

            if (
                mathModes &&
                !mathModes.classList.contains(
                    "hidden"
                )
            ) {

                mathModes.classList.add(
                    "hidden"
                );

                return;
            }

            openMathModes();

        }
    );

}


// ======================================================
// BOTÃO PORTUGUÊS
// ======================================================

if (portugueseButton) {

    portugueseButton.addEventListener(
        "click",
        () => {

            if (
                portugueseModes &&
                !portugueseModes.classList.contains(
                    "hidden"
                )
            ) {

                portugueseModes.classList.add(
                    "hidden"
                );

                return;
            }

            openPortugueseModes();

        }
    );

}


// ======================================================
// ESCOLHA DA OPERAÇÃO - MATEMÁTICA
// ======================================================

mathOperationButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                showMathOperationModes(
                    button.dataset.operation
                );

            }
        );

    }
);


// ======================================================
// MODOS DAS OPERAÇÕES - MATEMÁTICA
// ======================================================

mathOperationModeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                if (!selectedMathOperation) {
                    return;
                }

                startOperationGame(
                    selectedMathOperation,
                    button.dataset.mode
                );

            }
        );

    }
);


// ======================================================
// SOBREVIVÊNCIA - MATEMÁTICA
// ======================================================

if (survivalButton) {

    survivalButton.addEventListener(
        "click",
        startSurvivalGame
    );

}


// ======================================================
// MODOS PORTUGUÊS
// ======================================================

const portugueseModeButtons =
    document.querySelectorAll(
        ".portuguese-mode"
    );


portugueseModeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const selectedLevel =
                    Number(
                        button.dataset.level
                    );


                startPortugueseGame(
                    selectedLevel
                );

            }
        );

    }
);


// ======================================================
// BOTÕES VOLTAR DOS SUBMENUS
// ======================================================

if (backFromMathMenu) {

    backFromMathMenu.addEventListener(
        "click",
        () => {

            window.history.back();

        }
    );

}


if (backFromMathOperationModes) {

    backFromMathOperationModes.addEventListener(
        "click",
        () => {

            window.history.back();

        }
    );

}


const portugueseMenuBackButton =
    document.querySelector(
        "#portugueseModes #backFromPortuguese"
    );


if (portugueseMenuBackButton) {

    portugueseMenuBackButton.addEventListener(
        "click",
        () => {

            window.history.back();

        }
    );

}


// ======================================================
// MATEMÁTICA - CONFIGURAÇÃO DO JOGO
// ======================================================

function getMathProgressLevel(
    currentScore
) {

    if (currentScore < 5) return 1;
    if (currentScore < 10) return 2;
    if (currentScore < 15) return 3;
    if (currentScore < 20) return 4;
    if (currentScore < 25) return 5;
    if (currentScore < 30) return 6;
    if (currentScore < 40) return 7;
    if (currentScore < 50) return 8;
    if (currentScore < 60) return 9;

    return 10;

}


function getOperationLocalRecordKey() {

    if (
        !selectedMathOperation ||
        !selectedMathMode
    ) {
        return null;
    }

    return `mathRecord_${selectedMathOperation}_${selectedMathMode}`;

}


function loadCurrentMathRecord() {

    if (mathGameType === "survival") {

        currentMathRecordValue =
            mathRecordValue;

        return;

    }

    const key =
        getOperationLocalRecordKey();

    currentMathRecordValue =
        key
            ? Number(
                localStorage.getItem(
                    key
                )
            ) || 0
            : 0;

}


function configureMathInputForDevice() {

    if (!answerInput) {
        return;
    }

    if (isTouchDevice) {

        answerInput.readOnly =
            true;

        answerInput.setAttribute(
            "inputmode",
            "none"
        );

        answerInput.placeholder =
            "Use o teclado abaixo";

    }

    else {

        answerInput.readOnly =
            false;

        answerInput.setAttribute(
            "inputmode",
            "numeric"
        );

        answerInput.placeholder =
            "Digite sua resposta";

    }

}


/*
    Só a Sobrevivência conta para o ranking, então só ela
    precisa da partida no servidor. Os modos por operação
    continuam locais, com recorde no próprio navegador,
    exatamente como antes.
*/
async function startSurvivalGame(addToHistory = true) {

    mathGameType =
        "survival";

    selectedMathOperation =
        null;

    selectedMathMode =
        null;

    mathQuestionTime =
        TEMPO_TOTAL;


    hideMainSections();

    if (game) {
        game.classList.remove("hidden");
    }

    if (mathQuestionElement) {
        mathQuestionElement.textContent =
            "Preparando a partida…";
    }

    const avisoLento =
        setTimeout(
            () => {

                if (mathQuestionElement) {
                    mathQuestionElement.textContent =
                        "Ainda preparando… O servidor estava em repouso e pode levar até um minuto.";
                }

            },
            3000
        );


    try {

        await criarPartida({
            jogo: "matematica",
            modo: "brutal",
            sobrevivencia: true
        });

    }

    catch (error) {

        console.error(error);

        if (mathQuestionElement) {
            mathQuestionElement.textContent =
                error.message ||
                "Não foi possível iniciar a partida.";
        }

        return;

    }

    finally {
        clearTimeout(avisoLento);
    }


    startGame();

    if (addToHistory) {
        saveAppHistory(
            "math-game",
            { gameType: "survival" }
        );
    }

}


function startOperationGame(
    operationKey,
    modeKey,
    addToHistory = true
) {

    if (
        !MATH_OPERATIONS[operationKey] ||
        !MATH_MODES[modeKey]
    ) {
        return;
    }

    mathGameType =
        "operation";

    selectedMathOperation =
        operationKey;

    selectedMathMode =
        modeKey;

    mathQuestionTime =
        MATH_MODES[modeKey].time;

    startGame();

    if (addToHistory) {
        saveAppHistory(
            "math-game",
            {
                gameType: "operation",
                operation: operationKey,
                mode: modeKey
            }
        );
    }

}


// ======================================================
// MATEMÁTICA - INICIAR
// ======================================================

function startGame() {

    currentSubject =
        "math";

    score = 0;

    level = 1;

    mathAnswerLocked =
        false;

    clearInterval(
        timerInterval
    );

    clearInterval(
        portugueseTimerInterval
    );

    loadCurrentMathRecord();

    configureMathInputForDevice();

    hideMainSections();

    if (game) {
        game.classList.remove(
            "hidden"
        );
    }

    updateMathInterface();

    generateMathQuestion();

}


// ======================================================
// MATEMÁTICA - INTERFACE
// ======================================================

function updateMathInterface() {

    level =
        getMathProgressLevel(
            score
        );

    if (scoreElement) {
        scoreElement.textContent =
            score;
    }

    if (levelElement) {
        levelElement.textContent =
            level;
    }

    if (difficultyElement) {
        difficultyElement.textContent =
            level;
    }

    if (mathRecordElement) {
        mathRecordElement.textContent =
            currentMathRecordValue;
    }

    if (mathRecordLabel) {
        mathRecordLabel.textContent =
            mathGameType === "survival"
                ? "Recorde"
                : "Melhor";
    }

    if (
        mathGameType === "survival"
    ) {

        if (mathGameOperationLabel) {
            mathGameOperationLabel.textContent =
                "☠️ Sobrevivência";
        }

        if (mathGameModeLabel) {
            mathGameModeLabel.textContent =
                `${mathQuestionTime}s por conta • 4 operações • vale ranking`;
        }

    }

    else {

        const operation =
            MATH_OPERATIONS[
                selectedMathOperation
            ];

        const mode =
            MATH_MODES[
                selectedMathMode
            ];

        if (
            mathGameOperationLabel &&
            operation
        ) {
            mathGameOperationLabel.textContent =
                `${operation.emoji} ${operation.label}`;
        }

        if (
            mathGameModeLabel &&
            mode
        ) {
            mathGameModeLabel.textContent =
                `${mode.emoji} ${mode.label} • ${mode.time}s por conta • sem ranking`;
        }

    }

}


// ======================================================
// MATEMÁTICA - GERADORES POR OPERAÇÃO
// ======================================================

/*
    Com três termos, a faixa de valores recua alguns
    níveis.

    Sem isso, a soma e a subtração descolavam das outras
    operações: no nível 10 dava para receber
    "29498 - 9804 - 9728" enquanto uma multiplicação no
    mesmo nível era "75 × 15".

    A ideia é que a versão de três termos custe o mesmo que
    a de dois no mesmo nível: mais parcelas, números
    menores.

    A subtração recua um nível a mais porque o minuendo é
    montado como resultado + b + c, o que sempre lhe dá um
    dígito a mais que as parcelas.

    Precisa acompanhar server/jogos/matematica.js, que gera
    as questões do modo Sobrevivência.
*/
const THREE_TERM_ADDITION_STEP_DOWN = 3;
const THREE_TERM_SUBTRACTION_STEP_DOWN = 4;


function rangeForTerms(
    ranges,
    difficulty,
    stepDown
) {

    const level =
        Math.min(difficulty, 10);

    return ranges[
        Math.max(1, level - stepDown) - 1
    ];

}


function shouldUseThreeTerms(
    currentScore
) {

    if (currentScore >= 50) {
        return Math.random() < 0.70;
    }

    if (currentScore >= 30) {
        return Math.random() < 0.35;
    }

    return false;

}


function getAdditionQuestion(
    difficulty,
    currentScore = 0
) {

    const ranges = [
        [1, 10],
        [5, 20],
        [10, 50],
        [20, 100],
        [50, 200],
        [100, 500],
        [200, 1000],
        [500, 2000],
        [1000, 5000],
        [1500, 9999]
    ];

    const threeTerms =
        shouldUseThreeTerms(
            currentScore
        );

    const [min, max] =
        rangeForTerms(
            ranges,
            difficulty,
            threeTerms
                ? THREE_TERM_ADDITION_STEP_DOWN
                : 0
        );

    const a =
        randomNumber(
            min,
            max
        );

    const b =
        randomNumber(
            min,
            max
        );

    if (threeTerms) {

        const c =
            randomNumber(
                min,
                max
            );

        return {
            expression:
                `${a} + ${b} + ${c}`,
            answer:
                a + b + c
        };

    }

    return {
        expression:
            `${a} + ${b}`,
        answer:
            a + b
    };

}


function getSubtractionQuestion(
    difficulty,
    currentScore = 0
) {

    const ranges = [
        [1, 10],
        [5, 20],
        [10, 50],
        [20, 100],
        [50, 200],
        [100, 500],
        [200, 1000],
        [500, 2000],
        [1000, 5000],
        [1500, 9999]
    ];

    const threeTerms =
        shouldUseThreeTerms(
            currentScore
        );

    const [min, max] =
        rangeForTerms(
            ranges,
            difficulty,
            threeTerms
                ? THREE_TERM_SUBTRACTION_STEP_DOWN
                : 0
        );

    if (threeTerms) {

        const b =
            randomNumber(
                min,
                max
            );

        const c =
            randomNumber(
                min,
                max
            );

        const result =
            randomNumber(
                min,
                max
            );

        const a =
            result + b + c;

        return {
            expression:
                `${a} - ${b} - ${c}`,
            answer:
                result
        };

    }

    let a =
        randomNumber(
            min,
            max
        );

    let b =
        randomNumber(
            min,
            max
        );

    if (a < b) {
        [a, b] = [b, a];
    }

    return {
        expression:
            `${a} - ${b}`,
        answer:
            a - b
    };

}


function getMultiplicationQuestion(
    difficulty
) {

    const ranges = [
        [[2, 5], [2, 5]],
        [[2, 10], [2, 10]],
        [[4, 12], [2, 10]],
        [[6, 15], [3, 12]],
        [[8, 20], [4, 15]],
        [[10, 25], [5, 20]],
        [[12, 30], [6, 20]],
        [[15, 35], [8, 25]],
        [[20, 50], [10, 30]],
        [[25, 75], [10, 40]]
    ];

    const [rangeA, rangeB] =
        ranges[
            Math.min(
                difficulty,
                10
            ) - 1
        ];

    const a =
        randomNumber(
            rangeA[0],
            rangeA[1]
        );

    const b =
        randomNumber(
            rangeB[0],
            rangeB[1]
        );

    return {
        expression:
            `${a} × ${b}`,
        answer:
            a * b
    };

}


function getDivisionQuestion(
    difficulty
) {

    const ranges = [
        [[2, 5], [2, 5]],
        [[2, 10], [2, 8]],
        [[2, 10], [3, 12]],
        [[2, 12], [4, 15]],
        [[3, 12], [5, 20]],
        [[4, 15], [6, 25]],
        [[5, 18], [8, 30]],
        [[6, 20], [10, 40]],
        [[8, 25], [12, 50]],
        [[10, 30], [15, 70]]
    ];

    const [divisorRange, resultRange] =
        ranges[
            Math.min(
                difficulty,
                10
            ) - 1
        ];

    const divisor =
        randomNumber(
            divisorRange[0],
            divisorRange[1]
        );

    const result =
        randomNumber(
            resultRange[0],
            resultRange[1]
        );

    const dividend =
        divisor * result;

    return {
        expression:
            `${dividend} ÷ ${divisor}`,
        answer:
            result
    };

}


function generateQuestionForOperation(
    operationKey,
    difficulty,
    currentScore = 0
) {

    switch (operationKey) {

        case "addition":
            return getAdditionQuestion(
                difficulty,
                currentScore
            );

        case "subtraction":
            return getSubtractionQuestion(
                difficulty,
                currentScore
            );

        case "multiplication":
            return getMultiplicationQuestion(
                difficulty
            );

        case "division":
            return getDivisionQuestion(
                difficulty
            );

        default:
            return getAdditionQuestion(
                difficulty,
                currentScore
            );

    }

}


// ======================================================
// MATEMÁTICA - GERAR QUESTÃO
// ======================================================

function generateMathQuestion() {

    clearInterval(
        timerInterval
    );

    mathAnswerLocked =
        false;

    level =
        getMathProgressLevel(
            score
        );

    let question;

    if (
        mathGameType ===
        "survival"
    ) {

        /*
            A questão vem do servidor, sem a resposta. O
            navegador resolve a expressão só para saber se
            continua o jogo; quem decide o placar é o
            servidor, no encerramento.
        */
        const doServidor =
            partidaQuestoes[score];

        if (!doServidor) {

            endMathGame("wrong");

            return;

        }

        question = {
            expression: doServidor.expressao,
            answer: calcularExpressao(doServidor.expressao)
        };

        level = doServidor.nivel || level;

    }

    else {

        question =
            generateQuestionForOperation(
                selectedMathOperation,
                level,
                score
            );

    }

    currentAnswer =
        question.answer;

    currentQuestion =
        question.expression;

    if (mathQuestionElement) {
        mathQuestionElement.textContent =
            currentQuestion;
    }

    if (answerInput) {

        answerInput.value =
            "";

        if (!isTouchDevice) {
            answerInput.focus();
        }

    }

    updateMathInterface();

    mathQuestionStartedAt =
    performance.now();

    startMathTimer();

}


// ======================================================
// MATEMÁTICA - TIMER
// ======================================================

function startMathTimer() {

    clearInterval(
        timerInterval
    );

    timer =
        mathQuestionTime;

    updateMathTimer();

    timerInterval =
        setInterval(
            () => {

                timer--;

                updateMathTimer();

                if (timer <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    endMathGame(
                        "timeout"
                    );

                }

            },
            1000
        );

}


// ======================================================
// MATEMÁTICA - ATUALIZAR TIMER
// ======================================================

function updateMathTimer() {

    if (timerElement) {
        timerElement.textContent =
            timer;
    }

    if (timerBar) {

        const percentage =
            (
                timer /
                mathQuestionTime
            ) * 100;

        timerBar.style.width =
            `${Math.max(0, percentage)}%`;

    }

}


// ======================================================
// MATEMÁTICA - RESPONDER
// ======================================================

function checkMathAnswer() {

    if (
        !answerInput ||
        mathAnswerLocked
    ) {
        return;
    }

    if (
        answerInput.value.trim() === ""
    ) {
        return;
    }

    mathAnswerLocked =
        true;

    const userAnswer =
        Number(
            answerInput.value
        );


    if (
        mathGameType ===
        "survival"
    ) {

        partidaRespostas.push({
            resposta: userAnswer
        });

    }


    if (
        userAnswer ===
        currentAnswer
    ) {

        clearInterval(
            timerInterval
        );

        const tempoResposta =
            (
                performance.now() -
                mathQuestionStartedAt
            ) / 1000;

        score++;

        updateMathInterface();

        mostrarFeedbackRapido(
            tempoResposta,
            score,
        scoreElement
        );

        generateMathQuestion();

    }

    else {

        endMathGame(
            "wrong"
        );

    }

}


// ======================================================
// ENTER - MATEMÁTICA
// ======================================================

if (answerInput) {

    answerInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {
                checkMathAnswer();
            }

        }
    );

}


// ======================================================
// BOTÃO RESPONDER - MATEMÁTICA
// ======================================================

if (submitButton) {

    submitButton.addEventListener(
        "click",
        checkMathAnswer
    );

}


numericKeys.forEach(
    key => {

        key.addEventListener(
            "click",
            () => {

                if (!answerInput) {
                    return;
                }

                answerInput.value +=
                    key.dataset.value;

                if (!isTouchDevice) {
                    answerInput.focus();
                }

            }
        );

    }
);


if (numericDelete) {

    numericDelete.addEventListener(
        "click",
        () => {

            if (!answerInput) {
                return;
            }

            answerInput.value =
                answerInput.value.slice(
                    0,
                    -1
                );

            if (!isTouchDevice) {
                answerInput.focus();
            }

        }
    );

}


if (numericConfirm) {

    numericConfirm.addEventListener(
        "click",
        checkMathAnswer
    );

}


// ======================================================
// VOLTAR DO JOGO MATEMÁTICA
// ======================================================

if (mathGameBackButton) {

    mathGameBackButton.addEventListener(
        "click",
        () => {

            clearInterval(
                timerInterval
            );

            window.history.back();

        }
    );

}


// ======================================================
// GAME OVER - MATEMÁTICA
// ======================================================

function endMathGame(reason) {

    clearInterval(
        timerInterval
    );

    mathAnswerLocked =
        true;

    const novoRecorde =
        score >
        currentMathRecordValue;

    if (
        novoRecorde
    ) {

        currentMathRecordValue =
            score;

        if (
            mathGameType ===
            "survival"
        ) {

            mathRecordValue =
                score;

            localStorage.setItem(
                "mathRecord",
                mathRecordValue
            );

        }

        else {

            const key =
                getOperationLocalRecordKey();

            if (key) {
                localStorage.setItem(
                    key,
                    currentMathRecordValue
                );
            }

        }

    }

    /*
        Na Sobrevivência o recorde é gravado pelo servidor,
        a partir das respostas enviadas. O placar exibido
        aqui é apenas o do navegador.
    */
    if (
        mathGameType ===
        "survival"
    ) {

        encerrarPartidaNoServidor()
            .then(resultado => {

                if (!resultado) {
                    return;
                }

                if (
                    Number(resultado.recorde) >
                    Number(mathRecordValue)
                ) {

                    mathRecordValue =
                        Number(resultado.recorde);

                    localStorage.setItem(
                        "mathRecord",
                        mathRecordValue
                    );

                }

                updateRecordsOnScreen();
                carregarMeusRecordes();

            });

    }

    updateRecordsOnScreen();

    if (gameOverMessage) {

        if (reason === "timeout") {
            gameOverMessage.textContent =
                "⏰ Tempo esgotado!";
        }

        else {
            gameOverMessage.textContent =
                "❌ Resposta incorreta!";
        }

    }

    if (failedQuestion) {
        failedQuestion.textContent =
            currentQuestion;
    }

    if (failedWordContainer) {
        failedWordContainer.style.display =
            "none";
    }

    if (correctAnswerElement) {
        correctAnswerElement.textContent =
            currentAnswer;
    }

    if (answerExplanation) {
        answerExplanation.textContent =
            `A resposta correta é ${currentAnswer}.`;
    }

    if (finalScoreElement) {
        finalScoreElement.textContent =
            score;
    }

    if (finalRecordElement) {
        finalRecordElement.textContent =
            currentMathRecordValue;
    }

    if (newRecordBanner) {

        newRecordBanner.classList.toggle(
            "hidden",
            !novoRecorde
        );

        if (novoRecorde) {

            newRecordBanner.textContent =
                "🏆 Novo recorde!";

        }

    }

    const labels =
        gameOver
            ? gameOver.querySelectorAll(
                ".review-label"
            )
            : [];

    if (labels.length >= 4) {

        labels[0].textContent =
            "Questão";

        labels[2].textContent =
            "Resposta correta";

        labels[3].textContent =
            "💡 Explicação";

    }

    hideMainSections();

    if (gameOver) {
        gameOver.classList.remove(
            "hidden"
        );
    }

}


// ======================================================
// PORTUGUÊS - CARREGAR QUESTÕES
// ======================================================





// ======================================================
// PORTUGUÊS - INICIAR
// ======================================================

async function startPortugueseGame(
    selectedLevel,
    addToHistory = true
) {

    currentSubject =
        "portuguese";


    portugueseScore =
        0;


    portugueseStartingLevel =
        selectedLevel;


    portugueseLevel =
        selectedLevel;


    if (portugueseGameModeLabel) {

        const modos = {
            1:
                "🌱 Tranquilo",
            2:
                "⚡ Velocidade",
            3:
                "🔥 Brutal • vale ranking"
        };

        portugueseGameModeLabel
            .textContent =
                modos[selectedLevel] ||
                "📖 Português";

    }


    clearInterval(timerInterval);

    clearInterval(
        portugueseTimerInterval
    );


    hideMainSections();


    if (portugueseGame) {

        portugueseGame.classList.remove(
            "hidden"
        );

    }


    /*
        As questões vêm do servidor, sem a classe correta —
        era isso que permitia ler o gabarito na aba Network.

        O backend está num plano gratuito que hiberna após
        alguns minutos parado, então a espera precisa ser
        explicada em vez de parecer travamento.
    */
    if (portugueseOptionsElement) {
        portugueseOptionsElement.replaceChildren();
    }

    if (portugueseQuestionElement) {
        portugueseQuestionElement.textContent =
            "Preparando a partida…";
    }


    const avisoLento =
        setTimeout(
            () => {

                if (portugueseQuestionElement) {

                    portugueseQuestionElement.textContent =
                        "Ainda preparando… O servidor estava em repouso e pode levar até um minuto para responder.";

                }

            },
            3000
        );


    try {

        await criarPartida({
            jogo: "portugues",
            modo: MODOS_PORTUGUES[selectedLevel] || "tranquilo"
        });

        portugueseQuestions = partidaQuestoes;

    }

    catch (error) {

        console.error(error);

        if (portugueseQuestionElement) {

            portugueseQuestionElement.textContent =
                error.message ||
                "Não foi possível iniciar a partida.";

        }

        return;

    }

    finally {
        clearTimeout(avisoLento);
    }


    if (portugueseQuestions.length === 0) {

        if (portugueseQuestionElement) {

            portugueseQuestionElement.textContent =
                "Não há questões disponíveis no momento.";

        }

        return;

    }


    updatePortugueseInterface();

    generatePortugueseQuestion();

    if (addToHistory) {
        saveAppHistory(
            "portuguese-game",
            { level: selectedLevel }
        );
    }

}


// ======================================================
// PORTUGUÊS - INTERFACE
// ======================================================

function updatePortugueseInterface() {

    if (portugueseScoreElement) {

        portugueseScoreElement.textContent =
            portugueseScore;

    }


    if (portugueseLevelElement) {

        portugueseLevelElement.textContent =
            portugueseLevel;

    }


    if (portugueseDifficultyElement) {

        portugueseDifficultyElement.textContent =
            portugueseLevel;

    }


    if (portugueseRecordElement) {

        portugueseRecordElement.textContent =
            portugueseRecordValue;

    }

}


// ======================================================
// PORTUGUÊS - GERAR QUESTÃO
// ======================================================

/*
    O modo também define o nível inicial no servidor.
*/
const MODOS_PORTUGUES = {
    1: "tranquilo",
    2: "velocidade",
    3: "brutal"
};


function generatePortugueseQuestion() {

    clearInterval(
        portugueseTimerInterval
    );


    /*
        A ordem das questões foi sorteada pelo servidor, e
        ele confere se ela está sendo respeitada. Por isso a
        questão da vez é sempre a da posição do placar —
        não há mais sorteio no navegador.

        O nível continua servindo só para exibição: quem
        escolheu as questões de cada faixa foi o servidor.
    */
    if (portugueseLevel > 8) {
        portugueseLevel = 8;
    }


    const questao =
        portugueseQuestions[portugueseScore];


    if (!questao) {

        endPortugueseGame("wrong");

        return;

    }


    portugueseCurrentQuestion = questao;

    if (questao.nivel) {
        portugueseLevel = Number(questao.nivel);
    }


    portugueseQuestionStartedAt =
        performance.now();


    showPortugueseQuestion();

    updatePortugueseInterface();

    startPortugueseTimer();

}


// ======================================================
// PORTUGUÊS - MOSTRAR QUESTÃO
// ======================================================

/*
    Localiza a palavra analisada na frase como palavra
    inteira.

    Uma busca por substring destacaria o "o" dentro de
    "comprou" ou o "a" dentro de "aluno" — o que atinge
    justamente artigos, preposições e conjunções.

    \b do JavaScript é ASCII, então trataria "é" ou "ã"
    como limite de palavra. Por isso a verificação das
    bordas é feita com \p{L}, que reconhece acentuação.

    Devolve o índice inicial ou -1.
*/
function encontrarPalavraInteira(
    frase,
    palavra
) {

    if (!palavra) {
        return -1;
    }


    const alvo =
        palavra.toLowerCase();

    const texto =
        frase.toLowerCase();

    const ehLetra =
        caractere =>
            caractere !== undefined &&
            /[\p{L}\p{N}]/u.test(
                caractere
            );


    let posicao =
        texto.indexOf(alvo);


    while (posicao !== -1) {

        const anterior =
            texto[posicao - 1];

        const seguinte =
            texto[posicao + alvo.length];


        if (
            !ehLetra(anterior) &&
            !ehLetra(seguinte)
        ) {

            return posicao;

        }


        posicao =
            texto.indexOf(
                alvo,
                posicao + 1
            );

    }


    /*
        Nenhuma ocorrência isolada: pode ser uma expressão
        com hífen ou uma flexão. Cai na busca simples para
        ao menos destacar alguma coisa.
    */
    return texto.indexOf(alvo);

}


function showPortugueseQuestion() {

    if (
        !portugueseCurrentQuestion
    ) {

        return;

    }


    const question =
        portugueseCurrentQuestion;


    if (portugueseQuestionElement) {

        const frase =
            String(
                question.frase
            );

        const palavra =
            String(
                question.palavra
            );


        const inicio =
            encontrarPalavraInteira(
                frase,
                palavra
            );


        portugueseQuestionElement
            .replaceChildren();


        if (
            inicio === -1 ||
            !palavra
        ) {

            portugueseQuestionElement
                .textContent = frase;

        }

        else {

            const destaque =
                document.createElement(
                    "span"
                );

            destaque.className =
                "highlight";

            destaque.textContent =
                frase.slice(
                    inicio,
                    inicio + palavra.length
                );


            portugueseQuestionElement
                .append(
                    frase.slice(0, inicio),
                    destaque,
                    frase.slice(
                        inicio + palavra.length
                    )
                );

        }

    }


    if (portugueseOptionsElement) {

        portugueseOptionsElement
            .replaceChildren();


        const options =
            shuffleArray(
                question.alternativas
            );


        options.forEach(
            option => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.classList.add(
                    "option-button"
                );


                button.textContent =
                    option;


                button.addEventListener(
                    "click",
                    () => {

                        checkPortugueseAnswer(
                            option
                        );

                    }
                );


                portugueseOptionsElement.appendChild(
                    button
                );

            }
        );

    }

}


// ======================================================
// PORTUGUÊS - TIMER
// ======================================================

function startPortugueseTimer() {

    clearInterval(
        portugueseTimerInterval
    );


    portugueseTimer =
        TEMPO_TOTAL;


    updatePortugueseTimer();


    portugueseTimerInterval =
        setInterval(
            () => {

                portugueseTimer--;

                updatePortugueseTimer();


                if (
                    portugueseTimer <= 0
                ) {

                    clearInterval(
                        portugueseTimerInterval
                    );


                    endPortugueseGame(
                        "timeout"
                    );

                }

            },
            1000
        );

}


// ======================================================
// PORTUGUÊS - ATUALIZAR TIMER
// ======================================================

function updatePortugueseTimer() {

    if (portugueseTimerElement) {

        portugueseTimerElement.textContent =
            portugueseTimer;

    }


    if (portugueseTimerBar) {

        const percentage =
            (
                portugueseTimer /
                TEMPO_TOTAL
            ) * 100;


        portugueseTimerBar.style.width =
            `${percentage}%`;

    }

}


// ======================================================
// PORTUGUÊS - RESPONDER
// ======================================================

/*
    Quem diz se a resposta está certa é o servidor.

    O navegador não recebe mais a classe correta, então não
    teria como saber — e é justamente essa ignorância que
    impede forjar um placar.

    Enquanto a resposta não chega, os botões ficam
    desabilitados para não haver clique duplo.
*/
async function checkPortugueseAnswer(
    selectedAnswer
) {

    if (
        !portugueseCurrentQuestion ||
        portugueseEsperandoResposta
    ) {

        return;

    }


    clearInterval(
        portugueseTimerInterval
    );


    portugueseEsperandoResposta = true;

    if (portugueseOptionsElement) {

        for (const botao of portugueseOptionsElement.children) {
            botao.disabled = true;
        }

    }


    let veredito;

    try {

        veredito =
            await pedirAoServidor(
                `/api/partidas/${partidaId}/responder`,
                {
                    questaoId:
                        portugueseCurrentQuestion.id,

                    resposta:
                        selectedAnswer
                }
            );

    }

    catch (error) {

        console.error(
            "Erro ao enviar a resposta:",
            error
        );

        /*
            Sem confirmação do servidor não dá para seguir
            jogando: encerra pelo placar já confirmado.
        */
        portugueseEsperandoResposta = false;

        endPortugueseGame("erro");

        return;

    }


    portugueseEsperandoResposta = false;


    if (!veredito.correto) {

        /*
            A explicação só chega agora, junto do veredito —
            antes ela vinha com o enunciado e entregava a
            resposta.
        */
        portugueseCurrentQuestion = {
            ...portugueseCurrentQuestion,
            classe: veredito.revisao?.classe,
            explicacao: veredito.revisao?.explicacao
        };

        portugueseResultadoServidor = veredito;

        endPortugueseGame("wrong");

        return;

    }


    const tempoResposta =
        (
            performance.now() -
            portugueseQuestionStartedAt
        ) / 1000;

    // O placar do servidor manda; o local é só exibição.
    portugueseScore =
        Number(veredito.acertos) ||
        portugueseScore + 1;

    mostrarFeedbackRapido(
        tempoResposta,
        portugueseScore,
        portugueseScoreElement
    );

    if (
        portugueseScore % 10 === 0 &&
        portugueseLevel < 8
    ) {

        portugueseLevel++;

    }

    updatePortugueseInterface();

    generatePortugueseQuestion();

}


// ======================================================
// VOLTAR DO JOGO PORTUGUÊS
// ======================================================

const portugueseGameBackButton =
    document.querySelector(
        "#portugueseGame #backFromPortuguese"
    );


if (portugueseGameBackButton) {

    portugueseGameBackButton.addEventListener(
        "click",
        () => {

            clearInterval(
                portugueseTimerInterval
            );

            window.history.back();

        }
    );

}


// ======================================================
// GAME OVER - PORTUGUÊS
// ======================================================

function endPortugueseGame(reason) {

    clearInterval(
        portugueseTimerInterval
    );


    const novoRecorde =
        portugueseScore >
        portugueseRecordValue;


    if (
        novoRecorde
    ) {

        portugueseRecordValue =
            portugueseScore;


        localStorage.setItem(
            "portugueseRecord",
            portugueseRecordValue
        );

    }

    /*
        O recorde é gravado pelo servidor, que corrigiu cada
        resposta. Se a partida terminou por erro, o
        resultado já veio junto do veredito; se terminou por
        tempo ou desistência, encerra agora.
    */
    const aplicarResultado = resultado => {

        if (!resultado) {
            return;
        }

        if (
            Number(resultado.recorde) >
            Number(portugueseRecordValue)
        ) {

            portugueseRecordValue =
                Number(resultado.recorde);

            localStorage.setItem(
                "portugueseRecord",
                portugueseRecordValue
            );

        }

        updateRecordsOnScreen();
        carregarMeusRecordes();

    };


    if (portugueseResultadoServidor) {

        partidaEncerrada = true;

        aplicarResultado(
            portugueseResultadoServidor
        );

        portugueseResultadoServidor = null;

    }

    else {

        encerrarPartidaNoServidor()
            .then(aplicarResultado);

    }

    updateRecordsOnScreen();


    if (gameOverMessage) {

        if (
            reason ===
            "timeout"
        ) {

            gameOverMessage.textContent =
                "⏰ Tempo esgotado!";

        }

        else {

            gameOverMessage.textContent =
                "❌ Resposta incorreta!";

        }

    }


    if (
        portugueseCurrentQuestion
    ) {

        if (failedQuestion) {

            failedQuestion.textContent =
                portugueseCurrentQuestion.frase;

        }


        if (failedWordContainer) {

            failedWordContainer.style.display =
                "block";

        }


        if (failedWord) {

            failedWord.textContent =
                portugueseCurrentQuestion.palavra;

        }


        if (correctAnswerElement) {

            correctAnswerElement.textContent =
                portugueseCurrentQuestion.classe;

        }


        if (answerExplanation) {

            answerExplanation.textContent =
                portugueseCurrentQuestion.explicacao;

        }

    }


    if (finalScoreElement) {

        finalScoreElement.textContent =
            portugueseScore;

    }


    if (finalRecordElement) {

        finalRecordElement.textContent =
            portugueseRecordValue;

    }


    if (newRecordBanner) {

        newRecordBanner.classList.toggle(
            "hidden",
            !novoRecorde
        );

        if (novoRecorde) {

            newRecordBanner.textContent =
                "🏆 Novo recorde!";

        }

    }


    const labels =
        gameOver ?
            gameOver.querySelectorAll(
                ".review-label"
            ) :
            [];


    if (
        labels.length >= 4
    ) {

        labels[0].textContent =
            "Frase";

        labels[1].textContent =
            "Palavra analisada";

        labels[2].textContent =
            "Classe correta";

        labels[3].textContent =
            "💡 Explicação";

    }


    hideMainSections();


    if (gameOver) {

        gameOver.classList.remove(
            "hidden"
        );

    }

}


// ======================================================
// JOGAR NOVAMENTE
// ======================================================

if (restartButton) {

    restartButton.addEventListener(
        "click",
        () => {

            if (
                currentSubject ===
                "math"
            ) {

                if (
                    mathGameType ===
                    "survival"
                ) {

                    startSurvivalGame(
                        false
                    );

                }

                else {

                    startOperationGame(
                        selectedMathOperation,
                        selectedMathMode,
                        false
                    );

                }

            }

            else if (
                currentSubject ===
                "portuguese"
            ) {

                startPortugueseGame(
                    portugueseStartingLevel,
                    false
                );

            }

        }
    );

}


// ======================================================
// VOLTAR AO MENU
// ======================================================

if (menuButton) {

    menuButton.addEventListener(
        "click",
        showMenu
    );

}


// ======================================================
// MENU SUPERIOR - INÍCIO
// ======================================================

if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const aberto =
                mainNav.classList.toggle(
                    "nav-open"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                aberto
                    ? "true"
                    : "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                aberto
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        }
    );

}

if (mainNav) {

    mainNav.querySelectorAll(
        "a, button"
    ).forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "nav-open"
                    );


                    menuToggle
                        ?.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                    menuToggle
                        ?.setAttribute(
                            "aria-label",
                            "Abrir menu"
                        );

                }
            );

        }
    );

}

if (navHome) {

    navHome.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showMenu();

        }
    );

}


// ======================================================
// MENU SUPERIOR - MATEMÁTICA
// ======================================================

if (navMath) {

    navMath.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openMathModes();

        }
    );

}


// ======================================================
// MENU SUPERIOR - PORTUGUÊS
// ======================================================

if (navPortuguese) {

    navPortuguese.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openPortugueseModes();

        }
    );

}


if (navLearn) {

    navLearn.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showLearn();

        }
    );

}

if (learnMathButton) {

    learnMathButton.addEventListener(
        "click",
        () => {

            showLearnMath();

        }
    );

}


if (learnPortugueseButton) {

    learnPortugueseButton.addEventListener(
        "click",
        () => {

            showLearnPortuguese();

        }
    );

}


if (backFromLearnMath) {

    backFromLearnMath.addEventListener(
        "click",
        () => {

            window.history.back();

        }
    );

}


if (backFromLearnPortuguese) {

    backFromLearnPortuguese.addEventListener(
        "click",
        () => {

            window.history.back();

        }
    );

}

// ======================================================
// RANKING
// ======================================================

async function carregarRanking(jogo) {

    if (!rankingList) {
        return;
    }


    rankingList.textContent =
        "Carregando ranking...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/ranking/${jogo}`
            );

        const data =
            await response.json();


        if (!response.ok) {

            rankingList.textContent =
                data.message ||
                "Não foi possível carregar o ranking.";

            return;

        }


        if (
            !data.ranking ||
            data.ranking.length === 0
        ) {

            rankingList.textContent =
                "Ainda não há jogadores no ranking.";

            return;

        }


        rankingList.replaceChildren();


        const usuarioAtual =
            getUsuarioSalvo();


        const meuResultado =
            usuarioAtual
                ? data.ranking.find(
                    player =>
                        Number(
                            player.usuario_id
                        ) ===
                        Number(
                            usuarioAtual.id
                        )
                )
                : null;


        if (meuResultado) {

            const resumo =
                document.createElement(
                    "div"
                );

            resumo.classList.add(
                "ranking-you-summary"
            );


            const label =
                document.createElement(
                    "span"
                );

            label.textContent =
                "Sua posição";


            const valor =
                document.createElement(
                    "strong"
                );

            valor.textContent =
                `${meuResultado.posicao}º • ${meuResultado.recorde} acertos`;


            resumo.append(
                label,
                valor
            );

            rankingList.appendChild(
                resumo
            );

        }


        data.ranking.forEach(
            (player, index) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.classList.add(
                    "ranking-item"
                );


                if (index === 0) {

                    item.classList.add(
                        "ranking-first"
                    );

                }

                else if (index === 1) {

                    item.classList.add(
                        "ranking-second"
                    );

                }

                else if (index === 2) {

                    item.classList.add(
                        "ranking-third"
                    );

                }


                if (
                    usuarioAtual &&
                    Number(
                        player.usuario_id
                    ) ===
                    Number(
                        usuarioAtual.id
                    )
                ) {

                    item.classList.add(
                        "ranking-me"
                    );

                }


                let position =
                    `${player.posicao || index + 1}º`;


                if (index === 0) {
                    position = "🥇";
                }

                else if (index === 1) {
                    position = "🥈";
                }

                else if (index === 2) {
                    position = "🥉";
                }


                const positionElement =
                    document.createElement(
                        "span"
                    );

                positionElement
                    .className =
                        "ranking-position";

                positionElement
                    .textContent =
                        position;


                const avatarElement =
                    document.createElement(
                        "img"
                    );

                avatarElement
                    .className =
                        "ranking-avatar";

                avatarElement.src =
                    avatarUrl(
                        player.avatar_id,
                        "sm"
                    );

                avatarElement.width = 44;
                avatarElement.height = 44;
                avatarElement.alt = "";

                avatarElement.loading =
                    "lazy";


                const playerElement =
                    document.createElement(
                        "div"
                    );

                playerElement
                    .className =
                        "ranking-player";


                const name =
                    document.createElement(
                        "strong"
                    );

                name.className =
                    "ranking-name";

                name.textContent =
                    player.username;


                if (
                    item.classList.contains(
                        "ranking-me"
                    )
                ) {

                    const voce =
                        document.createElement(
                            "span"
                        );

                    voce.className =
                        "ranking-you-badge";

                    voce.textContent =
                        "Você";

                    name.append(
                        " ",
                        voce
                    );

                }


                const mode =
                    document.createElement(
                        "small"
                    );

                mode.textContent =
                    jogo === "matematica"
                        ? "Sobrevivência"
                        : "Modo Brutal";


                playerElement.append(
                    name,
                    mode
                );


                const score =
                    document.createElement(
                        "span"
                    );

                score.className =
                    "ranking-score";

                score.append(
                    document.createTextNode(
                        `${player.recorde} `
                    )
                );


                const scoreLabel =
                    document.createElement(
                        "small"
                    );

                scoreLabel.textContent =
                    "acertos";

                score.append(
                    scoreLabel
                );


                item.append(
                    positionElement,
                    avatarElement,
                    playerElement,
                    score
                );


                rankingList.appendChild(
                    item
                );

            }
        );

    }

    catch (error) {

        console.error(
            "Erro ao carregar ranking:",
            error
        );


        rankingList.textContent =
            "Erro ao conectar com o servidor.";

    }

}

function showLearn(addToHistory = true) {

    hideMainSections();


    if (learnSection) {

        learnSection.classList.remove(
            "hidden"
        );

    }

    if (addToHistory) {
        saveAppHistory("learn");
    }

}

function showLearnMath(addToHistory = true) {

    hideMainSections();


    if (learnMathSection) {

        learnMathSection.classList.remove(
            "hidden"
        );

    }

    if (addToHistory) {
        saveAppHistory(
            "learn-math"
        );
    }

}


function showLearnPortuguese(addToHistory = true) {

    hideMainSections();


    if (learnPortugueseSection) {

        learnPortugueseSection.classList.remove(
            "hidden"
        );

    }

    if (addToHistory) {
        saveAppHistory(
            "learn-portuguese"
        );
    }

}

function showContact(addToHistory = true) {

    hideMainSections();


    if (contactSection) {

        contactSection.classList.remove(
            "hidden"
        );

    }


    const usuario =
        getUsuarioSalvo();


    if (
        contactNameInput &&
        usuario?.username &&
        !contactNameInput.value
    ) {

        contactNameInput.value =
            usuario.username;

    }


    if (
        contactEmailInput &&
        usuario?.email &&
        !contactEmailInput.value
    ) {

        contactEmailInput.value =
            usuario.email;

    }


    if (addToHistory) {

        saveAppHistory(
            "contact"
        );

    }

}


function showAbout(addToHistory = true) {

    hideMainSections();


    if (aboutSection) {

        aboutSection.classList.remove(
            "hidden"
        );

    }

    if (addToHistory) {
        saveAppHistory("about");
    }

}


function showRanking(addToHistory = true) {

    hideMainSections();


    if (rankingSection) {

        rankingSection.classList.remove(
            "hidden"
        );

    }


    if (rankingTitle) {

        rankingTitle.textContent =
            "🧮 Matemática • ☠️ Sobrevivência";

    }


    carregarRanking(
        "matematica"
    );

    if (addToHistory) {
        saveAppHistory("ranking");
    }

}


if (navRanking) {

    navRanking.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showRanking();

        }
    );

}


if (mathRankingButton) {

    mathRankingButton.addEventListener(
        "click",
        () => {

            if (rankingTitle) {

                rankingTitle.textContent =
                    "🧮 Matemática • ☠️ Sobrevivência";

            }


            carregarRanking(
                "matematica"
            );

        }
    );

}


if (portugueseRankingButton) {

    portugueseRankingButton.addEventListener(
        "click",
        () => {

            if (rankingTitle) {

                rankingTitle.textContent =
                    "📖 Português • 🔥 Brutal";

            }


            carregarRanking(
                "portugues"
            );

        }
    );

}


// ======================================================
// PERFIL
// ======================================================

async function showProfile(addToHistory = true) {

    hideMainSections();


    if (profileSection) {

        profileSection.classList.remove(
            "hidden"
        );

    }


    if (addToHistory) {

        saveAppHistory(
            "profile"
        );

    }


    if (editUsernamePanel) {
        editUsernamePanel.classList.add(
            "hidden"
        );
    }

    if (editEmailPanel) {
        editEmailPanel.classList.add(
            "hidden"
        );
    }

    if (editAvatarPanel) {
        editAvatarPanel.classList.add(
            "hidden"
        );
    }


    /*
        Pinta o avatar salvo antes da chamada à API.
        Sem isso o perfil mostra o avatar padrão até
        a resposta chegar — que no plano gratuito do
        Render pode demorar dezenas de segundos.
    */
    const avatarSalvo =
        normalizarAvatarId(
            getUsuarioSalvo()
                ?.avatar_id
        );

    aplicarAvatarNoPerfil(
        avatarSalvo
    );

    renderizarGradeAvatares(
        avatarSalvo
    );


    const token =
        localStorage.getItem(
            "token"
        );


    if (!token) {

        definirMensagem(
            profileMessage,
            "Você precisa estar logado.",
            "error"
        );

        return;

    }


    try {

        const headers = {
            "Authorization":
                `Bearer ${token}`
        };


        const [
            response,
            recordsResponse,
            rankingsResponse
        ] = await Promise.all([
            fetch(
                `${API_URL}/api/perfil`,
                {
                    method:
                        "GET",
                    headers
                }
            ),

            fetch(
                `${API_URL}/api/records/me`,
                {
                    method:
                        "GET",
                    headers
                }
            ),

            fetch(
                `${API_URL}/api/perfil/rankings`,
                {
                    method:
                        "GET",
                    headers
                }
            )
        ]);


        const data =
            await response.json();


        if (!response.ok) {

            definirMensagem(
                profileMessage,
                data.message ||
                "Erro ao carregar perfil.",
                "error"
            );

            return;

        }


        const usuario =
            data.usuario;


        const avatarAtual =
            normalizarAvatarId(
                usuario.avatar_id
            );


        atualizarUsuarioSalvo({
            id:
                usuario.id,

            username:
                usuario.username,

            email:
                usuario.email ||
                null,

            avatar_id:
                avatarAtual
        });


        aplicarAvatarNoPerfil(
            avatarAtual
        );


        renderizarGradeAvatares(
            avatarAtual
        );


        if (profileUsername) {

            profileUsername.textContent =
                usuario.username ||
                "—";

        }


        if (profileUsernameHeading) {

            profileUsernameHeading
                .textContent =
                    usuario.username ||
                    "Jogador";

        }


        if (profileEmail) {

            profileEmail.textContent =
                usuario.email ||
                "Não cadastrado";

        }


        if (editEmailButton) {

            editEmailButton.textContent =
                usuario.email
                    ? "✉️ Alterar e-mail"
                    : "✉️ Adicionar e-mail";

        }


        if (profileId) {

            profileId.textContent =
                usuario.id ||
                "—";

        }


        if (profileDate) {

            if (
                usuario.data_cadastro
            ) {

                const dataCadastro =
                    new Date(
                        usuario.data_cadastro
                    );


                profileDate.textContent =
                    dataCadastro
                        .toLocaleDateString(
                            "pt-BR"
                        );

            }

            else {

                profileDate.textContent =
                    "—";

            }

        }


        if (
            recordsResponse.ok
        ) {

            const recordsData =
                await recordsResponse
                    .json();

            const records =
                recordsData.records ||
                [];


            const mathBrutal =
                records.find(
                    record =>
                        record.jogo ===
                            "matematica" &&
                        record.modo ===
                            "brutal"
                );


            const portugueseBrutal =
                records.find(
                    record =>
                        record.jogo ===
                            "portugues" &&
                        record.modo ===
                            "brutal"
                );


            if (profileMathRecord) {

                profileMathRecord
                    .textContent =
                        mathBrutal
                            ? mathBrutal
                                .recorde
                            : 0;

            }


            if (
                profilePortugueseRecord
            ) {

                profilePortugueseRecord
                    .textContent =
                        portugueseBrutal
                            ? portugueseBrutal
                                .recorde
                            : 0;

            }

        }


        if (
            rankingsResponse.ok
        ) {

            const rankings =
                await rankingsResponse
                    .json();


            if (profileMathPosition) {

                profileMathPosition
                    .textContent =
                        rankings
                            .matematica
                            ?.posicao
                            ? `${rankings.matematica.posicao}º`
                            : "Sem posição";

            }


            if (
                profilePortuguesePosition
            ) {

                profilePortuguesePosition
                    .textContent =
                        rankings
                            .portugues
                            ?.posicao
                            ? `${rankings.portugues.posicao}º`
                            : "Sem posição";

            }

        }

    }

    catch (error) {

        console.error(
            "Erro ao carregar perfil:",
            error
        );


        definirMensagem(
            profileMessage,
            "Não foi possível conectar com o servidor.",
            "error"
        );

    }

}


// ======================================================
// TROCAR FOTO DE PERFIL
// ======================================================

if (editAvatarButton) {

    editAvatarButton
        .addEventListener(
            "click",
            () => {

                editUsernamePanel
                    ?.classList
                    .add("hidden");

                editEmailPanel
                    ?.classList
                    .add("hidden");

                editAvatarPanel
                    ?.classList
                    .toggle("hidden");

                definirMensagem(
                    editAvatarMessage,
                    ""
                );

            }
        );

}


if (avatarGrid) {

    avatarGrid
        .addEventListener(
            "click",
            event => {

                const botao =
                    event.target
                        .closest(
                            ".avatar-option"
                        );


                if (
                    !botao ||
                    botao.disabled
                ) {
                    return;
                }


                salvarAvatar(
                    botao.dataset
                        .avatarId
                );

            }
        );

}


// ======================================================
// EDITAR NOME DO USUÁRIO
// ======================================================

if (editUsernameButton) {

    editUsernameButton
        .addEventListener(
            "click",
            () => {

                editEmailPanel
                    ?.classList
                    .add("hidden");

                editAvatarPanel
                    ?.classList
                    .add("hidden");

                editUsernamePanel
                    ?.classList
                    .toggle("hidden");

                definirMensagem(
                    editUsernameMessage,
                    ""
                );

                if (newUsernameInput) {

                    newUsernameInput.value =
                        getUsuarioSalvo()
                            ?.username ||
                        "";

                }

            }
        );

}


if (cancelUsernameButton) {

    cancelUsernameButton
        .addEventListener(
            "click",
            () => {

                editUsernamePanel
                    ?.classList
                    .add("hidden");

            }
        );

}


if (saveUsernameButton) {

    saveUsernameButton
        .addEventListener(
            "click",
            async () => {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const novoUsername =
                    newUsernameInput
                        ?.value
                        .trim() ||
                    "";

                const confirmacao =
                    usernameConfirmationInput
                        ?.value
                        .trim() ||
                    "";

                const senha =
                    usernameCurrentPasswordInput
                        ?.value ||
                    "";


                if (
                    !novoUsername ||
                    !confirmacao ||
                    !senha
                ) {

                    definirMensagem(
                        editUsernameMessage,
                        "Preencha todos os campos.",
                        "error"
                    );

                    return;

                }


                try {

                    saveUsernameButton
                        .disabled =
                            true;


                    const response =
                        await fetch(
                            `${API_URL}/api/perfil/username`,
                            {
                                method:
                                    "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Authorization":
                                        `Bearer ${token}`
                                },

                                body:
                                    JSON.stringify({
                                        novoUsername,
                                        confirmacao,
                                        senha
                                    })
                            }
                        );


                    const data =
                        await response
                            .json();


                    if (!response.ok) {

                        definirMensagem(
                            editUsernameMessage,
                            data.message ||
                            "Não foi possível alterar o nome.",
                            "error"
                        );

                        return;

                    }


                    if (data.token) {

                        localStorage
                            .setItem(
                                "token",
                                data.token
                            );

                    }


                    const usuario =
                        atualizarUsuarioSalvo(
                            data.usuario ||
                            {
                                username:
                                    novoUsername
                            }
                        );


                    const welcomeUsername =
                        document
                            .getElementById(
                                "welcomeUsername"
                            );


                    if (welcomeUsername) {

                        welcomeUsername
                            .textContent =
                                usuario
                                    .username;

                    }


                    if (profileUsername) {

                        profileUsername
                            .textContent =
                                usuario
                                    .username;

                    }


                    if (
                        profileUsernameHeading
                    ) {

                        profileUsernameHeading
                            .textContent =
                                usuario
                                    .username;

                    }


                    definirMensagem(
                        editUsernameMessage,
                        "Nome atualizado com sucesso!",
                        "success"
                    );


                    if (
                        usernameConfirmationInput
                    ) {

                        usernameConfirmationInput
                            .value =
                                "";

                    }


                    if (
                        usernameCurrentPasswordInput
                    ) {

                        usernameCurrentPasswordInput
                            .value =
                                "";

                    }

                }

                catch (error) {

                    console.error(error);

                    definirMensagem(
                        editUsernameMessage,
                        "Não foi possível conectar com o servidor.",
                        "error"
                    );

                }

                finally {

                    saveUsernameButton
                        .disabled =
                            false;

                }

            }
        );

}


// ======================================================
// EDITAR E-MAIL
// ======================================================

if (editEmailButton) {

    editEmailButton
        .addEventListener(
            "click",
            () => {

                editUsernamePanel
                    ?.classList
                    .add("hidden");

                editAvatarPanel
                    ?.classList
                    .add("hidden");

                editEmailPanel
                    ?.classList
                    .toggle("hidden");

                definirMensagem(
                    editEmailMessage,
                    ""
                );


                if (newEmailInput) {

                    newEmailInput.value =
                        getUsuarioSalvo()
                            ?.email ||
                        "";

                }

            }
        );

}


if (cancelEmailButton) {

    cancelEmailButton
        .addEventListener(
            "click",
            () => {

                editEmailPanel
                    ?.classList
                    .add("hidden");

            }
        );

}


if (saveEmailButton) {

    saveEmailButton
        .addEventListener(
            "click",
            async () => {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const email =
                    newEmailInput
                        ?.value
                        .trim() ||
                    "";

                const senha =
                    emailCurrentPasswordInput
                        ?.value ||
                    "";


                if (
                    !email ||
                    !senha
                ) {

                    definirMensagem(
                        editEmailMessage,
                        "Informe o e-mail e sua senha atual.",
                        "error"
                    );

                    return;

                }


                try {

                    saveEmailButton
                        .disabled =
                            true;


                    const response =
                        await fetch(
                            `${API_URL}/api/perfil/email`,
                            {
                                method:
                                    "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Authorization":
                                        `Bearer ${token}`
                                },

                                body:
                                    JSON.stringify({
                                        email,
                                        senha
                                    })
                            }
                        );


                    const data =
                        await response
                            .json();


                    if (!response.ok) {

                        definirMensagem(
                            editEmailMessage,
                            data.message ||
                            "Não foi possível atualizar o e-mail.",
                            "error"
                        );

                        return;

                    }


                    atualizarUsuarioSalvo({
                        email:
                            data.email
                    });


                    if (profileEmail) {

                        profileEmail
                            .textContent =
                                data.email;

                    }


                    if (editEmailButton) {

                        editEmailButton
                            .textContent =
                                "✉️ Alterar e-mail";

                    }


                    if (contactEmailInput) {

                        contactEmailInput
                            .value =
                                data.email;

                    }


                    if (
                        emailCurrentPasswordInput
                    ) {

                        emailCurrentPasswordInput
                            .value =
                                "";

                    }


                    definirMensagem(
                        editEmailMessage,
                        "E-mail atualizado com sucesso!",
                        "success"
                    );

                }

                catch (error) {

                    console.error(error);

                    definirMensagem(
                        editEmailMessage,
                        "Não foi possível conectar com o servidor.",
                        "error"
                    );

                }

                finally {

                    saveEmailButton
                        .disabled =
                            false;

                }

            }
        );

}


if (navProfile) {

    navProfile.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showProfile();

        }
    );

}

if (navContact) {

    navContact.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showContact();

        }
    );

}


if (navAbout) {

    navAbout.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showAbout();

        }
    );

}



// ======================================================
// FORMULÁRIO FALE CONOSCO
// ======================================================

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const token =
                localStorage.getItem(
                    "token"
                );


            const nome =
                contactNameInput
                    ?.value
                    .trim() ||
                "";

            const email =
                contactEmailInput
                    ?.value
                    .trim() ||
                "";

            const assunto =
                contactSubjectInput
                    ?.value
                    .trim() ||
                "";

            const mensagem =
                contactMessageInput
                    ?.value
                    .trim() ||
                "";


            if (
                !nome ||
                !email ||
                !assunto ||
                !mensagem
            ) {

                definirMensagem(
                    contactFormMessage,
                    "Preencha todos os campos.",
                    "error"
                );

                return;

            }


            const submitButton =
                document.getElementById(
                    "contactSubmitButton"
                );


            try {

                if (submitButton) {
                    submitButton.disabled =
                        true;
                }


                definirMensagem(
                    contactFormMessage,
                    "Enviando..."
                );


                const response =
                    await fetch(
                        `${API_URL}/api/contato`,
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`
                            },

                            body:
                                JSON.stringify({
                                    nome,
                                    email,
                                    assunto,
                                    mensagem
                                })
                        }
                    );


                const data =
                    await response
                        .json();


                if (!response.ok) {

                    definirMensagem(
                        contactFormMessage,
                        data.message ||
                        "Não foi possível enviar a mensagem.",
                        "error"
                    );

                    return;

                }


                definirMensagem(
                    contactFormMessage,
                    "Mensagem enviada! Obrigado pelo contato.",
                    "success"
                );


                if (contactSubjectInput) {
                    contactSubjectInput.value =
                        "";
                }

                if (contactMessageInput) {
                    contactMessageInput.value =
                        "";
                }

            }

            catch (error) {

                console.error(error);

                definirMensagem(
                    contactFormMessage,
                    "Não foi possível conectar com o servidor.",
                    "error"
                );

            }

            finally {

                if (submitButton) {
                    submitButton.disabled =
                        false;
                }

            }

        }
    );

}



// ======================================================
// TELAS DE AUTENTICAÇÃO E RECUPERAÇÃO
// ======================================================

function mostrarAuthBox(
    alvo
) {

    [
        loginBox,
        registerBox,
        forgotPasswordBox,
        resetPasswordBox
    ].forEach(
        box => {

            if (box) {
                box.classList.add(
                    "hidden"
                );
            }

        }
    );


    if (alvo) {

        alvo.classList.remove(
            "hidden"
        );

    }

}


function obterResetToken() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get(
        "resetToken"
    );

}


if (showForgotPasswordButton) {

    showForgotPasswordButton
        .addEventListener(
            "click",
            () => {

                mostrarAuthBox(
                    forgotPasswordBox
                );

                definirMensagem(
                    forgotPasswordMessage,
                    ""
                );

            }
        );

}


if (backToLoginFromForgot) {

    backToLoginFromForgot
        .addEventListener(
            "click",
            () => {

                mostrarAuthBox(
                    loginBox
                );

            }
        );

}


if (backToLoginFromReset) {

    backToLoginFromReset
        .addEventListener(
            "click",
            () => {

                window.history
                    .replaceState(
                        {},
                        "",
                        window.location.pathname
                    );

                mostrarAuthBox(
                    loginBox
                );

            }
        );

}


if (forgotPasswordForm) {

    forgotPasswordForm
        .addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const identificador =
                    forgotPasswordIdentifier
                        ?.value
                        .trim() ||
                    "";


                if (!identificador) {

                    definirMensagem(
                        forgotPasswordMessage,
                        "Informe seu usuário ou e-mail.",
                        "error"
                    );

                    return;

                }


                try {

                    forgotPasswordButton
                        .disabled =
                            true;


                    definirMensagem(
                        forgotPasswordMessage,
                        "Enviando..."
                    );


                    const response =
                        await fetch(
                            `${API_URL}/api/senha/esqueci`,
                            {
                                method:
                                    "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        identificador
                                    })
                            }
                        );


                    const data =
                        await response
                            .json();


                    definirMensagem(
                        forgotPasswordMessage,
                        data.message ||
                        "Solicitação processada.",
                        response.ok
                            ? "success"
                            : "error"
                    );

                }

                catch (error) {

                    console.error(error);

                    definirMensagem(
                        forgotPasswordMessage,
                        "Não foi possível conectar com o servidor.",
                        "error"
                    );

                }

                finally {

                    forgotPasswordButton
                        .disabled =
                            false;

                }

            }
        );

}


if (resetPasswordForm) {

    resetPasswordForm
        .addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const token =
                    obterResetToken();

                const novaSenha =
                    resetPasswordInput
                        ?.value ||
                    "";

                const confirmacao =
                    resetPasswordConfirmInput
                        ?.value ||
                    "";


                if (!token) {

                    definirMensagem(
                        resetPasswordMessage,
                        "Link de recuperação inválido.",
                        "error"
                    );

                    return;

                }


                if (
                    novaSenha.length < 6
                ) {

                    definirMensagem(
                        resetPasswordMessage,
                        "A senha deve ter pelo menos 6 caracteres.",
                        "error"
                    );

                    return;

                }


                if (
                    novaSenha !==
                    confirmacao
                ) {

                    definirMensagem(
                        resetPasswordMessage,
                        "As senhas não são iguais.",
                        "error"
                    );

                    return;

                }


                try {

                    resetPasswordButton
                        .disabled =
                            true;


                    const response =
                        await fetch(
                            `${API_URL}/api/senha/redefinir`,
                            {
                                method:
                                    "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        token,
                                        novaSenha
                                    })
                            }
                        );


                    const data =
                        await response
                            .json();


                    if (!response.ok) {

                        definirMensagem(
                            resetPasswordMessage,
                            data.message ||
                            "Não foi possível alterar a senha.",
                            "error"
                        );

                        return;

                    }


                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "usuario"
                    );


                    definirMensagem(
                        resetPasswordMessage,
                        data.message ||
                        "Senha atualizada com sucesso!",
                        "success"
                    );


                    window.setTimeout(
                        () => {

                            window.history
                                .replaceState(
                                    {},
                                    "",
                                    window.location.pathname
                                );

                            mostrarAuthBox(
                                loginBox
                            );

                        },
                        1200
                    );

                }

                catch (error) {

                    console.error(error);

                    definirMensagem(
                        resetPasswordMessage,
                        "Não foi possível conectar com o servidor.",
                        "error"
                    );

                }

                finally {

                    resetPasswordButton
                        .disabled =
                            false;

                }

            }
        );

}


// ======================================================
// LOGIN
// ======================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const usernameInput =
                document.getElementById(
                    "loginUsername"
                );


            const passwordInput =
                document.getElementById(
                    "loginPassword"
                );


            const username =
                usernameInput ?
                    usernameInput.value.trim() :
                    "";


            const senha =
                passwordInput ?
                    passwordInput.value :
                    "";


            if (
                !username ||
                !senha
            ) {

                definirMensagem(
                    loginMessage,
                    "Preencha usuário/e-mail e senha.",
                    "error"
                );

                return;

            }


            try {

                /*
                    Com o Enter enviando o formulário,
                    apertar duas vezes rápido dispararia
                    duas requisições e poderia esbarrar no
                    limite de tentativas.
                */
                if (loginButton) {
                    loginButton.disabled = true;
                }


                const response =
                    await fetch(
                        `${API_URL}/api/login`,
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    username,
                                    senha
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    definirMensagem(
                        loginMessage,
                        data.message ||
                        "Erro ao fazer login.",
                        "error"
                    );

                    return;

                }


                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "usuario",
                    JSON.stringify(
                        data.usuario
                    )
                );


                mostrarMenuPrincipal();

            }

            catch (error) {

                console.error(error);


                definirMensagem(
                    loginMessage,
                    "Não foi possível conectar com o servidor.",
                    "error"
                );

            }

            finally {

                if (loginButton) {
                    loginButton.disabled = false;
                }

            }

        }
    );

}


// ======================================================
// MOSTRAR APLICAÇÃO APÓS LOGIN
// ======================================================

function mostrarMenuPrincipal() {

    if (authScreen) {

        authScreen.classList.add(
            "hidden"
        );

    }


    if (app) {

        app.classList.remove(
            "hidden"
        );

    }


    const usuarioSalvo =
        localStorage.getItem(
            "usuario"
        );


    if (usuarioSalvo) {

        try {

            const usuario =
                JSON.parse(
                    usuarioSalvo
                );


            const welcomeUsername =
                document.getElementById(
                    "welcomeUsername"
                );


            if (
                welcomeUsername
            ) {

                welcomeUsername.textContent =
                    usuario.username;

            }

        }

        catch (error) {

            console.error(error);

        }

    }

    const usuarioAtual =
        getUsuarioSalvo();


    if (
        contactNameInput &&
        usuarioAtual?.username
    ) {

        contactNameInput.value =
            usuarioAtual.username;

    }


    if (
        contactEmailInput &&
        usuarioAtual?.email
    ) {

        contactEmailInput.value =
            usuarioAtual.email;

    }


    carregarMeusRecordes();

    showMenu(false);

    saveAppHistory(
        "home",
        {},
        true
    );

}


// ======================================================
// ABRIR CADASTRO
// ======================================================

if (showRegisterButton) {

    showRegisterButton.addEventListener(
        "click",
        () => {

            if (loginBox) {

                loginBox.classList.add(
                    "hidden"
                );

            }


            if (registerBox) {

                registerBox.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


// ======================================================
// VOLTAR PARA LOGIN
// ======================================================

if (showLoginButton) {

    showLoginButton.addEventListener(
        "click",
        () => {

            if (registerBox) {

                registerBox.classList.add(
                    "hidden"
                );

            }


            if (loginBox) {

                loginBox.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


// ======================================================
// CADASTRO
// ======================================================

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const usernameInput =
                document.getElementById(
                    "registerUsername"
                );


            const emailInput =
                document.getElementById(
                    "registerEmail"
                );


            const passwordInput =
                document.getElementById(
                    "registerPassword"
                );


            const confirmInput =
                document.getElementById(
                    "registerPasswordConfirm"
                );


            const username =
                usernameInput ?
                    usernameInput.value.trim() :
                    "";


            const email =
                emailInput ?
                    emailInput.value.trim() :
                    "";


            const senha =
                passwordInput ?
                    passwordInput.value :
                    "";


            const confirmacao =
                confirmInput ?
                    confirmInput.value :
                    "";


            if (
                !username ||
                !senha ||
                !confirmacao
            ) {

                definirMensagem(
                    registerMessage,
                    "Preencha todos os campos.",
                    "error"
                );

                return;

            }


            if (
                senha !==
                confirmacao
            ) {

                definirMensagem(
                    registerMessage,
                    "As senhas não são iguais.",
                    "error"
                );

                return;

            }


            if (
                senha.length < 6
            ) {

                definirMensagem(
                    registerMessage,
                    "A senha deve ter pelo menos 6 caracteres.",
                    "error"
                );

                return;

            }


            try {

                /*
                    IMPORTANTE:

                    Seu servidor anterior possuía
                    POST /api/usuarios para cadastro.

                    Por isso usamos /api/usuarios aqui.
                */

                if (registerButton) {
                    registerButton.disabled = true;
                }

                const response =
                    await fetch(
                        `${API_URL}/api/usuarios`,
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    username,
                                    email,
                                    senha
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    definirMensagem(
                        registerMessage,
                        data.message ||
                        "Erro ao criar conta.",
                        "error"
                    );

                    return;

                }


                definirMensagem(
                    registerMessage,
                    "Conta criada com sucesso!",
                    "success"
                );


                if (usernameInput) {
                    usernameInput.value = "";
                }

                if (emailInput) {
                    emailInput.value = "";
                }

                if (passwordInput) {
                    passwordInput.value = "";
                }

                if (confirmInput) {
                    confirmInput.value = "";
                }


                if (registerBox) {

                    registerBox.classList.add(
                        "hidden"
                    );

                }


                if (loginBox) {

                    loginBox.classList.remove(
                        "hidden"
                    );

                }

            }

            catch (error) {

                console.error(error);


                definirMensagem(
                    registerMessage,
                    "Não foi possível conectar com o servidor.",
                    "error"
                );

            }

            finally {

                if (registerButton) {
                    registerButton.disabled = false;
                }

            }

        }
    );

}


// ======================================================
// SAIR
// ======================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        event => {

            event.preventDefault();


            clearInterval(timerInterval);

            clearInterval(
                portugueseTimerInterval
            );


            limparPartida();


            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "usuario"
            );


            if (app) {

                app.classList.add(
                    "hidden"
                );

            }


            if (authScreen) {

                authScreen.classList.remove(
                    "hidden"
                );

            }


            if (registerBox) {

                registerBox.classList.add(
                    "hidden"
                );

            }


            mostrarAuthBox(
                loginBox
            );

        }
    );

}


// ======================================================
// MANTER LOGIN AO ATUALIZAR A PÁGINA
// ======================================================

function verificarLoginSalvo() {

    const resetToken =
        obterResetToken();


    if (resetToken) {

        if (app) {

            app.classList.add(
                "hidden"
            );

        }


        if (authScreen) {

            authScreen.classList.remove(
                "hidden"
            );

        }


        mostrarAuthBox(
            resetPasswordBox
        );

        return;

    }


    const token =
        localStorage.getItem(
            "token"
        );


    const usuario =
        localStorage.getItem(
            "usuario"
        );


    if (
        token &&
        usuario
    ) {

        mostrarMenuPrincipal();

    }

    else {

        if (app) {

            app.classList.add(
                "hidden"
            );

        }


        if (authScreen) {

            authScreen.classList.remove(
                "hidden"
            );

        }


        mostrarAuthBox(
            loginBox
        );

    }

}


// ======================================================
// INICIALIZAÇÃO
// ======================================================

carregarTemaSalvo();

verificarLoginSalvo();


// ======================================================
// FIM
// ======================================================