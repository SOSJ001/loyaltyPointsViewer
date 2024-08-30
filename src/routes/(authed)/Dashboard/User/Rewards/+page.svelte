<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { getServerSession } from '$lib/supabase/store.js';
	import Spinner from "$lib/components/spinner.svelte"
	export let data;
	let spinner = false
	let user_id: any;
	getServerSession().then((data) => {
		// get the user id from the server and set it
		user_id = data.user?.id;
	});
	let brand_id: any;
	let claimedPoint: number;
	let rewards: any = data.user_reward_response.data; // get the reward data from the data prop
	let rewardId: any;
	let historyModal = false; //modal to see the history
	let claimModal = false; // modal to claim reward
	let code: any;
	import ActionButton from '$lib/components/ActionButton.svelte';
	import { insertIntoUserPoint, updateCode, verifyCode } from '$lib/supabase/store.js';
	const demoData = [1, 2, 3, 4, 4];
	let color: any;
</script>

<div class="flex h-full flex-col rounded-lg bg-gray-500 bg-opacity-5 px-3 py-3">
	<div class="flex flex-row items-center justify-between">
		<span class="text-sm md:text-2xl">🏆 Reward List</span>
		<button on:click={() => (historyModal = true)}>
			<ActionButton
				bgColor="gray-400"
				hoverBgColor="gray-400"
				hoverTextColor="gray-700 hover:font-bold"
			>
				<svelte:fragment slot="text">
					<span class="text-lg">👀</span> View <span class="hidden md:inline">Reward</span> History
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
				{#each rewards as data, i (data.id)}
					<div
						class="grid grid-cols-4 items-center border-b px-2 py-3 capitalize hover:bg-gray-600"
					>
						<div>{data.name}</div>
						<div class="text-green-400">Active</div>
						<div>{data.points} Total</div>
						<div class=" flex flex-col items-start md:flex-row md:gap-x-5">
							<button
								on:click={() => {
									code = ''
									spinner = false
									claimModal = true;
									rewardId = data.id;
									brand_id = data.user_id;
									claimedPoint = data.points;
								}}
								class="rounded p-1 hover:bg-yellow-400 hover:bg-opacity-50">Claim</button
							>
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
	bind:open={historyModal}
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

<!-- claim modal -->
<Modal
	class="h-full rounded-lg bg-opacity-5 bg-gradient-to-tl from-gray-700 via-slate-600 to-violet-900 text-gray-300"
	bind:open={claimModal}
	size="sm"
	autoclose={false}
>
	<div class="h-full w-full">
		<h3 class="mb-4 text-xl font-medium">Claim Reward</h3>
		<div class="w-full space-y-5 capitalize text-gray-300">
			<input
				bind:value={code}
				required
				id="name"
				type="text"
				placeholder="Enter Reward Code"
				class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:border-gray-300 focus:ring-gray-300"
			/>
			<button
				on:click={() => {
					spinner = true
					verifyCode(rewardId, code).then(({ data, error }) => {
						if (error === null) {
							// if there is no error do this
							if (data.length === 1) {
								// if data.length === 1,
								//update the code table status to claimed
								updateCode(data[0].id).then((codetableUpdateResp) => {
									if (codetableUpdateResp.error === null) {
										//insert into the user point
										insertIntoUserPoint(
											user_id,
											brand_id,
											claimedPoint,
											codetableUpdateResp.data[0].id
										).then((userpointTableResp) => {
											// success to do here
											alert('You have claim 5 points');
											spinner = false
										});
									} else {
										console.log('This is the error', codetableUpdateResp.error.message);
									}
								});
							} else {
								alert('Invalid Code');
								spinner = false
								code = ''
							}
						} else {
							alert('Poor Connection Connection \n Please Retry !')
							spinner = false
							code = ""
						}
					});
				}}
				class="w-full"
			>
				<ActionButton
					width="full"
					bgColor="purple-600"
					hoverBgColor="gray-400"
					hoverTextColor="gray-700 hover:font-bold"
				>
					<svelte:fragment slot="text">
						Claim Reward <span class="text-lg">✅</span> {#if spinner}<span><Spinner/></span>{/if}
					</svelte:fragment>
				</ActionButton>
			</button>
		</div>
	</div>
</Modal>
