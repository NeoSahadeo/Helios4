<script lang="ts">
	import type { PasswordObject } from '$lib/types/global';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { dialog_stack } from '$lib/states/stacks.svelte';
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte';
	let {
		obj,
		index
	}: {
		obj: PasswordObject;
		index: number;
	} = $props();

	let name = obj.nickname || obj.site_name || obj.notes || obj.id;
	let element = $state<HTMLElement>();
	let pos = [0, 0];
	let displace = 0;
	const bounds = 60;
	let element_bounds = 0;

	const copy_to_clipboard = async () => {
		if (window.isSecureContext) {
			dialog_stack.push({
				message: `Copy "${name}" password to clipboard?`,
				confirm: 'Yes',
				reject: 'No',
				callbackconfirm: async () => {
					try {
						await navigator.clipboard.writeText(obj.password);
					} catch (err) {
						alert(err);
					}
				}
			});
		} else {
			dialog_stack.push({
				message: 'Your connection is not secure, refusing to copy to clipboard.',
				reject: 'Close'
			});
		}
		dialog_stack.dispatch('update');
	};
</script>

<div class="relative rounded-lg bg-yellow-500">
	<p
		bind:this={element}
		ondblclick={() => {
			copy_to_clipboard();
			window.getSelection()?.removeAllRanges();
		}}
		ontouchstart={(e) => {
			element!.style.left = '0px';
			const touch = e.touches[0];
			pos[0] = touch.screenX;
			pos[1] = touch.screenY;
			if (element_bounds == 0) {
				element_bounds = element!.getBoundingClientRect().width;
				element!.style.width = `${element_bounds}px`;
			}
		}}
		ontouchmove={(e) => {
			// TODO: FIX Slide dialog not reopneing
			return;
			const touch = e.touches[0];

			const distance = touch.screenX - pos[0];
			if (distance < 0) return;

			displace += distance;
			pos[0] = touch.screenX;
			const abs_displace = Math.abs(displace);

			if (Math.abs(touch.screenY - pos[1]) > 5 && abs_displace < 20) {
				element!.style.left = '0px';
				return;
			}
			if (abs_displace < bounds) {
				element!.style.width = `${parseInt(element!.style.width.slice(0, -2)) - distance}px`;
				element!.style.left = `${parseInt(element!.style.left.slice(0, -2)) + distance}px`;
			} else if (displace > bounds) {
				copy_to_clipboard();
				displace = bounds;
			} else if (displace < bounds) {
				displace = -bounds;
			}
		}}
		ontouchend={() => {
			element!.style.left = '0px';
			element!.style.width = `${element_bounds}px`;
			displace = 0;
		}}
		class={`relative z-10 w-full rounded-lg bg-[var(--clr-surface-a20)] px-3 py-2 py-3`}
	>
		{name}
		{#if obj.site_url}
			<a href={obj.site_url} target="_blank" class="link link-warning"
				>({obj.site_name || obj.site_url})</a
			>
		{/if}
	</p>
	<span class="absolute top-1/2 left-1 -translate-y-1/2"> <CopyIcon /> </span>
</div>
