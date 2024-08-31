// handle login request to superbase

import { json } from '@sveltejs/kit';


export async function POST({ request, cookies }) {
	// this is just to set up the cookie
	const { USER_ID, USER_ROLE, USER_NAME } = await request.json();
    // Convert the object to a JSON string
    const COOKIE_DATA = {
			userId: USER_ID,
			userRole: USER_ROLE,
			userName: USER_NAME
		};
	const userData = JSON.stringify(COOKIE_DATA);
	cookies.set('user_data', userData, { path: '/' });
	return json({}, { status: 201 });
}
