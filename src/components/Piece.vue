<template>
	<div
		class="piece"
		:class="player"
	>
		<div v-if="useDepth" class="piece-inner"></div>
	</div>
</template>

<script>
export default {
	props: ['player', 'useDepth']
}
</script>

<style scoped>
.piece {
	transform: translateY(0);
	will-change: transform;
	width: var(--piece-size);
	height: var(--piece-size);
	border-radius: 50%;
	display: flex;
}

.piece-inner {
	width: 75%;
	height: 75%;
	border-radius: 50%;
	margin: auto;
	box-shadow: inset -1px 0.75px 5px -1px rgba(0, 0, 0, 0.3), inset 1px -0.75px 5px -1px rgba(255, 255, 255, 0.2);
}

.piece.player-one {
	background: var(--color-p1);
}

.piece.player-two {
	background: var(--color-p2);
}
</style>
