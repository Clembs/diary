<script lang="ts">
	import type { User } from '$lib/types';
	import Profile from './Profile.svelte';

	export let title: string;
	export let user: User | undefined;
	export let baseUrl: string | undefined;
</script>

<header>
	<h1>{title}</h1>
	{#if user}
		<Profile {user} {baseUrl} />
	{/if}

	<slot />
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h1 {
			margin-bottom: 0.75rem;
		}
	}
</style>
