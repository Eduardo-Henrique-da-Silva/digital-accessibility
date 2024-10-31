let selectedColor = 'red'; // Cor padrão inicial
let isPortuguese = true;
let speechEnabled = false;
let speechSynth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();

// Seleciona a cor ao clicar na paleta e pronuncia a cor
document.querySelectorAll('.color').forEach(button => {
    button.addEventListener('click', function () {
        selectedColor = this.style.backgroundColor;
        speak(`Cor selecionada: ${selectedColor}`);
   
