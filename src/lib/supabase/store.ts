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
	color: string,
	points: number
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
				color: color,
				points: points
			}
		])
		.select();
	return RESPONSE;
}
// load rewards for specific brand
export async function loadRewards(user_id: string) {
	let response = await supabase.from('rewards').select('*').eq('user_id', user_id);
	// { data: rewards, error }
	return response;
}

export async function loadRewardsForUser() {
	let response = await supabase.from('rewards').select('*');
	// { data: rewards, error }
	return response;
}

export async function deleteRewards(id: number) {
	const { error } = await supabase.from('rewards').delete().eq('id', id);
	return error;
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
	return response;
}

// function to insert the new Reward code to the DB
export async function insertIntoCode(reward_id: any, code: string) {
	const response = await supabase
		.from('code')
		.insert([{ reward_id: reward_id, claim_code: code }])
		.select();
	return response;
}

export async function verifyCode(reward_id: any, code: string) {
	// select * from the table where the reward id and the the reward code matches
	let response = await supabase
		.from('code')
		.select('*')
		.eq('reward_id', reward_id)
		.eq('claim_code', code)
		.eq('status', 'pending');

	return response;
}

export async function updateCode(id: number) {
	//update the code table where id = code id
	const response = await supabase.from('code').update({ status: 'claimed' }).eq('id', id).select();
	return response;
}

export async function insertIntoUserPoint(user_id: any, brand_id: any, point_balance: number, code_id:number) {
	const response = await supabase
		.from('userPoints')
		.insert([
			{
				user_id: user_id,
				brand_id: brand_id,
				point_balance: point_balance,
				code_id: code_id //the id on the code table
			}
		])
		.select();
	return response;
}
