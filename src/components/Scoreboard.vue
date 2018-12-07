<template>
	<div class="scoreboard">
		<div class="player-score p1" :class="{active: currentPlayer === p1.id, win: winner === p1.id, lose: winner === p2.id}">
			<span class="player-name">{{p1.name}}</span>
			<span class="score">{{p1.wins}}</span>
		</div>
		<transition name="game-end">
		<div class="play-again" v-show="gameEnd">
			<span>Player {{winner}} wins!</span>
			<button class="control-btn" @click="newGame">Play again</button>
		</div>
		</transition>

		<div class="player-score p2" :class="{active: currentPlayer === p2.id, win: winner === p2.id, lose: winner === p1.id}">
			<span class="player-name">{{p2.name}}</span>
			<span class="score">{{p2.wins}}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: ['p1', 'p2', 'currentPlayer', 'gameEnd', 'winner'],
	methods: {
		newGame() {
			this.$emit('newGame');
		}
	}
}
</script>

<style scoped>
.scoreboard {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	padding: 0 3px;
	margin-top: 2rem;
	margin-bottom: 1rem;
}

.play-again {
	width: 15rem;
	flex: 0 1 auto;
	overflow: hidden;
}

.play-again > span {
	height: 3rem;
	line-height: 3rem;
	font-size: 1.5rem;
	white-space: nowrap;
	text-align: center;
}

.game-end-enter-active, .game-end-leave-active {
	/* transition: width .2s ease; */
	transition: width .9s ease;
}

.game-end-enter, .game-end-leave-to {
	width: 0;
}

.control-btn {
	text-transform: uppercase;
	background: none;
	border: 2px solid var(--color-secondary);
	color: var(--color-secondary);
	font-weight: 600;
	border-radius: 3px;
	font-size: 1.2rem;
	cursor: pointer;
	width: 10rem;
	height: 3rem;
	transition: background .1s ease, color .1s ease;
	outline: none;
}

.control-btn:hover {
	background: var(--color-secondary);
	color: var(--color-bg);
}

.player-score {
	width: 16rem;
	border: 3px solid;
	border-radius: 1.25rem;
	padding: 0 1rem;
	font-weight: 600;
	font-size: 1.5rem;
	letter-spacing: 0.5px;
	transition: all .2s ease-in;
	cursor: default;
	display: flex;
	align-items: center;
	justify-content: space-between;
	white-space: nowrap;
	height: 4rem;
}

.player-score.p1 {
	margin-right: 1rem;
	flex-direction: row;
	border-color: var(--color-p1);
	color: var(--color-p1);
}

.player-score.p1 .score {
	margin-left: 0.5rem;
}

.player-score.p2 .score {
	margin-right: 0.5rem;
}

.player-score .score {
	flex: 0 0 2rem;
}

.player-score .player-name {
	flex: 4 1 auto;
}

.player-score.p1.active:not(.lose), .player-score.p1.win {
	color: var(--color-bg);
	background-color: var(--color-p1);
}

.player-score.p2 {
	margin-left: 1rem;
	flex-direction: row-reverse;
	border-color: var(--color-p2);
	color: var(--color-p2);
}

.player-score.p2.active:not(.lose), .player-score.p2.win {
	color: var(--color-bg);
	background-color: var(--color-p2);
}

.player-name {
	text-transform: uppercase;
}
</style>
