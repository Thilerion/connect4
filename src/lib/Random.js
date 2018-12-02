import Evaluate from './Evaluate.js';
import Game from './Connect4.js';
import { PLAYER_ONE, PLAYER_TWO } from './Constants.js';

function randomSimGame(game, evaluator) {
	let copy = game.copy();

	while (!evaluator.setBoard(copy.grid).checkWin()) {
		const moves = copy.availableMoves();

		if (moves.length <= 0) {
			// if tie game
			return { result: 0 };
		}

		copy.doMove(moves[Math.floor(Math.random() * moves.length)]);
	}
	return evaluator.checkWin();
}

function findBestMove(game, timeLimit) {
	//let copy = game.copy();
	const player = game.currentPlayer;
	const evaluator = new Evaluate(game.cols, game.rows);

	const availableMovesBase = game.availableMoves();
	let availableMoves = availableMovesBase.map(availMove => {
		return { col: availMove, wins: 0, ties: 0, losses: 0, sims: 0 };
	});


	let t1 = performance.now();

	while (performance.now() - t1 < timeLimit) {

		availableMoves.forEach(availMove => {
			game.doMove(availMove.col);

			let gameResult = randomSimGame(game, evaluator);

			availMove.sims++;

			if (gameResult === player) {
				availMove.wins++;
			} else if (gameResult === 0) {
				availMove.ties++;
			} else {
				availMove.losses++;
			}

			game.undoMove();
		})
	}

	return availableMoves.map(moveResult => {
		const winRate = Math.round((moveResult.wins / moveResult.sims) * 1000) / 1000;
		return { col: moveResult.col, sims: moveResult.sims, winRate };
	}).sort((a, b) => a.winRate < b.winRate);
}

let g = new Game().doMove(4).doMove(0);

findBestMove(g, 1500); //?