// generate a unique code based on the length u pass in 
export function generateRandomChars(length:number) {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * chars.length);
		result += chars.charAt(randomIndex);
	}

	return result;
}