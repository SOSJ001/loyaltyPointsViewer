// load the rewards to the table
export async function load({  parent }) {	
	const {brand_reward_response} = await parent()
	return { brand_reward_response };
}
