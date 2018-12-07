<template>
	<ul class="menu" @mouseover="showText = true" @mouseleave="showText = false">
		<li class="menu-item">
			<button class="menu-btn">
				<transition name="btn-text">
					<span class="btn-text" v-show="showText">New Game</span>
				</transition>
				<span class="btn-icon">@</span>
			</button>
		</li>
		<li class="menu-item">
			<button class="menu-btn">
				<transition name="btn-text">
					<span class="btn-text" v-show="showText">Restart</span>
				</transition>
				<span class="btn-icon">@</span>
			</button>
		</li>
		<li class="menu-item">
			<button class="menu-btn">
				<transition name="btn-text">
					<span class="btn-text" v-show="showText">Undo Last Move</span>
				</transition>
				<span class="btn-icon">@</span>
			</button>
		</li>
		<li class="menu-item">
			<button class="menu-btn">
				<transition name="btn-text">
					<span class="btn-text" v-show="showText">Options</span>
				</transition>
				<span class="btn-icon">@</span>
			</button>
		</li>
	</ul>
</template>

<script>
export default {
	data() {
		return {
			showText: false
		}
	}
}
</script>

<style scoped>
.menu {
	padding: 0.75rem;
	min-width: 10rem;
	display: flex;
	flex-direction: column;
	text-align: right;
	margin: 0;
}

.menu-item {
	list-style: none;
}

.menu-btn {
	all: unset;
	font-size: 1.4rem;
	text-transform: uppercase;
	padding: 0.5rem;
	cursor: pointer;
}

.menu .btn-icon {
	opacity: 0.5;
	transition: opacity .25s ease;
}

.menu:hover .btn-icon {
	opacity: 1;
}

.btn-text {
	display: inline-block;
	margin-right: 1rem;
}

.btn-text-enter-active, .btn-text-leave-active {
	transition: opacity .2s ease, transform .25s ease-out;
}

.btn-text-enter, .btn-text-leave-to {
	opacity: 0;
	transform: translateX(-0.75rem);
}
</style>
