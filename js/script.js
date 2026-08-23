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

let score = 0;

let level = 1;

let startingLevel = 1;

let currentQuestion = "";

let currentAnswer = 0;

let currentOperation = "";

let timer = TEMPO_TOTAL;

let timerInterval = null;


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

    if (mathRecordElement) {

        mathRecordElement.textContent =
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

function showMenu() {

    clearInterval(timerInterval);

    clearInterval(
        portugueseTimerInterval
    );


    hideMainSections();


    if (mathModes) {
        mathModes.classList.add("hidden");
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

}


// ======================================================
// MENU MATEMÁTICA
// ======================================================

function openMathModes() {

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

}


// ======================================================
// MENU PORTUGUÊS
// ======================================================

function openPortugueseModes() {

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
// MODOS MATEMÁTICA
// ======================================================

const mathModeButtons =
    document.querySelectorAll(
        ".math-mode"
    );


mathModeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const selectedLevel =
                    Number(
                        button.dataset.level
                    );


                startGame(
                    selectedLevel
                );

            }
        );

    }
);


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

// Como o HTML possui IDs repetidos,
// selecionamos especificamente pelo local.

const mathMenuBackButton =
    document.querySelector(
        "#mathModes #backFromMath"
    );


if (mathMenuBackButton) {

    mathMenuBackButton.addEventListener(
        "click",
        () => {

            if (mathModes) {

                mathModes.classList.add(
                    "hidden"
                );

            }

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

            if (portugueseModes) {

                portugueseModes.classList.add(
                    "hidden"
                );

            }

        }
    );

}


// ======================================================
// MATEMÁTICA - INICIAR
// ======================================================

function startGame(selectedLevel) {

    currentSubject = "math";

    score = 0;

    startingLevel =
        selectedLevel;

    level =
        selectedLevel;


    clearInterval(timerInterval);

    clearInterval(
        portugueseTimerInterval
    );


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
            mathRecordValue;

    }

}


// ======================================================
// MATEMÁTICA - GERAR QUESTÃO
// ======================================================

function generateMathQuestion() {

    clearInterval(timerInterval);


    let a;

    let b;

    let operation;


    const difficulty =
        level;


    // ------------------------------
    // NÍVEL 1
    // ------------------------------

    if (difficulty === 1) {

        a =
            randomNumber(
                1,
                10
            );


        b =
            randomNumber(
                1,
                10
            );


        const operations = [
            "+",
            "-"
        ];


        operation =
            operations[
                randomNumber(
                    0,
                    operations.length - 1
                )
            ];

    }


    // ------------------------------
    // NÍVEL 2
    // ------------------------------

    else if (difficulty === 2) {

        a =
            randomNumber(
                2,
                20
            );


        b =
            randomNumber(
                1,
                12
            );


        const operations = [
            "+",
            "-",
            "×"
        ];


        operation =
            operations[
                randomNumber(
                    0,
                    operations.length - 1
                )
            ];

    }


    // ------------------------------
    // NÍVEL 3
    // ------------------------------

    else if (difficulty === 3) {

        a =
            randomNumber(
                5,
                30
            );


        b =
            randomNumber(
                2,
                15
            );


        const operations = [
            "+",
            "-",
            "×"
        ];


        operation =
            operations[
                randomNumber(
                    0,
                    operations.length - 1
                )
            ];

    }


    // ------------------------------
    // NÍVEL 4
    // ------------------------------

    else if (difficulty === 4) {

        a =
            randomNumber(
                10,
                50
            );


        b =
            randomNumber(
                2,
                20
            );


        const operations = [
            "+",
            "-",
            "×",
            "÷"
        ];


        operation =
            operations[
                randomNumber(
                    0,
                    operations.length - 1
                )
            ];

    }


    // ------------------------------
    // NÍVEL 5
    // ------------------------------

    else if (difficulty === 5) {

        a =
            randomNumber(
                20,
                80
            );


        b =
            randomNumber(
                2,
                30
            );


        const operations = [
            "+",
            "-",
            "×",
            "÷"
        ];


        operation =
            operations[
                randomNumber(
                    0,
                    operations.length - 1
                )
            ];

    }


    // ------------------------------
    // NÍVEL 6
    // ------------------------------

    else if (difficulty === 6) {

        a =
            randomNumber(
                30,
                120
            );


        b =
            randomNumber(
                2,
                40
            );


        const operations = [
            "+",
            "-",
            "×",
            "÷"
        ];


        operation =
            operations[
                randomNumber(
                    0,
                    operations.length - 1
                )
            ];

    }


    // ------------------------------
    // NÍVEL 7+
    // ------------------------------

    else {

        a =
            randomNumber(
                50,
                200
            );


        b =
            randomNumber(
                2,
                50
            );


        const operations = [
            "+",
            "-",
            "×",
            "÷"
        ];


        operation =
            operations[
                randomNumber(
                    0,
                    operations.length - 1
                )
            ];

    }


    // ==================================================
    // DIVISÃO EXATA
    // ==================================================

    if (operation === "÷") {

        const divisor =
            randomNumber(
                2,
                Math.max(
                    2,
                    Math.min(
                        b,
                        20
                    )
                )
            );


        const result =
            randomNumber(
                2,
                Math.max(
                    5,
                    Math.floor(
                        a / 2
                    )
                )
            );


        b =
            divisor;

        a =
            result * divisor;

    }


    // ==================================================
    // RESPOSTA
    // ==================================================

    switch (operation) {

        case "+":

            currentAnswer =
                a + b;

            break;


        case "-":

            if (a < b) {

                [
                    a,
                    b
                ] =
                [
                    b,
                    a
                ];

            }


            currentAnswer =
                a - b;

            break;


        case "×":

            currentAnswer =
                a * b;

            break;


        case "÷":

            currentAnswer =
                a / b;

            break;

    }


    currentQuestion =
        `${a} ${operation} ${b}`;


    currentOperation =
        operation;


    if (mathQuestionElement) {

        mathQuestionElement.textContent =
            currentQuestion;

    }


    if (answerInput) {

        answerInput.value =
            "";

        answerInput.focus();

    }


    updateMathInterface();

    startMathTimer();

}


// ======================================================
// MATEMÁTICA - TIMER
// ======================================================

function startMathTimer() {

    clearInterval(timerInterval);


    timer =
        TEMPO_TOTAL;


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
                TEMPO_TOTAL
            ) * 100;


        timerBar.style.width =
            `${percentage}%`;

    }

}


// ======================================================
// MATEMÁTICA - RESPONDER
// ======================================================

function checkMathAnswer() {

    if (!answerInput) {

        return;

    }


    if (
        answerInput.value.trim() === ""
    ) {

        return;

    }


    const userAnswer =
        Number(
            answerInput.value
        );


    if (
        userAnswer ===
        currentAnswer
    ) {

        clearInterval(timerInterval);


        score++;


        if (
            score % 10 === 0
        ) {

            level++;

        }


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


                const value =
                    key.dataset.value;


                answerInput.value +=
                    value;


                answerInput.focus();

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


            answerInput.focus();

        }
    );

}


if (numericConfirm) {

    numericConfirm.addEventListener(
        "click",
        () => {

            checkMathAnswer();

        }
    );

}

// ======================================================
// VOLTAR DO JOGO MATEMÁTICA
// ======================================================

const mathGameBackButton =
    document.querySelector(
        "#game #backFromMath"
    );


if (mathGameBackButton) {

    mathGameBackButton.addEventListener(
        "click",
        () => {

            clearInterval(
                timerInterval
            );


            showMenu();

        }
    );

}


// ======================================================
// GAME OVER - MATEMÁTICA
// ======================================================

function endMathGame(reason) {

    clearInterval(timerInterval);


    if (
        score >
        mathRecordValue
    ) {

        mathRecordValue =
            score;


        localStorage.setItem(
            "mathRecord",
            mathRecordValue
        );

    }

    // ======================================================
    // ENVIAR RECORDE BRUTAL PARA A API
    // ======================================================

    if (startingLevel === 3) {

    salvarRecordeAPI(
        "matematica",
        score
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
            mathRecordValue;

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
    selectedLevel
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


            showMenu();

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
    // ENVIAR RECORDE BRUTAL PARA A API
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

                startGame(
                    startingLevel
                );

            }

            else if (
                currentSubject ===
                "portuguese"
            ) {

                startPortugueseGame(
                    portugueseStartingLevel
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

            showLearn();

        }
    );

}


if (backFromLearnPortuguese) {

    backFromLearnPortuguese.addEventListener(
        "click",
        () => {

            showLearn();

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
                    Modo Brutal
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

function showLearn() {

    hideMainSections();


    if (learnSection) {

        learnSection.classList.remove(
            "hidden"
        );

    }

}

function showLearnMath() {

    hideMainSections();


    if (learnMathSection) {

        learnMathSection.classList.remove(
            "hidden"
        );

    }

}


function showLearnPortuguese() {

    hideMainSections();


    if (learnPortugueseSection) {

        learnPortugueseSection.classList.remove(
            "hidden"
        );

    }

}

function showAbout() {

    hideMainSections();


    if (aboutSection) {

        aboutSection.classList.remove(
            "hidden"
        );

    }

}


function showRanking() {

    hideMainSections();


    if (rankingSection) {

        rankingSection.classList.remove(
            "hidden"
        );

    }


    if (rankingTitle) {

        rankingTitle.textContent =
            "🧮 Matemática • 🔥 Brutal";

    }


    carregarRanking(
        "matematica"
    );

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
                    "🧮 Matemática • 🔥 Brutal";

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

async function showProfile() {

    hideMainSections();


    if (profileSection) {

        profileSection.classList.remove(
            "hidden"
        );

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

    showMenu();

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