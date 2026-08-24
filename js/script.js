// ======================================================
// CONTA & CONTO
// SCRIPT PRINCIPAL
// ======================================================


// ======================================================
// CONFIGURAÇÕES
// ======================================================

const TEMPO_TOTAL = 20;

const API_URL =
    "https://conta-e-conto-api.onrender.com";


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

const numericKeyboard =
    document.getElementById(
        "numericKeyboard"
    );

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

let currentOperation = "";

let timer = TEMPO_TOTAL;

let timerInterval = null;

let mathQuestionTime = TEMPO_TOTAL;

let mathGameType = "survival";

let selectedMathOperation = null;

let selectedMathMode = null;

let currentMathRecordValue = 0;

let mathAnswerLocked = false;

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

let portugueseUsedQuestionIds = [];


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

async function salvarRecordeAPI(jogo, recorde) {

    const token =
        localStorage.getItem("token");


    if (!token) {

        console.warn(
            "Usuário não autenticado."
        );

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/records`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body:
                        JSON.stringify({
                            jogo: jogo,
                            modo: "brutal",
                            recorde: recorde
                        })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Erro ao salvar recorde:",
                data
            );

            return;

        }


        console.log(
            "Recorde salvo na API:",
            data
        );

        await carregarMeusRecordes();

    }

    catch (error) {

        console.error(
            "Erro ao conectar com a API:",
            error
        );

    }

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


function startSurvivalGame(addToHistory = true) {

    mathGameType =
        "survival";

    selectedMathOperation =
        null;

    selectedMathMode =
        null;

    mathQuestionTime =
        TEMPO_TOTAL;

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

function getAdditionQuestion(
    difficulty
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

    const [min, max] =
        ranges[
            Math.min(
                difficulty,
                10
            ) - 1
        ];

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

    return {
        a,
        b,
        symbol: "+",
        answer: a + b
    };

}


function getSubtractionQuestion(
    difficulty
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

    const [min, max] =
        ranges[
            Math.min(
                difficulty,
                10
            ) - 1
        ];

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
        a,
        b,
        symbol: "-",
        answer: a - b
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
        a,
        b,
        symbol: "×",
        answer: a * b
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
        a: dividend,
        b: divisor,
        symbol: "÷",
        answer: result
    };

}


function generateQuestionForOperation(
    operationKey,
    difficulty
) {

    switch (operationKey) {

        case "addition":
            return getAdditionQuestion(
                difficulty
            );

        case "subtraction":
            return getSubtractionQuestion(
                difficulty
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
                difficulty
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

    let operationKey =
        selectedMathOperation;

    if (
        mathGameType ===
        "survival"
    ) {

        const availableOperations = [
            "addition",
            "subtraction",
            "multiplication",
            "division"
        ];

        operationKey =
            availableOperations[
                randomNumber(
                    0,
                    availableOperations.length - 1
                )
            ];

    }

    const question =
        generateQuestionForOperation(
            operationKey,
            level
        );

    currentAnswer =
        question.answer;

    currentOperation =
        operationKey;

    currentQuestion =
        `${question.a} ${question.symbol} ${question.b}`;

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
        userAnswer ===
        currentAnswer
    ) {

        clearInterval(
            timerInterval
        );

        score++;

        updateMathInterface();

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

    if (
        score >
        currentMathRecordValue
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

    // O banco continua usando "brutal" internamente
    // para preservar todos os recordes já existentes.
    if (
        mathGameType ===
        "survival"
    ) {

        salvarRecordeAPI(
            "matematica",
            score
        );

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

async function loadPortugueseQuestions() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/questoes/portugues`
            );


        if (!response.ok) {

            throw new Error(
                "Não foi possível carregar as questões de Português."
            );

        }


        const data =
            await response.json();


        portugueseQuestions =
            data.questoes || [];


        console.log(
            "Questões de Português carregadas do banco:",
            portugueseQuestions.length
        );

    }

    catch (error) {

        console.error(
            "Erro ao carregar Português:",
            error
        );

    }

}


// ======================================================
// PORTUGUÊS - INICIAR
// ======================================================

function startPortugueseGame(
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


    portugueseUsedQuestionIds =
        [];


    clearInterval(timerInterval);

    clearInterval(
        portugueseTimerInterval
    );


    if (
        portugueseQuestions.length === 0
    ) {

        alert(
            "As questões de Português ainda estão carregando."
        );

        return;

    }


    hideMainSections();


    if (portugueseGame) {

        portugueseGame.classList.remove(
            "hidden"
        );

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

function generatePortugueseQuestion() {

    clearInterval(
        portugueseTimerInterval
    );


    if (
        portugueseLevel > 8
    ) {

        portugueseLevel = 8;

    }


    let levelQuestions =
        portugueseQuestions.filter(
            question =>
                Number(
                    question.nivel
                ) ===
                portugueseLevel
        );


    if (
        levelQuestions.length === 0
    ) {

        levelQuestions =
            portugueseQuestions;

    }


    let availableQuestions =
        levelQuestions.filter(
            question =>
                !portugueseUsedQuestionIds.includes(
                    question.id
                )
        );


    if (
        availableQuestions.length === 0
    ) {

        portugueseUsedQuestionIds =
            [];


        availableQuestions =
            levelQuestions;

    }


    const index =
        randomNumber(
            0,
            availableQuestions.length - 1
        );


    portugueseCurrentQuestion =
        availableQuestions[index];


    portugueseUsedQuestionIds.push(
        portugueseCurrentQuestion.id
    );


    updatePortugueseInterface();

    showPortugueseQuestion();

    startPortugueseTimer();

}


// ======================================================
// PORTUGUÊS - MOSTRAR QUESTÃO
// ======================================================

function showPortugueseQuestion() {

    if (
        !portugueseCurrentQuestion
    ) {

        return;

    }


    const question =
        portugueseCurrentQuestion;


    if (portugueseQuestionElement) {

        const escapedWord =
            String(
                question.palavra
            ).replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );


        const regex =
            new RegExp(
                `(${escapedWord})`,
                "i"
            );


        const highlighted =
            String(
                question.frase
            ).replace(
                regex,
                `<span class="highlight">$1</span>`
            );


        portugueseQuestionElement.innerHTML =
            highlighted;

    }


    if (portugueseOptionsElement) {

        portugueseOptionsElement.innerHTML =
            "";


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

function checkPortugueseAnswer(
    selectedAnswer
) {

    if (
        !portugueseCurrentQuestion
    ) {

        return;

    }


    clearInterval(
        portugueseTimerInterval
    );


    if (
        selectedAnswer ===
        portugueseCurrentQuestion.classe
    ) {

        portugueseScore++;


        if (
            portugueseScore %
            10 === 0 &&
            portugueseLevel < 8
        ) {

            portugueseLevel++;

            portugueseUsedQuestionIds =
                [];

        }


        updatePortugueseInterface();

        generatePortugueseQuestion();

    }

    else {

        endPortugueseGame(
            "wrong"
        );

    }

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


    if (
        portugueseScore >
        portugueseRecordValue
    ) {

        portugueseRecordValue =
            portugueseScore;


        localStorage.setItem(
            "portugueseRecord",
            portugueseRecordValue
        );

    }

    // ======================================================
    // ENVIAR RECORDE COMPETITIVO PARA A API
    // ======================================================

    if (
        portugueseStartingLevel === 3
    ) {

        salvarRecordeAPI(
        "portugues",
        portugueseScore
        );

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

            mainNav.classList.toggle(
                "nav-open"
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


    rankingList.innerHTML =
        "Carregando ranking...";


    try {

        const response =
            await fetch(
                `${API_URL}/api/ranking/${jogo}`
            );


        const data =
            await response.json();


        if (!response.ok) {

            rankingList.innerHTML =
                "Não foi possível carregar o ranking.";

            return;

        }


        if (
            !data.ranking ||
            data.ranking.length === 0
        ) {

            rankingList.innerHTML =
                "Ainda não há jogadores no ranking.";

            return;

        }


        rankingList.innerHTML =
            "";

data.ranking.forEach(
    (player, index) => {

        const item =
            document.createElement(
                "div"
            );


        item.classList.add(
            "ranking-item"
        );


        // Destacar o pódio
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


        let position =
            `${index + 1}º`;


        if (index === 0) {

            position = "🥇";

        }

        else if (index === 1) {

            position = "🥈";

        }

        else if (index === 2) {

            position = "🥉";

        }


        item.innerHTML = `

            <span class="ranking-position">
                ${position}
            </span>


            <div class="ranking-player">

                <strong class="ranking-name">
                    ${player.username}
                </strong>

                <small>
                    ${jogo === "matematica" ? "Sobrevivência" : "Modo Brutal"}
                </small>

            </div>


            <span class="ranking-score">
                ${player.recorde}
                <small>acertos</small>
            </span>

        `;


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


        rankingList.innerHTML =
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
        saveAppHistory("profile");
    }


    const token =
        localStorage.getItem(
            "token"
        );


    if (!token) {

        alert(
            "Você precisa estar logado."
        );

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/perfil`,
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

            alert(
                data.message ||
                "Erro ao carregar perfil."
            );

            return;

        }


        const usuario =
            data.usuario;


        if (profileUsername) {

            profileUsername.textContent =
                usuario.username ||
                "—";

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
                    dataCadastro.toLocaleDateString(
                        "pt-BR"
                    );

            }

            else {

                profileDate.textContent =
                    "—";

            }

        }
        // ======================================================
// CARREGAR RECORDES DO PERFIL
// ======================================================

try {

    const recordsResponse =
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


    const recordsData =
        await recordsResponse.json();


    if (!recordsResponse.ok) {

        console.error(
            "Erro ao carregar recordes do perfil:",
            recordsData
        );

        return;

    }


    const records =
        recordsData.records || [];


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


    if (profileMathRecord) {

        profileMathRecord.textContent =
            mathBrutal
                ? mathBrutal.recorde
                : 0;

    }


    if (profilePortugueseRecord) {

        profilePortugueseRecord.textContent =
            portugueseBrutal
                ? portugueseBrutal.recorde
                : 0;

    }

}

catch (error) {

    console.error(
        "Erro ao carregar recordes do perfil:",
        error
    );

}
    }

    

    catch (error) {

        console.error(
            "Erro ao carregar perfil:",
            error
        );


        alert(
            "Não foi possível conectar com o servidor."
        );

    }

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
// LOGIN
// ======================================================

if (loginButton) {

    loginButton.addEventListener(
        "click",
        async () => {

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

                alert(
                    "Preencha usuário e senha."
                );

                return;

            }


            try {

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

                    alert(
                        data.message ||
                        "Erro ao fazer login."
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


                alert(
                    "Não foi possível conectar com o servidor."
                );

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

if (registerButton) {

    registerButton.addEventListener(
        "click",
        async () => {

            const usernameInput =
                document.getElementById(
                    "registerUsername"
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

                alert(
                    "Preencha todos os campos."
                );

                return;

            }


            if (
                senha !==
                confirmacao
            ) {

                alert(
                    "As senhas não são iguais."
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
                                    senha
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(
                        data.message ||
                        "Erro ao criar conta."
                    );

                    return;

                }


                alert(
                    "Conta criada com sucesso!"
                );


                if (usernameInput) {
                    usernameInput.value = "";
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


                alert(
                    "Não foi possível conectar com o servidor."
                );

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


            if (loginBox) {

                loginBox.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


// ======================================================
// MANTER LOGIN AO ATUALIZAR A PÁGINA
// ======================================================

function verificarLoginSalvo() {

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

    }

}


// ======================================================
// INICIALIZAÇÃO
// ======================================================

loadPortugueseQuestions();

verificarLoginSalvo();


// ======================================================
// FIM
// ======================================================