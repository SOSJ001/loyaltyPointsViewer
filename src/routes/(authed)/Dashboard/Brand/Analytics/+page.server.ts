import { rewardsAndTotalClaimed } from "$lib/supabase/store";

export async function load({ cookies }) {
	let COOKIE_VARIABLE: any = cookies.get('user_data');
	COOKIE_VARIABLE = JSON.parse(COOKIE_VARIABLE);
	let [rewardsAndTotalClaimed_response] = await Promise.all([
		rewardsAndTotalClaimed(COOKIE_VARIABLE.userId)
	]);
	// logic to get the total points claimed for each reward
	let bar = {};
	let rewardTotalClaimed: [] = []; //holds the total claimed
	let rewardTotalAbb: [] = []; //holds the reward abbreviation
	bar = { rewardTotalClaimed, rewardTotalAbb };

	rewardsAndTotalClaimed_response.data?.forEach((record) => {
		rewardTotalClaimed.push(record.points * record.claimed_count);
		rewardTotalAbb.push(record.abbreviation);
    });
	bar = { rewardTotalClaimed, rewardTotalAbb };
	return{ bar };
}
