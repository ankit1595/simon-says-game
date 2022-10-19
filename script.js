let score = 1;
let patternArr = [];
let userArr = [];
let flag = true;
let userTurn = false;
let totalNoOfAttempts = 3;
let interval;
// let computerTurn = true;

const scoreElement = document.querySelector('.score_container');
const tiles = document.querySelectorAll('.tiles');
const attempts = document.querySelector('.attmepts');

const clip1 = document.querySelector('#clip1');
const clip2 = document.querySelector('#clip2');
const clip3 = document.querySelector('#clip3');
const clip4 = document.querySelector('#clip4');
const win = document.querySelector('#win');
const wrong = document.querySelector('#wrong');
const modelText = document.querySelector('#model-text');

var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: false,
});

attempts.textContent = totalNoOfAttempts;

scoreElement.addEventListener('click', () => {
  if (flag) {
    scoreElement.textContent = score;
    populatePattern();
    scoreElement.style.cursor = 'not-allowed';
    flag = false;
    userTurn = true;
    // computerTurn = false;
  }
});

const populatePattern = () => {
  patternArr.push(generateRand());
  setTimeout(() => highLightDiv(patternArr), 200);
};

const generateRand = () => {
  let randNum = Math.floor(Math.random() * 4 + 1);
  console.log(randNum);

  return randNum;
};

const changeOpacity = (ele, opacityValue) => {
  document.querySelector(`#n${ele}`).style.opacity = opacityValue;
  playSound(ele);
};

const playSound = (clipId) => {
  switch (clipId) {
    case 1:
      clip1.play();
      break;
    case 2:
      clip2.play();
      break;
    case 3:
      clip3.play();
      break;
    case 4:
      clip4.play();
      break;
  }
};

const highLightDiv = (list) => {
  //   list.forEach(async (ele) => {
  //     // console.log(document.querySelector(`#n${ele}`));
  //     changeOpacity(ele, 1);
  //     changeOpacity(ele, 0.3);
  //     //Todo: add sound effect
  //   });
  try {
    let lengthOfList = list.length;
    let count = 0;

    if (list.length === 0) {
      return;
    }

    interval = setInterval(() => {
      try {
        let currentCount = count;
        changeOpacity(list[currentCount], 1);
        setTimeout(() => changeOpacity(list[currentCount], 0.5), 400);
        count++;
        if (count === lengthOfList) {
          clearInterval(interval);
          userTurn = true;
        }
      } catch (e) {
        console.log('inside set interval ==> ', e);
      }
    }, 800);
  } catch (e) {
    console.log('inside highlightDiv ==> ', e);
  }
};

tiles.forEach((ele) => {
  ele.addEventListener('click', (event) => {
    try {
      if (userTurn) {
        console.log(event.target.id[1]);
        let idNumber = Number(event.target.id[1]);
        userArr.push(idNumber);
        console.log(userArr);
        changeOpacity(idNumber, 1);
        setTimeout(() => changeOpacity(idNumber, 0.5), 300);
        if (!compareInputs(patternArr, userArr)) {
          totalNoOfAttempts--;
          attempts.textContent = totalNoOfAttempts;
          if (totalNoOfAttempts === 0) {
            setTimeout(() => {
              scoreElement.textContent = 'Go';
              myModal.show();
              modelText.textContent = score;
              //alert(`Game Over. Your score is ${score}`);
              reset();
              return;
            }, 300);
          } else {
            userTurn = false;
            scoreElement.textContent = '?';
            wrong.play();
            setTimeout(() => {
              scoreElement.textContent = score;
              highLightDiv(patternArr);
              userArr = [];
            }, 700);
          }
        } else {
          if (patternArr.length === userArr.length) {
            userArr = [];
            userTurn = false;

            setTimeout(() => {
              score++;
              scoreElement.textContent = score;
              win.play();
              setTimeout(() => populatePattern(), 200);
            }, 300);
          }
        }
      }
    } catch (e) {
      console.log('inside individual tiles', e);
    }
  });
});

const compareInputs = (patternArr, userArr) => {
  try {
    if (userArr.length === 0 || patternArr.length === 0) return false;
    for (let i = 0; i < userArr.length; i++) {
      if (patternArr[i] !== userArr[i]) {
        return false;
      }
    }

    return true;
  } catch (e) {
    console.log('Compare arrays => ', e);
  }
};

const reset = () => {
  patternArr = [];
  userArr = [];
  flag = true;
  userTurn = false;
  totalNoOfAttempts = 3;
  score = 1;
  attempts.textContent = totalNoOfAttempts;
  clearInterval(interval);
  scoreElement.style.cursor = 'pointer';
};

const gameInstruction = document.querySelector('.gameInstruction');

let gameInstructionModal = new bootstrap.Modal(
  document.getElementById('gameInstruction'),
  {
    keyboard: false,
  }
);

gameInstruction.addEventListener('click', () => {
  gameInstructionModal.show();
});
