import { PointFromUserPointTable, select_userOverviewById } from '$lib/supabase/store';

export async function load({ cookies }) {
	// get the user id from the cookie
	let COOKIE_VARIABLE: any = cookies.get('user_data');
	COOKIE_VARIABLE = JSON.parse(COOKIE_VARIABLE);

	let [user_point_response, user_View_response] = await Promise.all([
		PointFromUserPointTable(COOKIE_VARIABLE.userId),
		select_userOverviewById(COOKIE_VARIABLE.userId)
	]);

	// calculating the point before sending it to the page.svelte
	let totalPoint = 0;
	user_point_response.data?.forEach((point) => {
		totalPoint = totalPoint + point.point_balance;
	});

	// getting the rewards and the points for bar chart
	let created: [] = [];
	let points: [] = [];
	let lineChart = { created, points };
	user_View_response.data?.forEach((record) => {
		const dateString = record.created_at;
		// Create a Date object from the string
		const dateObject = new Date(dateString);

		// Extract the date components
		const year = dateObject.getFullYear();
		const monthNames = [
			'Jan',
			'Feb',
			'MaR',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		const month = dateObject.getMonth(); // Months are 0-based
		const day = dateObject.getDate();
		const formattedDate = `${year}-${monthNames[month]}-${day.toString().padStart(2, '0')}`;
		console.log(formattedDate);
		created.push(formattedDate);
		points.push(record.point_balance);
	});

	//return the promise
	return { totalPoint, lineChart, user_View_response };
}
