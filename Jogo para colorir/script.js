// script.js
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
    if (speechEnabled) {
        speak(isPortuguese ? colors[color] : colorsEnglish[color]);
    }
}

function colorCell(cell) {
    cell.style.backgroundColor = selectedColor;
}

function speak(text) {
    utterance.text = text;
    utterance.lang = isPortuguese ? 'pt-BR' : 'en-US';
    utterance.volume = document.getElementById('volume').value;
    utterance.rate = document.getElementById('rate').value;
    speechSynth.cancel(); // Cancela qualquer fala anterior antes de iniciar uma nova
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
        if (speechEnabled) {
            speak(isPortuguese ? color : color); // Fala a cor diretamente como foi inserida
        }
    }
}

// Função para salvar o desenho como uma imagem
function saveDrawing() {
    html2canvas(document.getElementById('drawingArea')).then(function(canvas) {
        // Cria a imagem a partir do canvas
        const imgData = canvas.toDataURL('image/png');

        // Cria um link para o download
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'desenho.png';
        link.click();
    });
}

// Função para imprimir o desenho
function printDrawing() {
    html2canvas(document.getElementById('drawingArea')).then(function(canvas) {
        // Cria uma janela de impressão
        const printWindow = window.open('', '', 'height=500, width=500');
        printWindow.document.write('<html><head><title>Impressão do Desenho</title></head><body>');
        printWindow.document.write('<img src="' + canvas.toDataURL() + '" />');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });
}
