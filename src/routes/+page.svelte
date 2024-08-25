<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import Spinner from '$lib/components/spinner.svelte';
	import { createAccount, getClientSession } from '$lib/supabase/store';
	let userType: string = 'user'; //variable to keep track of radio button
	let email: string;
	let password: string;
	let confirmPasword: string;
	let spinner = false;
	let errorMessage: string;
	let error = false;
	let onInputFunction = () => {
		error = false;
		spinner = false;
	};
	// check password match function below
	function checkPassword(password: string, confirmPasword: string) {
		let success = false;
		if (password !== confirmPasword) {
			error = true;
			errorMessage = 'Password does not match';
			return success;
		} else if (password.length <= 6) {
			error = true;
			errorMessage = `Password must be greater than six characters \n you entered ${password.length} characters`;
			return success;
		} else {
			success = true;
			return success;
		}
	}
	// create account function below
	let createAccountFunction = async () => {
		//check if fields are not empty function below
		if (!email || !password || !confirmPasword) {
			error = true;
			errorMessage = 'Please complete all fields';
			return;
		}
		const SUCCESS = checkPassword(password, confirmPasword);
		if (SUCCESS) {
			spinner = true; //show the spinner
			 const{data, error} = await createAccount(email, password, userType);
			 if(data !== null){
				alert("sign up done ✔")
				spinner = false
			 }else{
				alert(" error sign up ✖")
			 }
			const RESPONSE = await getClientSession()
			console.log("getting session", RESPONSE)

		}
	};
</script>

<div class="flex h-screen w-screen items-center justify-center p-10">
	<div
		class="flex h-4/5 w-[500px] flex-col items-center justify-center gap-5 rounded-lg bg-gray-500 bg-opacity-5 p-3 md:p-10 shadow-lg"
	>
		<div class="flex flex-col items-center justify-center space-y-2 text-center ">
			<h1 class="text-3xl">Create an account</h1>
			<small
				>Already have an account? <a class="font-bold underline" href="/Log-in">Log in</a></small
			>
		</div>
		<form class="flex w-full flex-col items-center justify-center gap-5">
			<!-- error popup here  -->
			{#if error}
				<div class="text-center text-red-500">{errorMessage}</div>
			{/if}
			<!-- radio button below -->
			<div class="flex w-full flex-row items-center justify-center gap-10">
				<div>
					<input id="user" type="radio" name="userType" value="user" bind:group={userType} />
					<label for="user">For user</label>
				</div>
				<div>
					<input id="brand" type="radio" name="userType" value="brand" bind:group={userType} />
					<label for="brand">For brand</label>
				</div>
				<!-- radio button ends  -->
			</div>
			<!-- email field below  -->

			<input
				on:input={onInputFunction}
				bind:value={email}
				type="email"
				class="w-full rounded-md p-2 text-gray-900"
				placeholder="michaelsosj@gmail.com"
			/>
			<!-- password field below  -->
			<input
				on:input={onInputFunction}
				bind:value={confirmPasword}
				type="password"
				class="w-full rounded-md p-2 text-gray-900"
				placeholder="password"
			/>
			<input
				on:input={onInputFunction}
				bind:value={password}
				type="password"
				class="w-full rounded-md p-2 text-gray-900"
				placeholder="confirm password"
			/>
			<button on:click|stopPropagation={createAccountFunction}>
				<ActionButton hoverBgColor="gray-900" bgColor="gray-300">
					<span class="space-x-2" slot="text">
						<span>Create an account</span>
						{#if spinner}
							<Spinner />
						{/if}
					</span>
				</ActionButton>
			</button>

			<!-- email and password field ends  -->
		</form>
	</div>
</div>
