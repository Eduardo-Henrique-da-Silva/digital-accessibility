let selectedColor = 'red'; // Cor padrão inicial
let isPortuguese = true;
let speechEnabled = false;
let speechSynth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();

const colors = {
    red: "Vermelho",
    green: "Verde",
    blue: "Azul",
    yellow: "Amarelo",
    orange: "Laranja",
    purple: "Roxo"
};

const colorsEnglish = {
    red: "Red",
    green: "Green",
    blue: "Blue",
    yellow: "Yellow",
    orange: "Orange",
    purple: "Purple"
};

function selectColor(color) {
    selectedColor = color;
    speak(`Cor selecionada: ${isPortuguese ? colors[color] : colorsEnglish[color]}`);
}

function colorCell(cell) {
    cell.style.backgroundColor = selectedColor;
}

function speak(text) {
    utterance.text = text;
    utterance.volume = document.getElementById('volume').value;
    utterance.rate = document.getElementById('rate').value;
    speechSynth.speak(utterance);
}

function toggleSpeech() {
    speechEnabled = !speechEnabled;
}

function setVolume() {
    utterance.volume = document.getElementById('volume').value;
}

function setRate() {
    utterance.rate = document.getElementById('rate').value;
}

function increaseFont() {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize + 1) + 'px';
}

function decreaseFont() {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (currentSize - 1) + 'px';
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function toggleLanguage() {
    isPortuguese = !isPortuguese;
    const colorNames = isPortuguese ? Object.values(colors) : Object.values(colorsEnglish);
    document.querySelectorAll('.color').forEach((button, index) => {
        button.innerText = colorNames[index];
    });
}

function openColorPicker() {
    const color = prompt(isPortuguese ? "Escolha uma cor em formato HEX ou nome da cor (ex: #ff5733 ou vermelho):" : "Choose a color in HEX format or color name (e.g., #ff5733 or red):");
    if (color) {
        selectedColor = color;
        speak(`Cor selecionada: ${color}`);
    }
}
