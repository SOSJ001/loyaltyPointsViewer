<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import ActionButton from '$lib/components/ActionButton.svelte';
	import { deleteRewards, insert_Into_Rewards } from '$lib/supabase/store';
	export let data;

	let rewards: any = data.brand_reward_response.data; // get the reward data from the data prop
	// console.log(rewards)
	let brandId: string = '6caf40e2-65cf-49c1-8a42-9454e4ca688d';
	let rewardName: string;
	let abbreviation: string;
	let description: string;
	let termsAndCondition: string;
	let color: string;
	let formModal = false; //to open the form modal
	let editModal = false; // to open the edit modal
	let insertResponse: any;
	// insert into reward function
	let insert_into_reward_function = async () => {
		const { data, error } = await insert_Into_Rewards(
			brandId,
			rewardName,
			abbreviation,
			description,
			termsAndCondition,
			color
		);
		formModal = false; //close the modal
		if (error === null) {
			// if the error = null do this in here
			rewards = [data[0], ...rewards]; //add the data to the array
			// reset the data
			brandId = '';
			rewardName = '';
			abbreviation = '';
			description = '';
			termsAndCondition = '';
			color = '';
			console.log(data[0]);
		} else {
			console.log(error);
		}
	};
</script>

<div class="flex h-full flex-col rounded-lg bg-gray-500 bg-opacity-5 px-3 py-3">
	<div class="flex flex-row items-center justify-between">
		<span class="text-sm md:text-2xl">🏆 Reward List</span>
		<button on:click={() => (formModal = true)}>
			<ActionButton
				bgColor="gray-400"
				hoverBgColor="gray-400"
				hoverTextColor="gray-700 hover:font-bold"
			>
				<svelte:fragment slot="text">
					<span class="text-sm md:text-lg">➕</span>
					<span class="hidden md:inline">List</span> New Reward
				</svelte:fragment>
			</ActionButton>
		</button>
	</div>
	<div class="w-full overflow-x-auto">
		<div class="w-[500px] overflow-hidden md:w-full">
			<!-- table header below -->
			<div class="grid grid-cols-4 border-b py-5 capitalize text-gray-400">
				<div title="Reward Abbreviation">reward abb.</div>
				<div>status</div>
				<div>Claimed</div>
				<div>actions</div>
			</div>
			<!-- table body blow -->
			<!-- {#await }{:then } {/await} -->
			{#each rewards as data, i (data.id)}
				<div class="grid grid-cols-4 items-center border-b px-2 py-3 capitalize hover:bg-gray-600">
					<div class="">{data.abbreviation}</div>
					<div class="text-green-400">Active</div>
					<div class="">{i} Total</div>
					<div class=" flex flex-col items-start md:flex-row md:items-start md:space-x-5">
						<button class="rounded p-1 hover:bg-yellow-400 hover:bg-opacity-50">Edit</button>
						<button
							on:click={// on click of the delete button update the array
							() => {
								rewards.splice(i, 1);
								rewards = [...rewards]; //update the array
								// then delete it from the data base
								deleteRewards(data.id).then((e) => {
									if (e === null) {
										alert('Successfully Deleted');
									} else {
										console.log(e.message);
									}
								});
							}}
							class="rounded p-1 hover:bg-red-500 hover:bg-opacity-50">Delete</button
						>
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
					bind:value={rewardName}
					required
					id="name"
					type="text"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="name">Reward Abbreviation</label>
				<input
					bind:value={abbreviation}
					required
					id="name"
					type="text"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="description">Reward Description</label>
				<textarea
					bind:value={description}
					required
					id="description"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="terms">Reward Terms and Condition</label>
				<textarea
					bind:value={termsAndCondition}
					required
					id="terms"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2" title="Choose color for display on chart">
				<label for="color" class="text-{color}">Choose Reward color </label>
				<input
					bind:value={color}
					required
					id="color"
					type="color"
					class="rounded-md border-2 border-gray-300 bg-transparent focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<button on:click={insert_into_reward_function} class="w-full">
				<ActionButton
					width="full"
					bgColor="purple-600"
					hoverBgColor="gray-400"
					hoverTextColor="gray-700 hover:font-bold"
				>
					<svelte:fragment slot="text">
						List Reward <span class="text-lg">✅</span>
					</svelte:fragment>
				</ActionButton>
			</button>
		</form>
	</div>
</Modal>
<Modal
	class="h-full rounded-lg bg-opacity-5 bg-gradient-to-tl from-gray-700 via-slate-600 to-violet-900 text-gray-300"
	bind:open={editModal}
	size="sm"
	autoclose={false}
>
	<div class="h-full w-full">
		<form class="flex flex-col space-y-3 text-lg" action="#">
			<h3 class="mb-4 text-xl font-medium">List New Reward</h3>
			<div class="space-y-2">
				<label for="name">Reward Name</label>
				<input
					bind:value={rewardName}
					required
					id="name"
					type="text"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="name">Reward Abbreviation</label>
				<input
					bind:value={abbreviation}
					required
					id="name"
					type="text"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="description">Reward Description</label>
				<textarea
					bind:value={description}
					required
					id="description"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="terms">Reward Terms and Condition</label>
				<textarea
					bind:value={termsAndCondition}
					required
					id="terms"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2" title="Choose color for display on chart">
				<label for="color" class="text-{color}">Choose Reward color </label>
				<input
					bind:value={color}
					required
					id="color"
					type="color"
					class="rounded-md border-2 border-gray-300 bg-transparent focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<button on:click={insert_into_reward_function} class="w-full">
				<ActionButton
					width="full"
					bgColor="purple-600"
					hoverBgColor="gray-400"
					hoverTextColor="gray-700 hover:font-bold"
				>
					<svelte:fragment slot="text">
						List Reward <span class="text-lg">✅</span>
					</svelte:fragment>
				</ActionButton>
			</button>
		</form>
	</div>
</Modal>
