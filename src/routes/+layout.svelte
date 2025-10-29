<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import '$lib/styles/theme.css';
	import '$lib/styles/glass.css';
	import favicon from '$lib/assets/favicon.svg';
	import Loading from '$lib/components/Loading.svelte';
	import { loading_state, mobile_state } from '$lib/state.svelte';

	let { children } = $props();

	const resize_callback = () => {
		mobile_state.set(window.innerWidth < 540);
	};
	onMount(() => {
		document.body.removeEventListener('resize', resize_callback);
		window.addEventListener('resize', resize_callback);
		resize_callback();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if loading_state.get()}
	<Loading />
{/if}
<main
	style="height: 100dvh; min-height: 100dvh;"
	class={`px-3 pt-3 sm:px-0 ${loading_state.get() ? 'hidden' : ''}`}
>
	{@render children?.()}
</main>
