import { SETTINGS, PLAYER_ONE, PLAYER_TWO, NO_PIECE } from './Constants.js';

// WINNING MOVE > PREVENT OPPONENTS WINNING MOVE > CENTER SQUARE > CORNER > EDGE
const CELL_VALUES = [
	[7,  5,  8, 12,  8,  5, 7],
	[3,  9, 12, 18, 12,  9, 3],
	[4, 11, 14, 21, 14, 11, 4],
	[4, 11, 14, 21, 14, 11, 4],
	[3,  9, 12, 18, 12,  9, 3],
	[7,  6, 10, 15, 10,  6, 7]
];

/*
ODD-EVEN THREATS
	Oddness/evenness of a threat is determined by row number (with rows starting from 1)
	P1 is most likely to get odd squares, P2 is most likely to get even squares

	If P1 has odd threat, P2 has even threat: P1 wins
	P1 and P2 have even threats: P2 wins
	P1 has even threat, P2 has odd threat: draw
*/

// 4 in a row is always score of Infinity, with a draw having a base of 0
// 		if no more moves possible, return 0
//		if moves possible, return 0 + heuristic score
const WIN_SCORE = Infinity;
const LOSE_SCORE = -Infinity;
const DRAW_SCORE = 0;

// 3 in a row with open square > 2 in a row with 2 open squares
const WEIGHT_3_ROW = 10;
const WEIGHT_2_ROW = 3;

const arrayAllCellsEqual = arr => arr.every(cell => cell === arr[0]);

export default class Evaluate {
	constructor(cols, rows) {
		this.cols = cols;
		this.rows = rows;
		this.lines = this.calculateLines();
	}

	setBoard(board) {
		this.board = board;
		return this;
	}

	// Performed on initialization
	calculateLines() {
		// right, up, NE, SE
		const dirs = [{ dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }, { dx: 1, dy: -1 }];
		const lines = [];

		for (let x = 0; x < this.cols; x++) {
			for (let y = 0; y < this.rows; y++) {
				for (let i = 0; i < dirs.length; i++) {
					const {dx, dy} = dirs[i];
					if ((x + (3 * dx) > this.cols - 1) ||
						(y + (3 * dy) > this.rows - 1) ||
						(x + (3 * dx) < 0) ||
						(y + (3 * dy) < 0)) {
						continue;
					}
					lines.push({ x, y, dx, dy });
				}
			}
		}
		return lines;
	}

	lookupLine({ x, y, dx, dy }) {
		return [this.board[x][y], this.board[x + dx][y + dy], this.board[x + 2 * dx][y + 2 * dy], this.board[x + 3 * dx][y + 3 * dy]];
	}

	checkWin() {
		for (let i = 0; i < this.lines.length; i++) {
			const line = this.lookupLine(this.lines[i]);
			if (arrayAllCellsEqual(line)) {
				// if all cells are NO_PIECE, don't evaluate line further
				if (line[0] === NO_PIECE) continue;
				// else all cells are from one player, so it's a win!
				else return line[0];
			}
		}
		return false;
	}
}