<script lang="ts">
	import MobileNav from '$lib/components/MobileNav.svelte';
	import { mobile_state } from '$lib/state.svelte';
	let { children } = $props();
</script>

{#if mobile_state.get()}
	<MobileNav />
{/if}
{@render children?.()}
