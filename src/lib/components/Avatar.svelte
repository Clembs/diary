<script lang="ts">
	export let username = '';
	export let avatarUrl: string | null | undefined = '';
	export let size = 32;
</script>

{#if avatarUrl}
	<img class="avatar" src={avatarUrl} alt={username} width="{size}px" height="{size}px" />
{:else}
	<div class="avatar" style:--size="{size}px">
		{username
			.split(' ')
			.map((name) => name[0])
			.slice(0, 2)
			.join('')}
	</div>
{/if}

<style lang="scss">
	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: var(--color-primary);
		color: var(--color-on-primary);
		font-weight: 600;
		font-size: 1.2rem;
		width: var(--size);
		height: var(--size);
		user-select: none;
		text-decoration: none;
	}
</style>
