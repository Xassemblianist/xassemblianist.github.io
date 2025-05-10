const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');

let player1Score = 0;
let player2Score = 0;

// Canvas boyutunu ayarla (mobil uyumlu hale getirmek için dinamik olabilir)
function resizeCanvas() {
    const maxWidth = 600; // Maksimum genişlik
    const maxHeight = 400; // Maksimum yükseklik
    const aspectRatio = maxWidth / maxHeight;

    let newWidth = window.innerWidth * 0.9; // Ekran genişliğinin %90'ı
    let newHeight = window.innerHeight * 0.7; // Ekran yüksekliğinin %70'i

    if (newWidth / newHeight > aspectRatio) {
        newWidth = newHeight * aspectRatio;
    } else {
        newHeight = newWidth / aspectRatio;
    }

    // Belirlenen maksimum boyutları geçmemesini sağla
    canvas.width = Math.min(newWidth, maxWidth);
    canvas.height = Math.min(newHeight, maxHeight);
}

// Oyuncu nesnesi (örnek)
const player1 = {
    x: 50,
    y: canvas.height / 2 - 25, // Ortalamak için
    width: 20,
    height: 50,
    color: 'blue',
    speed: 5,
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    moveUp: function() {
        if (this.y > 0) this.y -= this.speed;
    },
    moveDown: function() {
        if (this.y < canvas.height - this.height) this.y += this.speed;
    }
    // moveLeft, moveRight, shoot vb. eklenebilir
};

// Top nesnesi (örnek)
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: 'white',
    dx: 3, // X yönündeki hız
    dy: 3, // Y yönündeki hız
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    },
    move: function() {
        this.x += this.dx;
        this.y += this.dy;

        // Duvarlardan sekme (basit)
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy *= -1;
        }
    }
};

// Kontrol Butonları (Örnek)
const btnUp = document.getElementById('btnUp');
const btnDown = document.getElementById('btnDown');
// Diğer butonlar...

btnUp.addEventListener('touchstart', () => player1.moveUp()); // Mobil için
btnUp.addEventListener('mousedown', () => player1.moveUp()); // Masaüstü için (test)
btnDown.addEventListener('touchstart', () => player1.moveDown());
btnDown.addEventListener('mousedown', () => player1.moveDown());


// Oyun Döngüsü
function gameLoop() {
    // Sahneyi temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Nesneleri çiz
    player1.draw();
    // player2.draw(); (eğer varsa)
    ball.draw();

    // Nesneleri hareket ettir
    ball.move();
    // player1.move(); (klavye/dokunmatik girdisine göre)

    // Çarpışmaları kontrol et (çok basit bir örnek)
    // if (ballCollidesWithPlayer(ball, player1)) { ... }
    // if (ballInGoal1(ball)) { player2Score++; updateScore(); resetBall(); }
    // if (ballInGoal2(ball)) { player1Score++; updateScore(); resetBall(); }


    requestAnimationFrame(gameLoop); // Döngüyü tekrar çağır
}

function updateScore() {
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
}

// Başlangıç ayarları
window.addEventListener('resize', resizeCanvas); // Ekran boyutu değiştiğinde canvası yeniden boyutlandır
resizeCanvas(); // İlk yüklemede canvas boyutunu ayarla
player1.y = canvas.height / 2 - player1.height / 2; // Oyuncuyu dikeyde ortala
ball.x = canvas.width / 2;
ball.y = canvas.height / 2;

gameLoop(); // Oyunu başlat


