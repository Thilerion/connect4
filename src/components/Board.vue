<template>
	<div class="board">
		<div v-for="col in 7" :key="col" class="col">
			<div v-for="cell in 6" :key="cell" class="cell">

			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.board {
	display: inline-flex;
	justify-content: center;
	margin-top: 5rem;
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	border-color: rgba(0, 0, 0, 0.2);
	border-style: solid;
	border-width: 0 3px 3px 3px;
	padding: 1rem;
	background: rgba(255, 255, 255, 0.01);
}

.col {
	padding-right: 4px;
	padding-left: 4px;
	border-right: 2px solid rgba(0, 0, 0, 0.15);
}

.col:last-of-type {
	padding-right: 0;
	border: none;
}

.col:first-of-type {
	padding-left: 0;
}

.cell {
	width: 70px;
	height: 70px;
	background: var(--color-bg-shadow);
	margin: 10px;
	border-radius: 50%;
	box-shadow: inset -4px 4px 20px 1px rgba(0, 0, 0, 0.1);
}
</style>
