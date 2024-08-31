import { redirect } from '@sveltejs/kit';
export async function load({ cookies, url }) {
	// on load if cookie is not set go to /
	let COOKIE_VARIABLE: any = cookies.get('user_data');
	if (COOKIE_VARIABLE === undefined || COOKIE_VARIABLE === null) {
		throw redirect(303, `/`);
	}
	COOKIE_VARIABLE = JSON.parse(COOKIE_VARIABLE);
	const user_id = COOKIE_VARIABLE.userId;
	const user_name = COOKIE_VARIABLE.userName;
	return { user_id, user_name}; //USER ID and user name
}
