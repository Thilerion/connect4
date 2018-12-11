<template>
	<div
		class="col-overlay"
		:style="{'grid-column': `${col} / span 1`, 'grid-row': '1 / -1'}"
		@click="$emit('doMove', col - 1)"
	>
		<div
			v-for="row in rows"
			:key="row"
			class="cell-overlay"
			:class="{'is-winner': !!winningPieces.find(([winX, winY]) => col - 1 === winX && row - 1 === winY)}"
		>
			<div class="cell-overlay-shadow"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['rows', 'col', 'winningPieces']
}
</script>

<style scoped>
.col-overlay {
	z-index: 2;
	display: flex;
	flex-direction: column-reverse;
	cursor: pointer;
	border-radius: 5px;
}

.cell-overlay {
	/* Needed to prevent strange empty spaces between cells .. */
	transform: scale(1.000001);
	background: radial-gradient(
		circle at center,
		transparent var(--cell-overlay-size),
		var(--c-main-light-1) var(--cell-overlay-size2)
	);
	flex: 1 1 auto;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
}

.col-overlay:hover > .cell-overlay {
	background: radial-gradient(
		circle at center,
		transparent var(--cell-overlay-size),
		var(--c-main-light-2) var(--cell-overlay-size2)
	);
}

.cell-overlay-shadow {
	border-radius: 50%;
	width: var(--piece-cutout-size);
	height: var(--piece-cutout-size);
	box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2);
}

.is-winner > .cell-overlay-shadow {
	animation: cell-win 1s infinite alternate .8s;
}

@keyframes cell-win {
	from {
		box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2), inset 0 0 0px 5px transparent;
	}
	80% {
		box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2), inset 0 0 0px 5px var(--c-text);
	}
	to {
		box-shadow: inset -1px 1px 8px 2px rgba(0, 0, 0, 0.2), inset 0 0 0px 5px var(--c-text);
	}
}
</style>
