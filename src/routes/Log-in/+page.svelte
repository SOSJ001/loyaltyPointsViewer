<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';

	let userType: string = 'user';
	// $: {
	// 	alert(userType);
	// }
</script>

<div class="flex h-screen w-screen items-center justify-center p-10">
	<div
		class="flex h-4/5 w-[500px] flex-col items-center justify-center gap-5 rounded-lg bg-gray-500 bg-opacity-5 p-3 md:p-10 shadow-lg"
	>
		<div class="text-center flex flex-col items-center justify-center space-y-2">
			<h1 class="text-3xl">Log in</h1>
			<small
				>New to loyalty point viewer? <a class="font-bold underline" href="/">Create an account</a
				></small
			>
		</div>
		<!-- <form> -->
		<!-- email and password field below  -->

		<input
			type="email"
			class="w-full rounded-md p-2 text-gray-900"
			placeholder="michaelsosj@gmail.com"
		/>

		<input type="password" class="w-full rounded-md p-2 text-gray-900" placeholder="password" />
        <div class="w-full text-center underline"><a href="/Log-in">Oh no! I forgot my password</a></div>
		<a href="/Dashboard/Brand">
			<ActionButton hoverBgColor="gray-900" bgColor="gray-300">
			<span slot="text">Log in now</span>
		</ActionButton>
		</a>
		
		<!-- email and password field ends  -->

		<!-- </form> -->
	</div>
</div>
