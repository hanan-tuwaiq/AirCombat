let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let characterX = width / 2 - 50;
let characterY = height - 110;
let gameSpeed = 10;
let x = Math.random() * (width - 40);
let x2 = Math.random() * (width - 40);
let y = (Math.random() * 100) + 360;
let hits = 0;
let bullets = [];
let enemies = [];
let boss;
let bossBullets = [];
let bossShooting;
let bossHealth = 20;
let shot = false;

function drawCover(a, b) {
    context.fillStyle = 'white';
    context.fillRect(a, b, 80, 10);
    context.fill();
}

function drawCharacter() {
    let pJet = new Image();
    pJet.src = "assets/player-jet.png";
    context.drawImage(pJet, characterX, characterY, 72.5, 105);
}

function drawScore() {
    context.fillStyle = 'yellow';
    context.font = '20px sans-serif';
    context.fillText("Kills: " + hits, width - 50, 30, 40);
    if (hits >= 50) {
        context.fillText("Health: " + bossHealth, width - 50, 70, 40);
    }
}

let enemiesSpawn = setInterval(() => {
    for (let i = 0; i < 2; i++) {
        let enemy = new Enemy(Math.random() * (width - 100), Math.random() * - 50, 12, 50);
        enemies.push(enemy);
    }
}, 1000);

boss = new Boss(width / 2 - 50, 100);
bossShooting = setInterval(() => {
    if (Math.floor(Math.random() * 10) % 2 == 0)
        bossBullets.push(new Bullet(boss.bossX + 50, boss.bossY + 100));
}, 500);
let gameOver = false;

//BACKGROUND
let skyImage = new Image();
skyImage.src = "assets/sky-bg.png";
let imageY = -1200;
let imageY2 = -2400;
function drawBackgroundImage() {
    context.drawImage(skyImage, 0, imageY);
    context.drawImage(skyImage, 0, imageY2);
    imageY += 1;
    imageY2 += 1;
    if (imageY > 1200) imageY = -1200;
    if (imageY2 > 1200) imageY2 = -1200;
}

function drawGame() {
    clearScreen();
    drawBackgroundImage();
    drawCharacter();
    drawScore();
    drawCover(x, y);
    drawCover(x2, y);

    if (hits < 50) {
        level1();
    } else {
        level2();
    }
    if (shot) {    
        bullets.forEach(bullet => {
            bullet.drawBullet("https://github.com/hanan-tuwaiq/AirCombat/blob/53759ca6345b1cacca43c5935304656762cbb2d4/assets/bullet.PNG");
            bullet.animateBullet();
            enemies.forEach(en => {
                if (bullet.checkBulletCollision(en.enemyX, en.enemyY, 12, 50)) {
                    hits++;
                    bullets.splice(bullets.indexOf(bullet), 1);
                    enemies.splice(enemies.indexOf(en), 1);   
                }
                if (bullet.bulletY <= 0 || bullet.checkBulletCollisionWithCover()) {
                    bullets.splice(bullets.indexOf(bullet), 1);
                }
            });
        });
    }
    let timeout = setTimeout(drawGame, gameSpeed);
    if (gameOver) {
        drawScore();
        clearTimeout(timeout);
    }
}

function clearScreen() {
    context.fillStyle = '#2757A6';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function level1() {
    enemies.forEach(element => {
        element.drawEnemy();
        if (element.checkCollision() || element.enemyY >= height) {
            enemies.splice(enemies.indexOf(element), 1);
        } else if (element.checkCharCollision()) {
            context.fillStyle = 'red';
            context.font = '35px sans-serif';
            context.fillText("LOST", width / 2 - 50, height / 2 - 50, 100);
            gameOver = true;
        }
    });
}

function level2() {
    clearInterval(enemiesSpawn);
    enemies = [];
    boss.drawBoss();
    boss.animateBoss();
    if (bossBullets.length != 0) {
        bossBullets.forEach(bossBullet => {
            bossBullet.drawBullet("/assets/bullet-boss.png");
            bossBullet.animateBullet(2);
            if (bossBullet.bulletY >= height || bossBullet.checkBulletCollisionWithCover()) {
                bossBullets.splice(bossBullets.indexOf(bossBullet), 1);
            }
            if (bossBullet.checkBulletCollision(characterX, characterY, 72.5, 105)) {
                context.fillStyle = 'red';
                context.font = '35px sans-serif';
                context.fillText("LOST", width / 2 - 50, height / 2 - 50, 100);
                gameOver = true;
            }
            //winning code
            bullets.forEach(b => {
                if (boss.checkBossHealth(b)) {
                    bullets.splice(bullets.indexOf(b), 1);
                    bossHealth--;
                    if (bossHealth == 0) {
                        context.fillStyle = 'yellow';
                        context.font = '35px sans-serif';
                        context.fillText("Winner!", width / 2 - 50, height / 2 - 50, 100);
                        clearInterval(bossShooting);
                        gameOver = true;
                    }
                }
            })
        });
    }
}

(document.body).addEventListener('keydown', (e) => {
    if (e.keyCode == '37') { //left
        if (characterX > 0)
            characterX -= gameSpeed * 3;
    }
    if (e.keyCode == '39') { //right
        if (characterX < width - 100)
            characterX += gameSpeed * 3;
    }
    if (e.keyCode == '32') { //space bar
        bullets.push(new Bullet(characterX + 30, characterY - 25));
        shot = true;
    }
});
drawGame();
