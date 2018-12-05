import { TIE } from './Constants.js';
import Game from './Connect4.js';
import 'setimmediate';

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

function sleep() {
	return new Promise(resolve => {
		// const t1 = performance.now();
		// setTimeout(() => {
		// 	console.log(`Slept for ${performance.now() - t1}`);
		// 	resolve();
		// }, 0);
		// requestAnimationFrame(() => {
		// 	console.log(`Slept for ${performance.now() - t1}`);
		// 	resolve();
		// })

		// SetImmediate polyfill from MDN
		setImmediate(() => {
			// console.log(`Slept for ${performance.now() - t1}`);
			resolve();
		})
	})
}

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