const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = new Ball(canvas.width / 2, canvas.height - 30, 10, 2);
let bar = new Bar(canvas.width / 2 - 40, canvas.height - 10, 80, 10, 5);
let score = 0;
let gameOver = false;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") bar.dx = -1;
    if (e.key === "ArrowRight") bar.dx = 1;
});
document.addEventListener("keyup", () => bar.dx = 0);

function resetGame() {
    ball = new Ball(canvas.width / 2, canvas.height - 30, 10, 2);
    bar = new Bar(canvas.width / 2 - 40, canvas.height - 10, 80, 10, 5);
    score = 0;
    gameOver = false;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        ctx.font = "20px Arial";
        ctx.fillText("Game Over! Score: " + score, 120, 150);
        ctx.fillText("Nhấn phím Space để chơi lại", 100, 180);
        return;
    }

    ball.draw(ctx);
    bar.draw(ctx);

    // Va chạm thanh đỡ
    if (
        ball.y + ball.dy > canvas.height - ball.radius - bar.height &&
        ball.x > bar.x && ball.x < bar.x + bar.width
    ) {
        ball.dy = -ball.dy;
        ball.dx += bar.dx * 1.5;
    }

    // Game over
    if (ball.y + ball.dy > canvas.height - ball.radius) {
        gameOver = true;
    }

    ball.bounceWalls(canvas);
    ball.move();
    bar.move(canvas);

    score++;
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(draw);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && gameOver) {
        resetGame();
    }
});

draw();
