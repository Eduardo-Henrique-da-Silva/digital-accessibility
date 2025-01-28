let level = 1;
let currentQuestionIndex = 0;
let timeLeft = 60;  // Aumentando o tempo para 60 segundos
let timerInterval;
let timerEnabled = true;
let voiceEnabled = true;

const voice = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;

let questions = [
  // Nível 1
  {
    question: "Qual é mais rápido, o avião ou o trem?",
    options: ["Avião", "Trem"],
    correctAnswer: "Avião",
    explanation: "O avião geralmente é mais rápido que o trem em viagens de longa distância.",
    images: ["aviao.jpg", "trem.jpg"]
  },
  {
    question: "Qual é maior, a girafa ou o sol?",
    options: ["Girafa", "Sol"],
    correctAnswer: "Sol",
    explanation: "O Sol é muito maior do que a girafa, sendo uma estrela gigante no centro do nosso sistema solar.",
    images: ["girafa.jpg", "sol.jpg"]
  },
  {
    question: "Qual é mais pesado, uma pena ou uma pedra?",
    options: ["Pena", "Pedra"],
    correctAnswer: "Pedra",
    explanation: "A pedra é muito mais densa e pesada que a pena, devido à sua composição.",
    images: ["pena.jpg", "pedra.jpg"]
  },
  {
    question: "Qual é mais rápido, uma lebre ou uma tartaruga?",
    options: ["Lebre", "Tartaruga"],
    correctAnswer: "Lebre",
    explanation: "A lebre é conhecida por sua velocidade, enquanto a tartaruga é muito mais lenta.",
    images: ["lebre.jpg", "tartaruga.jpg"]
  },
  {
    question: "Qual é mais alto, o Everest ou o Mont Blanc?",
    options: ["Everest", "Mont Blanc"],
    correctAnswer: "Everest",
    explanation: "O Everest é a montanha mais alta do mundo, com 8.848 metros de altura.",
    images: ["everest.jpg", "montblanc.jpg"]
  },
  {
    question: "Qual é o animal mais rápido do mundo?",
    options: ["Falcão peregrino", "Leopardo"],
    correctAnswer: "Falcão peregrino",
    explanation: "O falcão peregrino pode atingir velocidades de até 380 km/h em um mergulho.",
    images: ["falcao.jpg", "leopardo.jpg"]
  },

  // Nível 2
  {
    question: "Qual é maior, a Terra ou a Lua?",
    options: ["Terra", "Lua"],
    correctAnswer: "Terra",
    explanation: "A Terra é significativamente maior do que a Lua. O diâmetro da Terra é cerca de 12.742 km, enquanto o da Lua é apenas 3.474 km.",
    images: ["terra.jpg", "lua.jpg"]
  },
  {
    question: "Qual desses planetas tem anéis?",
    options: ["Saturno", "Marte"],
    correctAnswer: "Saturno",
    explanation: "Saturno é famoso por seus anéis, que são compostos por partículas de gelo e rochas.",
    images: ["saturno.jpg", "marte.jpg"]
  },
  {
    question: "Qual é o maior oceano do planeta?",
    options: ["Oceano Pacífico", "Oceano Atlântico"],
    correctAnswer: "Oceano Pacífico",
    explanation: "O Oceano Pacífico é o maior oceano do mundo, cobrindo uma área de aproximadamente 168 milhões de km².",
    images: ["oceano-pacifico.jpg", "oceano-atlantico.jpg"]
  },
  {
    question: "Qual é a capital da França?",
    options: ["Paris", "Roma"],
    correctAnswer: "Paris",
    explanation: "Paris é a capital da França e uma das cidades mais visitadas do mundo.",
    images: ["paris.jpg", "roma.jpg"]
  },
  {
    question: "Qual desses animais é um mamífero marinho?",
    options: ["Golfinho", "Tubarão"],
    correctAnswer: "Golfinho",
    explanation: "Os golfinhos são mamíferos marinhos, enquanto os tubarões são peixes.",
    images: ["golfinho.jpg", "tubarao.jpg"]
  },
  {
    question: "Qual é o maior continente do mundo?",
    options: ["Ásia", "África"],
    correctAnswer: "Ásia",
    explanation: "A Ásia é o maior continente, tanto em termos de área quanto de população.",
    images: ["asia.jpg", "africa.jpg"]
  },

  // Nível 3 - Continue com o mesmo padrão...
  // ...
];

// Função para embaralhar as perguntas
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

// Função para carregar a próxima pergunta
function loadNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    
    // Exibir as imagens
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Limpar imagens antigas
    questionData.images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = `images/${image}`;
      imageContainer.appendChild(imgElement);
    });

    // Exibir opções de resposta
    const optionsContainer = document.querySelector('.options');
    optionsContainer.innerHTML = ''; // Limpar opções antigas
    questionData.options.forEach(option => {
      const button = document.createElement('button');
      button.innerText = option;
      button.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(button);
    });

    // Ativar voz para ler a pergunta
    if (voiceEnabled) {
      voice.text = questionData.question;
      synth.speak(voice);
    }
  } else {
    alert("Você completou todos os níveis!");
    resetGame();
  }
}

// Função para verificar a resposta
function checkAnswer(answer) {
  const questionData = questions[currentQuestionIndex];
  const feedback = document.getElementById('feedback');
  
  if (answer === questionData.correctAnswer) {
    feedback.innerHTML = "<strong>Resposta correta!</strong>";
    if (voiceEnabled) {
      voice.text = "Resposta correta!";  // Adicionando a mensagem de voz para resposta correta
      synth.speak(voice);
    }
  } else {
    feedback.innerHTML = `<strong>Resposta errada!</strong> ${questionData.explanation}`;
    if (voiceEnabled) {
      voice.text = "Resposta errada. " + questionData.explanation;
      synth.speak(voice);
    }
  }

  currentQuestionIndex++;
  nextLevel();
}

// Função para avançar para o próximo nível
function nextLevel() {
  if (currentQuestionIndex % 6 === 0) {
    level++;  // Subir de nível após completar 6 perguntas
    document.getElementById('level').innerText = `Nível: ${level}`;
    timeLeft = 60;  // Resetar o tempo para 60 segundos
    if (timerEnabled) {
      clearInterval(timerInterval);
      startTimer();  // Recomeçar o timer
    }
  }
  if (currentQuestionIndex < questions.length) {
    loadNextQuestion();
  } else {
    alert("Você completou o jogo!");
    resetGame();
  }
}

// Função para reiniciar o jogo
function resetGame() {
  level = 1;
  currentQuestionIndex = 0;
  shuffleQuestions();
  loadNextQuestion();
  startTimer();
}

// Função para iniciar o timer
function startTimer() {
  document.getElementById('timer').style.display = 'block';
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById('time-left').innerText = timeLeft;
    } else {
      clearInterval(timerInterval);
      alert("Tempo esgotado!");
      nextLevel();
    }
  }, 1000);
}

// Funções de controle
function toggleTimer() {
  timerEnabled = !timerEnabled;
  if (timerEnabled) {
    startTimer();
  } else {
    clearInterval(timerInterval);
    document.getElementById('timer').style.display = 'none';
  }
}

function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  if (voiceEnabled) {
    alert("Voz ativada");
  } else {
    alert("Voz desativada");
  }
}

function adjustFontSize(event) {
  document.body.style.fontSize = `${event.target.value}px`;
}

function adjustContrast(event) {
  document.body.style.filter = `contrast(${event.target.value})`;
}

function adjustVoiceSpeed(event) {
  voice.rate = event.target.value;
}

function adjustVoiceVolume(event) {
  voice.volume = event.target.value;
}

function adjustBrightness(event) {
  document.body.style.filter = `brightness(${event.target.value})`;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Iniciar o jogo
shuffleQuestions();
loadNextQuestion();
startTimer();
