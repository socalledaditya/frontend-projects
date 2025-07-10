const choices = document.querySelectorAll(".choice");
const user_score = document.getElementById("user-score");
const comp_score = document.getElementById("comp-score");
const statusText = document.getElementById("status-text");
const gameChoices = ["rock", "paper", "scissors"];

let intCompScore = 0;
let intUserScore = 0;

let compChoice;
let userChoice;
choices.forEach((choice) => {
    choice.addEventListener("click", (evt) => {
        userChoice = evt.target.getAttribute("id");
        console.log("user: " + userChoice);
        compChoice = gameChoices[Math.floor(Math.random() * 3)];
        console.log("comp: " + compChoice);
        let userwin = checkWinner();
        if (userwin) {
            updateStatusText('User', compChoice);
        } else {
            updateStatusText("Comp", userChoice);
        }
    });
});

function updateScore(whoseScore, updatedScore) {
    whoseScore.textContent = updatedScore;
}

function updateStatusText(winner, losserChoice) {
    if (userChoice != compChoice) {
        statusText.textContent = `${winner} beats ${losserChoice}`;
    }
}

const winConditions = [
    // [user, comp]
    ["rock", "scissors"],
    ["paper", "rock"],
    ["scissors", "paper"],
];

function checkWinner() {
    if (userChoice != compChoice) {
        for (const condition of winConditions) {
            if (userChoice == condition[0] && compChoice == condition[1]) {
                intUserScore++;
                updateScore(user_score, intUserScore);
                return true;
            } else if (
                userChoice == condition[1] &&
                compChoice == condition[0]
            ) {
                intCompScore++;
                updateScore(comp_score, intCompScore);
                break;
            }
        }
    } else {
        drawCondition();
    }
}

function drawCondition() {
    statusText.textContent = "It was a draw !";
}
