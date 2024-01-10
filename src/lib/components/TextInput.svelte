<script lang="ts">
	type InputType = 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' | 'search';

	export let type: InputType = 'text';
	export let required = true;
	export let placeholder = '';
	export let disabled = false;
	export let readonly = false;
	export let value = '';
	export let maxlength: number | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let multiline = false;
	export let name = '';
	export let label = '';
	export let height = '200px';
</script>

<div class="text-input">
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	{#if multiline}
		<textarea
			style:--height={height}
			bind:value
			on:input
			on:focus
			on:blur
			on:keydown
			{minlength}
			{maxlength}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{name}
			id={name}
			{...$$restProps}
		/>
	{:else}
		<input
			{...{ type }}
			bind:value
			on:input
			on:focus
			on:blur
			on:keydown
			{minlength}
			{maxlength}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{name}
			id={name}
			{...$$restProps}
		/>
	{/if}
</div>

<style lang="scss">
	.text-input {
		display: flex;
		flex-direction: column;
		text-align: left;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		width: 100%;

		label {
			font-size: 0.9rem;
			font-weight: 500;
		}

		textarea,
		input {
			background-color: var(--neutral-100);
			color: var(--neutral-700);
			border: 2px solid var(--neutral-300);
			padding: 0.75rem;
			border-radius: 0.5rem;
			font-family: inherit;
			font-size: inherit;
			width: 100%;
			font-size: 0.875rem;
			transition: height 0.2s cubic-bezier(0.1, 0.6, 0.4, 1);

			&:disabled {
				color: var(--neutral-500);
			}
		}

		textarea {
			resize: none;
			height: var(--height);
		}
	}
</style>
