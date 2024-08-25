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
					<span class="hidden md:inline">List</span> New Reward
					<span class="text-sm md:text-lg">✌</span>
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
				<div>Claimed</div>
				<div>actions</div>
			</div>
			<!-- table body blow -->

			{#each demoData as data}
				<div
						class="grid grid-cols-4 items-center border-b px-2 py-3 capitalize hover:bg-gray-600"
					>
					<div class="">SuperAdvert</div>
					<div class="text-green-400">Active</div>
					<div class="">0 Total</div>
					<div class=" flex flex-col items-start md:flex-row md:items-start md:space-x-5">
						<button class="rounded p-1 hover:bg-yellow-400 hover:bg-opacity-50">Edit</button>
						<button class="rounded p-1 hover:bg-red-500 hover:bg-opacity-50">Delete</button>
						<button class="rounded p-1 hover:bg-green-500 hover:bg-opacity-50">Details</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- modal below here -->
</div>

<Modal
	class="h-full rounded-lg bg-opacity-5 bg-gradient-to-tl from-gray-700 via-slate-600 to-violet-900 text-gray-300"
	bind:open={formModal}
	size="sm"
	autoclose={false}
>
	<div class="h-full w-full">
		<form class="flex flex-col space-y-3 text-lg" action="#">
			<h3 class="mb-4 text-xl font-medium">List New Reward</h3>
			<div class="space-y-2">
				<label for="name">Reward Name</label>
				<input
					required
					id="name"
					type="text"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="name">Reward Abbreviation</label>
				<input
					required
					id="name"
					type="text"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="description">Reward Description</label>
				<textarea
					required
					id="description"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="terms">Reward Terms and Condition</label>
				<textarea
					required
					id="terms"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2" title="Choose color for display on chart">
				<label for="color" class="text-{color}">Choose Reward color </label>
				<input
					required
					id="color"
					type="color"
					bind:value={color}
					class="rounded-md border-2 border-gray-300 bg-transparent focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<button class="w-full">
				<ActionButton
					width="full"
					bgColor="gray-400"
					hoverBgColor="gray-400"
					hoverTextColor="gray-700 hover:font-bold"
				>
					<svelte:fragment slot="text">
						List Reward <span class="text-lg">✌</span>
					</svelte:fragment>
				</ActionButton>
			</button>
		</form>
	</div>
</Modal>
