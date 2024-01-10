<script lang="ts">
	import { enhance } from '$app/forms';
	import Avatar from '$lib/components/Avatar.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { ActionData } from './$types';
	import { ArrowRight } from 'lucide-svelte';

	export let form: ActionData;

	let url = '';
</script>

<h1>Welcome to Journal (super early alpha)</h1>
<p>Enter a Journal-compatible URL to continue:</p>

<!-- {JSON.stringify(form, null, 2)} -->

<form
	method="POST"
	use:enhance={() =>
		({ update }) =>
			update({
				reset: false
			})}
>
	<TextInput bind:value={url} label="Server URL" name="url" autofocus disabled={!!form?.user} />

	{#if !form?.user}
		<Button type="submit">Continue</Button>
	{/if}
</form>

{#if form}
	{#if form.message}
		<p class="error">{form.message}</p>
	{:else if form.user}
		<h2>User journals on this URL</h2>
		<a href="{url}/" class="suggested-user">
			<div class="profile">
				<Avatar
					username={form.user.username}
					avatarUrl={form.user.avatar ? `${url}/{form.user.username}` : undefined}
					size={32}
				/>

				<div class="profile-text">
					<div class="profile-text-name">
						{form.user.username}
					</div>
					<div class="profile-text-subtext">
						Read journal
						<ArrowRight size={16} />
					</div>
				</div>
			</div>
		</a>
	{/if}
{/if}

<style lang="scss">
	.suggested-user {
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

			.profile-text-name {
				// text-decoration: underline;
				// text-decoration-color: var(--color-subtext);
			}

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
