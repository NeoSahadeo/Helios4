<script lang="ts">
	import { onMount } from 'svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { fetch_passwords } from '$lib/scripts/network';
	import type { PasswordObject } from '$lib/types/global';
	import SlidePassword from '$lib/components/SlidePassword.svelte';
	import { loading_state } from '$lib/state.svelte';

	let passwords = $state<PasswordObject[]>([]);
	loading_state.set(true);
	onMount(async () => {
		passwords = await fetch_passwords();
		loading_state.set(false);
	});

	// $inspect(passwords);
</script>

<article class="flex flex-col items-center">
	{#if !loading_state.get()}
		<SearchBar />
		<div class="mt-12 flex w-full max-w-sm flex-col gap-1">
			{#each passwords as p, index}
				<SlidePassword obj={p} {index} />
			{/each}
		</div>
		<div>PAGE NEXT PAGE BACK</div>
		<div class="mb-20"></div>
	{/if}
</article>
