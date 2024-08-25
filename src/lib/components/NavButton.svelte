<script lang="ts">
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
	export let location: string = '/';
</script>

<a href={location}>
	<div
		class="{location === activeUrl
			? 'bg-gray-300 font-bold text-violet-900'
			: ''} flex w-full items-center justify-start gap-1 rounded-lg border border-gray-300 px-5 py-3.5 shadow-inner hover:bg-gray-600 hover:font-bold hover:text-gray-300"
	>
		<div class="flex w-full justify-between text-nowrap leading-tight">
			<span>
				<slot name="text">Overview</slot>
			</span>
			<span>⚓</span>
		</div>
	</div>
</a>
