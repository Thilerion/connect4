<template>
	<div class="board">
		<div v-for="(col, x) in board" :key="x" class="col" :class="{full: fullCols[x]}">
			<div v-for="(cell, y) in col" :key="y" class="cell" :class="{'player-one': cell === P1, 'player-two': cell === P2, 'empty': cell === noPiece}">

			</div>
		</div>
	</div>
</template>

<script>
import {Game as Connect4Game, PLAYER_ONE, PLAYER_TWO, NO_PIECE} from '../lib/Connect4.js';
const Game = new Connect4Game().doMove(1).doMove(2).doMove(2).doMove(1).doMove(1).doMove(1).doMove(1).doMove(2).doMove(0).doMove(1);

export default {
	data() {
		return {
			board: Game.grid,
			P1: PLAYER_ONE,
			P2: PLAYER_TWO,
			noPiece: NO_PIECE,

			rows: Game.rows,
			cols: Game.cols
		}
	},
	computed: {
		fullCols() {
			return Game.nextPieceAtHeight.map(height => height >= this.rows);
		}
	}
}
</script>

<style scoped>
.board {
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

.col {
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
	box-shadow: inset -2px 2px 15px 1px rgba(0, 0, 0, 0.5);
}

.cell.empty {
	background: var(--color-bg-shadow);
	box-shadow: inset -4px 4px 20px 1px rgba(0, 0, 0, 0.1);
}

.cell.player-one {
	background: var(--color-p1);
}

.cell.player-two {
	background: var(--color-p2);
}
</style>
