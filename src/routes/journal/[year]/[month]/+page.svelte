<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import dayjs from 'dayjs';
	import { ChevronLeft, ChevronRight, Home } from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';
	import Profile from '$lib/components/Profile.svelte';

	export let data: PageServerData;

	const date = dayjs(`${$page.params.year}/${$page.params.month}`);

	function generateMonthMatrix(year: number, month: number): (number | null)[][] {
		const weeks: (number | null)[][] = [];
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const numDays = lastDay.getDate();

		let currentWeek: (number | null)[] = new Array(7).fill(null);

		for (let i = 0; i < firstDay.getDay(); i++) {
			currentWeek[i] = null;
		}

		for (let day = firstDay.getDate(); day <= numDays; day++) {
			currentWeek[firstDay.getDay()] = day;
			if (firstDay.getDay() === 6 || day === numDays) {
				weeks.push(currentWeek);
				currentWeek = new Array(7).fill(null);
			}
			firstDay.setDate(firstDay.getDate() + 1);
		}

		return weeks;
	}

	const weeks = generateMonthMatrix(date.year(), date.month());
</script>

<header>
	<a class="back-btn subtext" href="/">
		<Home size={16} />
		Home
	</a>

	<div class="title">
		<h1>{date.format('MMMM YYYY')}</h1>

		<div class="controls">
			<Button
				style="secondary"
				inline={false}
				icon
				href={`/journal/${date.add(-1, 'month').format('YYYY/MM')}?baseUrl=${data.baseUrl}`}
				disabled={date.isBefore('2024-01-02')}
				aria-label="Previous month"
			>
				<ChevronLeft />
			</Button>
			<Button
				style="secondary"
				inline={false}
				icon
				href={`/journal/${date.add(1, 'month').format('YYYY/MM')}?baseUrl=${data.baseUrl}`}
				disabled={date.isAfter(dayjs().add(-1, 'month'))}
				aria-label="Next month"
			>
				<ChevronRight />
			</Button>
		</div>
	</div>

	{#if data.user}
		<Profile user={data.user} baseUrl={data.baseUrl} />
	{/if}
</header>

<div class="calendar">
	<ul class="weekdays">
		<li>Su</li>
		<li>Mo</li>
		<li>Tu</li>
		<li>We</li>
		<li>Th</li>
		<li>Fr</li>
		<li>Sa</li>
	</ul>

	<ul class="days">
		{#each weeks as week}
			<!-- <div class="week"> -->
			{#each week as day}
				<li>
					{#if day}
						{#if new Date(`${date.year()}/${date.month() + 1}/${day}`).getTime() > new Date().getTime()}
							<span class="day">{day}</span>
						{:else}
							<a
								class="day passed {data.entries?.find(
									(entry) => new Date(entry.date).getDate() === day
								)
									? 'active'
									: ''}"
								href="/journal/{date.year()}/{date.month() + 1}/{day}{$page.url.search}"
							>
								{day}
							</a>
						{/if}
					{/if}
				</li>
			{/each}
			<!-- </div> -->
		{/each}
	</ul>
</div>

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

	.calendar {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 2rem 0;
		height: 100%;
		user-select: none;

		ul {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			gap: 0.25rem;
			padding: 0;
			margin: 0;
			list-style: none;

			&.weekdays {
				font-size: 0.75rem;
				font-weight: 600;
				color: var(--color-subtext);
				text-transform: uppercase;

				li {
					background-color: transparent;
					text-align: center;
				}
			}

			li {
				margin: 0;
				padding: 0;
			}
		}
	}

	.day {
		display: flex;
		align-items: center;
		justify-content: center;
		// width: 100%;
		max-width: 7rem;
		text-decoration: none;
		border-radius: 0.5rem;
		padding: 1rem 0.5rem;
		border: 2px solid transparent;

		&.passed {
			border: 2px solid var(--color-surface);
			font-weight: 500;

			&:hover {
				background-color: var(--color-surface);
				color: var(--color-on-surface);
			}

			&.active {
				background-color: var(--color-surface);
				color: var(--color-on-surface);

				&:hover {
					background-color: var(--color-surface-variant);
					color: var(--color-on-surface-variant);
					border: 2px solid var(--color-surface-variant);
				}
			}
		}
	}
</style>
