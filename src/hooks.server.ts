import { redirect } from '@sveltejs/kit';
export async function handle({ event, resolve }) {
	let COOKIE_VARIABLE: any = event.cookies.get('user_data');
	if (COOKIE_VARIABLE !== undefined) {
		if (COOKIE_VARIABLE !== null) {
			//  if the cookie is set correct the url for the individual
			COOKIE_VARIABLE = JSON.parse(COOKIE_VARIABLE); //getting the user_id and useRole from the cookie
			if (event.url.pathname === '/Dashboard' || event.url.pathname === '/Dashboard/') {
				throw redirect(303, `/Dashboard/${COOKIE_VARIABLE.userRole}`);
			}
		}
	} else if (COOKIE_VARIABLE === undefined) {
		if (event.url.pathname.startsWith('/Dashboard')) {
			throw redirect(303, `/`);
		}
	}else {
		// if the cookie is not set do this
		if (event.url.pathname === '/Dashboard' || event.url.pathname === '/Dashboard/') {
			throw redirect(303, `/`);
		}
	}

	return await resolve(event);
}
