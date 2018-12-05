import { TIE } from './Constants.js';


import {randomSimGame, sleep} from './utils.js'

async function monteCarloBestMove(game, timeLimit = 400) {
	const player = game.currentPlayer;
	const availMoves = game.availableMoves();
	let availMovesStats = availMoves.map(move => {
		return { move, wins: 0, ties: 0, losses: 0 };
	});

	let simulationsRun = 0;

	const t1 = performance.now();
	let lastSleep = t1;

	while (performance.now() - t1 < timeLimit) {

		if (performance.now() - lastSleep > 20) {
			await sleep();
			lastSleep = performance.now();
		}

		for (let i = 0; i < availMoves.length; i++) {
			game.doMove(availMoves[i]);

			let rndResult = randomSimGame(game);
			simulationsRun++;

			if (rndResult === player) availMovesStats[i].wins++;
			else if (rndResult === TIE) availMovesStats[i].ties++;
			else availMovesStats[i].losses++;

			game.undoMove();
		}
	}

	console.log(`Ran ${simulationsRun} simulations`);

	const sorted = availMovesStats.map(m => {
		return { ...m, winRate: m.wins / (m.wins + m.ties + m.losses) };
	}).sort((a, b) => b.winRate - a.winRate);
	return sorted;
}

export { monteCarloBestMove };

// let g = new Game();

// monteCarloBestMove(g, 100); //?