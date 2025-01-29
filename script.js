const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');
let startTime = Date.now();

const WORD_LENGTH = 5;
const GRID_SIZE = 6;
const targetWord = 'HARRY';

function createGrid() {
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${WORD_LENGTH}, 1fr)`;
  grid.style.gap = '5px';
  grid.style.marginBottom = '20px';

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < WORD_LENGTH; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      grid.appendChild(cell);
    }
  }
}

function createKeyboard() {
  const keys = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete']];
  
  keys.forEach(row => {
    const rowDiv = document.createElement('div');
    row.forEach(key => {
      const button = document.createElement('button');
      button.textContent = key;
      button.classList.add('key');
      button.addEventListener('click', () => handleKeyPress(key));
      rowDiv.appendChild(button);
    });
    keyboard.appendChild(rowDiv);
  });
}

let currentRow = 0;
let currentCol = 0;
function handleKeyPress(key) {
  if (key === 'Backspace' && currentCol > 0) {
    currentCol--;
    document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`).textContent = '';
  } else if (key === 'Enter' && currentCol === WORD_LENGTH) {
    checkGuess();
    currentRow++;
    currentCol = 0;
  } else if (currentCol < WORD_LENGTH && key.length === 1) {
    document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`).textContent = key;
    currentCol++;
  }
}

function checkGuess() {
  let correct = true;
  for (let col = 0; col < WORD_LENGTH; col++) {
    const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${col}']`);
    const letter = cell.textContent;
    if (letter === targetWord[col]) {
      cell.style.backgroundColor = '#6aaa64';
    } else if (targetWord.includes(letter)) {
      cell.style.backgroundColor = '#c9b458';
      correct = false;
    } else {
      cell.style.backgroundColor = '#787c7e';
      correct = false;
    }
  }
  if (correct) showEndPopup(true);
  else if (currentRow === GRID_SIZE - 1) showEndPopup(false);
}

function showEndPopup(win) {
  let endTime = Date.now();
  let timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  const popup = document.createElement("div");
  popup.id = "end-popup";
  popup.innerHTML = `<h2>${win ? "You Win!" : "Game Over!"}</h2><p>Time Taken: ${timeTaken} seconds</p><button onclick="restartGame()">Play Again</button>`;
  document.body.appendChild(popup);
}

function restartGame() {
  document.getElementById("end-popup").remove();
  location.reload();
}

createGrid();
createKeyboard();
