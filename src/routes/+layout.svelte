<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import '$lib/styles/theme.css';
	import '$lib/styles/glass.css';
	import favicon from '$lib/assets/favicon.svg';
	import Loading from '$lib/components/Loading.svelte';
	import { dialog_state, loading_state, mobile_state } from '$lib/state.svelte';
	import { dialog_stack } from '$lib/states/stacks.svelte';
	import type { DialogType } from '$lib/types/global';
	import Dialog from '$lib/components/Dialog.svelte';

	let { children } = $props();

	const resize_callback = () => {
		mobile_state.set(window.innerWidth < 540);
	};
	onMount(() => {
		document.body.removeEventListener('resize', resize_callback);
		window.addEventListener('resize', resize_callback);
		resize_callback();
	});

	let dialog = $state<DialogType | undefined>(undefined);
	function sleep(time: number): Promise<void> {
		return new Promise((resolve) => setTimeout(() => resolve(), time));
	}
	dialog_stack.subscribe('update', async () => {
		while (true) {
			if (dialog != undefined && dialog_state.get() == true) {
				await sleep(1000);
				continue;
			}
			dialog_state.set(true);
			dialog = dialog_stack.pop();
			if (dialog == undefined) break;
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="absolute top-0 left-0">
	{#if dialog != undefined}
		<Dialog data={dialog} />
	{/if}
</div>

{#if loading_state.get()}
	<Loading />
{/if}
<main
	style="height: 100dvh; min-height: 100dvh;"
	class={`px-3 pt-3 sm:px-0 ${loading_state.get() ? 'hidden' : ''}`}
>
	{@render children?.()}
</main>
