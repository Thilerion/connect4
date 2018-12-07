<template>
	<transition name="fade-in" appear>
		<div class="settings-container">
			<button class="close-btn" @click="$emit('closeSettings')">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
			</button>

			<div class="setting-category">
				<h2>General</h2>
				<div class="input-block">			
					<label for="rows">Rows: </label>
					<input type="number" name="rows" id="rows" v-model="rows">
				</div>
				<div class="input-block">
					<label for="cols">Columns: </label>
					<input type="number" name="cols" id="cols" v-model="cols">
				</div>
			</div>

			<div class="setting-category">
				<h2>Users</h2>
				<div class="col-2">
					<div class="input-column">
						<h3>Player 1</h3>
						<div class="input-block">			
							<label for="p1-name">Name: </label>
							<input type="text" name="p1-name" id="p1-name" v-model="playerOne.name">
						</div>
					</div>
					<div class="input-column">
						<h3>Player 2</h3>
						<div class="input-block">			
							<label for="p2-name">Name: </label>
							<input type="text" name="p2-name" id="p2-name" v-model="playerTwo.name">
						</div>
						<div class="input-block">			
							<label for="p2-type">Type: </label>
							<input type="text" name="p2-type" id="p2-type" v-model="playerTwo.type">
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</transition>
</template>

<script>
import { PLAYER_ONE, PLAYER_TWO } from '../lib/Constants';

export default {
	props: ['gameSettings', 'players', 'uiSettings'],
	data() {
		return {
			rows: this.gameSettings.ROWS,
			cols: this.gameSettings.COLS,
			playerOne: {
				name: this.players[PLAYER_ONE].name,
				type: this.players[PLAYER_ONE].type,
				algorithm: this.players[PLAYER_ONE].aiAlgorithm
			},
			playerTwo: {
				name: this.players[PLAYER_TWO].name,
				type: this.players[PLAYER_TWO].type,
				algorithm: this.players[PLAYER_TWO].aiAlgorithm
			},
			boardInnerShadow: this.uiSettings.boardInnerShadow,
			pieceDepth: this.uiSettings.pieceDepth
		}
	},
	computed: {
		gameSettingsChanged() {
			return parseInt(this.rows) !== this.gameSettings.ROWS || parseInt(this.cols) !== this.gameSettings.COLS;
		},
		playerTypeChanged() {
			return this.playerOne.type !== this.players[PLAYER_ONE].type ||
				this.playerTwo.type !== this.players[PLAYER_TWO].type ||
				this.playerOne.algorithm !== this.players[PLAYER_ONE].aiAlgorithm ||
				this.playerTwo.algorithm !== this.players[PLAYER_TWO].aiAlgorithm;
		}
	}
}
</script>

<style scoped>
.settings-container {
	width: 770px;
	min-height: 100px;
	padding: 1rem;
	background-color: var(--color-board-highlight);
	border-radius: 15px;
	position: relative;
	text-align: left;
}

.close-btn {
	all: unset;
	position: absolute;
	right: 1rem;
	top: 1rem;
	color: inherit;
	fill: currentColor;
	cursor: pointer;
}

input {
	display: block;
}

label {
	line-height: 2.8rem;
	color: var(--color-tertiary);
}

.input-block {
	margin-bottom: 1rem;
}

.setting-category {
	margin-bottom: 2rem;
}

h2, h3 {
	font-weight: 400;
}

.setting-category > h2 {
	margin: 1rem 0 0.7rem 0;
	font-size: 2.4rem;
	text-transform: uppercase;	
}

.setting-category h3 {
	font-size: 2.1rem;
	/* text-transform: uppercase; */
	margin: 0.5rem 0;
}

.col-2 {
	display: flex;
}

.col-2 > .input-column {
	flex: 0 0 50%;
}
</style>
