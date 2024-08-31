<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import { getServerSession, updateUserDtails } from '$lib/supabase/store';
	import Spinner from '$lib/components/spinner.svelte';
	import { invalidateAll } from '$app/navigation';
	let edit = false;
	let disabled = true;
	let toggleMode: string;
	let spinner = false;
	$: {
		if (disabled) {
			toggleMode = 'Enable';
		} else {
			toggleMode = 'Disable';
		}
	} //variables for the user details
	let fullName: string;
	let userName: string;
	let email: string = 'michaelsosj@gmail.com';
	let socials: string;
	let contact: string;
	let description: string;
	let userData: any;
	getServerSession().then((data) => {
		// get the user id from the server and set it
		userData = data.user;
		fullName = userData?.user_metadata.brandName_Or_fullName;
		userName = userData?.user_metadata.userName;
		email = userData?.email as string;
		socials = userData?.user_metadata.socials;
		contact = userData?.user_metadata.contact;
		description = userData?.user_metadata.shortDescription;
	});
</script>

<div class="grid h-full grid-rows-12 space-y-1 rounded-lg bg-gray-500 bg-opacity-5 px-5 py-3">
	<div class="row-span-1 flex items-center justify-between">
		<span class="text-sm md:text-2xl">⚙ Profile</span>
		<!-- enable edit mode button -->
		<button
			on:click={() => {
				disabled = !disabled;
				fullName = userData?.user_metadata.brandName_Or_fullName;
				userName = userData?.user_metadata.userName;
				email = userData?.email;
				socials = userData?.user_metadata.socials;
				contact = userData?.user_metadata.contact;
				description = userData?.user_metadata.shortDescription;
			}}
		>
			<ActionButton
				bgColor="gray-400"
				hoverBgColor="gray-400"
				hoverTextColor="gray-700 hover:font-bold"
			>
				<svelte:fragment slot="text">
					<span class="text-sm md:text-lg">
						🖌 <span class="PX-3 border-transparent" contenteditable bind:innerHTML={toggleMode}
						></span>
						Edit mode
					</span>
				</svelte:fragment>
			</ActionButton>
		</button>
	</div>
	<div class="row-span-11 flex flex-col gap-3 pt-5">
		<!--user Name and user name and avatar here -->
		<div class="flex flex-col items-center justify-center gap-5 md:flex-row">
			<!-- avatar here -->
			<div title="Avatar/logo" class="py-5 text-7xl">
				<span class="rounded-full bg-gray-300 p-3">👤</span>
			</div>
			<!--Brand Name and user name -->
			<div class="flex w-full flex-col gap-4">
				<div class="w-full space-y-1">
					<label for="brandName">Full Name</label>
					<input
						bind:value={fullName}
						{disabled}
						id="brandName"
						type="text"
						name="userType"
						class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
						placeholder="Michael S.O.S.J"
					/>
				</div>
				<div class="w-full space-y-1">
					<label for="userName">User Name</label>
					<input
						{disabled}
						id="userName"
						type="text"
						name="userType"
						bind:value={userName}
						placeholder="@sosj001"
						class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
					/>
				</div>
			</div>
		</div>
		<!-- email and contact -->
		<div class="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
			<div class="w-full space-y-1">
				<label for="email">Email</label>
				<div class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0">
					{email}
				</div>
			</div>
			<div class="w-full space-y-1">
				<label for="contact">Contact</label>
				<input
					{disabled}
					id="contact"
					type="tel"
					name="userType"
					bind:value={contact}
					placeholder="+232-34-981-224"
					class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
				/>
			</div>
		</div>
		<!-- descripton contacts and socials and buttons here -->
		<div class="flex h-full w-full flex-col items-center justify-center gap-4 pb-2 md:flex-row">
			<div class="grid h-full w-full grid-rows-6 space-y-1">
				<!-- description here -->
				<label for="description">Short Description </label>
				<textarea
					{disabled}
					id="description"
					name="userType"
					bind:value={description}
					placeholder="short description about yourself"
					class="row-span-10 h-full w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
				/>
			</div>
			<!-- contacts and socials -->
			<div class="flex h-full w-full flex-col gap-4">
				<div class="space-y-1">
					<label for="socials">Socials</label>
					<input
						{disabled}
						id="socials"
						type="text"
						name="userType"
						bind:value={socials}
						placeholder="x.com/sosj001"
						class="w-full rounded-md border-2 border-gray-300 bg-transparent p-2 focus:ring-0"
					/>
				</div>

				<div>
					<!-- update button  -->
					<button
						class="w-full"
						on:click={() => {
							if (disabled) {
								alert('Edit Mode Disabled');
								return;
							} else {
								disabled = true;
								spinner = true;
								updateUserDtails(fullName, userName, contact, description, socials).then(
									({ data, error }) => {
										if (error === null) {
											userData = data.user;
											console.log(data);
											spinner = false;
											alert('Details Updated ! \n Username will update on next login');
											const interval = setInterval(() => {
												invalidateAll();
											}, 1000);

											return () => {
												clearInterval(interval);
											};
											
										} else {
											console.log(error.message);
										}
									}
								);
							}
						}}
						title={disabled ? 'Button is disabled' : ''}
					>
						<ActionButton
							width="full"
							bgColor="gray-400"
							hoverBgColor="gray-400"
							hoverTextColor="gray-700 hover:font-bold"
						>
							<svelte:fragment slot="text">
								Update Details <span class="text-lg">✅</span>
								{#if spinner}
									<span><Spinner /></span>
								{/if}
							</svelte:fragment>
						</ActionButton>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
