<script lang="ts">
	import dayjs from 'dayjs';
	import type { LayoutServerData } from './$types';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import { ChevronLeft, ChevronRight, CornerUpLeft, Eye, Pencil } from 'lucide-svelte';
	import { getBaseServerUrl } from '$lib/helpers/getBaseServerUrl';

	export let data: LayoutServerData;

	$: dateString = `${$page.params.year}/${$page.params.month}/${$page.params.day}`;
	$: date = dayjs(dateString);
</script>

<header>
	<a
		class="back-btn subtext"
		href="/journal/{$page.params.year}/{$page.params.month}?baseUrl={data.baseUrl}"
	>
		<CornerUpLeft size={16} />
		Go back
	</a>

	<div class="title">
		<h1>{date.format('dddd, MMMM DD')}</h1>

		<div class="controls">
			<Button
				style="secondary"
				inline={false}
				icon
				href={`/journal/${date.add(-1, 'day').format('YYYY/MM/DD')}?baseUrl=${data.baseUrl}`}
				disabled={date.isBefore('2024-01-02')}
				aria-label="Previous day"
			>
				<ChevronLeft />
			</Button>
			<Button
				style="secondary"
				inline={false}
				icon
				href={`/journal/${date.add(1, 'day').format('YYYY/MM/DD')}?baseUrl=${data.baseUrl}`}
				disabled={date.isAfter(dayjs().add(-1, 'day'))}
				aria-label="Next day"
			>
				<ChevronRight />
			</Button>
		</div>
	</div>

	{#if data.user}
		<Profile user={data.user} baseUrl={data.baseUrl} />
	{/if}
</header>

{#if data.userData?.id === data.user?.id && getBaseServerUrl(data.baseUrl) === $page.url.origin}
	<div class="tab-bar">
		<a
			href="/journal/{dateString}?baseUrl={data.baseUrl}"
			class="tab"
			class:active={$page.url.pathname === `/journal/${dateString}`}
		>
			<Eye />
			Viewing
		</a>
		<a
			href="/journal/{dateString}/edit?baseUrl={data.baseUrl}"
			class="tab"
			class:active={$page.url.pathname === `/journal/${dateString}/edit`}
		>
			<Pencil />
			Editing
		</a>
	</div>
{/if}

<slot />

<style lang="scss">
	header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.back-btn {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			text-decoration: none;
			padding: 0.25rem 0.5rem;
			margin: -0.75rem -0.5rem;
			width: max-content;
			border-radius: 0.5rem;

			&:hover {
				background-color: var(--color-surface);
			}
		}

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.controls {
				display: flex;
				gap: 0.25rem;
			}

			h1 {
				margin-bottom: 0.75rem;
			}
		}
	}

	.tab-bar {
		display: flex;
		width: 100%;
		border: 2px solid var(--color-surface-variant);
		border-radius: 1rem;
		padding: 0.125rem;
		gap: 0.25rem;

		.tab {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			text-decoration: none;
			width: 100%;
			justify-content: center;
			padding: 0.5rem 0.5rem;
			border-radius: 0.825rem;
			font-size: 0.875rem;

			&.active,
			&:hover {
				background-color: var(--color-surface);
			}

			&.active {
				font-weight: 500;
			}

			&:active:not(.active) {
				background-color: var(--color-surface-variant);
			}
		}
	}
</style>
