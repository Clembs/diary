<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import type { User } from '$lib/types';
	import { ArrowRight } from 'lucide-svelte';

	export let user: User;
	export let baseUrl: string;
</script>

<a href="/journal?userUrl={baseUrl}/{user.id}" class="user">
	<div class="profile">
		<Avatar
			username={user.username}
			avatarUrl={user.avatar ? `${baseUrl}/avatars/${user.avatar}` : undefined}
			size={32}
		/>

		<div class="profile-text">
			<div class="profile-text-name">
				{user.username}
			</div>
			<div class="profile-text-subtext">
				Read journal
				<ArrowRight size={16} />
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	.user {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1rem;
		width: 100%;
		gap: 0.75rem;
		border: 2px solid var(--color-surface);
		border-radius: 0.75rem;
		padding: 0.75rem;
		text-decoration: none;

		&:hover {
			background-color: var(--color-surface);

			.profile-text-subtext {
				gap: 0.5rem;
			}
		}

		.profile {
			display: flex;
			align-items: center;
			gap: 0.75rem;

			&-text-name {
				font-weight: 500;
				font-size: 1.1rem;
				// font-family: var(--font-heading);
			}
			&-text-subtext {
				font-size: 0.875rem;
				color: var(--color-subtext);
				display: flex;
				align-items: center;
				gap: 0.25rem;
				transition: gap 100ms ease-in;
			}
		}
	}
</style>
