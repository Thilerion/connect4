<template>
	<transition-group
		class="grid-board"
		tag="div"
		:style="[gridCols, gridRows]"
		name="fall-piece"
	>
		<Piece
			v-for="(p, index) in flatBoard"
			v-if="p.cell !== noPiece"
			:key="`piece-${index}`"
			:style="pieceGridPosition(p)"
			:player="p.cell"
			:useDepth="uiSettings.pieceDepth"
			class="grid-piece"
		/>

		<div
			class="col-overlay"
			v-for="col in cols"
			:key="`col-${col}`"
			:style="{'grid-column': `${col} / span 1`, 'grid-row': '1 / -1'}"
			@click="$emit('doMove', col - 1)"
		>
			<div
				v-for="row in rows"
				:key="row"
				class="cell-overlay"
				:class="{'is-winner': !!winningPieces.find(([winX, winY]) => col - 1 === winX && row - 1 === winY)}"
			>
				<div class="cell-overlay-shadow"></div>
			</div>
		</div>
	</transition-group>
</template>

<script>
import Piece from "./Piece.vue";

import {
	PLAYER_ONE,
	PLAYER_TWO,
	NO_PIECE,
	AI,
	HUMAN
} from "../lib/Constants.js";

export default {
	props: ["cols", "rows", "board", "uiSettings", "winningPieces"],
	components: {
		Piece
	},
	data() {
		return {
			P1: PLAYER_ONE,
			P2: PLAYER_TWO,
			noPiece: NO_PIECE
		};
	},
	computed: {
		flatBoard() {
			return this.board
				.map((col, x) => {
					return col.map((cell, y) => {
						return { cell, x, y };
					});
				})
				.flat();
		},
		nCells() {
			return this.cols * this.rows;
		},
		showColsRows() {
			return new Array(this.nCells).fill(0).map((cell, index) => {
				const col = (index % this.cols) + 1;
				const row = Math.ceil((index - col) / this.cols) + 1;
				console.log({ col, row });
				return {
					"grid-column": `${col} / span 1`,
					"grid-row": `${row} / span 1`
				};
			});
		},
		gridCols() {
			return {
				"--grid-cols": this.cols
			};
		},
		gridRows() {
			return {
				"--grid-rows": this.rows
			};
		}
	},
	methods: {
		pieceGridPosition({ cell, x, y }) {
			return {
				"grid-column": x + 1,
				"grid-row": this.rows - y,
				"--piece-row": this.rows - y
			};
		}
	}
};
</script>

<style scoped>
.grid-board {
	display: grid;
	grid-template-columns: repeat(var(--grid-cols), 100px);
	grid-template-rows: repeat(var(--grid-rows), 100px);

	/* TODO: set piece size on Piece component itself */
	--piece-size: 80px;
	--inner-piece-size: calc(35px * 1.6);

	background-color: var(--c-main);
	overflow: hidden;
}

.col-overlay {
	z-index: 2;
	display: flex;
	flex-direction: column-reverse;
	cursor: pointer;
}

.cell-overlay {
	background: radial-gradient(
		circle at center,
		transparent 34px,
		var(--c-main-light-1) 35px
	);
	flex: 1 1 auto;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
}

.col-overlay:hover > .cell-overlay {
	background: radial-gradient(
		circle at center,
		transparent 34px,
		var(--c-main-light-2) 35px
	);
}

.cell-overlay-shadow {
	border-radius: 50%;
	width: calc(35px * 2);
	height: calc(35px * 2);
	box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2);
}

.is-winner > .cell-overlay-shadow {
	animation: cell-win 1s infinite alternate .8s;
}

@keyframes cell-win {
	from {
		box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2), inset 0 0 0px 5px transparent;
	}
	80% {
		box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2), inset 0 0 0px 5px var(--c-text);
	}
	to {
		box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2), inset 0 0 0px 5px var(--c-text);
	}
}

.fall-piece-enter-active {
	--bounce-dur: calc((var(--piece-row) * 0.025s) + 0.7s);
	--initial-height: calc(-100% * var(--piece-row) + 25%);
	--bounce1: calc((var(--initial-height) * 0.03) - 8%);
	--bounce2: calc((var(--initial-height) * 0.02) - 2%);
	animation: bounce-in var(--bounce-dur) ease-in;
}

@keyframes bounce-in {
	0% {
		transform: translateY(var(--initial-height));
		animation-timing-function: ease-in;
	}
	40% {
		transform: translateY(0rem);
		animation-timing-function: ease-out;
	}
	60% {
		transform: translateY(var(--bounce1));
		animation-timing-function: ease-in;
	}
	78% {
		transform: translateY(0rem);
		animation-timing-function: ease-out;
	}
	87% {
		transform: translateY(var(--bounce2));
		-webkit-animation-timing-function: ease-in;
	}
	100% {
		transform: translateY(0rem);
		animation-timing-function: ease-out;
	}
}

.fall-piece-enter {
	transform: translateY(calc(-100% * var(--piece-row) + 25%));
}
</style>
