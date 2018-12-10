<template>
	<div
		class="grid-board"
		:style="[gridCols, gridRows]"
	>
		<div
			v-for="cell in nCells"
			:key="cell"
			class="cell-overlay">
			<div class="cell-overlay-shadow">

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
		nCells() {
			return this.cols * this.rows;
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
}

.cell-overlay-shadow {
	border-radius: 50%;
	width: calc(35px * 2);
	height:calc(35px * 2);
	box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2);
}
</style>
