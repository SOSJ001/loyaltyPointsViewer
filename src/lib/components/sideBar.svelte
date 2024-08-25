<script>
	import NavButton from './NavButton.svelte';
	let routes = [
		{ icon: '👀', name: 'Overview', url: '/Dashboard/Brand' },
		{ icon: '🏆', name: 'Rewards', url: '/Dashboard/Brand/Rewards' },
		{ icon: '🎢', name: 'Analytics', url: '/Dashboard/Brand/Analytics' },
		{ icon: '⚙', name: 'Profile', url: '/Dashboard/Brand/Profile' },
		{ icon: '❔', name: 'Logout', url: '/' }
	];
</script>

<div class="flex h-full flex-col items-center justify-start overflow-y-auto	">
	<!-- side bar title text below  -->
	<div class="space-x-2 text-2xl font-bold md:my-10"><span>💼</span><span>Dashboard</span></div>
	<div class="justify-between flex h-full w-full flex-col">
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
		</div>
		<div class="w-full flex justify-center items-center">
			<div class="w-4/5 bg-gray-400 h-[200px] rounded-lg text-violet-900 font-bold flex flex-col justify-center items-center">
			<span class="capitalize text-lg">
				made with love
			</span>
			<span class="text-5xl">
				💖
			</span>
		</div>
		</div>
		
	</div>
</div>
