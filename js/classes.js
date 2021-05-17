class Bullet {
    constructor(bulletX, bulletY) {
        this.bulletX = bulletX;
        this.bulletY = bulletY;
    }
    drawBullet(src) {
        let bullet = new Image();
        bullet.src = src;
        context.drawImage(bullet, this.bulletX, this.bulletY, 20, 25);

    }
    animateBullet(direction = 1) {
        if (direction == 1)
            this.bulletY -= 3;
        else
            this.bulletY += 2;
    }
    checkBulletCollision(x, y, w, h) {
        return !(this.bulletX + 20 < x || this.bulletX > x + w || this.bulletY > y + h || this.bulletY + 25 < y); //enemy collision
    }
    checkBulletCollisionWithCover() {
        if (!(this.bulletX + 20 < x || this.bulletX > x + 80 || this.bulletY > y + 50 || this.bulletY + 25 < y)) {
            return true;
        } else if (!(this.bulletX + 20 < x2 || this.bulletX > x2 + 80 || this.bulletY > y + 50 || this.bulletY + 25 < y)) {
            return true;
        }
    }
}

class Enemy {
    constructor(enemyX, enemyY, enemyW, enemyH) {
        this.enemyX = enemyX;
        this.enemyY = enemyY;
        this.enemyW = enemyW;
        this.enemyH = enemyH;
    }
    drawEnemy() {
        let missile = new Image();
        missile.src = "assets/missile.png";
        context.drawImage(missile, this.enemyX, this.enemyY, this.enemyW, this.enemyH);
        this.enemyY += gameSpeed * 0.15;
    }
    checkCollision() {
        if (!(x + 80 < this.enemyX || x > this.enemyX + this.enemyW || y > this.enemyY + this.enemyH || y + 20 < this.enemyY)) { //cover 1 collision
            return true;
        } else if (!(x2 + 80 < this.enemyX || x2 > this.enemyX + this.enemyW || y > this.enemyY + this.enemyH || y + 20 < this.enemyY)) { //cover 1 collision
            return true;
        }
    }
    checkCharCollision() {
        return !(characterX + 72.5 < this.enemyX || characterX > this.enemyX + this.enemyW || characterY > this.enemyY + this.enemyH || characterY + 105 < this.enemyY)
    }
}

class Boss {
    dx = 1;
    dy = 1;
    constructor(bossX, bossY) {
        this.bossX = bossX;
        this.bossY = bossY;
    }
    drawBoss() {
        let bossImg = new Image();
        bossImg.src = "assets/boss-jet.png";
        context.drawImage(bossImg, this.bossX, this.bossY, 100, 100);
    }
    animateBoss() {
        if (this.bossX >= width - 100 || this.bossX < 0) {
            this.dx *= -1;
        }
        if (this.bossY >= 200 || this.bossY < 0) {
            this.dy *= -1;
        }
        this.bossX += this.dx;
        this.bossY += this.dy;
    }
    checkBossHealth(bullet) {
        return bullet.checkBulletCollision(this.bossX, this.bossY, 100, 100)
    }
}
