import { loadRewardsForUser } from '$lib/supabase/store';

// load the rewards to the table
export async function load({ cookies, url }) {
	//get the user id from the cookie
	let COOKIE_VARIABLE: any = cookies.get('user_data');
	COOKIE_VARIABLE = JSON.parse(COOKIE_VARIABLE);
	let user_reward_response = await loadRewardsForUser();
	return { user_reward_response };
}
