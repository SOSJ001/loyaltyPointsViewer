import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	'https://hlkyjxqrxzzybabeqmci.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsa3lqeHFyeHp6eWJhYmVxbWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM5MTYyNDAsImV4cCI6MjAzOTQ5MjI0MH0.aV2R534P69JIPBivOXm3doRBNFNC5cfuMg_E72LpjSY'
);

// signup function below
export async function createAccount(email: string, password: string, role: string) {
	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
				role: role,
				brandName_Or_fullName: '',
				userName: '',
				contact: '',
				shortDescription: '',
				socials: ''
			}
		}
	});
	return { data, error };
}

export async function getClientSession() {
	const { data, error } = await supabase.auth.getSession();
	return { data, error };
}

export async function getServerSession() {
	const { data } = await supabase.auth.getUser();
	return data;
}

export async function logOut() {
	const { error } = await supabase.auth.signOut();
	return error;
}

export async function log_In(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});
	return { data, error };
}

export async function insert_Into_Rewards(
	brandId: string,
	rewardName: string,
	abbreviation: string,
	description: string,
	termsAndCondition: string,
	color: string
) {
	const RESPONSE = await supabase
		.from('rewards')
		.insert([
			{
				user_id: brandId,
				name: rewardName,
				abbreviation: abbreviation,
				description: description,
				terms_and_condition: termsAndCondition,
				color: color
			}
		])
		.select();
	return RESPONSE
}
export async function loadRewards(user_id:string) {
	let response = await supabase.from('rewards').select('*').eq('user_id', user_id);  
	// { data: rewards, error }
	return response
}

export async function deleteRewards(id:number) {
	const { error } = await supabase.from('rewards').delete().eq('id', id);
	return error
}

export async function updateRewards(
	rowId: string,
	rewardName: string,
	abbreviation: string,
	description: string,
	termsAndCondition: string,
	color: string
) {
	
const response = await supabase
	.from('rewards')
	.update({
		name: rewardName,
		abbreviation: abbreviation,
		description: description,
		terms_and_condition: termsAndCondition,
		color: color
	})
	.eq('id', rowId)
		.select();
	return response
          
}