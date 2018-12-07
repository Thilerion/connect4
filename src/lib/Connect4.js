import { SETTINGS, PLAYER_ONE, PLAYER_TWO, NO_PIECE, TIE } from './Constants.js';

export default class Game {
	constructor(settings = SETTINGS, grid) {
		console.log(settings);
		this._settings = settings;

		this.rows = settings.ROWS;
		this.cols = settings.COLS;

		this.nextPieceAtHeight = Array(this.cols).fill(0);

		if (grid == null) {
			this.grid = this.createGrid(this.rows, this.cols);
		} else {
			this.grid = grid;
		}

		this.currentPlayer = PLAYER_ONE;
		this.gameEnd = false;
		this.winner = null;

		this.history = [];
	}

	clone() {
		let clone = Object.assign({}, JSON.parse(JSON.stringify(this)));
		Object.setPrototypeOf(clone, Object.getPrototypeOf(this));
		return clone;
	}

	availableMoves() {
		return this.nextPieceAtHeight.reduce((avail, col, colIndex) => { 
			if (col < this.rows) avail.push(colIndex);
			return avail;
		}, []);
	}

	createGrid(cols, rows) {
		return Array(rows).fill(null).map(row => Array(cols).fill(NO_PIECE));
	}

	nextPlayer() {
		this.currentPlayer = this.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
		return this;
	}

	addPiece(col, row, mark) {
		this.grid[col].splice(row, 1, mark);

		const curHeight = this.nextPieceAtHeight[col];
		this.nextPieceAtHeight.splice(col, 1, curHeight + 1);

		return this;
	}

	removePiece(col, row) {
		this.grid[col].splice(row, 1, NO_PIECE);

		const curHeight = this.nextPieceAtHeight[col];
		this.nextPieceAtHeight.splice(col, 1, curHeight - 1);

		return this;
	}

	doMove(col) {
		if (this.gameEnd) {
			console.warn("Can't make a move when the game is over.");
			return;
		}

		const row = this.nextPieceAtHeight[col];

		if (row >= this.rows) {
			console.warn("Can't drop piece on this column.");
			return this;
		}

		this.addPiece(col, row, this.currentPlayer);
		this.history.push([col, row]);

		const winner = this.checkWin(col, row);
		if (winner) {
			// console.warn(`Player ${winner} has won!`);
			this.gameEnd = true;
			this.winner = winner;
		} else if (this.availableMoves().length < 1) {
			this.gameEnd = true;
			this.winner = TIE;
		}

		return this.nextPlayer();
	}

	undoMove() {
		if (this.history.length < 1) {
			console.warn("Can't undo move when no moves have been made.");
			return this;
		}
		
		const [col, row] = this.history.pop();
		this.removePiece(col, row);

		if (this.gameEnd) {
			this.gameEnd = false;
			this.winner = null;
		}

		return this.nextPlayer();
	}

	checkWin(col, row) {
		const win = this.checkHorizontals(col, row) ||
			this.checkVerticals(col, row) ||
			this.checkDiagsBackward(col, row) ||
			this.checkDiagsForward(col, row);
		
		return win;
	}

	checkHorizontals(col, row) {
		for (let x = Math.max(0, col - 3); x <= col && x + 3 < this.cols; x++) {
			// all row-lines where the newly placed piece is in
			// console.log(`Column ${x}`);
			let isWin = this.checkLineWin({ x, y: row, dx: 1, dy: 0 });
			if (isWin) return isWin;
		}
		return false;
	}

	checkVerticals(col, row) {
		for (let y = Math.max(0, row - 3); y <= row && y + 3 < this.rows; y++) {
			// all col-lines where the newly placed piece is in
			// console.log(`Height ${y}`);
			let isWin = this.checkLineWin({ x: col, y, dx: 0, dy: 1 });
			if (isWin) return isWin;
		}
		return false;
	}

	checkDiagsBackward(col, row) {
		// debugger;
		const maxLeft = Math.min(3, col);
		const maxUp = Math.min(3, this.rows - 1 - row);
		const diffStart = Math.min(maxLeft, maxUp);

		// for [3, 0], start searching at [0, 3] (origin at bottom left)
		const xStart = col - diffStart;
		const yStart = row + diffStart;

		const searchConditions = (x, y) => {
			return (x <= col && y >= row) &&
				   (x + 3 < this.cols && y - 3 >= 0);
		}

		for (let x = xStart, y = yStart; searchConditions(x, y); x++, y--) {
			// all backward diagonals where the newly placed piece is in
			// console.log({ x, y, xEnd: x + 3, yEnd: y - 3 });
			let isWin = this.checkLineWin({ x, y, dx: 1, dy: -1 });
			if (isWin) return isWin;
		}
		return false;
	}

	checkDiagsForward(col, row) {
		// debugger;
		const maxLeft = Math.min(3, col);
		const maxDown = Math.min(3, row);
		const diffStart = Math.min(maxLeft, maxDown);

		// for [3, 0], start searching at [0, 3] (origin at bottom left)
		const xStart = col - diffStart;
		const yStart = row - diffStart;

		const searchConditions = (x, y) => {
			return (x <= col && y <= row) &&
				   (x + 3 < this.cols && y + 3 <= this.rows);
		}

		for (let x = xStart, y = yStart; searchConditions(x, y); x++, y++) {
			// all forward diagonals where the newly placed piece is in
			// console.log({ x, y, xEnd: x + 3, yEnd: y + 3 });
			let isWin = this.checkLineWin({ x, y, dx: 1, dy: 1 });
			if (isWin) return isWin;
		}
		return false;
	}

	checkLineWin({ x, y, dx, dy }) {
		const pieceOne = this.grid[x][y];
		if (pieceOne === NO_PIECE) return false;

		for (let i = 1; i < 4; i++) {
			let piece = this.grid[x + (i * dx)][y + (i * dy)];
			if (piece === NO_PIECE || piece !== pieceOne) {
				return false;
			} 
		}
		return pieceOne;
	}
}