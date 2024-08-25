<script>
	import UserSideBar from '$lib/components/userSideNav.svelte';
</script>

<div class="grid h-screen grid-cols-12 md:gap-10 overflow-hidden">
	<!-- side bar below  -->
	<div class="hidden md:block col-span-3 bg-gray-500 bg-opacity-5 px-3 pb-3 shadow-lg">
		<UserSideBar />
	</div>
	<!-- main content area below  -->
	<div
		class="col-span-12 md:col-span-9 space-y-3 grid h-screen w-full grid-rows-12 overflow-hidden bg-opacity-5 py-5 p-5 md:pr-10"
	>
		<!-- main content is split into top and buttom  -->

		<!-- top main content aka header  -->
		<div class="row-span-1 grid w-full grid-cols-3 items-baseline justify-between pb-3 ">
			<div class="text-nowrap hidden md:block">Hello there 👋</div>
			<div class="text-nowrap md:hidden">Hello 👋</div>
			<!-- search field below  -->
			<div class="flex w-full flex-row items-center justify-center border-b">
				<div class=" w-full">
					<input
						class="w-full border-none bg-transparent focus:border-transparent focus:ring-transparent"
						type="text"
						placeholder="search"
					/>
				</div>
				<button title="Search" class="rounded text-xl hover:bg-gray-400 hover:bg-opacity-10"
					>🔍</button
				>
			</div>
			<div class="hidden w-full md:block ">
				<div class="w-full flex justify-end space-x-3">
					<span>User Name</span>
				<span>User Avater🎈</span>
				</div>
			</div>
			<div class="md:hidden text-end text-4xl" title="menu">📚</div>
		</div>
		<!--  buttom main content  -->
		<div class="row-span-11 overflow-x-auto">
			<slot></slot>
		</div>
	</div>
</div>
