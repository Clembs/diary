<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { ActionData } from './$types';
	import UserCard from './UserCard.svelte';

	let url = '';

	export let form: ActionData;
</script>

<header>
	<h1>Welcome to Journal (super early alpha)</h1>

	<p>The open-source, decentralized journaling web app.</p>
</header>

<main>
	<h2>Read my journal</h2>

	<UserCard
		user={{ avatar: null, username: 'Clembs', id: '2af80eac-fb25-4932-bd11-5417903f0649' }}
		baseUrl="{$page.url.origin}/data/2af80eac-fb25-4932-bd11-5417903f0649"
	/>

	<h2>Search public journals</h2>

	<p>Use a Journal-compatible data server URL.</p>

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
				placeholder="e.g. {$page.url.origin}/data/2af80eac-fb25-4932-bd11-5417903f0649"
				label="Journal URL"
				name="url"
				autofocus
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
			<h3>User journals on this URL</h3>

			<UserCard {...form} />
		{/if}
	{/if}
</main>
