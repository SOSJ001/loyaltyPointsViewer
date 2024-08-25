import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
	'https://hlkyjxqrxzzybabeqmci.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsa3lqeHFyeHp6eWJhYmVxbWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM5MTYyNDAsImV4cCI6MjAzOTQ5MjI0MH0.aV2R534P69JIPBivOXm3doRBNFNC5cfuMg_E72LpjSY'
);

// signup function below
export async function createAccount(email: string, password: string, role:string) {
	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
				role: role
			}
		}
	});
	return { data, error };
}

export async function getClientSession() {
	const { data, error } = await supabase.auth.getSession();
	return { data, error };
}

export async function getServerSession() {
	const {
		data
  } = await supabase.auth.getUser();
  return data
}
