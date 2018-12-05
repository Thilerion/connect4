import Evaluate from './Evaluate.js';
import Game from './Connect4.js';
import { PLAYER_ONE, PLAYER_TWO } from './Constants.js';

function calcUCT(wins, nodeSims, totalSims) {
	const winRate = wins / nodeSims;
	const expParam = 4;

	return winRate + (expParam * (Math.log(totalSims) / nodeSims));
}

const sortByUCT = (a, b) => a.UCT < b.UCT;

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
	const player = game.currentPlayer;
	const evaluator = new Evaluate(game.cols, game.rows);

	const availableMovesBase = game.availableMoves();

	// if only one possible move, just return that
	if (availableMovesBase.length === 1) return availableMovesBase[0];

	let availableMoves = availableMovesBase.map(availMove => {
		return { col: availMove, wins: 0, nodeSims: 0, UCT: null };
	});


	let totalSims = 0;
	let t1 = performance.now();

	availableMoves.forEach(availMove => {
		game.doMove(availMove.col);

		let res = randomSimGame(game, evaluator);
		
		availMove.nodeSims++;
		totalSims++;
		if (res === player) {
			availMove.wins++;
		}

		availMove.UCT = calcUCT(availMove.wins, 1, availableMoves.length);

		game.undoMove();
	})


	while (performance.now() - t1 < timeLimit) {
		availableMoves.sort(sortByUCT);

		const chosenMove = availableMoves[0];

		for (let i = 0; i < 10; i++) {
			game.doMove(chosenMove.col);

			let res = randomSimGame(game, evaluator);
			
			chosenMove.nodeSims++;
			totalSims++;
			if (res === player) {
				chosenMove.wins++;
			}
			game.undoMove();
		}

		chosenMove.UCT = calcUCT(chosenMove.wins, chosenMove.nodeSims, totalSims);
	}

	let sortedMoves = availableMoves.map(moveResult => {
		const winRate = Math.round((moveResult.wins / moveResult.nodeSims) * 1000) / 1000;
		return { col: moveResult.col, sims: moveResult.nodeSims, winRate };
	}).sort((a, b) => a.winRate < b.winRate);

	return { sortedMoves, totalSims };
}

let g = new Game();


[3, 4, 3, 3, 3, 4, 4, 4, 1, 2, 1, 1, 4, 6].forEach(move => g.doMove(move));

findBestMove(g, 700); //?