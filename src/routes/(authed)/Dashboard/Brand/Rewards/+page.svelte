<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import ActionButton from '$lib/components/ActionButton.svelte';
	import {
		deleteRewards,
		getServerSession,
		insert_Into_Rewards,
		insertIntoCode,
		updateRewards
	} from '$lib/supabase/store';
	import { generateRandomChars } from '$lib/generalStore.js';
	export let data;
	let rewards: any = data.brand_reward_response.data; // get the reward data from the data prop
	// console.log(rewards)
	let brandId: any;
	getServerSession().then((data) => {
		// get the user id from the server and set it
		brandId = data.user?.id;
	});
	let rewardId:any 
	let rewardName: string;
	let abbreviation: string;
	let description: string;
	let termsAndCondition: string;
	let point: number = 5; //each reward has a constant point of 5 FOR NOW
	let color: string;
	let formModal = false; //to open the form modal
	let editModal = false; // to open the edit modal
	let detailModal = false; // to open the detail modal
	let arrayindex: number; //to keep track of the reward array
	let rowId: any; //id of the row to be edited
	let insertResponse: any;
	// insert into reward function
	let insert_into_reward_function = async () => {
		const { data, error } = await insert_Into_Rewards(
			brandId,
			rewardName,
			abbreviation,
			description,
			termsAndCondition,
			color,
			point
		);
		formModal = false; //close the modal
		if (error === null) {
			alert('Successfully Listed');
			// if the error = null do this in here
			rewards = [data[0], ...rewards]; //add the data to the array
			// reset the data
			brandId = '';
			rewardName = '';
			abbreviation = '';
			description = '';
			termsAndCondition = '';
			color = '';
		} else {
			alert('Listing Not Successful');
			console.log(error);
		}
	};

	//update reward function
	let update_reward_function = async () => {
		const { data, error } = await updateRewards(
			rowId,
			rewardName,
			abbreviation,
			description,
			termsAndCondition,
			color
		);

		if (error === null) {
			editModal = false; //close the modal
			alert('Successfully Updated');
			// if the error = null do this in here
			rewards.splice(arrayindex, 1);
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
		<button
			on:click={() => {
				// reset all fields
				// brandId = '';
				rewardName = '';
				abbreviation = '';
				description = '';
				termsAndCondition = '';
				color = '';
				formModal = true;
			}}
		>
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
			<div class="grid grid-cols-3 border-b py-5 capitalize text-gray-400">
				<div title="Reward Abbreviation">reward abb.</div>
				<div>status</div>
				<div>actions</div>
			</div>
			<!-- table body blow -->
			<!-- {#await }{:then } {/await} -->
			{#each rewards as data, i (data.id)}
				<div class="grid grid-cols-3 items-center border-b px-2 py-3 capitalize hover:bg-gray-600">
					<div class="">{data.abbreviation}</div>
					<div class="text-green-400">Active</div>
					<div class=" flex flex-col items-start md:flex-row md:items-start md:space-x-5">
						<!-- edit button  -->
						<button
							on:click={() => {
								editModal = true;
								arrayindex = i; //set the index of the arrray
								// set the rest of the variabes below
								rowId = data.id;
								rewardName = data.name;
								abbreviation = data.abbreviation;
								description = data.description;
								termsAndCondition = data.terms_and_condition;
								color = data.color;
							}}
							class="rounded p-1 hover:bg-yellow-400 hover:bg-opacity-50">Edit</button
						>
						<!-- delete button  -->
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
						<button
							on:click={() => {
								detailModal = true;
								arrayindex = i; //set the index of the arrray
								// set the rest of the variabes below
								rewardName = data.name;
								abbreviation = data.abbreviation;
								description = data.description;
								termsAndCondition = data.terms_and_condition;
								color = data.color;
								rewardId = data.id
								point = data.points
							}}
							class="rounded p-1 hover:bg-green-500 hover:bg-opacity-50">Details</button
						>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- modal below here -->
</div>
<!-- list new reward modal below  -->
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
			<div class="flex flex-col justify-start gap-y-4 md:flex-row items-center gap-x-10" title="Choose color for display on chart">
				<div class="space-x-2 flex items-start w-full">
					<label for="color" class="text-{color} text-nowrap">Reward color: </label>
					<input
						bind:value={color}
						required
						id="color"
						type="color"
						class="rounded-md border-2 border-gray-300 bg-transparent focus:border-gray-300 focus:ring-gray-300"
					/>
				</div>
				<div class="space-x-2 flex items-center justify-start w-full">
					<label for="name" class="text-nowrap">Reward Points</label>
				<input
					bind:value={point}
					required
					id="name"
					type="text"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
				</div>
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
<!-- Edit reward modal below  -->
<Modal
	class="h-full rounded-lg bg-opacity-5 bg-gradient-to-tl from-gray-700 via-slate-600 to-violet-900 text-gray-300"
	bind:open={editModal}
	size="sm"
	autoclose={false}
>
	<div class="h-full w-full">
		<form class="flex flex-col space-y-3 text-lg" action="#">
			<h3 class="mb-4 text-xl font-medium">Edit Reward</h3>
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
			<button on:click={update_reward_function} class="w-full">
				<ActionButton
					width="full"
					bgColor="purple-600"
					hoverBgColor="gray-400"
					hoverTextColor="gray-700 hover:font-bold"
				>
					<svelte:fragment slot="text">
						Update Reward <span class="text-lg">✅</span>
					</svelte:fragment>
				</ActionButton>
			</button>
		</form>
	</div>
</Modal>
<!--  reward Detailmodal below  -->
<Modal
	class="h-full rounded-lg bg-opacity-5 bg-gradient-to-tl from-gray-700 via-slate-600 to-violet-900 text-gray-300"
	bind:open={detailModal}
	size="sm"
	autoclose={false}
>
	<div class="h-full w-full">
		<form class="flex flex-col space-y-3 text-lg" action="#">
			<h3 class="mb-4 text-xl font-medium">Reward Details</h3>
			<div class="space-y-2">
				<label for="name">Reward Name</label>
				<input
					disabled
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
					disabled
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
					disabled
					bind:value={description}
					required
					id="description"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="space-y-2">
				<label for="terms">Reward Terms and Condition</label>
				<textarea
					disabled
					bind:value={termsAndCondition}
					required
					id="terms"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
				/>
			</div>
			<div class="flex flex-row items-center gap-x-10" title="Choose color for display on chart">
				<div class="space-x-2">
					<label for="color" class="text-{color}">Reward color: </label>
					<input
						disabled
						bind:value={color}
						required
						id="color"
						type="color"
						class="rounded-md border-2 border-gray-300 bg-transparent focus:border-gray-300 focus:ring-gray-300"
					/>
				</div>
				<div class="space-x-2">
					<span>Assigned Point:</span> <span>{point}</span>
				</div>
			</div>
			<button on:click={()=>{
				
				const code = generateRandomChars(4)// generate the claim code here
				insertIntoCode(rewardId,code).then(({data, error})=>{
					if(error === null){
						// on successful Storage of the code 
						alert(`Code is valid for one use only \n \n Share the claim code below: \n ${data[0].claim_code}`)
					}else{
						console.log( "error", error.message)
					}
				}) // keep the claim code
				
			}} class="w-full">
				<ActionButton
					width="full"
					bgColor="purple-600"
					hoverBgColor="gray-400"
					hoverTextColor="gray-700 hover:font-bold"
				>
					<svelte:fragment slot="text">
						Generate Claim Code <span class="text-lg">✅</span>
					</svelte:fragment>
				</ActionButton>
			</button>
		</form>
	</div>
</Modal>
