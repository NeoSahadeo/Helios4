<script lang="ts">
	import { resolve } from '$app/paths';
	import GithubButton from '$lib/components/GithubButton.svelte';
	import LoginIcon from '$lib/icons/LoginIcon.svelte';
	import '$lib/styles/misc.css';
</script>

<!-- <div class="absolute -top-10 -left-20 h-32 w-32 bg-[var(--clr-primary-a0)] blur-3xl"></div> -->
<article class="flex h-full w-full flex-col items-center justify-center">
	<div class="-mt-44 mb-20 flex flex-col items-end">
		<p class="zilla-slab-bold primary-text" style="font-size: 5.5em;">Helios 4</p>
		<p class="zilla-slab-bold primary-text -mt-6" style="font-size: 1.5em;">by Neo Sahadeo</p>
	</div>
	<div class="flex flex-col gap-5">
		<button
			class="primary-background zilla-slab-bold glass-card border-0 px-10 py-3 text-2xl text-yellow-800 transition-all duration-100 hover:scale-105 hover:cursor-pointer"
			onclick={() => {
				document.location.href = resolve('/login');
			}}>Log In</button
		>
		<GithubButton />
	</div>
</article>
