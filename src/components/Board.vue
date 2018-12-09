<template>
	<div class="board">
		<div v-for="(col, x) in board" :key="x" class="col" @click="$emit('doMove', x)" :class="{'col-full': fullColumn[x]}">
			<div v-for="(cell, y) in col" :key="y" class="cell" :style="rowColHeightStyle(y)">
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
</template>

<script>
import Piece from './Piece.vue';

import { PLAYER_ONE, PLAYER_TWO, NO_PIECE, AI, HUMAN } from '../lib/Constants.js';

export default {
	props: [
		'cols', 'rows', 'board', 'uiSettings'
	],
	data() {
		return {
			P1: PLAYER_ONE,
			P2: PLAYER_TWO,
			noPiece: NO_PIECE
		}
	},
	components: {
		Piece
	},
	computed: {
		fullColumn() {
			return this.board.map(col => col[col.length - 1] !== NO_PIECE);
		},
		usePieceDepth() {
			return this.uiSettings.pieceDepth;
		},
		useBoardInnerShadow() {
			return this.uiSettings.boardInnerShadow;
		}		
	},
	methods: {
		rowColHeightStyle(y) {
			const row = this.rows - y;
			const colHeight = (this.rows + 1 - y) * -100;
			return {
				'--col-height': `${colHeight}%`,
				'--row': row,
				'--bounce-dur': `${row * 0.04 + 0.3}s`,
				'--bounce-dy1': `${(colHeight * Math.sqrt(row)) / (12 * 8)}%`,
				'--bounce-dy2': `${(colHeight * Math.sqrt(row)) / (24 * 8)}%`,
				'--bounce-dy3': `${(colHeight * Math.sqrt(row)) / (48 * 8)}%`
			};
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
}

.col {
	display: flex;
	flex-direction: column-reverse;
	cursor: pointer;
	background: transparent;
	width: 110px;
	box-sizing: content-box;

	--col-bg-main: var(--color-board);
	--piece-size: 85px;
	--piece-gradient-size: 38px;
	--piece-gradient-size2: 39px;
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
	animation: bounce-in var(--bounce-dur) ease-in;
}

@keyframes bounce-in {
  0% {
    transform: translateY(var(--col-height));
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0rem);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(var(--bounce-dy1));
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0rem);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(var(--bounce-dy2));
    -webkit-animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0rem);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(var(--bounce-dy3));
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
}

</style>
