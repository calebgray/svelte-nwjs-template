<script lang="ts">
	let count: number = 0;
	const increment = () => {
		count += 1;
		console.log('hello?');
	}
</script>

<style>
	button {
		width: 75%;
		height: 4em;
	}
</style>

<button on:click={increment}>
	{count} clicks
</button>
