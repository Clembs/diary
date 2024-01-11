<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

  export let form;
</script>

<h1>Welcome back Clembs!</h1>

<p>
	Soon, everyone else will be able to create an account on the main server.
	<br />
	Until then, you can self host your own Journal-compatible data set.
	<!-- TODO: Add a "Learn more" documentation link -->
</p>

<form use:enhance method="post">
	<TextInput name="password" label="Password" type="password" />

	<Button type="submit">Login</Button>
</form>
