<script lang="ts">
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import LoginIcon from '$lib/icons/LoginIcon.svelte';
	import ToggleSwitch from '$lib/components/ToggleSwitch.svelte';
	import Logo from '$lib/assets/helios4logo.svg';
	import ViewPasswordIcon from '$lib/icons/ViewPasswordIcon.svelte';
	import NoViewPasswordIcon from '$lib/icons/NoViewPasswordIcon.svelte';
	import BackIcon from '$lib/icons/BackIcon.svelte';
	import SpinnerIcon from '$lib/icons/SpinnerIcon.svelte';
	import { login } from '$lib/scripts/network';

	let view_password = $state<boolean>(false);

	let submit_button = $state<HTMLButtonElement>();
	let submitting = $state<boolean>(false);
</script>

<button
	class="btn absolute top-2 left-2"
	onclick={() => {
		document.location.href = resolve('/');
	}}
>
	<BackIcon />
</button>
<form
	class="mx-auto flex h-full max-w-sm flex-col justify-center gap-3"
	onsubmit={async (e) => {
		e.preventDefault();
		e.stopImmediatePropagation();
		submit_button!.disabled = true;
		submitting = true;
		if (await login()) {
			document.location.href = resolve('/u/home');
		}
		submitting = false;
		submit_button!.disabled = false;
	}}
>
	<input type="checkbox" name="view_password" hidden bind:checked={view_password} />
	<div>
		<img src={Logo} alt="Helio4" class="mx-auto mb-10 w-60" />
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Username</legend>
			<input type="text" class="input w-full" placeholder="Type here" required />
		</fieldset>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Password</legend>
			<div class="relative">
				<input
					type={view_password ? 'text' : 'password'}
					class="input w-full"
					placeholder="Type here"
					required
				/>
				<button
					type="button"
					class="absolute top-1/2 right-3 z-50 -translate-y-1/2"
					onclick={() => (view_password = !view_password)}
				>
					{#if view_password}
						<ViewPasswordIcon />
					{:else}
						<NoViewPasswordIcon />
					{/if}
				</button>
			</div>
		</fieldset>
	</div>
	<span class="text-md flex items-center gap-3 font-bold">
		Remember Me?
		<ToggleSwitch />
	</span>
	<button class="btn btn-primary mt-4" type="submit" bind:this={submit_button}
		>Log In <span style="padding-top: 1px;">
			{#if submitting}
				<span in:fade>
					<SpinnerIcon />
				</span>
			{:else}
				<span in:fade>
					<LoginIcon />
				</span>
			{/if}
		</span></button
	>
</form>
