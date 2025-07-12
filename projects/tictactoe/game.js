const space = document.getElementById("game-space");
const boardModel = [];
for (let i = 0; i < 3; i++) {
	boardModel[i] = [];
}

let current_player = 'X';
let winner = null;
let full = false;

const slotElements = [];
const boardElement = document.createElement("div");
boardElement.style.backgroundColor = "#000000";
boardElement.style.display = "grid";
boardElement.style.height = "360px";
boardElement.style.width = "360px";
boardElement.style.gridTemplateColumns = "repeat(3,1fr)";
boardElement.style.gridTemplateRows = "repeat(3,1fr)";
space.appendChild(boardElement);

const messageElement = document.createElement("p");
messageElement.style.width = "360px";
messageElement.style.textAlign = "Center";
messageElement.style.fontSize = "24px";
messageElement.style.marginLeft = "auto";
messageElement.style.marginRight = "auto";
document.body.appendChild(messageElement);

const resetElement = document.createElement("p");
resetElement.className = "center-box"
resetElement.style.width = "180px";
resetElement.style.textAlign = "center";
resetElement.style.fontSize = "24px";
resetElement.textContent = "Reset";
resetElement.style.visibility = "hidden";
resetElement.style.marginLeft = "auto";
resetElement.style.marginRight = "auto";
resetElement.style.minWidth = "0px";
resetElement.style.boxShadow = "-10px 10px 0px #d08770";
document.body.appendChild(resetElement);

resetElement.addEventListener("click", function () {
	for (let i = 0; i < 3; i++) {
		boardModel[i] = [];
	}
	current_player = 'X';
	winner = null;
	full = false;
	updateElements();
	resetElement.style.visibility = "hidden";
	messageElement.textContent = null;
})

function updateElements() {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			slotElements[i][j].textContent = boardModel[i][j];
		}
	}
}

function checkRow(r) {
	let xCount = 0;
	let oCount = 0;
	for (let i = 0; i < 3; i++) {
		if (boardModel[r][i] == "O") {
			oCount++;
		} else if (boardModel[r][i] == "X") {
			xCount++;
		}
	}
	if (xCount == 3) {
		return "X";
	}
	if (oCount == 3) {
		return "O";
	}
	return null;
}

function checkColumn(c) {
	let xCount = 0;
	let oCount = 0;
	for (let i = 0; i < 3; i++) {
		if (boardModel[i][c] == "O") {
			oCount++;
		} else if (boardModel[i][c] == "X") {
			xCount++;
		}
	}
	if (xCount == 3) {
		return "X";
	}
	if (oCount == 3) {
		return "O";
	}
	return null;
}

function checkDiagonalA() {
	let xCount = 0;
	let oCount = 0;
	for (let i = 0; i < 3; i++) {
		if (boardModel[i][i] == "O") {
			oCount++;
		} else if (boardModel[i][i] == "X") {
			xCount++;
		}
	}
	if (xCount == 3) {
		return "X";
	}
	if (oCount == 3) {
		return "O";
	}
	return null;
}

function checkDiagonalB() {
	let xCount = 0;
	let oCount = 0;
	for (let i = 0; i < 3; i++) {
		console.log(boardModel[2 - i][2 - i]);
		if (boardModel[2 - i][i] == "O") {
			oCount++;
		} else if (boardModel[2 - i][i] == "X") {
			xCount++;
		}
	}
	if (xCount == 3) {
		return "X";
	}
	if (oCount == 3) {
		return "O";
	}
	return null;
}

function check() {
	let winner = null;
	let isFull = true;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (boardModel[i][j] == null) {
				isFull = false;
			}
		}
	}
	for (let i = 0; i < 3; i++) {
		if (winner == null) {
			winner = checkColumn(i);
		}
		if (winner == null) {
			winner = checkRow(i);
		}
	}
	if (winner == null) {
		winner = checkDiagonalA();
	}
	if (winner == null) {
		winner = checkDiagonalB();
	}
	full = isFull;
	return winner;
}

function slotClicked(slot, i, j) {
	if (boardModel[i][j] == null && winner == null) {
		boardModel[i][j] = current_player;
		if (current_player == "X") {
			current_player = "O";
		} else if (current_player == "O") {
			current_player = "X";
		}
	}
	updateElements();
	winner = check();
	let gameOver = false;
	if (full == true) {
		messageElement.textContent = "Tie!";
		gameOver = true;
	}
	if (winner != null) {
		messageElement.textContent = winner + " wins!";
		gameOver = true;
	}
	if (gameOver == true) {
		resetElement.style.visibility = "visible";
	}
}

for (let i = 0; i < 3; i++) {
	slotElements[i] = [];
	for (let j = 0; j < 3; j++) {
		let newSlot = document.createElement("div");
		newSlot.style.display = "flex";
		newSlot.style.justifyContent = "center";
		newSlot.style.alignItems = "center";
		newSlot.style.backgroundColor = "#222129";
		newSlot.style.borderStyle = "solid";
		newSlot.style.borderColor = "#81a1c1";
		newSlot.style.borderWidth = "1px";
		newSlot.style.fontSize = "48px";
		newSlot.style.color = "#81a1c1"

		boardElement.appendChild(newSlot);
		slotElements[i][j] = newSlot
		newSlot.addEventListener("click", function () {
			slotClicked(newSlot, i, j);
		})
	}
}