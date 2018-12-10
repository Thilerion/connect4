<template>
	<div id="app">
		<header>
			<h1>Connect4</h1>
		</header>
		<C4Scoreboard
			v-bind="{
				p1,
				p2,
				winner,
				gameEnd,
				currentPlayer,
				isTie
			}"
			@newGame="newGame"
		/>
		<div class="main">
			<transition mode="out-in" name="fade-in">
				<C4Board
					v-bind="{
						cols,
						rows,
						board,
						uiSettings,
						winningPieces
					}"
					@doMove="doMove"
					v-if="!uiSettings.showSettings"
					key="show-board"
				/>
				<C4Settings
					v-else-if="uiSettings.showSettings" @closeSettings="uiSettings.showSettings = false"
					key="show-settings"
					v-bind="{gameSettings, players, uiSettings}"
				/>
			</transition>
			<div class="menu-container">
				<C4Menu
					@undoMove="undoMove"
					@resetAll="resetAll"
					@newGame="newGame"
					@openSettings="uiSettings.showSettings = true"
				/>
			</div>
		</div>
		
	</div>
</template>

<script>
import Connect4Game from './lib/Connect4.js';
import { SETTINGS, PLAYER_ONE, PLAYER_TWO, TIE, NO_PIECE, AI, HUMAN } from './lib/Constants.js';

const gameSettings = { ...SETTINGS };

import C4Board from './components/Board.vue';
import C4Scoreboard from './components/Scoreboard.vue';
import C4Menu from './components/Menu.vue';
import C4Settings from './components/Settings.vue';

export default {
	name: "app",
	components: {
		C4Board,
		C4Scoreboard,
		C4Menu,
		C4Settings
	},
	data() {
		return {
			gameSettings,
			uiSettings: {
				pieceDepth: true,
				boardInnerShadow: true,
				showSettings: false
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
		isTie() {
			return this.winner === TIE;
		},
		winningPieces() {
			return this.Game.winningPieces;
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
			const rememberWinningPieces = true;
			this.Game.doMove(col, rememberWinningPieces);
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
			if (!oldValue && !!newValue && this.winner !== TIE) {
				this.players[this.winner].wins++;
			}
		}
	}
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,500,700');

*, *::before, *::after {
	box-sizing: inherit;
}

html {
	height: 100vh;
	box-sizing: border-box;

	--c-text: hsl(47, 62%, 73%);
	--c-text-light-1: hsl(46, 41%, 85%);
	
	--c-text-bright: hsl(38, 76%, 53%);

	--c-main: #2d2842;
	--c-main-light-1: hsl(251, 20%, 25%);
	--c-main-light-2: hsl(251, 19%, 27%);
	--c-main-light-3: hsl(251, 16%, 29%);
	--c-main-dark-1: hsl(253, 21%, 21%);
	--c-main-dark-2: hsl(253, 21%, 18%);

	--c-p1: hsl(149, 38%, 47%);
	--c-p2: hsl(13, 66%, 44%);

	font-size: 62.5%;
}

body {
	min-height: 100vh;
	margin: 0;
	background-color: var(--c-main);
	background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm20 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 37a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10-17h20v20H20V20zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' fill='%23403b56' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E");
	color: var(--c-text);
	font-family: Ubuntu, sans-serif;
	font-size: 1.6rem;
}

h1 {
	color: var(--c-text-bright);
	margin: 0;
	font-size: 9.7rem;
	letter-spacing: 0.1rem;
	font-weight: 700;
	text-transform: lowercase;
}

#app {
	min-height: 100vh;
	padding-top: 1rem;	
	text-align: center;
	cursor: default;
}

.menu-container {
	position: absolute;
	right: 0;
	transform: translateX(100%);
}

.main {
	position: relative;
	display: inline-flex;
	padding: 1rem 0;
	margin-top: 1rem;
}

.fade-in-enter-active, .fade-in-leave-active {
	transition: opacity .2s linear;
}

.fade-in-enter, .fade-in-leave-to {
	opacity: 0;
}
</style>
