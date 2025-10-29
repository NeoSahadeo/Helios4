<script lang="ts">
	import type { PasswordObject } from '$lib/types/global';
	let {
		obj,
		index
	}: {
		obj: PasswordObject;
		index: number;
	} = $props();

	let element = $state<HTMLElement>();
	let pos = [0, 0];
	let displace = 0;
	const bounds = 60;
</script>

<div class="relative">
	{#if obj.nickname}
		<p
			bind:this={element}
			ontouchstart={(e) => {
				element!.style.left = '0px';
				const touch = e.touches[0];
				pos[0] = touch.screenX;
				pos[1] = touch.screenY;
			}}
			ontouchmove={(e) => {
				const touch = e.touches[0];

				const distance = touch.screenX - pos[0];
				displace += distance;
				pos[0] = touch.screenX;
				const abs_displace = Math.abs(displace);
				if (Math.abs(touch.screenY - pos[1]) > 5 && abs_displace < 20) {
					element!.style.left = '0px';
					return;
				}
				if (abs_displace < bounds)
					element!.style.left = `${parseInt(element!.style.left.slice(0, -2)) + distance}px`;
				else if (displace > bounds) displace = bounds;
				else if (displace < bounds) displace = -bounds;
			}}
			ontouchend={() => {
				element!.style.left = '0px';
				displace = 0;
			}}
			class={`h-full max-h-10 py-2 ${index % 2 ? 'bg-green-500' : 'bg-red-500'} relative z-10`}
		>
			{obj.nickname}
		</p>
		<span class="absolute top-0 left-0"> Copy </span>
	{/if}
</div>
