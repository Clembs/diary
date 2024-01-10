<script lang="ts">
	import { page } from '$app/stores';
	import dayjs from 'dayjs';
	import type { PageServerData } from './$types';
	import Avatar from '$lib/components/Avatar.svelte';

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

<h1>{date.format('MMMM YYYY')}</h1>
<div class="profile">
	<Avatar avatarUrl={data.user?.avatar} username={data.user?.username} size={24} />
	<div class="profile-text">
		<div class="profile-text-name">
			{data.user?.username}
		</div>
	</div>
</div>

<!-- {JSON.stringify(weeks, null, 2)} -->

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
				<li class="day">
					{#if day}
						<a href="/journal/{date.year()}/{date.month() + 1}/{day}{$page.url.search}">
							{day}
						</a>
					{/if}
				</li>
			{/each}
			<!-- </div> -->
		{/each}
	</ul>
</div>

{JSON.stringify(data.entries)}

<style lang="scss">
	.profile {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		margin-top: -0.75rem;
	}

	.calendar {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 2rem 0;
		height: 100%;

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

				a {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					text-decoration: none;
					background-color: var(--color-surface);
					border-radius: 0.5rem;
					padding: 1rem 0.5rem;
				}
			}
		}
	}
</style>
