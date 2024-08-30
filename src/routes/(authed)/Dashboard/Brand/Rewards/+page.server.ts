import { loadRewards } from '$lib/supabase/store';

// load the rewards to the table
export async function load({ cookies }) {
	//get the user id from the cookie
	let COOKIE_VARIABLE: any = cookies.get('user_data');
	COOKIE_VARIABLE = JSON.parse(COOKIE_VARIABLE);
    let brand_reward_response = await loadRewards(COOKIE_VARIABLE.userId);
    return { brand_reward_response };
}
