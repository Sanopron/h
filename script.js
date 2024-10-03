const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let currentColor = 'white'; // Default color for painting
let enemies = [];

// Function to change the current color
function changeColor(color) {
    currentColor = color;
}

// Function to paint on the canvas
canvas.addEventListener('mousemove', (event) => {
    if (event.buttons === 1) { // Check if the left mouse button is pressed
        ctx.fillStyle = currentColor;
        ctx.beginPath();
        ctx.arc(event.clientX, event.clientY, 20, 0, Math.PI * 2);
        ctx.fill();
    }
});

// Enemy class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30; // Size of the enemy
    }

    draw() {
        ctx.fillStyle = 'black'; // Color of the enemy
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
        // Move towards the center of the canvas
        const mouseX = canvas.width / 2; // Center of the canvas
        const mouseY = canvas.height / 2; // Center of the canvas
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize the direction
        if (distance > 0) {
            this.x += (dx / distance) * 0.5; // Move towards the center
            this.y += (dy / distance) * 0.5; // Move towards the center
        }
    }
}

// Create enemies
function createEnemies() {
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        enemies.push(new Enemy(x, y));
    }
}

// Update the game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    requestAnimationFrame(update);
}

// Initialize the game
createEnemies();
update();
