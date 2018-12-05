<template>
<div class="board-container">
	<div class="scoreboard">
		<div class="player-score p1" :class="{active: currentPlayer === P1, win: winner === P1, lose: winner === P2}">
			<span class="player-name" v-if="winner === P1">{{playerOneString}} WINS!</span>
			<span class="player-name" v-else>{{playerOneString}}</span>
			<!-- <Piece
				:useDepth="usePieceDepth"
				:player="P1"
				:size="playerPieceSize"
				class="player-piece-color"
			/> -->
		</div>
		<div class="player-score p2" :class="{active: currentPlayer === P2, win: winner === P2, lose: winner === P1}">
			<span class="player-name" v-if="winner === P2">{{playerTwoString}} WINS!</span>
			<span class="player-name" v-else>{{playerTwoString}}</span>
			<!-- <Piece
				:useDepth="usePieceDepth"
				:player="P2"
				:size="playerPieceSize"
				class="player-piece-color"
			/> -->
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
	<div class="ai-controls">
		<button @click="makeMonteCarloBestMove">Monte Carlo Best Move</button>
		<button @click="unmakeMove">Undo Move</button>
	</div>
</div>
</template>

<script>
import Connect4Game from '../lib/Connect4.js';
import { monteCarloBestMove } from '../lib/Random.js';

import { SETTINGS, PLAYER_ONE, PLAYER_TWO, NO_PIECE, AI, HUMAN } from '../lib/Constants.js';

const Game = new Connect4Game();

import Piece from './Piece.vue';

export default {
	data() {
		return {
			game: Game,
			P1: PLAYER_ONE,
			P2: PLAYER_TWO,
			noPiece: NO_PIECE,

			rows: Game.rows,
			cols: Game.cols,

			score: 0,

			usePieceDepth: true,
			useBoardInnerShadow: false,

			P1type: HUMAN,
			P2type: AI,

			playerPieceSize: 25
		}
	},
	components: {
		Piece
	},
	computed: {
		board() {
			return this.game.grid;
		},
		fullColumn() {
			return this.board.map(col => col[col.length - 1] !== NO_PIECE);
		},
		currentPlayer() {
			return this.game.currentPlayer;
		},
		currentPlayerType() {
			if (this.currentPlayer === this.P1) return this.P1type;
			else if (this.currentPlayer === this.P2) return this.P2type;
		},
		playerOneString() {
			if (this.P1type === HUMAN) {
				return "player"
			} else return "ai";
		},
		playerTwoString() {
			if (this.P2type === HUMAN) {
				return "player"
			} else return "ai";
		},
		gameEnd() {
			return this.game.gameEnd;
		},
		winner() {
			if (!this.gameEnd) return;
			return this.game.winner;
		}
	},
	methods: {
		makeMove(col) {
			if (!this.fullColumn[col]) {
				Game.doMove(col);
			} else {
				console.warn("Can't place piece in full column!");
			}
		},
		unmakeMove() {
			Game.undoMove();
		},
		makeMonteCarloBestMove() {
			const results = monteCarloBestMove(this.game.clone(), 200);
			this.makeMove(results[0].move);
		}
	}
}
</script>

<style scoped>
.scoreboard {
	display: flex;
	justify-content: center;
	margin-top: 2rem;
}

.player-score {
	width: 16rem;
	border: 3px solid;
	border-radius: 1.25rem;
	padding: 1rem;
	font-weight: 600;
	font-size: 1.5rem;
	letter-spacing: 0.5px;
	transition: all .2s ease-in;
	cursor: default;
}

.player-score.p1 {
	margin-right: 1rem;
	border-color: var(--color-p1);
	color: var(--color-p1);
}

.player-score.p1.active:not(.lose), .player-score.p1.win {
	color: var(--color-bg);
	background-color: var(--color-p1);
}

.player-score.p2 {
	margin-left: 1rem;
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
	border-color: var(--col-bg-main);
}

.col:first-child .cell {
	border-left-width: 1px;
	border-color: var(--col-bg-main);
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
