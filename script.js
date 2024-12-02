const canvas = document.getElementById('batCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bats = [];

function createBats() {
    for (let i = 0; i < 25; i++) {
        bats.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            size: Math.random() * 40 + 10,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 2 - 1,
            wingPosition: 0
        });
    }
}

function drawBat(x, y, size, wingPosition) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.ellipse(x, y, size, size / 3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.quadraticCurveTo(x - size / 2, y + wingPosition, x, y);
    ctx.moveTo(x + size, y);
    ctx.quadraticCurveTo(x + size / 2, y + wingPosition, x, y);
    ctx.fill();
}

function updateBats() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bats.forEach(bat => {
        bat.x += bat.speedX;
        bat.y += bat.speedY;
        bat.wingPosition = Math.sin(Date.now() / 200) * 20;

        if (bat.x > canvas.width) bat.x = 0;
        if (bat.y > canvas.height || bat.y < 0) bat.y = canvas.height / 2;

        drawBat(bat.x, bat.y, bat.size, bat.wingPosition);
    });

    requestAnimationFrame(updateBats);
}

createBats();
updateBats();
