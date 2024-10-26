const images = [
    'image1.jpg', // Substitua pelos caminhos das suas imagens
    'image2.jpg',
    'image3.jpg'
];

let currentLevel = 3;
let pieces = [];
let speechEnabled = true;
let fontSize = 16;

function startGame() {
    currentLevel = parseInt(document.getElementById("level-select").value);
    pieces = createPuzzle(currentLevel);
    document.getElementById("level-selection").style.display = "none";
    document.getElementById("game").style.display = "block";
    renderPuzzle();
    if (speechEnabled) readAloud("Inicie o quebra-cabeça!");
}

function createPuzzle(level) {
    const pieceCount = level * level;
    const piecesArray = [];
    for (let i = 0; i < pieceCount; i++) {
        piecesArray.push(i);
    }
    return shuffleArray(piecesArray);
}

function renderPuzzle() {
    const puzzleContainer = document.getElementById("puzzle");
    puzzleContainer.style.gridTemplateColumns = `repeat(${currentLevel}, 1fr)`;
    puzzleContainer.innerHTML = '';
    
    pieces.forEach((piece, index) => {
        const pieceElement = document.createElement('div');
        pieceElement.className = 'piece';
        pieceElement.style.backgroundImage = `url(${images[0]})`; // Usar a primeira imagem para todos os níveis
        pieceElement.style.backgroundPosition = `${-((piece % currentLevel) * 100)}% ${-Math.floor(piece / currentLevel) * 100}%`;
        pieceElement.style.backgroundSize = `${currentLevel * 100}% ${currentLevel * 100}%`;
        pieceElement.textContent = piece + 1; // Texto opcional para identificar as peças
        pieceElement.onclick = () => pieceClick(index);
        puzzleContainer.appendChild(pieceElement);
    });
}

function pieceClick(index) {
    // Implementar lógica para mover as peças e verificar se o quebra-cabeça está completo
    readAloud(`Você clicou na peça ${pieces[index] + 1}`);
}

function toggleSpeech() {
    speechEnabled = !speechEnabled;
    const button = document.getElementById("toggle-speech");
    button.textContent = speechEnabled ? "Desabilitar Voz" : "Habilitar Voz";
}

function changeFontSize(change) {
    fontSize += change;
    document.body.style.fontSize = fontSize + "px";
}

function readAloud(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "pt-BR";
    window.speechSynthesis.speak(speech);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function goToLevelSelection() {
    document.getElementById("conclusion").style.display = "none";
    document.getElementById("level-selection").style.display = "block";
}

// Função de sair do jogo
function exitGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("level-selection").style.display = "block";
    if (speechEnabled) readAloud("Você saiu do jogo.");
}

window.onload = () => {
    document.getElementById("game").style.display = "none"; // Esconde o jogo ao carregar
    document.getElementById("conclusion").style.display = "none"; // Esconde a conclusão ao carregar
};
