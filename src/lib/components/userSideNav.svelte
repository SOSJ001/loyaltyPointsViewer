<script>
	import { goto } from '$app/navigation';
	import { logOut } from '$lib/supabase/store';
	import NavButton from './NavButton.svelte';
	let routes = [
		{ icon: '👀', name: 'Overview', url: '/Dashboard/User' },
		{ icon: '🏆', name: 'Rewards', url: '/Dashboard/User/Rewards' },
		{ icon: '⚒', name: 'Points', url: '/Dashboard/User/Points' },
		{ icon: '⚙', name: 'Profile', url: '/Dashboard/User/Profile' }
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
			if (UNSET_COOKIE) {
				goto('/Log-in');
			}
		}
	};
</script>

<div class="flex h-full flex-col items-center justify-start">
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
			<div
				class="flex w-full items-center justify-start gap-1 rounded-lg border border-gray-300 px-5 py-3.5 shadow-inner hover:bg-gray-600 hover:font-bold hover:text-gray-300"
			>
				<button class="w-full" on:click|stopPropagation={logOutAction}>
					<div class="flex w-full justify-between text-nowrap leading-tight">
						<div>
							<span>❔</span>
							<span>Logout</span>
						</div>

						<span>⚓</span>
					</div>
				</button>
			</div>
		</div>
		<div class="flex w-full items-center justify-center">
			<div
				class="flex h-[200px] w-4/5 flex-col items-center justify-center rounded-lg bg-gray-400 font-bold text-violet-900"
			>
				<span class="hidden text-lg capitalize md:inline"> made with love </span>
				<span class="hidden text-5xl md:inline"> 💖 </span>
				<!-- brand name and logo  -->
				<div class="w-full md:hidden">
					<div class="flex flex-col items-center justify-center space-x-3">
						<slot name="userName"><span>user Name</span></slot>
						<!-- brand logo -->
						<div title="Avatar/logo" class="py-5 text-xl">
							<span class="rounded-full bg-gray-300 p-3 text-5xl">👤</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
