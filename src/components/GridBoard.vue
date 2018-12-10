<template>
	<div
		class="grid-board"
		:style="[gridCols, gridRows]"
		@click="$emit('doMove', 1)"
	>

		<Piece 
			v-for="(p, index) in flatBoard"
			:key="`piece-${index}`"
			v-if="p.cell !== noPiece"
			:style="{'grid-column': p.x + 1, 'grid-row': rows - p.y}"
			:player="p.cell"
		/>

		<div
			v-for="(cell, i) in nCells"
			:key="cell"
			class="cell-overlay"
			:style="showColsRows[i]"		
		>
			<div class="cell-overlay-shadow"></div>
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
	components: {
		Piece
	},
	data() {
		return {
			P1: PLAYER_ONE,
			P2: PLAYER_TWO,
			noPiece: NO_PIECE
		}
	},
	computed: {
		flatBoard() {
			return this.board.map((col, x) => {
				return col.map((cell, y) => {
					return {cell, x, y};
				})
			}).flat();
		},
		nCells() {
			return this.cols * this.rows;
		},
		showColsRows() {
			return new Array(this.nCells).fill(0).map((cell, index) => {
				const col = (index % this.cols) + 1;
				const row = Math.ceil((index - col) / this.cols) + 1;
				console.log({col, row})
				return {
					'grid-column': `${col} / span 1`,
					'grid-row': `${row} / span 1`
				};
			})
		},
		gridCols() {
			return {
				'--grid-cols': this.cols
			};
		},
		gridRows() {
			return {
				'--grid-rows': this.rows
			};
		}
	},
	methods: {
		registerBoardClick(e) {
			console.log(e);
		}
	}
}
</script>

<style scoped>
.grid-board {
	display: grid;
	grid-template-columns: repeat(var(--grid-cols), 100px);
	grid-template-rows: repeat(var(--grid-rows), 100px);
}

.cell-overlay {
	background: radial-gradient(circle at center, transparent 34px, var(--c-main-light-1) 35px);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
}

.cell-overlay-shadow {
	border-radius: 50%;
	width: calc(35px * 2);
	height:calc(35px * 2);
	box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2);
}
</style>
