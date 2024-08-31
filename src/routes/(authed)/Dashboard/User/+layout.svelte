<script lang="ts">
	//@ts-nocheck
	import UserSideBar from '$lib/components/userSideNav.svelte';
	import { Drawer, Modal } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	export let data;
	let rewards: [] = data.user_reward_response.data as []; // get the reward data from the data prop
	let searchResult: any
	let hiddenDrawer = true; // for the hambuger menu
	let transitionParamsRight = {
		x: 320,
		duration: 200,
		easing: sineIn
	};
	let searchModal = false //search modal
	let searchValue: string
</script>

<div class="grid h-screen grid-cols-12 overflow-hidden md:gap-10">
	<!-- side bar below  -->
	<div class="col-span-3 hidden bg-gray-500 bg-opacity-5 px-3 pb-3 shadow-lg md:block">
		<UserSideBar />
	</div>
	<!-- main content area below  -->
	<div
		class="col-span-12 grid h-screen w-full grid-rows-12 space-y-3 overflow-hidden bg-opacity-5 px-3 py-3 md:col-span-9 md:px-0 md:pr-10"
	>
		<!-- main content is split into top and buttom  -->

		<!-- top main content aka header  -->
		<div
			class="row-span-1 flex w-full items-center justify-between gap-5 md:grid md:grid-cols-3 md:gap-0"
		>
			<div class="hidden text-nowrap md:block">Hello there 👋</div>
			<div class="flex text-nowrap md:hidden"><span>Hello</span> <span>👋</span></div>
			<!-- search field below  -->
			<div class="flex w-full flex-row items-center justify-center border-b">
				<div class=" w-full">
					<input
					bind:value={searchValue}
						class="w-full border-none bg-transparent focus:border-transparent focus:ring-transparent"
						type="text"
						placeholder="search"
					/>
				</div>
				<button
				on:click={()=>{
						searchModal = true
						 searchResult = rewards.filter(search=>search.abbreviation.toLowerCase === searchValue.toLowerCase || search.name.toLowerCase === searchValue)
						searchValue=""
					}} 
				 title="Search" class="rounded text-xl hover:bg-gray-400 hover:bg-opacity-10"
					>🔍</button
				>
			</div>
			<!-- user name and avatar  -->
			<div class="hidden w-full md:block">
				<div class="flex items-center justify-end space-x-3">
					<span>{data.user_name}</span>
					<!-- brand logo -->
					<div title="Avatar/logo" class="py-5 text-xl">
						<span class="rounded-full bg-gray-300 p-1">👤</span>
					</div>
				</div>
			</div>
			<button
				on:click={() => (hiddenDrawer = false)}
				class="rounded bg-gray-700 bg-opacity-25 p-1 text-end text-4xl md:hidden"
				title="menu">📚</button
			>
		</div>
		<!--  buttom main content  -->
		<div class="row-span-11 overflow-x-auto">
			<slot></slot>
		</div>
	</div>
	<!-- hambuger menu below -->
	<Drawer
		class="p-0"
		placement="right"
		transitionType="fly"
		transitionParams={transitionParamsRight}
		bind:hidden={hiddenDrawer}
		activateClickOutside={true}
		id="sidebar6"
	>
		<!-- <SideBar/> -->
		<button
			on:click|stopPropagation={() => (hiddenDrawer = true)}
			class=" h-full w-full bg-gradient-to-br from-slate-900 via-slate-900 to-violet-900 p-3"
		>
			<div class="h-full w-full rounded-lg bg-gray-500 bg-opacity-5 p-3">
				<div class="absolute right-7 top-6 flex w-full items-center justify-end">
					<button on:click={() => (hiddenDrawer = true)} class="text-md text-end">❌</button>
				</div>
				<UserSideBar><span slot="userName">{data.user_name}</span></UserSideBar>
			</div>
		</button>
	</Drawer>

	<!-- search modal -->
	<Modal
		class="h-full rounded-lg bg-opacity-5 bg-gradient-to-tl from-gray-700 via-slate-600 to-violet-900 text-gray-300"
		bind:open={searchModal}
		size="sm"
		autoclose={false}
	>
		<div class="w-[500px] overflow-hidden md:w-full">
			<!-- table header below -->
			<div class="grid grid-cols-3 border-b py-5 capitalize text-gray-400">
				<div>reward name</div>
				<div>status</div>
				<div>Points</div>
			</div>
			<!-- table body blow -->
			<div class="">
				{#each searchResult as data, i (data.id)}
					<div
						class="grid grid-cols-3 items-center border-b px-2 py-3 capitalize hover:bg-gray-600"
					>
						<div>{data.name}</div>
						<div class="text-green-400">Active</div>
						<div>{data.points} Total</div>
					</div>
				{/each}
			</div>
		</div>
	</Modal>
</div>
