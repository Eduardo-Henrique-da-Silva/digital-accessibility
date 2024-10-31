const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
let drawing = false;
let currentColor = 'black';

// Inicializando o evento de desenho
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

canvas.addEventListener('mousemove', draw);

// Função para desenhar no canvas
function draw(event) {
    if (!drawing) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Seleção de cor da paleta
document.getElementById('colorPalette').addEventListener('click', (event) => {
    if (event.target.classList.contains('color')) {
        currentColor = event.target.getAttribute('data-color');
    }
});

// Mostrar mais cores
document.getElementById('moreColors').addEventListener('click', () => {
    const extraColors = ['purple', 'orange', 'pink', 'brown', 'grey'];
    const colorPalette = document.getElementById('colorPalette');

    extraColors.forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.classList.add('color');
        colorButton.style.backgroundColor = color;
        colorButton.setAttribute('data-color', color);
        colorPalette.insertBefore(colorButton, document.getElementById('moreColors'));
    });

    document.getElementById('moreColors').disabled = true;
});
