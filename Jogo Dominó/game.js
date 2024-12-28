let currentLanguage = 'pt'; // Idioma padrão (pt para português)
let playerHand = [];
let computerHand = [];
let dominoBoard = [];
let voices = [];
let synth = window.speechSynthesis;
let playerTurn = true; // Para controlar quem é o jogador da vez (true = jogador, false = bot)

// Função para carregar vozes sintetizadas
function loadVoices() {
  voices = synth.getVoices();
  updateVoice();
}

// Função para atualizar a voz
function updateVoice() {
  const voiceSelect = currentLanguage === 'pt' ? 'Google português do Brasil' : 'Google UK English Male';
  const selectedVoice = voices.find(voice => voice.name === voiceSelect);
  if (selectedVoice) {
    synth.voice = selectedVoice;
  }
}

// Função para falar o conteúdo de uma pedra
function speakDomino(domino, who) {
  const text = who === 'player' 
    ? `Você jogou ${domino[0]} e ${domino[1]}. Agora é a vez do seu oponente.`
    : `Seu oponente jogou ${domino[0]} e ${domino[1]}. Sua vez!`;
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;
  synth.speak(utterance);
}

// Função para iniciar o jogo
function startGame() {
  const numPieces = document.getElementById('num-pieces').value;

  playerHand = generateHand(numPieces);
  computerHand = generateHand(numPieces);
  dominoBoard = [];

  updateUI();
  loadVoices();
  playerTurn = true;
  document.getElementById('pass-turn').disabled = false; // Habilita o botão para passar a vez
}

// Função para gerar as mãos dos jogadores
function generateHand(numPieces) {
  const pieces = [];
  while (pieces.length < numPieces) {
    const domino = [Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)];
    if (!pieces.some(piece => piece[0] === domino[0] && piece[1] === domino[1])) {
      pieces.push(domino);
    }
  }
  return pieces;
}

// Atualizar a interface
function updateUI() {
  // Exibir as pedras do jogador
  const playerHandElement = document.getElementById('player-hand');
  playerHandElement.innerHTML = '';
  playerHand.forEach(domino => {
    const dominoElement = document.createElement('div');
    dominoElement.textContent = `${domino[0]}|${domino[1]}`;
    dominoElement.tabIndex = 0;
    dominoElement.setAttribute('aria-label', `Pedra ${domino[0]} e ${domino[1]}`);
    dominoElement.onclick = () => placeDomino(domino);
    playerHandElement.appendChild(dominoElement);
  });

  // Exibir o tabuleiro
  updateBoard();
}

// Função para colocar uma pedra na mesa
function placeDomino(domino) {
  if (playerTurn && isValidMove(domino)) {
    const selectedSide = document.querySelector('input[name="side"]:checked').value; // Pega a escolha da ponta (direita ou esquerda)
    if (selectedSide === 'left') {
      dominoBoard.unshift(domino); // Coloca no início do tabuleiro (esquerda)
    } else if (selectedSide === 'right') {
      dominoBoard.push(domino); // Coloca no final do tabuleiro (direita)
    }
    playerHand = playerHand.filter(d => !(d[0] === domino[0] && d[1] === domino[1]));
    updateUI();
    speakDomino(domino, 'player');
    displayMove(domino, 'player');
    playerTurn = false;
    computerPlay();
  } else if (!playerTurn) {
    alert("Aguarde sua vez!");
  } else {
    alert("Jogada inválida!");
  }
}

// Função para verificar se a jogada é válida
function isValidMove(domino) {
  if (dominoBoard.length === 0) {
    return true; // Se o tabuleiro está vazio, qualquer peça pode ser jogada
  }
  const left = dominoBoard[0][0];
  const right = dominoBoard[dominoBoard.length - 1][1];
  return domino[0] === left || domino[1] === right;
}

// Atualiza o tabuleiro visualmente
function updateBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = dominoBoard.map(domino => `<span>${domino[0]}|${domino[1]}</span>`).join(' ');
}

// Função para exibir a jogada no histórico
function displayMove(domino, who) {
  const movesList = document.getElementById('moves-list');
  const moveItem = document.createElement('li');
  moveItem.textContent = who === 'player' 
    ? `Você jogou ${domino[0]}|${domino[1]}`
    : `Seu oponente jogou ${domino[0]}|${domino[1]}`;
  movesList.appendChild(moveItem);
}

// Função para o bot jogar
function computerPlay() {
  setTimeout(() => {
    const validMoves = computerHand.filter(domino => isValidMove(domino));
    if (validMoves.length > 0) {
      const chosenDomino = validMoves[Math.floor(Math.random() * validMoves.length)];
      const side = Math.random() > 0.5 ? 'left' : 'right'; // O bot escolhe aleatoriamente onde colocar
      if (side === 'left') {
        dominoBoard.unshift(chosenDomino);
      } else {
        dominoBoard.push(chosenDomino);
      }
      computerHand = computerHand.filter(d => !(d[0] === chosenDomino[0] && d[1] === chosenDomino[1]));
      updateUI();
      speakDomino(chosenDomino, 'bot');
      displayMove(chosenDomino, 'bot');
      playerTurn = true;
    } else {
      alert("O bot não tem jogadas válidas. O jogo terminou!");
      endGame();
    }
  }, 1000);
}

// Função para verificar se o jogador tem peças válidas
function playerHasValidMove() {
  return playerHand.some(domino => isValidMove(domino));
}

// Função para passar a vez caso o jogador não tenha jogadas válidas
function passTurn() {
  if (!playerHasValidMove()) {
    alert("Você não tem jogadas válidas, passando a vez para o oponente.");
    playerTurn = false;
    computerPlay();
  }
}

// Função para checar e finalizar o jogo
function checkGameOver() {
  if (playerHand.length === 0 || computerHand.length === 0 || dominoBoard.length >= 28) {
    endGame();
  }
}

// Função para finalizar o jogo
function endGame() {
  alert("Fim de jogo! O jogo acabou.");
  document.getElementById('pass-turn').disabled = true; // Desabilita o botão de passar turno
}

// Função para alternar o idioma
function toggleLanguage() {
  currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
  updateVoice();
  speakDomino([], 'player'); // Anunciar que o idioma foi alterado
  updateUI(); // Atualizar a interface do usuário após a mudança de idioma
}

// Inicializa o jogo
startGame();

// Adicionar um botão para pular a vez
document.getElementById('pass-turn').addEventListener('click', () => passTurn());
