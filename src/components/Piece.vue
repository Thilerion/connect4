<template>
	<div
		class="piece"
		:class="[playerClass]"
		:style="pieceSize"
	>
		<div v-if="useDepth" class="piece-inner"></div>
	</div>
</template>

<script>
import { PLAYER_ONE, PLAYER_TWO } from '../lib/Constants.js';

export default {
	props: {
		player: null,
		useDepth: Boolean,
		size: null
	},
	computed: {
		playerClass() {
			if (this.player === PLAYER_ONE) return 'piece-one';
			else if (this.player === PLAYER_TWO) return 'piece-two';
		},
		pieceSize() {
			if (!this.size) {
				return {width: 'var(--piece-size)', height: 'var(--piece-size)'};
			} else {
				return {width: `${this.size}px`, height: `${this.size}px`};
			}
		}
	}
}
</script>

<style scoped>
.piece {
	/* transform: translateY(0); */
	will-change: transform;
	/* width: var(--piece-size);
	height: var(--piece-size); */
	border-radius: 50%;
	display: flex;
}

.piece.is-winner {
	border: 6px solid red;
}

.piece-inner {
	width: var(--inner-piece-size);
	height: var(--inner-piece-size);
	border-radius: 50%;
	margin: auto;
	box-shadow: inset -1px 0.75px 5px -1px rgba(0, 0, 0, 0.4), inset 1.5px -1px 1.5px -1px rgba(255, 255, 255, 0.35);
	background: linear-gradient(220deg, rgba(255,255,255,0.1) -20%, transparent 70%);
}

.piece.piece-one {
	background: var(--c-p1);
}

.piece.piece-two {
	background: var(--c-p2);
}
</style>
