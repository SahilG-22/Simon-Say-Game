let gameSeq = [];
let userSeq = [];
let highestScore = 1;
let HighScoreOut = document.querySelector(".highScore");
let score = 1;

let body = document.querySelector("body");

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started!");
    started = true;

    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randInd = Math.floor(Math.random() * 3);
  let randColor = btns[randInd];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  btnFlash(randBtn);
}

function checkAns(ind) {
  if (userSeq[ind] === gameSeq[ind]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
      highestScore++;
    }
  } else {
    score = highestScore;
    printHScore();
    body.style.backgroundColor = "red";
    setTimeout(function () {
      body.style.backgroundColor = "darkgray";
    }, 150);
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start again`;
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".inner");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function printHScore() {
  HighScoreOut.innerText = `Highest Score: ${score}`;
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  highestScore = 0;
}
