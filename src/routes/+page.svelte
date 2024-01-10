<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { ActionData } from './$types';
	import UserCard from './UserCard.svelte';

	export let form: ActionData;

	let url = '';
</script>

<h1>Welcome to Journal (super early alpha)</h1>

<p>The open-source, decentralized journaling web app.</p>

<h2>Read my journal</h2>

<UserCard
	user={{ avatar: null, username: 'Clembs', id: 'clembs' }}
	baseUrl="{$page.url.origin}/data"
/>

<h2>Search public journals</h2>

<p>Use a Journal-compatible data server URL, or @ a user on this server.</p>

<search>
	<form
		method="POST"
		use:enhance={() =>
			({ update }) =>
				update({
					reset: false
				})}
	>
		<TextInput
			bind:value={url}
			placeholder="e.g. {$page.url.origin}/data/clembs or @Clembs"
			label="Journal URL or handle"
			name="url"
			autofocus
			disabled={!!form?.user}
		/>

		{#if !form?.user}
			<Button type="submit">Search</Button>
		{/if}
	</form>
</search>

{#if form}
	{#if form.message}
		<p class="error">{form.message}</p>
	{:else if form.user}
		<h2>User journals on this URL</h2>

		<UserCard {...form} />
	{/if}
{/if}
