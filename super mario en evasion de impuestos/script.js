const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const spriteSheet = new Image();
spriteSheet.src = 'Dx9WgkSXQAA5F7D.png'; // Asegúrate de que esta ruta sea correcta

const player = {
    x: 100,
    y: 50,
    width: 32, // Ajusta estas dimensiones si es necesario
    height: 78,
    frameX: 9,
    frameY: 9,
    speed: 5,
    velY: 0,
    jumping: false,
    grounded: false
};

const keys = [];
const gravity = 0.6;

const obstacles = [
    { x: 200, y: 550, width: 50, height: 50 },
    { x: 400, y: 500, width: 50, height: 100 },
    { x: 600, y: 450, width: 50, height: 150 }
];

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    drawSprite(spriteSheet, player.frameX * player.width, player.frameY * player.height, player.width, player.height, player.x, player.y, player.width, player.height);

    // Draw obstacles
    obstacles.forEach(obstacle => {
        ctx.fillStyle = 'brown';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    movePlayer();
    requestAnimationFrame(animate);
}

function movePlayer() {
    if (keys['ArrowUp'] && !player.jumping) {
        player.velY = -player.speed * 2;
        player.jumping = true;
        player.grounded = false;
    }
    if (keys['ArrowRight']) {
        player.x += player.speed;
        player.frameY = 2;
    }
    if (keys['ArrowLeft']) {
        player.x -= player.speed;
        player.frameY = 1;
    }

    player.velY += gravity;
    player.y += player.velY;

    if (player.y >= canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.jumping = false;
        player.grounded = true;
    }

    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            player.grounded = true;
            player.jumping = false;
            player.y = obstacle.y - player.height;
        }
    });

    if (player.grounded) {
        player.velY = 0;
    } else {
        player.grounded = false;
    }
}

window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
    player.moving = true;
});

window.addEventListener('keyup', function (e) {
    keys[e.key] = false;
    player.moving = false;
});

spriteSheet.onload = function () {
    animate();
};
