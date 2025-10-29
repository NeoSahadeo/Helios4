<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from '$lib/assets/helios4logo.svg';
	import GithubButton from '$lib/components/GithubButton.svelte';
	import LoginIcon from '$lib/icons/LoginIcon.svelte';
	import '$lib/styles/misc.css';
</script>

<!-- <div class="absolute -top-10 -left-20 h-32 w-32 bg-[var(--clr-primary-a0)] blur-3xl"></div> -->
<div class="sun-blob absolute -top-10 -left-20"></div>
<article class="flex h-full w-full flex-col items-center justify-center">
	<img src={Logo} alt="Helio4" class="w-60" />
	<div class="mx-5 mb-5">
		<p class="text-primary max-w-sm pt-4 text-center">
			A no muss, no fuss password manager platform.
		</p>
		<p class="text-primary pt-2 text-right text-xs">
			- created by <a href="https://github.com/NeoSahadeo/" target="_blank">Neo Sahadeo</a>
		</p>
	</div>
	<div class="flex flex-col gap-5">
		<button
			class="btn btn-primary"
			onclick={() => {
				document.location.href = resolve('/login');
			}}>Log In <span style="padding-top: 1px;"> <LoginIcon /></span></button
		>
		<GithubButton />
	</div>
	<!-- <p class="font-bold text-[var(--clr-primary-a0)]">Created By Neo Sahadeo</p> -->
</article>
