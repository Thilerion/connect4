<template>
<div class="board-container">
	<div class="top-container">
		<div class="player-score p1" :class="{active: currentPlayer === P1, win: winner === P1, lose: winner === P2}">
			<span class="player-name">{{playerName(P1)}}</span>
			<span class="score">{{P1wins}}</span>
		</div>
		<transition name="game-end">
		<div class="play-again" v-show="gameEnd">
			<span>Player {{winner}} wins!</span>
			<button class="control-btn" @click="newGame">Play again</button>
		</div>
		</transition>

		<div class="player-score p2" :class="{active: currentPlayer === P2, win: winner === P2, lose: winner === P1}">
			<span class="player-name">{{playerName(P2)}}</span>
			<span class="score">{{P2wins}}</span>
		</div>
	</div>
	<div class="board">
		<div v-for="(col, x) in board" :key="x" class="col" @click="makeMove(x)" :class="{'col-full': fullColumn[x]}">
			<div v-for="(cell, y) in col" :key="y" class="cell" :style="{'--col-height': `${(rows + 1 - y) * -100}%`, '--row': `${rows - y}`}">
				<transition name="fall-piece">
					<Piece
						:useDepth="usePieceDepth"
						:player="cell"
						v-if="cell !== noPiece"
					/>
				</transition>
				<div class="cell-overlay-shadow" v-if="useBoardInnerShadow"></div>
				<div class="cell-overlay"></div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import Piece from './Piece.vue';

import { PLAYER_ONE, PLAYER_TWO, NO_PIECE, AI, HUMAN } from '../lib/Constants.js';

export default {
	props: [
		'cols', 'rows', 'currentPlayer', 'board', 'winner', 'gameEnd', 'p1', 'p2'
	],
	data() {
		return {
			P1: PLAYER_ONE,
			P2: PLAYER_TWO,
			noPiece: NO_PIECE,

			usePieceDepth: true,
			useBoardInnerShadow: false,

			P1type: HUMAN,
			P2type: AI,

			processing: false
		}
	},
	components: {
		Piece
	},
	computed: {
		fullColumn() {
			return this.board.map(col => col[col.length - 1] !== NO_PIECE);
		},
		P1wins() {
			return this.p1.wins;
		},
		P2wins() {
			return this.p2.wins;
		}
	},
	methods: {
		playerName(player) {
			let playerType;
			if (player === PLAYER_ONE) {
				playerType = this.P1type;
			} else if (player === PLAYER_TWO) {
				playerType = this.P2type;
			}
			if (playerType === HUMAN) return 'player';
			else if (playerType === AI) return 'ai';
		},
		tryMove(col) {

		},
		makeMove(col) {

		},
		newGame() {

		}
	// 	makeMove(col) {
	// 		if (this.processing) {
	// 			return;
	// 		}
	// 		if (!this.fullColumn[col]) {
	// 			this.game.doMove(col);
	// 		} else {
	// 			console.warn("Can't place piece in full column!");
	// 		}
	// 	},
	// 	async makeMonteCarloBestMove() {
	// 		if (this.processing) {
	// 			return;
	// 		}

	// 		this.processing = true;
	// 		const results = await monteCarloBestMove(this.game.clone(), 2000);
	// 		this.processing = false;

	// 		this.makeMove(results[0].move);
	// 	},
	// 	newGame() {
	// 		this.game = new Connect4Game();
	// 	}
	// },
	// watch: {
	// 	winner(newVal, oldVal) {
	// 		if (newVal === PLAYER_ONE) {
	// 			this.P1wins++;
	// 		} else if (newVal === PLAYER_TWO) {
	// 			this.P2wins++;
	// 		}
	// 	},
	// 	currentPlayer: {
	// 		handler(newVal, oldVal) {
	// 			if (this.currentPlayerType === AI) {
	// 				setTimeout(() => {
	// 					this.makeMonteCarloBestMove();
	// 				}, 0);
	// 			}
	// 		},
	// 		immediate: true
	// 	}
	}
}
</script>

<style scoped>
.board-container {
	display: inline-block;
}

.top-container {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	padding: 0 3px;
	margin-top: 2rem;
	height: 6rem;
}

.play-again {
	width: 15rem;
	flex: 0 1 auto;
	overflow: hidden;
}

.play-again > span {
	height: 3rem;
	line-height: 3rem;
	font-size: 1.5rem;
	white-space: nowrap;
	text-align: center;
}

.game-end-enter-active, .game-end-leave-active {
	/* transition: width .2s ease; */
	transition: width .9s ease;
}

.game-end-enter, .game-end-leave-to {
	width: 0;
}

.control-btn {
	text-transform: uppercase;
	background: none;
	border: 2px solid var(--color-secondary);
	color: var(--color-secondary);
	font-weight: 600;
	border-radius: 3px;
	font-size: 1.2rem;
	cursor: pointer;
	width: 10rem;
	height: 3rem;
	transition: background .1s ease, color .1s ease;
	outline: none;
}

.control-btn:hover {
	background: var(--color-secondary);
	color: var(--color-bg);
}

.player-score {
	width: 16rem;
	border: 3px solid;
	border-radius: 1.25rem;
	padding: 0 1rem;
	font-weight: 600;
	font-size: 1.5rem;
	letter-spacing: 0.5px;
	transition: all .2s ease-in;
	cursor: default;
	display: flex;
	align-items: center;
	justify-content: space-between;
	white-space: nowrap;
	height: 4rem;
}

.player-score.p1 {
	margin-right: 1rem;
	flex-direction: row;
	border-color: var(--color-p1);
	color: var(--color-p1);
}

.player-score.p1 .score {
	margin-left: 0.5rem;
}

.player-score.p2 .score {
	margin-right: 0.5rem;
}

.player-score .score {
	flex: 0 0 2rem;
}

.player-score .player-name {
	flex: 4 1 auto;
}

.player-score.p1.active:not(.lose), .player-score.p1.win {
	color: var(--color-bg);
	background-color: var(--color-p1);
}

.player-score.p2 {
	margin-left: 1rem;
	flex-direction: row-reverse;
	border-color: var(--color-p2);
	color: var(--color-p2);
}

.player-score.p2.active:not(.lose), .player-score.p2.win {
	color: var(--color-bg);
	background-color: var(--color-p2);
}

.player-name {
	text-transform: uppercase;
}

.board {
	position: relative;
	display: inline-flex;
	overflow: hidden;
	border-radius: 0 0 15px 15px;
	border: 3px solid var(--color-board-border-main);
	border-top-width: 0px;
	margin-top: 2rem;
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

.col.col-full {
	cursor: default;
}

.col:hover {
	--col-bg-main: var(--color-board-highlight);
}

.col.col-full:hover {
	--col-bg-main: var(--color-board-no-highlight);
}

.col::before, .col::after {
	display: block;
	content: '';
	width: 100%;
	background: var(--col-bg-main);
	z-index: 100;
}

.col::before {
	height: 15px;
}

.col::after {
	height: 25px;
}

.col:first-child {
	border-left: 7px solid var(--col-bg-main);
}
.col:last-child {
	border-right: 7px solid var(--col-bg-main);
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
	border-color: var(--color-board-border-secondary);
}

.col:last-child .cell {
	border-right-width: 1px;
	border-right-color: var(--col-bg-main);
}

.col:first-child .cell {
	border-left-width: 1px;
	border-left-color: var(--col-bg-main);
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

.fall-piece-enter-active {
	transition: all calc(var(--row) * 0.08s + 0.3s) ease-in;
}

.fall-piece-enter {
	transform: translateY(var(--col-height));
}
</style>
