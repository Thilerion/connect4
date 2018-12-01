import Game from './Connect4.js';
import Evaluate from './Evaluate.js';
import { SETTINGS, PLAYER_ONE, PLAYER_TWO, NO_PIECE } from './Constants.js';

let evaluate;

export default function getBestMove(game, maxDepth = 6) {
	evaluate = new Evaluate(game.rows, game.cols);
	const { score, move } = minimax(game, game.currentPlayer, 0, maxDepth, -Infinity, Infinity);
	// console.log({ score, move });
	return move;
	// return;
}

function minimax(game, maximizer, depth, maxDepth, alpha, beta) {
	
	const curScore = evaluate.execute(game.grid);


	if (curScore.win && curScore.win === game.currentPlayer) {
		return {score : -10000};
	} else if (curScore.win && curScore.win !== game.currentPlayer) {
		return {score : 10000};
	} else if (depth >= maxDepth) {
		// TODO: times player or not?
		return {score : curScore };
	}

	const availSpots = game.nextPieceAtHeight.reduce((avail, col, index) => {
		if (col < game.rows) avail.push(index);
		return avail;
	}, []);

	if (availSpots.length < 1) return curScore;

	let moves = [];

	let getMax = game.currentPlayer === maximizer;
	let bestScore = getMax ? -Infinity : Infinity;
	let bestMove;
	let newAlpha = alpha;
	let newBeta = beta;

	for (let i = 0; i < availSpots.length; i++) {

		game.doMove(availSpots[i]);

		let nextScore = minimax(game, maximizer, depth + 1, maxDepth, newAlpha, newBeta).score * maximizer;

		game.undoMove();

		if (getMax) {
			if (nextScore > bestScore) {
				bestScore = nextScore;
				bestMove = availSpots[i];
			}
			newAlpha = Math.max(newAlpha, bestScore);
			if (newAlpha >= newBeta) {
				// console.log("Pruning!");
				break;
			}
		} else if (!getMax) {
			if (nextScore < bestScore) {
				bestScore = nextScore;
				bestMove = availSpots[i];
			}
			newBeta = Math.min(newBeta, bestScore);
			if (newAlpha >= newBeta) {
				// console.log("Pruning!");
				break;
			}
		}
	}


	if (depth < 1) console.log({ bestScore, bestMove });
	return { score: bestScore, move: bestMove };

}//?