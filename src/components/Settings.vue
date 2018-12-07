<template>
	<transition name="fade-in" appear>
		<div class="settings-container">
			<button class="close-btn" @click="$emit('closeSettings')">X</button>
		</div>
	</transition>
</template>

<script>
export default {

}
</script>

<style scoped>
.settings-container {
	position: absolute;
	left: 0; right: 0;
	top: 0; bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	z-index: 200;
	border-radius: 20px;
	border: 3px solid rgba(0, 0, 0, 0.1);
}

.fade-in-enter-active, .fade-in-leave-active {
	transition: opacity .3s ease;
}

.fade-in-enter, .fade-in-leave-to {
	opacity: 0;
}

.close-btn {
	position: absolute;
	right: 1rem;
	top: 1rem;
}
</style>
