<template>
	<div class="board">
		<div v-for="(col, x) in board" :key="x" class="col">
			<div v-for="(cell, y) in col" :key="y" class="cell" :class="{'player-one': cell === P1, 'player-two': cell === P2, 'empty': cell === noPiece}">

			</div>
		</div>
	</div>
</template>

<script>
import {Game as Connect4Game, PLAYER_ONE, PLAYER_TWO, NO_PIECE} from '../lib/Connect4.js';
const Game = new Connect4Game().doMove(1).doMove(2).doMove(2);

export default {
	data() {
		return {
			board: Game.grid,
			P1: PLAYER_ONE,
			P2: PLAYER_TWO,
			noPiece: NO_PIECE
		}
	}
}
</script>

<style scoped>
.board {
	display: inline-flex;
	justify-content: center;
	margin-top: 5rem;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	border-color: rgba(0, 0, 0, 0.2);
	border-style: solid;
	border-width: 0 3px 3px 3px;
	padding: 1rem;
	background: rgba(255, 255, 255, 0.01);
}

.col {
	padding-right: 4px;
	padding-left: 4px;
	border-right: 2px solid rgba(0, 0, 0, 0.15);
	display: flex;
	flex-direction: column-reverse;
}

.col:last-of-type {
	padding-right: 0;
	border: none;
}

.col:first-of-type {
	padding-left: 0;
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
