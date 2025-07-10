// Tic Tac Toe Logic -----
// game works on patterns to get matched to declare a win
// so all patterns should be listed
// we can use buttons or divs as clickable fields_container
// have to manage ---
// - win case
// - draw case
// - reset case

const fields = document.querySelectorAll(".field");
const restartBtn = document.querySelectorAll(".restart-btn");
const gameContainer = document.querySelector(".game-page");
const winnerContainer = document.querySelector(".show-winner-container");
const drawContainer = document.querySelector(".draw-match-container");
const winnerSymbol = document.querySelector("#winner-symbol");
let currentPlayer = "X";
let running = true;
let turnCount = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

playGame();

function playGame() {
    fields.forEach((field) => {
        field.addEventListener("click", clickedField);
    });
    restartBtn.forEach((btns) => {
        btns.addEventListener("click", restartGame);
    });
}

function clickedField(event) {
    if (running) {
        if (event.target.textContent == "") {
            event.target.textContent = currentPlayer;
            turnCount++;
            checkWinner();
            if (running) {
                changePlayer();
            }
        }
        if (running && turnCount === 9) {
            setTimeout(drawGame, 1000);
        }
    }
}

function checkWinner() {
    if (running) {
        for (const pattern of winPatterns) {
            let fieldA = fields[pattern[0]].textContent;
            let fieldB = fields[pattern[1]].textContent;
            let fieldC = fields[pattern[2]].textContent;
            if (fieldA != "" && fieldB != "" && fieldC != "") {
                if (fieldA === fieldB && fieldB === fieldC) {
                    running = false;
                    setTimeout(showWinner, 1000);
                    break;
                }
            }
        }
    }
}

function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
}

function restartGame() {
    turnCount = 0;
    winnerSymbol.textContent = "";
    winnerContainer.classList.remove("popup");
    drawContainer.classList.remove("popup");
    gameContainer.classList.add("popup");
    fields.forEach((field) => {
        field.textContent = "";
    });
    currentPlayer = "X";
    running = true;
}

function showWinner() {
    winnerSymbol.textContent = currentPlayer;
    winnerContainer.classList.add("popup");
    gameContainer.classList.remove("popup");
    drawContainer.classList.remove("popup");
}

function drawGame() {
    drawContainer.classList.add("popup");
    gameContainer.classList.remove("popup");
    winnerContainer.classList.remove("popup");
}
