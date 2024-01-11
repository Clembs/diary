<script lang="ts">
	import type { User } from '$lib/types';
	import Avatar from './Avatar.svelte';

	export let user: User | undefined;
	export let baseUrl: string | undefined;
</script>

<div class="profile">
	<Avatar avatarUrl={user?.avatar} username={user?.username} size={24} />
	<div class="profile-text">
		<span class="profile-text-name">
			{user?.username}
		</span>
		<span class="subtext">
			• {baseUrl?.replace(/(^\w+:|^)\/\//, '')}
		</span>
	</div>
</div>

<style lang="scss">
	.profile {
		display: flex;
		align-items: center;
		gap: 0.75rem;

		&-text-name {
			font-weight: 500;
			font-size: 1rem;
			// font-family: var(--font-heading);
		}
	}
</style>
