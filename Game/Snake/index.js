var start = document.getElementsByClassName("start")[0];
var game = document.getElementsByClassName("game")[0];
var over = document.getElementsByClassName("over")[0];
var content = document.getElementsByClassName("content")[0];
var play = document.getElementsByClassName("play")[0];
var again = document.getElementsByClassName("again")[0];
var scoreBox = document.getElementsByClassName("score")[0];
var scoreShow = document.getElementsByClassName("scoreShow")[0];
var level = document.getElementsByClassName("level");
var snakeMove = null;
var SPEED = 150;
var speed = SPEED;
var pauseBool = true;

play.addEventListener("click", function () {
    start.style.display = "none";
    game.style.display = "block";
    init();
});

again.addEventListener("click", function () {
    over.style.display = "none";
    game.style.display = "block";
    startGame();
});

level[0].addEventListener("click", chooseLevel);

level[1].addEventListener("click", chooseLevel);

// 选择游戏难度
function chooseLevel(e) {
    speed = SPEED;
    e = e || window.event;
    var target = e.target || e.srcElement;
    if(target.nodeName == "A") {
        var listA = target.parentNode.parentNode.getElementsByTagName("a");
        for(var i=0; i<listA.length; i++) {
            listA[i].classList.remove("active");
        }
        target.classList.add("active");
        var levelVal = target.getAttribute("value");
        switch(levelVal) {
            case "easy":
                break;
            case "normal":
                speed -= 50;
                break;
            case "hard":
                speed -= 100;
                break;
        }
    }
}

// 初始化游戏界面
function init() {
    this.foodX = 0;
    this.foodY = 0;
    this.snakeBody = [[3,1], [2,1], [1,1]];
    this.direct = "right";
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;

    startGame();
}

// 开始游戏
function startGame() {
    scoreBox.innerHTML = this.score;
    food();
    snake();
    snakeMove = setInterval(function () {
        move();
    }, speed);
    bindEvent();
}

// 创建食物
function food() {
    var food = document.createElement("div");
    food.classList.add("food");
    this.foodX = Math.floor(Math.random() * 40);
    this.foodY = Math.floor(Math.random() * 40);
    food.style.left = this.foodX * 10 + "px";
    food.style.top = this.foodY * 10 + "px";
    content.appendChild(food);
}


// 创建蛇
function snake() {
    for(var i=0; i<this.snakeBody.length; i++) {
        var snake = document.createElement("div");
        snake.style.left = this.snakeBody[i][0] * 10 + "px";
        snake.style.top = this.snakeBody[i][1] * 10 + "px";
        snake.classList.add("snake");
        content.appendChild(snake);
    }
}

// 蛇移动
function move() {
    for(var i=this.snakeBody.length-1; i>0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch(this.direct) {
        case "left":
            this.snakeBody[0][0] -= 1;
            break;
        case "up":
            this.snakeBody[0][1] -= 1;
            break;
        case "right":
            this.snakeBody[0][0] += 1;
            break;
        case "down":
            this.snakeBody[0][1] += 1;
            break;
    }
    removeClass("snake");
    snake();
    // 蛇吃食物
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch(this.direct) {
            case "left":
                this.snakeBody.push([this.snakeEndX - 1, this.snakeEndY]);
                break;
            case "up":
                this.snakeBody.push([this.snakeEndX, this.snakeEndY - 1]);
                break;
            case "right":
                this.snakeBody.push([this.snakeEndX + 1, this.snakeEndY]);
                break;
            case "down":
                this.snakeBody.push([this.snakeEndX, this.snakeEndY + 1]);
                break;
        }
        removeClass("food");
        food();
        this.score++;
        scoreBox.innerHTML = this.score;
    }
    // 判断游戏结束条件，蛇与边界自身碰撞
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= 40) {
        gameOver();
    }
    if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= 40) {
        gameOver();
    }
    var snakeHeadX = this.snakeBody[0][0];
    var snakeHeadY = this.snakeBody[0][1];
    for(var i=1; i<this.snakeBody.length; i++) {
        if(snakeHeadX == this.snakeBody[i][0] && snakeHeadY == this.snakeBody[i][1]) {
            gameOver();
        }
    }
}

// 游戏结束
function gameOver() {
    clearInterval(snakeMove);
    removeClass("snake");
    removeClass("food");
    this.snakeBody = [[3,1], [2,1], [1,1]];
    this.direct = "right";
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    game.style.display = "none";
    over.style.display = "block";
    scoreShow.innerHTML = this.score;
    this.score = 0;
}

// removeClass 删除蛇和食物
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while(ele.length) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

// 键盘控制方向
function setDirect(code) {
    switch(code) {
        case 37:
            if(this.left) {
                this.direct = "left";
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if(this.up) {
                this.direct = "up";
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if(this.right) {
                this.direct = "right";
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if(this.down) {
                this.direct = "down";
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
    }
}

function bindEvent() {
    document.addEventListener("keydown", function (e) {
        var code = e.keyCode;
        setDirect(code);
        // pause 空格暂停
        if(code == 32) {
            if(pauseBool) {
                clearInterval(snakeMove);
                pauseBool = false;
            } else {
                snakeMove = setInterval(function () {
                    move();
                }, speed);
                pauseBool = true;
            }
        }
    });
}