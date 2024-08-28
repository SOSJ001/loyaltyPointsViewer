<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	let edit = false;
	let disabled = true;
	let toggleMode: string
	$:{
		if(disabled){
			toggleMode = "Enable"
		}else{
			toggleMode = "Disable"
		}
	}
</script>

<div class="grid h-full grid-rows-12 space-y-1 rounded-lg bg-gray-500 bg-opacity-5 px-5 py-3">
	<div class="row-span-1 flex justify-between items-center">
		<span class="text-sm md:text-2xl">⚙ Profile</span>
		<button
			on:click={() => {
				disabled = !disabled;

			}}
		>
			<ActionButton
				bgColor="gray-400"
				hoverBgColor="gray-400"
				hoverTextColor="gray-700 hover:font-bold"
			>
				<svelte:fragment slot="text">
					  <span class="text-sm md:text-lg">
						🖌 <span class="border-transparent PX-3" contenteditable bind:innerHTML={toggleMode}></span>
						Edit mode
					</span>
				</svelte:fragment>
			</ActionButton>
		</button>
	</div>
	<div class="row-span-11 flex flex-col gap-3 pt-5">
		<!--Brand Name and user name and avatar here -->
		<div class="flex flex-col justify-center items-center md:flex-row gap-5">
			<!-- avatar here -->
			<div title="Avatar/logo" class="py-5 text-7xl">
				<span class="rounded-full bg-gray-300 p-3">👤</span>
			</div>
			<!--Brand Name and user name -->
			<div class="flex w-full flex-col gap-4">
				<div class="w-full space-y-1">
					<label for="brandName">Full Name</label>
					<input
						{disabled}
						id="brandName"
						type="text"
						name="userType"
						value="Michael S.O.S Johnson"
						class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
					/>
				</div>
				<div class="w-full space-y-1">
					<label for="userName">User Name</label>
					<input
						{disabled}
						id="userName"
						type="text"
						name="userType"
						value="@SOSJ001"
						class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
					/>
				</div>
			</div>
		</div>
		<!-- email and contact -->
		<div class="flex flex-col justify-center items-center md:flex-row w-full gap-4">
			<div class="w-full space-y-1">
				<label for="email">Email</label>
				<input
					{disabled}
					id="email"
					type="text"
					name="userType"
					value="michaelsosj@gmail.com"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
				/>
			</div>
			<div class="w-full space-y-1">
				<label for="contact">Contact</label>
				<input
					{disabled}
					id="contact"
					type="tel"
					name="userType"
					value="+232-34-981-224"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
				/>
			</div>
		</div>
		<!-- descripton contacts and socials and buttons here -->
		<div class="flex flex-col justify-center items-center md:flex-row h-full w-full gap-4 pb-2">
			<div class="grid w-full grid-rows-6 space-y-1 h-full">
				<!-- description here -->
				<label for="description">Short Description </label>
				<textarea
					{disabled}
					id="description"
					name="userType"
					value="Christex.Foundation@mail.com"
					class="row-span-10 h-full w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
				/>
			</div>
			<!-- contacts and socials -->
			<div class="flex w-full h-full flex-col gap-4">
				<div class="space-y-1">
					<label for="socials">Socials</label>
					<input
						{disabled}
						id="socials"
						type="text"
						name="userType"
						value="x.com/sosj001"
						class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
					/>
				</div>

				<div>
					<button class="w-full" on:click={()=>{alert("here")}} {disabled} title={disabled ? 'Button is disabled' : ''}>
						<ActionButton
						width="full"
							bgColor="gray-400"
							hoverBgColor="gray-400"
							hoverTextColor="gray-700 hover:font-bold"
						>
							<svelte:fragment slot="text">
								Update Details <span class="text-lg">✌</span>
							</svelte:fragment>
						</ActionButton>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
