setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
let playerScore = 0;
let computerScore = 0;

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

document.getElementById("nameForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const playerName = document.getElementById("playerName").value;
    document.getElementById("playerNameDisplay").textContent = playerName;
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "You win this round!";
      resultDivs[0].classList.toggle("winner");
      playerScore += 1;
    } else if (aiWins) {
      resultText.innerText = "Computer wins this round!";
      resultDivs[1].classList.toggle("winner");
      computerScore += 1;
    } else {
      resultText.innerText = "It's a draw!";
    }

    updateScore();

    if (playerScore === 3 || computerScore === 3) {
      setTimeout(() => {
        if (playerScore === 3) {
          resultText.innerText = "You win the game!";
        } else {
          resultText.innerText = "Computer wins the game!";
        }
        resultWinner.classList.remove("hidden");
        playAgainBtn.style.display = "block";
      }, 2000);
    } else {
      setTimeout(restartGame, 2000);
    }
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function updateScore() {
  scoreNumber.innerText = `${playerScore} - ${computerScore}`;
}

function restartGame() {
  if (playerScore === 3 || computerScore === 3) {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    gameDiv.classList.remove("hidden");
    resultsDiv.classList.add("hidden");
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
    resultText.innerText = "";
    resultWinner.classList.add("hidden");
    playAgainBtn.style.display = "none";
  } else {
    gameDiv.classList.remove("hidden");
    resultsDiv.classList.add("hidden");
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
    resultText.innerText = "";
    resultWinner.classList.add("hidden");
    playAgainBtn.style.display = "none";
  }
}


playAgainBtn.addEventListener("click", () => {
  restartGame();
});

btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
