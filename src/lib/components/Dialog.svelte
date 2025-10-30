<script lang="ts">
	import type { DialogType } from '$lib/types/global';
	import { dialog_state } from '$lib/state.svelte';

	let { data }: { data: DialogType } = $props();
	let element = $state<HTMLDialogElement>();
</script>

<dialog bind:this={element} class="modal" open={true}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">User interaction required</h3>
		<p class="py-4">{data.message}</p>
		<div class="modal-action">
			{#if data.reject}
				<button
					class="btn"
					onclick={async () => {
						if (data.callbackreject) await data.callbackreject();
						element!.requestClose();
						dialog_state.set(false);
					}}>{data.reject}</button
				>
			{/if}
			{#if data.confirm}
				<button
					class="btn btn-primary"
					onclick={async () => {
						if (data.callbackconfirm) await data.callbackconfirm();
						element!.requestClose();
						dialog_state.set(false);
					}}>{data.confirm}</button
				>
			{/if}
		</div>
	</div>
</dialog>
