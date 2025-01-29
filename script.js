const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');

const WORD_LENGTH = 5;
const GRID_SIZE = 6;

const levels = [
    { word: 'CRANE', message: "Let's start with an easy one!" },
    { word: 'STOUR', message: "A bit harder now. Good luck!" },
    { word: 'GLYPH', message: "Things are getting tricky!" },
    { word: 'FJORD', message: "Almost there. Can you crack this?" },
    { word: 'ZAPPY', message: "You're a true Wordle master!" },
];

let currentLevel = 0;
let targetWord = levels[currentLevel].word;
let currentRow = 0;
let currentCol = 0;
let gameOver = false;

function createGrid() {
    const titleElement = document.createElement('h1');
    titleElement.id = 'title';
    titleElement.textContent = "Daily Wordl";
    titleElement.style.textAlign = "center";
    titleElement.style.marginBottom = "10px";
    titleElement.style.fontSize = "24px";
    document.body.insertBefore(titleElement, grid);

    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${WORD_LENGTH}, 1fr)`;
    grid.style.gap = '2px';
    grid.style.marginBottom = '20px';
    grid.style.width = `${WORD_LENGTH * 62}px`;
    grid.style.margin = '0 auto';

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
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
    ];

    keyboard.style.display = 'flex';
    keyboard.style.flexDirection = 'column';
    keyboard.style.alignItems = 'center';
    keyboard.style.gap = '6px';

    keys.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.justifyContent = 'center';
        rowDiv.style.gap = '6px';

        row.forEach(key => {
            const button = document.createElement('button');
            button.textContent = key;
            button.classList.add('key');

            button.style.padding = '10px 15px';
            button.style.fontSize = '16px';
            button.style.fontWeight = 'bold';
            button.style.backgroundColor = '#d3d6da';
            button.style.border = 'none';
            button.style.borderRadius = '5px';
            button.style.cursor = 'pointer';
            button.style.textTransform = 'uppercase';
            button.style.color = '#000';
            button.style.transition = 'background-color 0.3s ease';

            if (key === 'Enter' || key === 'Backspace') {
                button.style.padding = '10px 20px';
                button.style.fontSize = '14px';
            }

            button.addEventListener('click', () => handleKeyPress(key));
            rowDiv.appendChild(button);
        });

        keyboard.appendChild(rowDiv);
    });
}

function handleKeyPress(key) {
    if (gameOver) return;

    if (key === 'Backspace') {
        if (currentCol > 0) {
            currentCol--;
            const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
            cell.textContent = '';
        }
    } else if (key === 'Enter') {
        if (currentCol === WORD_LENGTH) {
            checkGuess();
            currentRow++;
            currentCol = 0;
        } else {
            showMessage('Not enough letters!');
        }
    } else if (currentCol < WORD_LENGTH) {
        const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
        cell.textContent = key;
        currentCol++;
    }
}

function checkGuess() {
    let correct = true;
    for (let col = 0; col < WORD_LENGTH; col++) {
        const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${col}']`);
        const letter = cell.textContent;
        if (letter === targetWord[col]) {
            cell.classList.add('correct');
        } else if (targetWord.includes(letter)) {
            cell.classList.add('present');
            correct = false;
        } else {
            cell.classList.add('absent');
            correct = false;
        }
    }

    if (correct) {
        showMessage(levels[currentLevel].message);
        setTimeout(nextLevel, 3000);
    } else if (currentRow === GRID_SIZE - 1) {
        gameOver = true;
        showMessage(`Game over! The word was ${targetWord}. Try again this level.`);
        disableKeyboard();
        setTimeout(() => {
          resetLevel();
        }, 5000);
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        targetWord = levels[currentLevel].word;
        currentRow = 0;
        currentCol = 0;
        gameOver = false;
        resetGrid();
        enableKeyboard();
        showMessage(levels[currentLevel].message);
    } else {
        showMessage("Congratulations! You've completed all levels!");
        disableKeyboard();
    }
}

function resetLevel(){
  currentRow = 0;
  currentCol = 0;
  gameOver = false;
  resetGrid();
  enableKeyboard();
}

function resetGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('correct', 'present', 'absent');
    });
}

function enableKeyboard(){
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    key.disabled = false;
  });
}

function showMessage(text) {
    message.textContent = text;
    setTimeout(() => {
        message.textContent = '';
    }, 3000);
}

function disableKeyboard() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.disabled = true;
    });
}

createGrid();
createKeyboard();
showMessage(levels[currentLevel].message);
