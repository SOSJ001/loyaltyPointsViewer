<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	let formModal = false;
	import ActionButton from '$lib/components/ActionButton.svelte';
	const demoData = [1, 2, 3, 4, 4];
	let color: any;
</script>

<div class="flex h-full flex-col rounded-lg bg-gray-500 bg-opacity-5 px-5 py-3">
	<div class="flex flex-row justify-between">
		<span class="text-sm md:text-2xl">🏆 Reward List</span>
		<button on:click={() => (formModal = true)}>
			<ActionButton
				bgColor="gray-400"
				hoverBgColor="gray-400"
				hoverTextColor="gray-700 hover:font-bold"
			>
				<svelte:fragment slot="text">
					View <span class="hidden md:inline">Reward</span> History <span class="text-lg">✌</span>
				</svelte:fragment>
			</ActionButton>
		</button>
	</div>
	<div class="w-full overflow-x-auto">
		<div class="w-[500px] overflow-hidden md:w-full">
			<!-- table header below -->
			<div class="grid grid-cols-4 border-b py-5 capitalize text-gray-400">
				<div>reward name</div>
				<div>status</div>
				<div>Points</div>
				<div>actions</div>
			</div>
			<!-- table body blow -->
			<div class="">
				{#each demoData as data}
					<div
						class="grid grid-cols-4 items-center border-b px-2 py-3 capitalize hover:bg-gray-600"
					>
						<div>Super Advert</div>
						<div class="text-green-400">Active</div>
						<div>0 Total</div>
						<div class=" flex space-x-5">
							<button class="rounded p-1 hover:bg-yellow-400 hover:bg-opacity-50">Claim</button>
							<button class="rounded p-1 hover:bg-green-500 hover:bg-opacity-50">Details</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
<!-- modal below here -->
<Modal
	class="h-full rounded-lg bg-opacity-5 bg-gradient-to-tl from-gray-700 via-slate-600 to-violet-900 text-gray-300"
	bind:open={formModal}
	size="sm"
	autoclose={false}
>
	<div class="h-full w-full">
		<h3 class="mb-4 text-xl font-medium">Reward History</h3>
		<div class="grid grid-cols-3 border-b py-5 capitalize text-gray-400">
			<div>reward name</div>
			<div>status</div>
			<div>Points</div>
		</div>
		<!-- table body blow -->
		<div class="overflow-y-auto">
			{#each demoData as data}
				<div class="grid grid-cols-3 items-center border-b px-2 py-3 capitalize hover:bg-gray-600">
					<div>Super Advert</div>
					<div class="text-green-400">Claimed</div>
					<div>0</div>
				</div>
			{/each}
		</div>
	</div>
</Modal>
