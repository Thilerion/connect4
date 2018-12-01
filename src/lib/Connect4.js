import { SETTINGS, PLAYER_ONE, PLAYER_TWO, NO_PIECE } from './Constants.js';

export default class Game {
	constructor(settings = SETTINGS) {
		this._settings = settings;

		this.rows = settings.ROWS;
		this.cols = settings.COLS;

		this.nextPieceAtHeight = Array(this.cols).fill(0);
		this.grid = this.createGrid(this.rows, this.cols);

		this.currentPlayer = PLAYER_ONE;

		this.history = [];
	}

	copy() {
		let newGame = new Game(this._settings);

		this.history.forEach(hItem => {
			newGame.doMove(hItem[0]);
		})
		return newGame;
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
		const row = this.nextPieceAtHeight[col];

		if (row >= this.rows) {
			console.warn("Can't drop piece on this column.");
			return this;
		}

		this.addPiece(col, row, this.currentPlayer);
		this.history.push([col, row]);

		return this.nextPlayer();
	}

	undoMove() {
		if (this.history.length < 1) {
			console.warn("Can't undo move when no moves have been made.");
			return this;
		}
		
		const [col, row] = this.history.pop();
		this.removePiece(col, row);

		return this.nextPlayer();
	}
}