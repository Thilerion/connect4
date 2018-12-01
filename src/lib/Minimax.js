import Game from './Connect4.js';
import Evaluate from './Evaluate.js';
import { SETTINGS, PLAYER_ONE, PLAYER_TWO, NO_PIECE } from './Constants.js';

export default function getBestMove(game, maxDepth = 4) {
	const { score, move } = minimax(game, game.currentPlayer, 0, maxDepth);
	console.log({ score, move });
	return move;
}

function minimax(game, maxPlayer, depth, maxDepth) {
	
	const curScore = new Evaluate(game.grid, game.rows, game.cols).execute();

	if (depth >= maxDepth || Math.abs(curScore) >= 10000) {
		const score = curScore - (depth * maxPlayer);
		return { score };
	}

	const moves = game.nextPieceAtHeight.reduce((cols, colHeight, colN) => {
		if (colHeight < game.rows) {
			cols.push(colN);
		}
		return cols;
	}, []);

	let bestScore = null;
	let bestMove = null;
	let getMax = game.currentPlayer === maxPlayer;

	let scoreMoves = [];

	for (let i = 0; i < moves.length; i++) {
		game.doMove(moves[i]);

		const score = minimax(game, maxPlayer, depth + 1, maxDepth).score;

		scoreMoves.push({ score, move: moves[i] });

		game.undoMove();
	}
	
	return scoreMoves.reduce((best, scoreMove) => {
		if (getMax && scoreMove.score > best.score) {
			return scoreMove;
		} else if (!getMax && scoreMove.score < best.score) {
			return scoreMove;
		} else if (scoreMove.score === best.score) {
			return Math.random() > 0.25 ? best : scoreMove;
		} else return best;
	}, { score: getMax ? -Infinity : Infinity, move: null });
}

getBestMove(new Game(SETTINGS).doMove(0).doMove(0).doMove(0).doMove(5).doMove(5).doMove(1).doMove(4).doMove(2)); //?.