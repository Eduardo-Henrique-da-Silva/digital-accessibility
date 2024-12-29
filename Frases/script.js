// Lista de frases para tradução (em português e inglês)
const phrases = [
    { pt: "Como você está?", en: "How are you?" },
    { pt: "Eu gosto de aprender.", en: "I like to learn." },
    { pt: "Você tem um cachorro?", en: "Do you have a dog?" },
    { pt: "Ele está com fome.", en: "He is hungry." },
    { pt: "Eu vou ao mercado.", en: "I am going to the market." }
];

let currentQuestion = {};

// Função para selecionar uma nova frase
function newQuestion() {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    currentQuestion = randomPhrase;

    // Alternar entre inglês e português para exibir a frase
    const isPortuguese = Math.random() < 0.5;
    document.getElementById("question").textContent = isPortuguese ? randomPhrase.pt : randomPhrase.en;
    document.getElementById("answer").value = '';
    document.getElementById("feedback").textContent = '';

    // Focar o input de resposta para o usuário
    document.getElementById("answer").focus();
}

// Função para verificar a resposta
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const correctAnswer = currentQuestion.pt.toLowerCase() === userAnswer || currentQuestion.en.toLowerCase() === userAnswer;

    if (correctAnswer) {
        document.getElementById("feedback").textContent = "Resposta correta!";
        document.getElementById("feedback").style.color = "green";
        playFeedbackSound('correct');
    } else {
        document.getElementById("feedback").textContent = "Resposta errada. Tente novamente.";
        document.getElementById("feedback").style.color = "red";
        playFeedbackSound('incorrect');
    }
}

// Função para tocar sons de feedback (correto ou incorreto)
function playFeedbackSound(type) {
    const audio = new Audio(type === 'correct' ? 'correct.mp3' : 'incorrect.mp3');
    audio.play();
}

// Inicializar o jogo com uma nova frase ao carregar a página
window.onload = newQuestion;
