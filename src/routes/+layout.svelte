<script lang="ts">
	import '../styles/global.scss';
</script>

<div class="content">
	<slot />
</div>

<style lang="scss">
	.content {
		margin: 0 auto;
		max-width: 800px;
		padding: 1rem;
	}
</style>
