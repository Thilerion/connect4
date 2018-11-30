import { SETTINGS, PLAYER_ONE, PLAYER_TWO, NO_PIECE } from './Constants.js';

export default class Evaluate {
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

		if (options.win) return options.win * 10000;

		const rowWeight = 25;
		const colWeight = 20;
		const diagWeight = 30;
		
		let score = 0;
		let scoreOne = 0;
		let scoreTwo = 0;

		options.rowLines.forEach(line => {
			let lineScore = 0;
			lineScore = (line.threat * rowWeight);

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


		return score;
	}
}