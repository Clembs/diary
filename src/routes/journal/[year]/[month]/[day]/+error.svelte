<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

{#if $page.status === 404}
	<p class="subtext">
		{data.user?.username} hasn't written an entry for this date yet.
	</p>
{/if}
