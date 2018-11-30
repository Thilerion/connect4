const SETTINGS = {
	ROWS: 6,
	COLS: 7
};

export const PLAYER_ONE = 1;
export const PLAYER_TWO = -1;
export const NO_PIECE = 0;


export class Game {
	constructor(settings = SETTINGS) {
		this.rows = settings.ROWS;
		this.cols = settings.COLS;

		this.nextPieceAtHeight = Array(this.cols).fill(0);
		this.grid = this.createGrid(this.rows, this.cols);

		this.currentPlayer = PLAYER_ONE;

		this.history = [];
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

class Evaluate {
	constructor(board, cols, rows) {
		this.board = JSON.parse(JSON.stringify(board));
		this.cols = cols;
		this.rows = rows;
	}

	evaluateLine(line) {
		const score = line.reduce((acc, val) => acc + val, 0);
		const hasEmpty = line.includes(NO_PIECE);

		if (score === 3 && hasEmpty) return {win: null, threat: PLAYER_ONE};
		if (score === -3 && hasEmpty) return { win: null, threat: PLAYER_TWO };
		if (score === 4) return { win: PLAYER_ONE, threat: null };
		if (score === -4) return { win: PLAYER_TWO, threat: null };
		return { win: null, threat: null };
	}

	findAllThreats() {
		const rowLines = [];
		const colLines = [];
		const dNELines = [];
		const dSELines = [];

		const threats = [rowLines, colLines, dNELines, dSELines];

		for (let x = 0; x < this.cols; x++) {
			for (let y = 0; y < this.rows; y++) {

				// right, up, NE, SE
				const dirs = [{ dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 }, { dx: 1, dy: -1 }];

				for (let i = 0; i < 4; i++) {
					const evaluation = this.findEvaluateLine({ ...dirs[i], x, y });
					if (!evaluation) continue;
					if (evaluation.win) return evaluation;
					if (evaluation.threat) {
						threats[i].push(evaluation);
					}
				}
			}
		}

		return { rowLines, colLines, dNELines, dSELines };
	}

	findEvaluateLine({ x, y, dx, dy }) {
		const line = this.findLine({ x, y, dx, dy });
		if (!line) return;

		return { ...this.evaluateLine(line), x, y, dx, dy };
	}

	findLine({ x, y, dx, dy }) {
		if (x + (3 * dx) > this.cols - 1) return;
		if (y + (3 * dy) > this.rows - 1) return;
		if (x + (3 * dx) < 0) return;
		if (y + (3 * dy) < 0) return;

		const line = [];
		for (let i = 0; i < 4; i++) {
			line.push(this.board[x + (i * dx)][y + (i * dy)]);
		}
		return line;
	}

	execute() {
		const options = this.findAllThreats();

		if (options.win) return { win: options.win };

		const evenRowWeight = 30;
		const oddRowWeight = 20;
		const colWeight = 20;
		const diagWeight = 25;
		
		let score = 0;
		let scoreOne = 0;
		let scoreTwo = 0;

		options.rowLines.forEach(line => {
			let lineScore = 0;
			if (line.x % 2 === 0) lineScore = (line.threat * evenRowWeight);
			else if (line.x % 2 === 1) lineScore = (line.threat * oddRowWeight);

			score += lineScore;
			if (line.threat === PLAYER_ONE) scoreOne += lineScore;
			if (line.threat === PLAYER_TWO) scoreTwo += lineScore;
		})
		options.colLines.forEach(line => {
			let lineScore = 0;
			lineScore = (line.threat * colWeight);

			score += lineScore;
			if (line.threat === PLAYER_ONE) scoreOne += lineScore;
			if (line.threat === PLAYER_TWO) scoreTwo += lineScore;
		})
		options.dNELines.forEach(line => {
			let lineScore = 0;
			lineScore = (line.threat * diagWeight);

			score += lineScore;
			if (line.threat === PLAYER_ONE) scoreOne += lineScore;
			if (line.threat === PLAYER_TWO) scoreTwo += lineScore;
		})
		options.dSELines.forEach(line => {
			let lineScore = 0;		
			lineScore = (line.threat * diagWeight);

			score += lineScore;
			if (line.threat === PLAYER_ONE) scoreOne += lineScore;
			if (line.threat === PLAYER_TWO) scoreTwo += lineScore;
		})


		return {score, scoreOne, scoreTwo};
	}
}

let g = new Game(SETTINGS).doMove(0).doMove(1).doMove(1).doMove(2).doMove(2).doMove(3).doMove(3)

g.grid //?

let evaluate = new Evaluate(g.grid, g.cols, g.rows);

evaluate.execute(); //?