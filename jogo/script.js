const gameArea = document.getElementById("gameArea");
const music = document.getElementById("backgroundMusic");
let isMusicStarted = false;
let scenes = [];
let currentSceneIndex = -1;

// Função para iniciar a música com uma interação do usuário
function startMusic() {
    if (!isMusicStarted) {
        music.volume = 0.5;
        music.play().then(() => {
            isMusicStarted = true;
        }).catch(error => {
            console.error("Erro ao reproduzir música:", error);
        });
    }
}

// Função para alternar a reprodução da música
function toggleMusic() {
    if (!isMusicStarted) {
        startMusic(); // Garante que a música inicia com a interação do usuário
    } else if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// Função para alterar o volume da música
function changeVolume(volume) {
    music.volume = volume;
}

// Função para salvar o cenário atual
function saveScene() {
    const sceneData = Array.from(gameArea.children).map(el => ({
        type: el.dataset.type,
        x: el.style.left,
        y: el.style.top
    }));
    scenes.push(sceneData);
    currentSceneIndex = scenes.length - 1;
    alert("Cenário salvo!");
}

// Função para limpar o cenário atual
function clearScene() {
    gameArea.innerHTML = '<p>Solte os blocos aqui para construir seu cenário.</p>';
}

// Função para carregar o cenário anterior
function previousScene() {
    if (currentSceneIndex > 0) {
        currentSceneIndex--;
        loadScene(scenes[currentSceneIndex]);
    } else {
        alert("Este é o primeiro cenário.");
    }
}

// Função para carregar o próximo cenário
function nextScene() {
    if (currentSceneIndex < scenes.length - 1) {
        currentSceneIndex++;
        loadScene(scenes[currentSceneIndex]);
    } else {
        alert("Este é o último cenário.");
    }
}

// Função para carregar um cenário salvo
function loadScene(scene) {
    clearScene();
    scene.forEach(item => {
        const element = document.createElement("div");
        element.className = "draggable";
        element.dataset.type = item.type;
        element.textContent = getSymbol(item.type);
        element.style.position = 'absolute';
        element.style.left = item.x;
        element.style.top = item.y;
        gameArea.appendChild(element);
    });
}

// Função auxiliar para obter o símbolo do bloco
function getSymbol(type) {
    const symbols = {
        "árvore1": "🌳",
        "flor": "🌸",
        "casa": "🏠",
        "prédio": "🏢",
        "carro": "🚗",
        "bicicleta": "🚲",
        "pessoa": "👩",
        "criança": "👦",
        "cachorro": "🐶",
        "gato": "🐱"
    };
    return symbols[type] || "";
}

// Evento de arrastar blocos para o jogo
document.querySelectorAll(".block").forEach(block => {
    block.addEventListener("dragstart", (event) => {
        const draggedElement = document.createElement("div");
        draggedElement.className = "draggable";
        draggedElement.dataset.type = event.target.dataset.type;
        draggedElement.textContent = event.target.textContent;
        draggedElement.style.position = 'absolute';
        draggedElement.style.cursor = 'grab';

        gameArea.appendChild(draggedElement);

        gameArea.addEventListener('dragover', (e) => e.preventDefault());
        gameArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const rect = gameArea.getBoundingClientRect();
            draggedElement.style.left = `${e.clientX - rect.left}px`;
           
