var chess = document.getElementsByClassName("chess")[0];
var grid;
var chessNum = 15;
var count = 0;
var block = false;

function init() {
    grid = new Array(chessNum);
    for(var i=0; i<chessNum; i++) {
        grid[i] = new Array(chessNum);
        for(var j=0; j<chessNum; j++) {
            grid[i][j] = createGrid(j, i);
            grid[i][j].onclick = function () {
                if(this.value > 0 || block) {
                    return;
                }
                block = true;
                this.style.backgroundImage = "url(./img/" + (count % 2 + 1) + ".png)";
                this.value = count % 2 + 1;
                count++;
                var result = checkFinish();
                if(result == 0) {
                    block = false;
                } else {
                    setTimeout(function () {
                        alert(result == 1 ? "黑棋胜" : "白棋胜");
                    }, 200);
                }
            }
            chess.appendChild(grid[i][j]);
        }
    }
    
}

function createGrid(x, y) {
    var temp = document.createElement("div");
    temp.className = "grid";
    temp.value = 0;
    temp.style.left = x*50 + 7 + "px";
    temp.style.top = y*50 + 7 + "px";
    return temp;
}

function checkFinish() {
    for(var i=0; i<grid.length; i++) {
        for(var j=0; j<grid[i].length; j++) {
            if(grid[i][j].value == 0) {
                continue;
            }
            var result = checkLine(i, j);
            if(result > 0) {
                return result;
            }
        }
    }
    return 0;
}

function checkLine(x, y) {
    var result1 = 3, result2 = 3, result3 = 3, result4 = 3;
    for(var i=0; i<5; i++) {
        result1 &= y + i > 14 ? 0 : grid[x][y + i].value; // 横
        result2 &= x + i > 14 ? 0 : grid[x + i][y].value; // 纵
        result3 &= x + i > 14 || y - i < 0 ? 0 :grid[x + i][y - i].value; // 斜上
        result4 &= x + i > 14 || y + i > 14 ? 0 : grid[x + i][y + i].value; // 斜下
    }
    return result1 | result2 | result3 | result4;
}

init();