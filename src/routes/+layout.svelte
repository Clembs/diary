<script lang="ts">
	import '../styles/global.scss';
</script>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		margin: 0 auto;
		max-width: 800px;
		padding: 1rem;
	}
</style>
