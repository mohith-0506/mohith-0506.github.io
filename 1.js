var blocksize = 33;
var rows = 20;
var col = 20;
var board;
var context;

var snakeX = blocksize * 10;
var snakeY = blocksize * 10;

var score = 0;
let highscore = localStorage.getItem(".highs") || 0;
document.querySelector(".highs").innerText = highscore;
var high = 0;

var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var snakebody = [];

var gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = col * blocksize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", ChangeDirection);
    setInterval(update,100);
}

function update(){
    if(gameOver){
        return;
    }
    
    colorBoard();

    context.fillStyle = "#FFA500";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if(snakeX == foodX && snakeY == foodY){
        snakebody.push([foodX, foodY]);
        placeFood();
        var scor = document.querySelector(".score");
        scor.textContent = ++score;

        high = score >= highscore ? score : highscore;
        localStorage.setItem(".highs", high);
        document.querySelector(".highs").innerText = high;
    }

    for(let i = snakebody.length - 1; i > 0; i--)
    {
        snakebody[i] = snakebody[i-1];
    }
    if(snakebody.length){
        snakebody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "#FF6347";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for(let i = 0; i < snakebody.length; i++)
    {
        context.fillStyle = "#32CD32";
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
    }

    

    if(snakeX == 0 && velocityX == -1){
        velocityY = -1;
        velocityX = 0;
    }

    else if(snakeY == 0 && velocityY == -1){
        velocityY = 0;
        velocityX = 1;
    }

    else if(snakeX == ((col-1)*blocksize) && velocityX == 1){
        velocityY = 1;
        velocityX = 0;
    }

    else if(snakeY == ((rows-1)*blocksize) && velocityY == 1){
        velocityY = 0;
        velocityX = -1;
    }

    if(snakeX < 0 || snakeX > col*blocksize || snakeY < 0 || snakeY > rows*blocksize){
        gameOver = true;
        alert("Game Over!! Click on 'OK' button to restart the game");
        if(alert)
        {
            window.location.reload();
        }
        return;
    }

    for(let i = 0; i < snakebody.length; i ++)
    {
        if(snakeX == snakebody[i][0] && snakeY == snakebody[i][1])
        {
            gameOver = true;
            alert("Game Over!! Click on 'OK' to restart the game");
            if(alert)
            {
                window.location.reload();
            }
            return;
        }
    }
}

function placeFood(){
    foodX = Math.floor(Math.random() * col) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
}

function ChangeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
}

function colorBoard(){
    for(let i = 0; i < rows; i ++){
        for(let j = 0; j < col; j ++){
            if((i+j)%2 == 0){
                context.fillStyle = " #dddddd";
                context.fillRect(i*blocksize, j*blocksize, blocksize, blocksize);
            }
            else{
                context.fillStyle = "#cccccc"
                context.fillRect(i*blocksize, j*blocksize, blocksize, blocksize);
            }
        }
    }
}