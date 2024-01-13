<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { getBaseServerUrl } from '$lib/helpers/getBaseServerUrl';
	import type { LayoutServerData } from './$types';
	import { marked } from 'marked';

	export let data: LayoutServerData;

	// const emotion: Record<Emotion, string> = {
	// 	ANGRY: '😡',
	// 	ANXIOUS: '😰',
	// 	CONTENT: '😊',
	// 	DOWN: '😞',
	// 	HAPPY: '😄',
	// 	STRESSED: '😫',
	// 	TIRED: '😴'
	// };
</script>

{#if !data.entry}
	{#if data.userData?.id === data.user?.id && getBaseServerUrl(data.baseUrl) === $page.url.origin}
		<p class="subtext">You haven't written an entry for this date yet.</p>

		<Button href="{$page.url.pathname}/edit{$page.url.search}">Write an entry</Button>
	{:else}
		<p class="subtext">
			{data.user?.username} hasn't written an entry for this date yet.
		</p>
	{/if}
{:else}
	<section id="summary">
		{@html marked(data.entry?.summary || '')}
	</section>

	<!-- TODO: Finish those -->
	<!-- <section id="emotion">
	<div class="section-title">Emotion</div>

	<span class="emoji">
		{emotion[data.entry?.emotion]}
	</span>
</section>

<section id="activities">
	<div class="section-title">Time spent today</div>

	<ul>
		{#each data.entry?.activities || [] as activity}
			<li>{activity}</li>
		{/each}
	</ul>
</section> -->

	<!-- {JSON.stringify(data.entry)} -->
{/if}

<style lang="scss">
	#summary {
		font-size: 1.25rem;
		margin-bottom: 2rem;
	}

	section {
		margin-bottom: 2rem;

		// .section-title {
		// 	margin-bottom: 0.25rem;
		// 	font-weight: 500;
		// 	text-transform: uppercase;
		// 	font-size: 0.75rem;
		// }

		// .emoji {
		// 	font-size: 2rem;
		// }
	}
</style>
