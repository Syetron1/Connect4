var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;
var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];



window.onload = function() {
    setGame();
}


function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c]; 

    if (r < 0) { 
        return;
    }

    board[r][c] = currPlayer; 
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    r -= 1; 
    currColumns[c] = r; 

    checkWinner();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}



const button = document.querySelector(".button-75");



button.addEventListener("click", (e) => {

  const player1 = document.querySelector("#redPlayerName").value;
  const player2 = document.querySelector("#yellowPlayerName").value;

  if(!player1 || !player2) {
    e.preventDefault(); 
    alert("Please enter names for both players"); 
    return;
  }

});

function passValues(){
    var userNameRed = document.querySelector("#redPlayerName").value;
    var userNameYellow = document.querySelector("#yellowPlayerName").value;

    localStorage.setItem("textvalueRed", userNameRed);
    localStorage.setItem("textvalueYellow", userNameYellow);
    return false;
}


    
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    const h1 = document.createElement("h1");
    h1.id = "grats";
    document.getElementById("container").appendChild(h1)

    if (board[r][c] == playerRed) {
        h1.textContent =`Aaayyooo, ${localStorage.getItem("textvalueRed")} we won ♡ (っ＾▿＾) ♡ `;
        winner.innerHTML = `<img src="img/redWins.png">`;
    } else {
        h1.textContent =`Yeeeey, ${localStorage.getItem("textvalueYellow")} we won ☆ ʕ•́ᴥ•̀ʔっ `;
        winner.innerHTML = `<img src="img/yellowWins.png">`;
    }
    gameOver = true;
    playAgain();
    newGame();
    
}

function playAgain() {

    const button = document.createElement("button");

    const text = document.createTextNode("Play Again");
    button.appendChild(text);
    button.classList.add("button-77");
    button.type = "button";
    button.id = "refresh";
    button.addEventListener("click", function() {
    window.location.reload(); 
    });
  
    document.body.appendChild(button);
  
  }

  function newGame() {
    var button = document.createElement("button");
    button.classList.add("button-66");
    button.id = "newgame";
    button.textContent = "New Game";
    button.type = "button";
  
    button.addEventListener("click", function() {
      window.location.href = "index.html";
    });
    document.body.appendChild(button);
  }