// Alternar modo escuro
document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.remove('high-contrast'); // Desativa alto contraste se estiver ativado
});

// Alternar modo alto contraste
document.getElementById('toggle-high-contrast').addEventListener('click', function() {
    document.body.classList.toggle('high-contrast');
    document.body.classList.remove('dark-mode'); // Desativa modo escuro se estiver ativado
});

// Alternar suavidade na leitura
document.getElementById('toggle-smooth-text').addEventListener('click', function() {
    document.getElementById('texto').classList.toggle('smooth-text');
});

// Destacar letras
document.getElementById('toggle-highlight-text').addEventListener('click', function() {
    document.getElementById('texto').classList.toggle('highlight-text');
});

// Aumentar fonte
document.getElementById('aumentarFonte').addEventListener('click', function() {
    let texto = document.getElementById('texto');
    let tamanhoAtual = parseFloat(window.getComputedStyle(texto).fontSize);
    texto.style.fontSize = (tamanhoAtual + 2) + 'px';
});

// Reduzir fonte
document.getElementById('reduzirFonte').addEventListener('click', function() {
    let texto = document.getElementById('texto');
    let tamanhoAtual = parseFloat(window.getComputedStyle(texto).fontSize);
    texto.style.fontSize = (tamanhoAtual - 2) + 'px';
});

// Código para leitura de texto
document.getElementById('readButton').addEventListener('click', function() {
    var text = document.getElementById('textToRead').innerText;
    var speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'pt-BR'; // Define o idioma para português do Brasil
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
