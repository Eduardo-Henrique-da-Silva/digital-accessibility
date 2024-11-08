const levels = [
    [
        { wordPT: "cachorro", wordEN: "dog" },
        { wordPT: "gato", wordEN: "cat" },
        { wordPT: "casa", wordEN: "house" },
        { wordPT: "carro", wordEN: "car" },
        { wordPT: "livro", wordEN: "book" }
    ],
    [
        { wordPT: "maçã", wordEN: "apple" },
        { wordPT: "banana", wordEN: "banana" },
        { wordPT: "uva", wordEN: "grape" },
        { wordPT: "laranja", wordEN: "orange" },
        { wordPT: "pera", wordEN: "pear" },
        { wordPT: "morango", wordEN: "strawberry" },
        { wordPT: "melancia", wordEN: "watermelon" },
        { wordPT: "abacaxi", wordEN: "pineapple" },
        { wordPT: "kiwi", wordEN: "kiwi" },
        { wordPT: "cereja", wordEN: "cherry" }
    ],
];

let currentLevel = 0;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let speechEnabled = true;
let isEnglishToPortuguese = true;

function startGame() {
    currentLevel = parseInt(document.getElementById("level-select").value);
    currentQuestions = shuffleArray(levels[currentLevel]);
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("level-selection").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("conclusion").style.display = "none";
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    if (currentQuestionIndex < currentQuestions.length) {
        const currentQuestion = currentQuestions[currentQuestionIndex];
        questionElement.textContent = isEnglishToPortuguese 
            ? `Qual é a palavra em português para "${currentQuestion.wordEN}"?`
            : `Qual é a palavra em inglês para "${currentQuestion.wordPT}"?`;
        
        if (speechEnabled) readAloud(isEnglishToPortuguese ? currentQuestion.wordEN : currentQuestion.wordPT);
    } else {
        endGame();
    }
}

function readAloud(word) {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = isEnglishToPortuguese ? "en-US" : "pt-BR";
    window.speechSynthesis.speak(speech);
}

function checkAnswer() {
    const answerElement = document.getElementById("answer");
    const resultElement = document.getElementById("result");
    const userAnswer = answerElement.value.toLowerCase();
    const correctAnswer = isEnglishToPortuguese 
        ? currentQuestions[currentQuestionIndex].wordPT 
        : currentQuestions[currentQuestionIndex].wordEN;

    if (userAnswer === correctAnswer.toLowerCase()) {
        resultElement.textContent = "Correto!";
        score++;
    } else {
        resultElement.textContent = `Incorreto! A resposta correta é "${correctAnswer}".`;
    }
    
    document.getElementById("score").textContent = score;
    answerElement.value = "";
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
    document.getElementById("result").textContent = "";
}

function endGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("conclusion").style.display = "block";
    document.getElementById("final-score").textContent = score;
}

function goToLevelSelection() {
    document.getElementById("conclusion").style.display = "none";
    document.getElementById("level-selection").style.display = "block";
}

function restartCurrentLevel() {
    startGame();
}

function toggleSpeech() {
    speechEnabled = !speechEnabled;
    const button = document.getElementById("toggle-speech");
    button.textContent = speechEnabled ? "Desabilitar Voz" : "Habilitar Voz";
}

function exitGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("level-selection").style.display = "block";
}

function toggleLanguage() {
    isEnglishToPortuguese = !isEnglishToPortuguese;
    const button = document.getElementById("toggle-language");
    button.textContent = isEnglishToPortuguese ? "Inglês para Português" : "Português para Inglês";
    showQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.onload = () => {
    document.getElementById("game").style.display = "none";
    document.getElementById("conclusion").style.display = "none";
};
