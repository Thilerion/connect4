<template>
	<div id="app">
		<header>
			<h1>Connect4</h1>
			<div class="menu-container">
				<C4Menu/>
			</div>
		</header>
		<C4Scoreboard 
			v-bind="{
				p1,
				p2,
				winner,
				gameEnd,
				currentPlayer
			}"
			@newGame="newGame"
		/>
		<C4Board
			v-bind="{
				cols,
				rows,
				board,
				uiSettings
			}"
			@doMove="doMove"
		/>
	</div>
</template>

<script>
import Connect4Game from './lib/Connect4.js';
import { SETTINGS, PLAYER_ONE, PLAYER_TWO, NO_PIECE, AI, HUMAN } from './lib/Constants.js';

const gameSettings = { ...SETTINGS };

import C4Board from './components/Board.vue';
import C4Scoreboard from './components/Scoreboard.vue';
import C4Menu from './components/Menu.vue';

export default {
	name: "app",
	components: {
		C4Board,
		C4Scoreboard,
		C4Menu
	},
	data() {
		return {
			gameSettings,
			uiSettings: {
				pieceDepth: true,
				boardInnerShadow: true
			},
			Game: {},
			players: {
				[PLAYER_ONE]: {
					id: PLAYER_ONE,
					name: "player",
					type: HUMAN,
					aiAlgorithm: null,
					wins: 0
				},
				[PLAYER_TWO]: {
					id: PLAYER_TWO,
					name: "ai",
					type: HUMAN,
					aiAlgorithm: null,
					wins: 0
				} 
			}
		}
	},
	computed: {
		cols() {
			return this.Game.cols;
		},
		rows() {
			return this.Game.rows;
		},
		currentPlayer() {
			return this.Game.currentPlayer;
		},
		board() {
			return this.Game.grid;
		},
		gameEnd() {
			return this.Game.gameEnd;
		},
		winner() {
			return this.Game.winner;
		},
		p1() {
			return this.players[PLAYER_ONE]
		},
		p2() {
			return this.players[PLAYER_TWO]
		}
	},
	methods: {
		newGame() {
			this.Game = new Connect4Game(this.settings);
		},
		resetScore() {
			for (const player of Object.values(this.players)) {
				player.wins = 0;
			}
		},
		resetSettings() {
			this.settings = {...SETTINGS};
		},
		resetAll() {
			this.resetSettings();
			this.newGame();
			this.resetScore();
		},
		doMove(col) {
			this.Game.doMove(col);
		},
		undoMove() {
			this.Game.undoMove();
		}
	},
	beforeMount() {
		this.newGame();
	},
	watch: {
		gameEnd(newValue, oldValue) {
			if (!oldValue && !!newValue) {
				this.players[this.winner].wins++;
			}
		}
	}
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

*, *::before, *::after {
	box-sizing: inherit;
}

html {
	height: 100vh;
	box-sizing: border-box;
	--color-bg: #2E2944;
	--color-bg-shadow: hsl(251, 25%, 19%);
	--color-board: hsl(251, 20%, 25%);
	--color-board-no-highlight: hsl(251, 19%, 26%);
	--color-board-highlight: hsl(251, 16%, 29%);
	--color-board-border-main: #282437;
	--color-board-border-secondary: hsla(253, 21%, 18%, 0.6);
	--color-p1: #4aa475;
	--color-p2: #B94626;
	--color-primary: #E2A02C;
	--color-secondary: rgb(229, 210, 143);
	font-size: 62.5%;
}

body {
	min-height: 100vh;
	margin: 0;
	background-color: var(--color-bg);
	color: var(--color-secondary);
	font-family: Ubuntu, sans-serif;
	font-size: 1.77rem;
}

h1 {
	color: var(--color-primary);
	margin: 0;
	font-size: 9.7rem;
	letter-spacing: 0.1rem;
	text-transform: lowercase;
}

#app {
	min-height: 100vh;
	padding-top: 1rem;	
	text-align: center;
}

.menu-container {
	position: absolute;
	right: 0;
	top: 0;
}
</style>
