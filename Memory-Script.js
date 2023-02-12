

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

const ITEMS = [
  { name: "Alpaka", image: "alpaka.png" },
  { name: "Bar", image: "bar.png" },
  { name: "Elefant", image: "elefant.png" },
  { name: "Flamingo", image: "flamingo.png" },
  { name: "Fuchs", image: "fuchs.png" },
  { name: "Krokodil", image: "krokodil.png" },
  { name: "Panda", image: "pandabar.png" },
  { name: "Zebra", image: "zebra.png" },
];



const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1); }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
  
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>Herzlichen Glückwunsch</h2>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

startButton.addEventListener("click", () => {
  Punkte = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(timeGenerator, 1000);
  initializer();
});

stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

const initializer = () => {
  result.innerText = "";
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

const x = 10;
let highscore = 0;

function incrementHighscore() {
  highscore += x;
  document.querySelector("#highscore").innerHTML = `Highscore: ${highscore}`;
}

function decrementHighscore() {
  if (highscore > x / 2) {
    highscore -= x / 2;
    document.querySelector("#highscore").innerHTML = `Highscore: ${highscore}`;
  }
}

if (firstCardValue == secondCardValue) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard = false;
    winCount += 1;
    incrementHighscore();
    if (winCount == Math.floor(cardValues.length / 2)) {
    result.innerHTML = <h2>Herzlichen Glückwunsch</h2>;
    stopGame();
    }
    } else {
    decrementHighscore();
    let [tempFirst, tempSecond] = [firstCard, secondCard];
    firstCard = false;
    secondCard = false;
    let delay = setTimeout(() => {
    tempFirst.classList.remove("flipped");
    tempSecond.classList.remove("flipped");
    }, 900);
    }