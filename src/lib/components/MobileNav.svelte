<script lang="ts">
	import HouseIcon from '$lib/icons/HouseIcon.svelte';
	import PasswordIcon from '$lib/icons/PasswordIcon.svelte';
	import PlusIcon from '$lib/icons/PlusIcon.svelte';
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte';

	HouseIcon;
</script>

<div class="fixed bottom-4 left-1/2 z-50 flex w-full -translate-x-1/2 items-center px-3">
	<header class="glass-card w-full py-2">
		<nav>
			<ul class="flex w-full flex-row justify-around">
				<li><HouseIcon /></li>
				<li><PasswordIcon /></li>
				<li><PlusIcon /></li>
				<li><ProfileIcon /></li>
			</ul>
		</nav>
	</header>
</div>
