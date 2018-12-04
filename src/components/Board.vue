<template>
<div>
	<div class="board">
		<div v-for="(col, x) in board" :key="x" class="col" @click="makeMove(x)">
			<div v-for="(cell, y) in col" :key="y" class="cell" :style="{'--col-height': `${(rows + 1 - y) * -100}%`, '--row': `${rows - y}`}">
				<transition name="fall-piece">
					<div class="piece" :class="{'player-one': cell === P1, 'player-two': cell === P2}" :key="`piece-${cell}`" v-show="cell === P1 || cell === P2">
						<div v-if="usePieceDepth" class="piece-inner"></div>
					</div>
				</transition>
				<div class="cell-overlay-shadow" v-if="useBoardInnerShadow"></div>
				<div class="cell-overlay"></div>
			</div>
		</div>
	</div>
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

			score: 0,

			usePieceDepth: false,
			useBoardInnerShadow: false
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
		}
	},
	methods: {
		makeMove(col) {
			Game.doMove(col);
			this.getScore();
		}
	}
}
</script>

<style scoped>
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

.col:hover {
	--col-bg-main: var(--color-board-highlight);
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

.piece {
	transform: translateY(0);
	will-change: transform;
	width: var(--piece-size);
	height: var(--piece-size);
	border-radius: 50%;
	display: flex;
}

.piece-inner {
	width: 75%;
	height: 75%;
	border-radius: 50%;
	margin: auto;
	box-shadow: inset -1px 0.75px 5px -1px rgba(0, 0, 0, 0.3), inset 1px -0.75px 5px -1px rgba(255, 255, 255, 0.2);
}

.piece.player-one {
	background: var(--color-p1);
}

.piece.player-two {
	background: var(--color-p2);
}

.fall-piece-enter-active {
	transition: all calc(var(--row) * 0.08s + 0.3s) ease-in;
}

.fall-piece-enter {
	transform: translateY(var(--col-height));
}
</style>
