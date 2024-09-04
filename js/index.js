document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});
/*Código para alteração de modo de exibição de claro para escuro*/
document.getElementById('toggleButton').addEventListener('click', function() {
    var text = document.getElementById('text');
    if (text.style.display === 'none') {
        text.style.display = 'block';
        this.textContent = 'Ocultar Texto';
    } else {
        text.style.display = 'none';
        this.textContent = 'Mostrar Texto';
    }
});
/*Função de esconder ou exibir texto*/
document.getElementById('readButton').addEventListener('click', function() {
    var text = document.getElementById('textToRead').innerText;
    var speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'pt-BR'; // Define o idioma para português do Brasil
    window.speechSynthesis.speak(speech);
});
var speech = new SpeechSynthesisUtterance();
speech.lang = 'pt-BR'; // Define o idioma para português do Brasil

document.getElementById('readButton').addEventListener('click', function() {
    speech.text = document.getElementById('textToRead').innerText;
    window.speechSynthesis.speak(speech);
});
var isPaused = false;
document.getElementById('pauseButton').addEventListener('click', function() {
    if (isPaused) {
        window.speechSynthesis.resume();
        this.innerText = 'Pausar';
    } else {
        window.speechSynthesis.pause();
        this.innerText = 'Reproduzir';
    }
    isPaused = !isPaused;
});
document.getElementById('readButton').addEventListener('click', function() {
    var text = document.getElementById('textToRead').innerText;
    var speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'pt-BR'; // Define o idioma para português do Brasil
    window.speechSynthesis.speak(speech);
});



document.getElementById('speedControl').addEventListener('input', function() {
    speech.rate = this.value;
});
var voices = [];
var speech = new SpeechSynthesisUtterance();
speech.lang = 'pt-BR'; // Define o idioma padrão para português do Brasil

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    var voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.innerHTML = '';
    voices.forEach(function(voice, index) {
        var option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.value = index;
        voiceSelect.appendChild(option);
    });
}

function initializeVoices() {
    if (window.speechSynthesis.getVoices().length !== 0) {
        populateVoiceList();
    } else {
        window.speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
    }
}

// Chamar a função de inicialização após um pequeno atraso
setTimeout(initializeVoices, 100);

document.getElementById('voiceSelect').addEventListener('change', function() {
    speech.voice = voices[this.value];
});

document.getElementById('readButton').addEventListener('click', function() {
    speech.text = document.getElementById('textToRead').innerText;
    window.speechSynthesis.speak(speech);
});


document.getElementById('aumentarFonte').addEventListener('click', function() {
    let texto = document.getElementById('texto');
    let estiloAtual = window.getComputedStyle(texto, null).getPropertyValue('font-size');
    let tamanhoAtual = parseFloat(estiloAtual);
    texto.style.fontSize = (tamanhoAtual + 2) + 'px';
});

document.getElementById('reduzirFonte').addEventListener('click', function() {
    let texto = document.getElementById('texto');
    let estiloAtual = window.getComputedStyle(texto, null).getPropertyValue('font-size');
    let tamanhoAtual = parseFloat(estiloAtual);
    texto.style.fontSize = (tamanhoAtual - 2) + 'px';
});