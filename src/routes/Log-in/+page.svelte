<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import { log_In } from '$lib/supabase/store';
	import Spinner from '$lib/components/spinner.svelte';
	import { goto } from '$app/navigation';
	let spinner = false;
	let error1Message: string;
	let error1 = false;
	let email: string;
	let password: string;
	let userType: string = 'user';

	// reset input below
	let onInputFunction = () => {
		error1 = false;
		spinner = false;
	};
	// login function below
	let log_in_function = async () => {
		//check if fields are not empty function below
		if (!email || !password) {
			error1 = true;
			error1Message = 'Please complete all fields';
			return;
		}
		spinner = true;
		let { data, error } = await log_In(email, password);
		if (error !== null) {
			// if there is no error
			error1 = true;
			error1Message = error.message;
			spinner = false;
			return;
		} else if (data.session !== null) {
			// if login is a success
			// get the user id and user role
			// set the cookie
			// goto the appropriate dashboard
			// console.log(data.session.user.user_metadata.userName)
			const USER_ID = data.session.user.id;
			const USER_ROLE = data.session.user.user_metadata.role;
			const USER_NAME = data.session.user.user_metadata.userName
			const RESPONSE = await fetch('/setCookie', {
				method: 'POST',
				body: JSON.stringify({ USER_ID, USER_ROLE, USER_NAME }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			// spinner = false;
			goto(`/Dashboard/${USER_ROLE}`);
		}
	};
</script>

<div class="flex h-screen w-screen items-center justify-center p-10">
	<div
		class="flex h-4/5 w-[500px] flex-col items-center justify-center gap-5 rounded-lg bg-gray-500 bg-opacity-5 p-3 shadow-lg md:p-10"
	>
		<div class="flex flex-col items-center justify-center space-y-2 text-center">
			<h1 class="text-3xl">Log in</h1>
			{#if error1}
				<div class="text-center text-red-500">{error1Message}</div>
			{/if}
			<small
				>New to loyalty point viewer? <a class="font-bold underline" href="/">Create an account</a
				></small
			>
		</div>
		<!-- <form> -->
		<!-- email and password field below  -->

		<input
			on:input={onInputFunction}
			bind:value={email}
			type="email"
			class="w-full rounded-md p-2 text-gray-900"
			placeholder="michaelsosj@gmail.com"
		/>

		<input
			on:input={onInputFunction}
			bind:value={password}
			type="password"
			class="w-full rounded-md p-2 text-gray-900"
			placeholder="password"
		/>
		<div class="w-full text-center underline">
			<a href="/Log-in">Oh no! I forgot my password</a>
		</div>
		<button on:click|stopPropagation ={log_in_function}>
			<ActionButton hoverBgColor="gray-900" bgColor="gray-300">
				<span slot="text"
					>Log in now {#if spinner}
						<Spinner />
					{/if}</span
				>
			</ActionButton>
		</button>

		<!-- email and password field ends  -->

		<!-- </form> -->
	</div>
</div>
