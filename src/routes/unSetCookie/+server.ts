// handle logout request to superbase

import { json, redirect } from '@sveltejs/kit';


export async function POST({ request, cookies }) {
	// this is just to unset the cookie
    cookies.delete('user_data', { path: '/' });
    const UNSET_COOKIE = true
    return json({ UNSET_COOKIE }, { status: 201 });
}
