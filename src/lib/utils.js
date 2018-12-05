import 'setimmediate';

export const rnd = (maxExcl, min = 0) => Math.floor(Math.random() * (maxExcl - min)) + min;

export function randomSimGame(game) {
	let clone = game.clone();

	while (!clone.gameEnd) {
		const moves = clone.availableMoves();
		const randomMove = rnd(moves.length);

		clone.doMove(moves[randomMove]);
	}

	return clone.winner;
}

export function sleep() {
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