let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let characterX = width / 2 - 50;
let characterY = height - 50;
let gameSpeed = 10;
let speed = 1000;//1sec
let x = Math.random() * (width - 40);
let x2 = Math.random() * (width - 40);
let y = (Math.random() * 100) + 420;
let hits = 0;
let bullets = [];

class Bullet {
    constructor(bulletX, bulletY) {
        this.bulletX = bulletX;
        this.bulletY = bulletY;
    }
    drawBullet() {
        context.fillStyle = 'yellow';
        context.fillRect(this.bulletX, this.bulletY, 5, 20);
    }
    animateBullet(direction = 1) {
        if (direction == 1)
            this.bulletY -= 10;
        else {
            this.bulletY += 10;
        }
    }
    checkBulletCollision(enemyX, enemyY) {
        return !(this.bulletX + 5 < enemyX || this.bulletX > enemyX + 50 || this.bulletY > enemyY + 50 || this.bulletY + 20 < enemyY); //enemy collision
    }
    checkBulletCollisionWithCover() {
        if (!(this.bulletX + 5 < x || this.bulletX > x + 50 || this.bulletY > y + 50 || this.bulletY + 20 < y)) {
            return true;
        } else if (!(this.bulletX + 5 < x2 || this.bulletX > x2 + 50 || this.bulletY > y + 50 || this.bulletY + 20 < y)) {
            return true;
        }
    }
}
class Enemy {
    constructor(enemyX, enemyY) {
        this.enemyX = enemyX;
        this.enemyY = enemyY
    }
    drawEnemy() {
        context.fillStyle = 'red';
        context.fillRect(this.enemyX, this.enemyY, 50, 50);
    }
    drawBoss() {
        context.fillStyle = 'red';
        context.fillRect(width / 2, 200, 150, 100);
    }
    animateEnemies() {
        this.enemyY += gameSpeed * 0.15;
    }
    checkCollision() {
        if (!(x + 80 < this.enemyX || x > this.enemyX + 50 || y > this.enemyY + 50 || y + 20 < this.enemyY)) {//cover 1 collision
            return true;
        } else if (!(x2 + 80 < this.enemyX || x2 > this.enemyX + 50 || y > this.enemyY + 50 || y + 20 < this.enemyY)) {//cover 1 collision
            return true;
        }
    }
    checkCharCollision() {
        return !(characterX + 100 < this.enemyX || characterX > this.enemyX + 50 || characterY > this.enemyY + 50 || characterY + 50 < this.enemyY)
    }
}

function drawCover(a, b) {
    context.fillStyle = 'white';
    context.fillRect(a, b, 80, 20);
    context.fill();
}

function drawCharacter() {
    context.fillStyle = 'blue';
    context.fillRect(characterX, characterY, 100, 50);
}
function drawScore() {
    context.fillStyle = 'white';

    context.font = '15px sans-serif';
    context.fillText("Kills: " + hits, width - 50, 20, 30);

}
//
// MAIN FUNCTION
// 
(document.body).addEventListener('keydown', (e) => {
    if (e.keyCode == '37') {//left
        if (characterX > 0)
            characterX -= gameSpeed + gameSpeed / 2;
    }
    if (e.keyCode == '39') {//right
        if (characterX < width - 100)
            characterX += gameSpeed + gameSpeed / 2;
    }
    if (e.keyCode == '32') {
        //IMPLEMENT: shooting 
        bullets.push(new Bullet(characterX + 50, characterY - 25));
    }
});
let enemies = [];
let boss;

let intervl = setInterval(() => {
    for (let i = 0; i < 2; i++) {
        let enemy = new Enemy(Math.random() * (width - 50), Math.random() * -50);
        enemies.push(enemy);
    }
}, speed);


function drawGame() {
    clearScreen();
    drawCharacter();
    drawScore();
    drawCover(x, y);
    drawCover(x2, y);
    if (hits > 10) {
        clearInterval(intervl);
        enemies = [];
        boss = new Enemy(width / 2, 200);
        boss.drawBoss();
    }
    enemies.forEach(element => {
        element.drawEnemy();
        element.animateEnemies()
        if (element.checkCollision() || element.enemyY >= height) {
            enemies.splice(enemies.indexOf(element), 1)
        }
        else if (element.checkCharCollision()) {
            //alert('lost');
            //clearTimeout(timeout);
        }
        if (bullets.length != 0) {
            bullets.forEach(b => {
                b.drawBullet();
                b.animateBullet();
                if (b.bulletY <= 0 || b.checkBulletCollisionWithCover()) {
                    bullets.splice(bullets.indexOf(b), 1);
                }
                if (b.checkBulletCollision(element.enemyX, element.enemyY)) {
                    enemies.splice(enemies.indexOf(element), 1)
                    bullets.splice(bullets.indexOf(b), 1);
                    hits++;
                }
            });
        }
    });
    let timeout = setTimeout(drawGame, gameSpeed);
}
function clearScreen() {
    context.fillStyle = 'rgb(20, 20, 20)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}
drawGame();