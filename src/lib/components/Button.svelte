<script lang="ts">
	export let href = '';
	export let style: 'filled' | 'secondary' | 'outlined' | 'text' | 'danger' = 'filled';
	export let disabled = false;
	export let type: 'submit' | 'button' = 'button';
	export let inline = true;
	let className = '';
	export { className as class };
</script>

{#if href && !disabled}
	<a class="button {style} {className}" {href} role="button" {...$$restProps} class:inline>
		<slot />
	</a>
{:else}
	<button
		on:click
		on:submit
		{type}
		class="button {style} {className}"
		{disabled}
		{...$$restProps}
		class:inline
	>
		<slot />
	</button>
{/if}

<style lang="scss">
	.button {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 2.5rem;
		width: 100%;
		padding: 0.5rem 1rem;
		gap: 0.75rem;

		appearance: none;
		position: relative;
		user-select: none;
		cursor: pointer;

		font-size: 0.875rem;
		font-family: inherit;
		font-weight: 500;
		text-align: center;
		text-decoration: none;

		background-color: var(--_bg);
		color: var(--_text-color);
		border: var(--_border);
		border-radius: 0.5rem;

		&.inline {
			display: inline-flex;
			width: max-content;
		}

		&.filled {
			--_bg: var(--color-on-background);
			--_border: 1px solid var(--color-on-background);
			--_text-color: var(--color-background);
			--_hover-bg: var(--color-on-surface);
		}
		&.secondary {
			--_bg: var(--color-surface);
			--_border: 1px solid var(--color-surface-variant);
			--_text-color: var(--color-on-surface);
			--_hover-bg: var(--color-surface-variant);
		}
		&.outlined {
			--_bg: var(--color-background);
			--_border: 1px solid var(--color-on-background);
			--_text-color: inherit;
			--_hover-bg: var(--color-surface);
		}
		&.text {
			--_bg: transparent;
			--_border: none;
			--_text-color: inherit;
			--_hover-bg: var(--color-surface);
		}
		&.danger {
			--_bg: var(--color-error);
			--_border: 1px solid var(--color-on-background);
			--_text-color: var(--color-on-error);
			--_hover-bg: var(--color-error);
		}

		:global(svg) {
			height: 24px;
			width: auto;
		}

		&:hover,
		&:focus {
			background-color: var(--_hover-bg);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
			pointer-events: none;
		}
	}
</style>
