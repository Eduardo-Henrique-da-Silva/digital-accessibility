let currentLanguage = 'pt'; // Idioma padrão
let currentLevel = 1; // Nível inicial
let currentSymbolType = 'numbers'; // Tipo de símbolo padrão
let grid = []; // Representação do tabuleiro de Sudoku

// Função para iniciar o jogo
function startGame() {
  // Pegando as opções selecionadas
  currentLevel = parseInt(document.getElementById('difficulty').value);
  currentSymbolType = document.getElementById('symbols').value;
  currentLanguage = document.getElementById('language').value;

  // Esconder a tela inicial e mostrar o jogo
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');

  // Gerar o Sudoku para o nível e símbolos escolhidos
  generateSudoku(currentLevel, currentSymbolType);
}

// Função para gerar o tabuleiro de Sudoku
function generateSudoku(level, symbolType) {
  grid = [];
  let cells = level * 5; // Exemplo: Para o nível 1, começa com 5 células
  let sudokuGrid = document.getElementById('sudoku-grid');
  sudokuGrid.innerHTML = '';

  // Gerar as células do Sudoku
  for (let i = 0; i < cells; i++) {
    let div = document.createElement('div');
    div.setAttribute('id', `cell-${i}`);
    div.setAttribute('contenteditable', 'true');
    div.setAttribute('aria-label', `Sudoku cell ${i}`);
    div.textContent = getRandomSymbol(symbolType); // Preenche com o símbolo escolhido
    sudokuGrid.appendChild(div);
    grid.push(div); // Armazenar as células
  }
}

// Função para gerar símbolos (números, letras ou formas)
function getRandomSymbol(type) {
  if (type === 'numbers') {
    return Math.floor(Math.random() * 9) + 1; // Números de 1 a 9
  } else if (type === 'letters') {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    return letters[Math.floor(Math.random() * letters.length)];
  } else if (type === 'shapes') {
    const shapes = ['◯', '■', '▲', '★', '◆'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }
}

// Função para verificar a solução
function checkSolution() {
  // Lógica para verificar se o Sudoku está correto
  const isCorrect = grid.every(cell => cell.textContent.trim() !== '');

  if (isCorrect) {
    alert("Parabéns, você concluiu o nível!");
    currentLevel++;
    generateSudoku(currentLevel, currentSymbolType); // Avança para o próximo nível
  } else {
    alert("Ainda não está correto, tente novamente.");
  }
}

// Função para sair do jogo
function exitGame() {
  if (confirm("Você deseja sair do jogo?")) {
    window.location.reload();
  }
}

// Inicializar a tela inicial
document.getElementById('start-btn').addEventListener('click', startGame);
