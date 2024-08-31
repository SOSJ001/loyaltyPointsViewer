import { loadRewardsForUser } from '$lib/supabase/store';

// load the rewards to the table
export async function load({ cookies, url, parent }) {
	//get the user id from the cookie
	let COOKIE_VARIABLE: any = cookies.get('user_data');
	COOKIE_VARIABLE = JSON.parse(COOKIE_VARIABLE);
	//get the history from the parent element
	const { user_View_response, user_reward_response } = await parent();
	let history = user_View_response.data;
	// console.log(history)
	return { user_reward_response, history };
}
