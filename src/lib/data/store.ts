import { generateRandomChars } from '$lib/generalStore';
import {
	BRAND_ID,
	USER_ID,
	DEFAULT_CODES,
	DEFAULT_REWARDS,
	DEFAULT_USER_OVERVIEW,
	DEFAULT_USER_POINTS,
	DEMO_USERS,
	type ClaimCode,
	type DemoUser,
	type Reward,
	type UserOverview,
	type UserPoint
} from './staticData';

function clone<T>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}

let users: DemoUser[] = clone(DEMO_USERS);
let rewards: Reward[] = clone(DEFAULT_REWARDS);
let codes: ClaimCode[] = clone(DEFAULT_CODES);
let userPoints: UserPoint[] = clone(DEFAULT_USER_POINTS);
let userOverview: UserOverview[] = clone(DEFAULT_USER_OVERVIEW);

let nextRewardId = Math.max(...rewards.map((r) => r.id), 0) + 1;
let nextCodeId = Math.max(...codes.map((c) => c.id), 0) + 1;
let nextUserPointId = Math.max(...userPoints.map((p) => p.id), 0) + 1;

function buildSessionUser(user: DemoUser) {
	return {
		id: user.id,
		email: user.email,
		user_metadata: {
			role: user.role,
			userName: user.userName,
			brandName_Or_fullName: user.brandName_Or_fullName,
			contact: user.contact,
			shortDescription: user.shortDescription,
			socials: user.socials
		}
	};
}

function getUserFromCookie(): DemoUser | null {
	if (typeof document === 'undefined') return null;
	const match = document.cookie.match(/(?:^|;\s*)user_data=([^;]+)/);
	if (!match) return null;
	try {
		const { userId } = JSON.parse(decodeURIComponent(match[1]));
		return users.find((u) => u.id === userId) ?? null;
	} catch {
		return null;
	}
}

function okResponse<T>(data: T) {
	return { data, error: null };
}

function errResponse(message: string) {
	return { data: null, error: { message } };
}

export async function createAccount(email: string, password: string, role: string) {
	if (!email || !password) {
		return { data: null, error: { message: 'Please complete all fields' } };
	}
	if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
		return { data: null, error: { message: 'User already registered' } };
	}

	const user: DemoUser = {
		id: `user-${generateRandomChars(6)}`,
		email,
		password,
		role: role as DemoUser['role'],
		userName: `user${generateRandomChars(3)}`,
		brandName_Or_fullName: '',
		contact: '',
		shortDescription: '',
		socials: ''
	};
	users.push(user);

	const sessionUser = buildSessionUser(user);
	return {
		data: { session: { user: sessionUser } },
		error: null
	};
}

export async function getClientSession() {
	const user = getUserFromCookie();
	if (!user) {
		return { data: { session: null }, error: null };
	}
	return { data: { session: { user: buildSessionUser(user) } }, error: null };
}

export async function getServerSession() {
	const user = getUserFromCookie();
	if (!user) {
		return { user: null };
	}
	return { user: buildSessionUser(user) };
}

export async function logOut() {
	return null;
}

export async function log_In(email: string, password: string) {
	const user = users.find(
		(u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
	);
	if (!user) {
		return { data: null, error: { message: 'Invalid login credentials' } };
	}
	return {
		data: { session: { user: buildSessionUser(user) } },
		error: null
	};
}

export async function insert_Into_Rewards(
	brandId: string,
	rewardName: string,
	abbreviation: string,
	description: string,
	termsAndCondition: string,
	color: string,
	points: number
) {
	const reward: Reward = {
		id: nextRewardId++,
		user_id: brandId,
		name: rewardName,
		abbreviation,
		description,
		terms_and_condition: termsAndCondition,
		color,
		points,
		claimed_count: 0
	};
	rewards.unshift(reward);
	return okResponse([reward]);
}

export async function loadRewards(user_id: string) {
	return okResponse(rewards.filter((r) => r.user_id === user_id));
}

export async function loadRewardsForUser() {
	return okResponse([...rewards]);
}

export async function deleteRewards(id: number) {
	const index = rewards.findIndex((r) => r.id === id);
	if (index === -1) {
		return { message: 'Reward not found' };
	}
	rewards.splice(index, 1);
	codes = codes.filter((c) => c.reward_id !== id);
	return null;
}

export async function updateRewards(
	rowId: string,
	rewardName: string,
	abbreviation: string,
	description: string,
	termsAndCondition: string,
	color: string
) {
	const reward = rewards.find((r) => String(r.id) === String(rowId));
	if (!reward) {
		return errResponse('Reward not found');
	}
	reward.name = rewardName;
	reward.abbreviation = abbreviation;
	reward.description = description;
	reward.terms_and_condition = termsAndCondition;
	reward.color = color;
	return okResponse([{ ...reward }]);
}

export async function updateClaimPoints(rowId: string, claimCount: number) {
	const reward = rewards.find((r) => String(r.id) === String(rowId));
	if (!reward) {
		return errResponse('Reward not found');
	}
	reward.claimed_count = claimCount + 1;
	return okResponse([{ ...reward }]);
}

export async function insertIntoCode(reward_id: number, code: string) {
	const entry: ClaimCode = {
		id: nextCodeId++,
		reward_id,
		claim_code: code,
		status: 'pending'
	};
	codes.push(entry);
	return okResponse([entry]);
}

export async function verifyCode(reward_id: number, code: string) {
	const matches = codes.filter(
		(c) =>
			c.reward_id === reward_id &&
			c.claim_code.toLowerCase() === code.toLowerCase() &&
			c.status === 'pending'
	);
	return okResponse(matches);
}

export async function updateCode(id: number) {
	const entry = codes.find((c) => c.id === id);
	if (!entry) {
		return errResponse('Code not found');
	}
	entry.status = 'claimed';
	return okResponse([{ ...entry }]);
}

export async function insertIntoUserPoint(
	user_id: string,
	brand_id: string,
	point_balance: number,
	code_id: number
) {
	const codeEntry = codes.find((c) => c.id === code_id);
	const reward = codeEntry ? rewards.find((r) => r.id === codeEntry.reward_id) : undefined;
	const entry: UserPoint = {
		id: nextUserPointId++,
		user_id,
		brand_id,
		point_balance,
		code_id
	};
	userPoints.push(entry);

	if (reward) {
		userOverview.unshift({
			user_id,
			brand_id,
			name: reward.name,
			abbreviation: reward.abbreviation,
			point_balance,
			status: 'claimed',
			created_at: new Date().toISOString()
		});
	}

	return okResponse([entry]);
}

export async function PointFromUserPointTable(user_id: string) {
	return okResponse(
		userPoints.filter((p) => p.user_id === user_id).map((p) => ({ point_balance: p.point_balance }))
	);
}

export async function select_userOverviewById(user_id: string) {
	return okResponse(userOverview.filter((r) => r.user_id === user_id));
}

export async function select_brandOverviewById(user_id: string) {
	return okResponse(userOverview.filter((r) => r.brand_id === user_id));
}

export async function claimCount(id: string) {
	return okResponse(
		rewards
			.filter((r) => r.user_id === id)
			.map((r) => ({
				user_id: id,
				abbreviation: r.abbreviation,
				claimed_count: r.claimed_count
			}))
	);
}

export async function rewardsAndTotalClaimed(id: string) {
	return okResponse(
		rewards
			.filter((r) => r.user_id === id)
			.map((r) => ({
				user_id: id,
				abbreviation: r.abbreviation,
				points: r.points,
				claimed_count: r.claimed_count
			}))
	);
}

export async function updateUserDtails(
	brandName_Or_fullName: string,
	userName: string,
	contact: string,
	shortDescription: string,
	socials: string
) {
	const cookieUser = getUserFromCookie();
	if (!cookieUser) {
		return errResponse('Not logged in');
	}
	const user = users.find((u) => u.id === cookieUser.id);
	if (!user) {
		return errResponse('User not found');
	}
	user.brandName_Or_fullName = brandName_Or_fullName;
	user.userName = userName;
	user.contact = contact;
	user.shortDescription = shortDescription;
	user.socials = socials;
	return okResponse({ user: buildSessionUser(user) });
}

/** Reset in-memory data to defaults (useful for demos). */
export function resetDemoData() {
	users = clone(DEMO_USERS);
	rewards = clone(DEFAULT_REWARDS);
	codes = clone(DEFAULT_CODES);
	userPoints = clone(DEFAULT_USER_POINTS);
	userOverview = clone(DEFAULT_USER_OVERVIEW);
	nextRewardId = Math.max(...rewards.map((r) => r.id), 0) + 1;
	nextCodeId = Math.max(...codes.map((c) => c.id), 0) + 1;
	nextUserPointId = Math.max(...userPoints.map((p) => p.id), 0) + 1;
}

export { BRAND_ID, USER_ID, DEMO_USERS, DEFAULT_CODES, DEFAULT_REWARDS };
