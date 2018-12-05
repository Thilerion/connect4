import { TIE } from './Constants.js';
import Game from './Connect4.js';

const rnd = (maxExcl, min = 0) => Math.floor(Math.random() * (maxExcl - min)) + min;

function randomSimGame(game) {
	let clone = game.clone();

	while (!clone.gameEnd) {
		const moves = clone.availableMoves();
		const randomMove = rnd(moves.length);

		clone.doMove(moves[randomMove]);
	}

	return clone.winner;
}

function monteCarloBestMove(game, timeLimit = 400) {
	const player = game.currentPlayer;
	const availMoves = game.availableMoves();
	let availMovesStats = availMoves.map(move => {
		return { move, wins: 0, ties: 0, losses: 0 };
	});

	const t1 = performance.now();

	while (performance.now() - t1 < timeLimit) {
		for (let i = 0; i < availMoves.length; i++) {
			game.doMove(availMoves[i]);

			let rndResult = randomSimGame(game);

			if (rndResult === player) availMovesStats[i].wins++;
			else if (rndResult === TIE) availMovesStats[i].ties++;
			else availMovesStats[i].losses++;

			game.undoMove();
		}
	}

	const sorted = availMovesStats.map(m => {
		return { ...m, winRate: m.wins / (m.wins + m.ties + m.losses) };
	}).sort((a, b) => b.winRate - a.winRate);
	return sorted;
}

export { monteCarloBestMove };

// let g = new Game();

// monteCarloBestMove(g, 100); //?