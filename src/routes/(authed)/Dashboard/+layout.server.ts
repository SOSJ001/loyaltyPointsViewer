import { redirect } from '@sveltejs/kit';
export async function load({ cookies, url }) {
    // on load if cookie is not set go to / 
    let COOKIE_VARIABLE: any = cookies.get('user_data');
	if (COOKIE_VARIABLE === undefined || COOKIE_VARIABLE === null) {
        throw redirect(303, `/`);
    } 
}
