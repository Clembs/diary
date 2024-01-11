<script lang="ts">
	import type { PageServerData } from './$types';
	import { marked } from 'marked';

	export let data: PageServerData;

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
