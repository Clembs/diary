<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { LayoutServerData } from '../$types';

	export let data: LayoutServerData;

	let loading = false;
</script>

<form
	use:enhance={() => {
		loading = true;
		return ({ update }) => {
			loading = false;
			update({
				reset: false
			});
		};
	}}
	method="post"
>
	<TextInput name="summary" label="Summary" multiline value={data.entry?.summary || ''} autofocus />

	<Button type="submit" disabled={loading}>
		{#if loading}
			Saving...
		{:else}
			Save Changes
		{/if}
	</Button>
</form>

<style lang="scss">
	form {
		margin: 1rem 0;
	}
</style>
