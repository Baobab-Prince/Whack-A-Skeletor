const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let myPriceAudio = new Audio('sounds/price.mp3');
myPriceAudio.loop = true;

let evilLaugh = new Audio('sounds/laugh.mp3');
evilLaugh.volume = 0.7;

myPriceAudio.addEventListener(
  'ended',
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);
myPriceAudio.play();

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');

  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

moveMole();
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert('GAME OVER! Your final score is ' + result);
    evilLaugh.play();
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      evilLaugh.play();
    }
  }
}

let countDownTimerId = setInterval(countDown, 1000);
