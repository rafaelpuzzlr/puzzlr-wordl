document.addEventListener('DOMContentLoaded', function() {
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

    // *** ATTACH EVENT LISTENERS FOR POPUP BUTTONS FIRST ***
    document.getElementById('popup-next-level').addEventListener('click', closePopup);
    document.getElementById('popup-try-again').addEventListener('click', resetLevel); // Correct event for Try Again

    function createGrid() {
        const titleElement = document.createElement('h1');
        titleElement.id = 'title';
        titleElement.textContent = "Daily Wordle";
        titleElement.style.textAlign = "center";
        titleElement.style.marginBottom = "10px";
        titleElement.style.fontSize = "24px";
        document.body.insertBefore(titleElement, grid);

        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${WORD_LENGTH}, 1fr)`;
        grid.style.gap = '2px';
        grid.style.marginBottom = '20px';
        grid.style.width = `${WORD_LENGTH * 52}px`;
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
        keyboard.style.width = "100%";

        keys.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            rowDiv.style.justifyContent = 'center';
            rowDiv.style.gap = '6px';

            row.forEach(key => {
                const button = document.createElement('button');
                button.textContent = key;
                button.classList.add('key');

                button.style.padding = '8px 12px';
                button.style.fontSize = '14px';
                button.style.fontWeight = 'bold';
                button.style.backgroundColor = '#d3d6da';
                button.style.border = 'none';
                button.style.borderRadius = '5px';
                button.style.cursor = 'pointer';
                button.style.textTransform = 'uppercase';
                button.style.color = '#000';
                button.style.transition = 'background-color 0.3s ease';

                if (key === 'Enter' || key === 'Backspace') {
                    button.style.padding = '8px 16px';
                    button.style.fontSize = '14px';
                }

                button.addEventListener('click', () => handleKeyPress(key));
                rowDiv.appendChild(button);
            });

            keyboard.appendChild(rowDiv);
        });

        setTimeout(disableKeyboard, 0);
   
