<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import dayjs from 'dayjs';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';

	export let data: PageServerData;

	$: date = dayjs(`${$page.params.year}/${$page.params.month}/${$page.params.day}`);
</script>

<Header title={date.format('MMMM DD, YYYY')} user={data.user} baseUrl={data.baseUrl}>
	<div class="controls">
		<Button
			style="secondary"
			inline={false}
			href={`/journal/${date.add(-1, 'day').format('YYYY/MM/DD')}?baseUrl=${data.baseUrl}`}
			disabled={date.isBefore('2024-01-02')}
		>
			Previous
		</Button>
		<Button
			style="secondary"
			inline={false}
			href={`/journal/${date.add(1, 'day').format('YYYY/MM/DD')}?baseUrl=${data.baseUrl}`}
			disabled={date.isAfter(dayjs().add(-1, 'day'))}
		>
			Next
		</Button>
	</div>
</Header>

<slot />

<style lang="scss">
	.controls {
		display: flex;
		gap: 0.25rem;
	}
</style>
