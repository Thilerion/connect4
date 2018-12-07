<template>
	<transition name="fade-in" appear>
		<div class="settings-container">
			<button class="close-btn" @click="$emit('closeSettings')">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
			</button>
		</div>
	</transition>
</template>

<script>
export default {

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
</style>
