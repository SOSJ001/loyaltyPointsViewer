<script>
	import { goto } from '$app/navigation';
	import { logOut } from '$lib/supabase/store';
	import NavButton from './NavButton.svelte';
	let routes = [
		{ icon: '👀', name: 'Overview', url: '/Dashboard/Brand' },
		{ icon: '🏆', name: 'Rewards', url: '/Dashboard/Brand/Rewards' },
		{ icon: '🎢', name: 'Analytics', url: '/Dashboard/Brand/Analytics' },
		{ icon: '⚙', name: 'Profile', url: '/Dashboard/Brand/Profile' }
	];
	let logOutAction = async () => {
		const LOGOUT_RESP = await logOut();
		if (LOGOUT_RESP === null) {
			// if the logout is a success unset the cookie
			const UNSET_COOKIE = await fetch('/unSetCookie', {
				method: 'POST',
				body: JSON.stringify({}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if(UNSET_COOKIE){
				goto('/Log-in');
			}
			
		}
	};
</script>

<div class="flex h-full flex-col items-center justify-start overflow-y-auto">
	<!-- side bar title text below  -->
	<div class="space-x-2 text-2xl font-bold md:my-10"><span>💼</span><span>Dashboard</span></div>
	<div class="flex h-full w-full flex-col justify-between">
		<div class="space-y-4">
			{#each routes as route}
				<div class="w-full">
					<NavButton location={route.url}>
						<span slot="text">
							<span>{route.icon}</span>
							<span>{route.name}</span>
						</span>
					</NavButton>
				</div>
			{/each}
			<div class="flex w-full items-center justify-start gap-1 rounded-lg border border-gray-300 px-5 py-3.5 shadow-inner hover:bg-gray-600 hover:font-bold hover:text-gray-300">
				<button class="w-full" on:click|stopPropagation={logOutAction}>
					
						<div class="flex w-full justify-between text-nowrap leading-tight">
							<span>❔</span>
							<span>Logout</span>
							<span>⚓</span>
						</div>
					
				</button>
			</div>
			
		</div>
		<div class="flex w-full items-center justify-center">
			<div
				class="flex h-[200px] w-4/5 flex-col items-center justify-center rounded-lg bg-gray-400 font-bold text-violet-900"
			>
				<span class="text-lg capitalize"> made with love </span>
				<span class="text-5xl"> 💖 </span>
			</div>
		</div>
	</div>
</div>
