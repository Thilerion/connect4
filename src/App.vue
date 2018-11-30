<template>
	<div id="app">
		<h1>connect4</h1>
		<C4Board/>
	</div>
</template>

<script>
import C4Board from './components/Board.vue';

export default {
	name: "app",
	components: {
		C4Board
	}
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

*, *::before, *::after {
	box-sizing: inherit;
}

html {
	height: 100vh;
	box-sizing: border-box;
	--color-bg: #2E2944;
	--color-bg-shadow: hsl(251, 25%, 19%);
	--color-p1: #4AA475;
	--color-p2: #B94626;
	--color-primary: #E2A02C;
	--color-secondary: 229, 210, 143;
	font-size: 62.5%;
}

body {
	min-height: 100vh;
	margin: 0;
	background-color: var(--color-bg);
	color: var(--color-secondary);
	font-family: Ubuntu, sans-serif;
	font-size: 1.77rem;
}

h1 {
	color: var(--color-primary);
	margin: 0;
	font-size: 9.7rem;
	letter-spacing: 0.1rem;
}

#app {
	min-height: 100vh;
	padding-top: 1rem;	
	text-align: center;
}
</style>
