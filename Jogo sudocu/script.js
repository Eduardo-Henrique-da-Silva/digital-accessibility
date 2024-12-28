let board = [];
let symbolsMode = false;
let voiceEnabled = true;
let language = "pt-BR";
let voiceSpeed = 1;
let currentVoice = null;
let voices = [];

// Função para começar o jogo
function startGame() {
    const level = parseInt(document.getElementById("level").value);
    board = generateSudoku(level);
    drawBoard(board);
    speakMessage("Jogo iniciado!");
}

// Função para gerar um tabuleiro de Sudoku (ainda um esqueleto)
function generateSudoku(level) {
    const sudoku = Array(9).fill().map(() => Array(9).fill(null));
    // Gerar Sudoku real depende de um algoritmo de Sudoku
    return sudoku;
}

// Função para desenhar o tabuleiro
function drawBoard(board) {
    const sudokuBoardElement = document.getElementById("sudoku-board");
    sudokuBoardElement.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("input");
            cell.type = "text";
            cell.maxLength = 1;
            if (symbolsMode) {
                cell.placeholder = "X"; // Substituir com símbolos
            } else {
                cell.placeholder = board[i][j] !== null ? board[i][j] : "";
            }
            cell.addEventListener("input", () => handleInput(i, j, cell.value));
            sudokuBoardElement.appendChild(cell);
        }
    }
}

// Manipula a entrada de usuário
function handleInput(i, j, value) {
    board[i][j] = value;
    checkSolution(board);
}

// Função para verificar se o Sudoku foi resolvido (simplificado)
function checkSolution(board) {
    const solved = true; // Lógica de verificação do Sudoku
    if (solved) {
        speakMessage("Parabéns! Você completou o Sudoku.");
    }
}

// Função para alternar entre símbolos ou números
function toggleSymbols() {
    symbolsMode = !symbolsMode;
    drawBoard(board);
}

// Função para alterar o idioma
function changeLanguage() {
    language = document.getElementById("language").value;
    if (voiceEnabled) {
        speakMessage("Idioma alterado para " + (language === "pt-BR" ? "Português" : "Inglês"));
    }
}

// Função para alternar voz
function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    speakMessage(voiceEnabled ? "Voz ativada" : "Voz desativada");
}

// Função para alterar a velocidade da voz
function changeVoiceSpeed() {
    voiceSpeed = document.getElementById("speed").value;
    if (voiceEnabled) {
        speakMessage("Velocidade da voz alterada.");
    }
}

// Função para mudar a voz
function changeVoice() {
    const voiceSelection = document.getElementById("voice-selection").value;
    currentVoice = voices.find(voice => voice.name === voiceSelection);
    speakMessage("Voz alterada.");
}

// Função para usar a voz sintetizada
function speakMessage(message) {
    if (voiceEnabled) {
        const msg = new SpeechSynthesisUtterance(message);
        msg.lang = language;
        msg.rate = voiceSpeed;
        msg.voice = currentVoice;
        window.speechSynthesis.speak(msg);
    }
}

// Função para ajustar o tamanho da fonte
function adjustFontSize() {
    const newSize = document.getElementById("font-size").value;
    document.body.style.fontSize = newSize + "px";
}

// Função para ajustar o contraste da fonte
function adjustFontContrast() {
    const contrast = document.getElementById("font-contrast").value;
    document.body.style.filter = `contrast(${contrast})`;
}

// Carregar vozes disponíveis
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    const voiceSelection = document.getElementById("voice-selection");
    voices.forEach(voice => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = voice.name;
        voiceSelection.appendChild(option);
    });
}

// Carregar as vozes ao iniciar
window.speechSynthesis.onvoiceschanged =
