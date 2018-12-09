<template>
	<div class="board">
		<div v-for="(col, x) in board" :key="x" class="col" @click="$emit('doMove', x)" :class="{'col-full': fullColumn[x]}">
			<div
				v-for="(cell, y) in col"
				:key="y"
				class="cell"
				:style="rowColHeightStyle[rows - 1 - y]"
				:class="{'is-winner': !!winningPieces.find(([winX, winY]) => x === winX && y === winY)}"
			>
				<transition name="fall-piece" type="animation">
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
		'cols', 'rows', 'board', 'uiSettings', 'winningPieces'
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
		},
		rowColHeightStyle() {
			return Array(this.rows).fill(0).map((val, index) => {
				const y = this.rows - 1 - index;
				const row = this.rows - y;

				const colHeight = (this.rows + 1 - y) * -100;
				const bounceDur = row * 0.025 + 0.6;
				const bounceDyBase = colHeight * Math.sqrt(row * 2);
				let bounces = {
					dy1: bounceDyBase / (1 * 55),
					dy2: bounceDyBase / (3 * 55)
				};

				for (const dy in bounces) {
					if (bounces[dy] > -5) {
						console.log(y);
						bounces[dy] = 0;
					}
				}

				return {
					'--col-height': `${colHeight}%`,
					'--row': row,
					'--bounce-dur': `${bounceDur}s`,
					'--bounce-dy1': `${bounces.dy1}%`,
					'--bounce-dy2': `${bounces.dy2}%`
				};
			})
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

	--half-piece-size: 40px;
	--piece-gradient-size: 36px;

	--col-bg-main: var(--color-board);
	--piece-size: calc(var(--half-piece-size) * 2);
	--piece-gradient-size2: calc(var(--piece-gradient-size) + 1px);
	--inner-piece-size: calc(var(--piece-gradient-size) * 1.6);
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
	border-width: 0 1px;
	border-style: solid;
	border-color: var(--color-board-border-secondary);
}

.col:last-child .cell {
	border-right-color: var(--col-bg-main);
}

.col:first-child .cell {
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
	position: absolute;
	width: var(--piece-size);
	height: var(--piece-size);
	border-radius: 50%;
	box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2);
}

.is-winner .cell-overlay-shadow {
	animation: cell-win 1s infinite alternate .8s;
}

@keyframes cell-win {
	from {
		box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2), inset 0 0 0px 8px transparent;
	}
	to {
		box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2), inset 0 0 0px 8px var(--color-primary);
	}
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
  40% {
    transform: translateY(0rem);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  60% {
    transform: translateY(var(--bounce-dy1));
    animation-timing-function: ease-in;
  }
  78% {
    transform: translateY(0rem);
    animation-timing-function: ease-out;
  }
  87% {
    transform: translateY(var(--bounce-dy2));
    -webkit-animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0rem);
    animation-timing-function: ease-out;
  }
}

</style>
