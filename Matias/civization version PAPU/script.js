const grid = document.getElementById('grid');
const rows = 100;
const cols = 100;

// Initialize the grid with water cells
let board = [];
for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
        board[i][j] = { type: 'water', content: '', unit: null };
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.style.backgroundColor = '#00f'; // Water color
        cell.textContent = 'agua'; // Default text
        cell.addEventListener('click', handleCellClick);
        grid.appendChild(cell);
    }
}

// Generate initial bags with random positions and values between 30 and 60
let initialBag1 = { row: 50, col: 50, value: getRandomValue() };
let initialBag2 = { row: getRandomInt(0, rows - 1), col: getRandomInt(0, cols - 1), value: getRandomValue() };
generateTerrain(initialBag1);
generateTerrain(initialBag2);

function generateTerrain(bag) {
    if (bag.value <= 0) return;

    const { row, col, value } = bag;
    const terrainTypes = ['water', 'land', 'desert', 'snow'];
    const randomTerrain = terrainTypes[Math.floor(Math.random() * terrainTypes.length)];
    board[row][col].type = randomTerrain;
    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    cell.style.backgroundColor = getColor(randomTerrain);
    cell.textContent = randomTerrain;

    if (randomTerrain === 'snow') {
        cell.classList.add('snow');
    }

    const newValue = value - 1;

    // Create new bags in four directions if possible
    createBag(row - 1, col, newValue);
    createBag(row + 1, col, newValue);
    createBag(row, col - 1, newValue);
    createBag(row, col + 1, newValue);
}

function createBag(row, col, value) {
    if (row >= 0 && row < rows && col >= 0 && col < cols && board[row][col].type === 'water') {
        setTimeout(() => generateTerrain({ row, col, value }), 10);
    }
}

function getColor(terrainType) {
    switch (terrainType) {
        case 'water': return '#00f';
        case 'land': return '#0f0';
        case 'desert': return '#ff0';
        case 'snow': return '#fff';
        default: return '#00f';
    }
}

function getRandomValue() {
    return Math.floor(Math.random() * 31) + 30; // Generates a random number between 30 and 60
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleCellClick(event) {
    const cell = event.target;
    const action = prompt("¿Qué quieres hacer? Escribe la inicial para hacerlo:\nC: Crear una ciudad\nS: Sembrar semillas\nI: Investigar\nE: Crear unidad epic face\nT: Crear unidad troll face\nA: Crear avión\nB: Crear barco").toLowerCase();
    switch(action) {
        case 'c':
            cell.textContent = 'ciudad';
            break;
        case 's':
            cell.textContent = 'semillas';
            break;
        case 'i':
            cell.textContent = 'investigar';
            break;
        case 'e':
            createUnit(cell, 'unit-epic-face', 'Epic');
            break;
        case 't':
            createUnit(cell, 'unit-troll-face', 'Troll');
            break;
        case 'a':
            createUnit(cell, 'unit-airplane', 'Avión');
            break;
        case 'b':
            createUnit(cell, 'unit-ship', 'Barco');
            break;
        default:
            alert("Acción no reconocida. Intenta nuevamente.");
    }
}

function createUnit(cell, unitClass, unitName) {
    if (board[cell.dataset.row][cell.dataset.col].type === 'water' && (unitClass !== 'unit-ship' && unitClass !== 'unit-airplane')) {
        alert("No puedes colocar esta unidad en el agua.");
        return;
    }
    cell.textContent = unitName;
    cell.className = `cell ${unitClass}`;
    board[cell.dataset.row][cell.dataset.col].unit = unitName;
}

// Add event listeners for moving units
window.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    const key = event.key;
    const unit = document.querySelector('.cell[unit]');
    if (!unit) return;
    const row = parseInt(unit.dataset.row);
    const col = parseInt(unit.dataset.col);
    let newRow = row;
    let newCol = col;

    switch(key) {
        case 'ArrowUp':
            newRow = row - 1;
            break;
        case 'ArrowDown':
            newRow = row + 1;
            break;
        case 'ArrowLeft':
            newCol = col - 1;
            break;
        case 'ArrowRight':
            newCol = col + 1;
            break;
        default:
            return;
    }

    if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) return;

    const newCell = document.querySelector(`.cell[data-row='${newRow}'][data-col='${newCol}']`);
    if (newCell && (board[newRow][newCol].type !== 'water' || unit.className.includes('unit-ship') || unit.className.includes('unit-airplane'))) {
        const unitName = unit.textContent;
        const unitClass = unit.className;
        unit.textContent = board[row][col].type;
        unit.className = `cell ${board[row][col].type === 'snow' ? 'snow' : ''}`;
        board[row][col].unit = null;

        newCell.textContent = unitName;
        newCell.className = unitClass;
        board[newRow][newCol].unit = unitName;
    }
}
