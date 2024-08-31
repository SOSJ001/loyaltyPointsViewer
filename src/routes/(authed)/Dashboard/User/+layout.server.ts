import { PointFromUserPointTable, select_userOverviewById } from "$lib/supabase/store";

export async function load({ cookies }) {
    // get the user id from the cookie 
    let COOKIE_VARIABLE: any = cookies.get('user_data');
  COOKIE_VARIABLE = JSON.parse(COOKIE_VARIABLE);

  let  [user_point_response, user_View_response ] = await Promise.all([PointFromUserPointTable(COOKIE_VARIABLE.userId), select_userOverviewById(COOKIE_VARIABLE.userId)])

	// calculating the point before sending it to the page.svelte
	let totalPoint = 0;
	user_point_response.data?.forEach((point) => {
		totalPoint = totalPoint + point.point_balance;
  });
  
  // getting the rewards and the points for bar chart
  let rewards: [] = [];
	let points:[] = [];
	let barChart = { rewards, points };
  user_View_response.data?.forEach((record) => {
		rewards.push(record.abbreviation);
		points.push(record.point_balance);
	});
  
  //return the promise
  return { totalPoint, barChart, user_View_response };
}