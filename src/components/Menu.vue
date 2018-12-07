<template>
	<ul class="menu" @mouseover="showText = true" @mouseleave="showText = false">
		<li class="menu-item">
			<button class="menu-btn" @click="$emit('newGame')">
				<transition name="btn-text">
					<span class="btn-text" v-show="showText">Restart Game</span>
				</transition>
				<svg class="btn-icon" :width="iconSize" :height="iconSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" d="M21 13H13V21H11V13H3V11H11V3H13V11H21V13Z"/></svg>
			</button>
		</li>
		<li class="menu-item">
			<button class="menu-btn" @click="$emit('resetAll')">
				<transition name="btn-text">
					<span class="btn-text" v-show="showText">Reset All</span>
				</transition>
				<svg class="btn-icon" :width="iconSize" :height="iconSize" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 6V2L7 7L12 12V8C15.31 8 18 10.69 18 14C18 17.31 15.31 20 12 20C8.69 20 6 17.31 6 14H4C4 18.42 7.58 22 12 22C16.42 22 20 18.42 20 14C20 9.58 16.42 6 12 6Z"/>
				</svg>
			</button>
		</li>
		<li class="menu-item">
			<button class="menu-btn" @click="$emit('undoMove')">
				<transition name="btn-text">
					<span class="btn-text" v-show="showText">Undo Last Move</span>
				</transition>
				<svg class="btn-icon" :width="iconSize" :height="iconSize" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M12.5 8C9.85 8 7.45 8.99 5.6 10.6L2 7V16H11L7.38 12.38C8.77 11.22 10.54 10.5 12.5 10.5C16.04 10.5 19.05 12.81 20.1 16L22.47 15.22C21.08 11.03 17.15 8 12.5 8Z"/>
				</svg>
			</button>
		</li>
		<li class="menu-item">
			<button class="menu-btn" @click="$emit('openSettings')">
				<transition name="btn-text">
					<span class="btn-text" v-show="showText">Options</span>
				</transition>
				<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" :width="iconSize" :height="iconSize" viewBox="0 0 20 20"><path xmlns="http://www.w3.org/2000/svg" fill="none" d="M0 0h20v20H0V0z"/><path xmlns="http://www.w3.org/2000/svg" d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>
			</button>
		</li>
	</ul>
</template>

<script>
export default {
	data() {
		return {
			showText: false,
			iconSize: 24
		}
	}
}
</script>

<style scoped>
.menu {
	padding: 0.75rem;
	min-width: 15rem;
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
	padding-left: 1rem;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: flex-end;
	opacity: 0.5;
	transition: opacity .25s ease, background .15s ease, color .15s ease;
}

.btn-icon {
	color: inherit;
	fill: currentColor;
}

.menu:hover .menu-btn {
	opacity: 0.7;
}

.menu-btn:hover {
	background-color: var(--color-secondary);
	color: var(--color-bg);
}

.btn-text {
	display: inline-block;
	margin-right: 1rem;
	color: inherit;
}

.btn-text-enter-active, .btn-text-leave-active {
	transition: opacity .2s ease, transform .25s ease-out;
}

.btn-text-enter, .btn-text-leave-to {
	opacity: 0;
	transform: translateX(-0.5rem);
}
</style>
