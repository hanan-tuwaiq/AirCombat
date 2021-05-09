let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let body = document.body;
const width = canvas.width;
const height = canvas.height;
let characterX = width / 2 - 50;
let characterY = height - 50;
let gameSpeed = 10;
let speed = 1000;//1sec
let x = Math.random() * (width - 40);
let x2 = Math.random() * (width - 40);
let y = (Math.random() * 100) + 420;
let bullets = 0;

function drawCover(a, b) {
    context.fillStyle = 'white';
    context.fillRect(a, b, 80, 20);
    context.fill();
}

function drawCharacter() {
    context.fillStyle = 'blue';
    context.fillRect(characterX, characterY, 100, 50);
}

body.addEventListener('keydown', (e) => {
    if (e.keyCode == '37') {//left
        characterX -= gameSpeed;
    }
    if (e.keyCode == '39') {//right
        characterX += gameSpeed;
    }
});
class Enemy {
    constructor(enemyX, enemyY) {
        this.enemyX = enemyX;
        this.enemyY = enemyY
    }
    drawEnemy() {
        context.fillStyle = 'red';
        context.fillRect(this.enemyX, this.enemyY, 50, 50);
    }
    animateEnemies() {
        this.enemyY += gameSpeed * 0.25;
    }
    checkCollision() {
        if (!(x + 80 < this.enemyX || x > this.enemyX + 50 || y > this.enemyY + 50 || y + 20 < this.enemyY)) {//cover 1 collision
            return true;
        } else if (!(x2 + 80 < this.enemyX || x2 > this.enemyX + 50 || y > this.enemyY + 50 || y + 20 < this.enemyY)) {//cover 1 collision
            return true;
        }
    }
    checkCollisionWithCharacter(){
        return !(characterX + 100 < this.enemyX || characterX > this.enemyX + 50 || characterY > this.enemyY + 50 || characterY + 50 < this.enemyY)
    }
}
//
// MAIN FUNCTION
//
let enemies = [];
if (bullets < 50) {
    setInterval(() => {
        for (let i = 0; i < 2; i++) {
            let enemy = new Enemy(Math.random() * (width - 50), Math.random() * -50);
            enemies.push(enemy);
        }
    }, speed);
}
function drawGame() {
    clearScreen();
    drawCharacter();
    drawCover(x, y);
    drawCover(x2, y);
    enemies.forEach(element => {
        element.drawEnemy();
        element.animateEnemies()
        if (element.checkCollision()) {
            enemies.splice(enemies.indexOf(element), 1)
        }
        else if(element.checkCollisionWithCharacter()){
            alert('lost');
            clearTimeout(timeout);
        }
    });
    let timeout = setTimeout(drawGame, gameSpeed);
}
function clearScreen() {
    context.fillStyle = 'rgb(20, 20, 20)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}
drawGame();