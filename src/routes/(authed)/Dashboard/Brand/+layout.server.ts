//@
import {
	claimCount,
	loadRewards,
	rewardsAndTotalClaimed,
	select_brandOverviewById
} from '$lib/supabase/store';

// load the rewards to the table
export async function load({ cookies }) {
	//get the user id from the cookie
	let COOKIE_VARIABLE: any = cookies.get('user_data');
	COOKIE_VARIABLE = JSON.parse(COOKIE_VARIABLE);
	let [
		brand_reward_response,
		claim_count_reaponse,
		rewardsAndTotalClaimed_response,
		brandOverview_response
	] = await Promise.all([
		loadRewards(COOKIE_VARIABLE.userId),
		claimCount(COOKIE_VARIABLE.userId),
		rewardsAndTotalClaimed(COOKIE_VARIABLE.userId),
		select_brandOverviewById(COOKIE_VARIABLE.userId),
	]);

	//get the top 5 claimed points
	let array = claim_count_reaponse.data;
	array?.sort((a, b) => b.claimed_count - a.claimed_count);
	const top5 = array?.slice(0, 5);
	//arranging the donut chart variable
	let donut = {};
	let rewardAbb: [] = [];
	let rewardCount: [] = [];
	donut = { rewardAbb, rewardCount };
	top5?.forEach((reward) => {
		//@ts-ignore
		rewardAbb.push(reward.abbreviation);
		//@ts-ignore
		rewardCount.push(reward.claimed_count);
	});

	// logic to get the total points claimed for each reward
	let bar = {};
	let rewardTotalClaimed: [] = []; //holds the total claimed
	let rewardTotalAbb: [] = []; //holds the reward abbreviation
	bar = { rewardTotalClaimed, rewardTotalAbb };

	rewardsAndTotalClaimed_response.data?.forEach((record) => {
		//@ts-ignore
		rewardTotalClaimed.push(record.points * record.claimed_count);
		//@ts-ignore
		rewardTotalAbb.push(record.abbreviation);
	});

	//return just 5 of the recent records
	const brand_overview_response = brandOverview_response.data?.slice(0, 5);

	// total rewards listed
	let totalRewards: number = 0;

	if (brand_reward_response.data?.length !== undefined) {
		if (brand_reward_response.data?.length > 0) {
			totalRewards = brand_reward_response.data?.length;
		} else {
			totalRewards = 0;
		}
	} else {
		totalRewards = 0;
	}

	return { brand_reward_response, donut, bar, brand_overview_response, totalRewards };
}
