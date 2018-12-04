<template>
<div>
	<!-- <div class="board">
		<div v-for="(col, x) in board" :key="x" class="col" :class="{full: fullCols[x]}" @click="makeMove(x)">
			<div v-for="(cell, y) in col" :key="y" class="cell" :class="{'empty': cell === noPiece}">
				<transition name="fall-piece">
				<div class="piece player-one" key="piece-one" v-if="cell === P1"></div>
				<div class="piece player-two" key="piece-two" v-if="cell === P2"></div>
				</transition>
			</div>
		</div>
	</div> -->
	<div class="board">
		<div v-for="(col, x) in board" :key="x" class="col" @click="makeMove(x)">
			<div v-for="(cell, y) in col" :key="y" class="cell">
				<transition name="fall-piece">
					<div class="piece player-one" key="piece-one" v-if="cell === P1"></div>
					<div class="piece player-two" key="piece-two" v-if="cell === P2"></div>
				</transition>
				<div class="cell-overlay-shadow"></div>
				<div class="cell-overlay"></div>
			</div>
		</div>
	</div>
	<!-- <button @click="getBest">Get best</button>
	<p v-if="gameEnd">The {{winningPlayer.toLowerCase()}} player has won!</p>
	<p v-else-if="score === 0">The score is even.</p>
	<p v-else>The {{winningPlayer.toLowerCase()}} player is leading by {{Math.abs(score)}} points.</p> -->
</div>
</template>

<script>
import Connect4Game from '../lib/Connect4.js';
import Evaluate from '../lib/Evaluate.js';
import getBestMove from '../lib/Minimax.js';

import { SETTINGS, PLAYER_ONE, PLAYER_TWO, NO_PIECE } from '../lib/Constants.js';

const Game = new Connect4Game();

export default {
	data() {
		return {
			game: Game,
			P1: PLAYER_ONE,
			P2: PLAYER_TWO,
			noPiece: NO_PIECE,

			rows: Game.rows,
			cols: Game.cols,

			score: 0
		}
	},
	computed: {
		board() {
			return this.game.grid;
		},
		fullCols() {
			return Game.nextPieceAtHeight.map(height => height >= this.rows);
		},
		gameEnd() {
			return Math.abs(this.score) > 1000;
		},
		winningPlayer() {
			return this.score < 0 ? "Red" : "Green";
		}
	},
	methods: {
		makeMove(col) {
			console.log("Dropping piece on col ", col);
			Game.doMove(col);
			this.getScore();
		},
		getScore() {
			//const E = new Evaluate(this.board, this.rows, this.cols);
			//this.score = E.execute();
		},
		getBest() {
			let copy = Game.copy();
			const bestMove = getBestMove(copy, 8);
			console.log(bestMove);
			this.makeMove(bestMove);
		}
	}
}
</script>

<style scoped>
.board {
	position: relative;
	display: inline-flex;
	overflow: hidden;
	border-radius: 0 0 9px 9px;
}

.col {
	display: flex;
	flex-direction: column-reverse;
	cursor: pointer;
	background: transparent;
	width: 110px;
	box-sizing: content-box;

	--col-bg-main: var(--color-board);
	--piece-size: 75px;
	--piece-gradient-size: 35px;
	--piece-gradient-size2: 36px;
}

.col:hover {
	--col-bg-main: var(--color-board-highlight);
}

.col::before, .col::after {
	display: block;
	content: '';
	width: 100%;
	height: 20px;
	background: var(--col-bg-main);
}

.col:first-child {
	border-left: 15px solid var(--color-board);
}
.col:last-child {
	border-right: 15px solid var(--color-board);
}

.cell {
	box-sizing: border-box;
	width: 100%;
	height: 90px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	border-width: 0 1px 0 1px;
	border-style: solid;
	border-color: rgba(0, 0, 0, 0.05);
}

.col:last-child .cell {
	border-right-width: 0px;
}

.col:first-child .cell {
	border-left-width: 0px;
}

.cell-overlay, .cell-overlay-shadow {
	width: 100%;
	height: 100%;
	position: absolute;
}

.cell-overlay {
	background: radial-gradient(circle at center, transparent var(--piece-gradient-size), var(--col-bg-main) var(--piece-gradient-size2));
}

.cell-overlay-shadow {
	width: var(--piece-size);
	height: var(--piece-size);
	border-radius: 50%;
	box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2);
}

.piece {
	transform: translateY(0);
	will-change: transform;
	width: var(--piece-size);
	height: var(--piece-size);
	border-radius: 50%;
}

.piece.player-one {
	background: var(--color-p1);
}

.piece.player-two {
	background: var(--color-p2);
}

.fall-piece-enter-active {
	transition: all .6s;
}

.fall-piece-enter {
	transform: translateY(-600%);
}
</style>


<style scoped>
/*.board {
	display: inline-flex;
	justify-content: center;
	margin-top: 5rem;
	border-bottom-right-radius: 15px;
	border-bottom-left-radius: 15px;
	border-color: rgba(0, 0, 0, 0.2);
	border-style: solid;
	border-width: 0 3px 3px 3px;
	background: rgba(var(--color-secondary), 0.025);
}

/* .col {
	padding-right: 6px;
	padding-left: 6px;
	border-right: 1px solid rgba(0, 0, 0, 0.15);
	border-left: 1px solid rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column-reverse;
	padding-top: 1rem;
	padding-bottom: 1rem;
	transition: background .4s ease-out;
	cursor: pointer;
}

.col:hover {
	background: rgba(255, 255, 255, 0.1);
	transition: background .1s ease;
}

.col.full {
	cursor: default;
}

.col.full:hover {
	background: rgba(255, 255, 255, 0.02);
}

.col:last-of-type {
	padding-right: 1rem;
	border: none;
	border-bottom-right-radius: 15px;
}

.col:first-of-type {
	padding-left: 0;
	border-bottom-left-radius: 15px;
	padding-left: 1rem;
}

.cell {
	width: 70px;
	height: 70px;	
	margin: 10px;
	border-radius: 50%;
	overflow: hidden;
	position: relative;
}

.cell.empty {
	/* background: var(--color-bg-shadow);
	/* background: transparent;
	box-shadow: inset -4px 4px 20px 1px rgba(0, 0, 0, 0.1);
}

.cell-overlay {
	box-sizing: content-box;
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 100px solid black;
}

.piece {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	box-shadow: inset -2px 2px 15px 1px rgba(0, 0, 0, 0.5);
}

.piece.player-one {
	background: var(--color-p1);
}

.piece.player-two {
	background: var(--color-p2);
}

.fall-piece-enter-active {
	transition: all 0s ease;
	position: relative;
	z-index: 500;
}

.fall-piece-enter, .fall-piece-leave-to {
	transform: translateY(-500%);
} */
</style>
