const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const leftArr = document.querySelector("#left-arr");
const rightArr = document.querySelector("#right-arr");
const upArr = document.querySelector("#up-arr");
const downArr = document.querySelector("#down-arr");


const snakeSize = 20;
let dx = snakeSize;
let dy = 0;
let snake = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snakePart.x, snakePart.y, snakeSize, snakeSize);
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    const ateFood = snake[0].x === food.x && snake[0].y === food.y;
    if (ateFood) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * canvas.width / snakeSize) * snakeSize;
    food.y = Math.floor(Math.random() * canvas.height / snakeSize) * snakeSize;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollision() {
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function main() {
    if (checkCollision()) {
        alert('Game Over!');
        return;
    }

    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();

    setTimeout(main, 200);
}

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    const goingUp = dy === -snakeSize;
    const goingDown = dy === snakeSize;
    const goingRight = dx === snakeSize;
    const goingLeft = dx === -snakeSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -snakeSize;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -snakeSize;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = snakeSize;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = snakeSize;
    }
}

generateFood();
main();


rightArr.addEventListener("click", (e) => {
    const goingLeft = dx === -snakeSize;
    if (!goingLeft) {
        dx = snakeSize;
        dy = 0;
    }
});
leftArr.addEventListener("click", (e) => {
    const goingRight = dx === snakeSize;
    if (!goingRight) {
        dx = -snakeSize;
        dy = 0;
    }
});
downArr.addEventListener("click", (e) => {
    const goingUp = dy === -snakeSize;
    if (!goingUp) {
        dx = 0;
        dy = snakeSize;
    }

});
upArr.addEventListener("click", (e) => {
    const goingDown = dy === snakeSize;
    if (!goingDown) {
        dx = 0;
        dy = -snakeSize;
    }
});