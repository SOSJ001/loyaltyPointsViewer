export const BRAND_ID = 'brand-1';
export const USER_ID = 'user-2';

export type DemoUser = {
	id: string;
	email: string;
	password: string;
	role: 'Brand' | 'User';
	userName: string;
	brandName_Or_fullName: string;
	contact: string;
	shortDescription: string;
	socials: string;
};

export type Reward = {
	id: number;
	user_id: string;
	name: string;
	abbreviation: string;
	description: string;
	terms_and_condition: string;
	color: string;
	points: number;
	claimed_count: number;
};

export type ClaimCode = {
	id: number;
	reward_id: number;
	claim_code: string;
	status: 'pending' | 'claimed';
};

export type UserPoint = {
	id: number;
	user_id: string;
	brand_id: string;
	point_balance: number;
	code_id: number;
};

export type UserOverview = {
	user_id: string;
	brand_id: string;
	name: string;
	abbreviation: string;
	point_balance: number;
	status: string;
	created_at: string;
};

export const DEMO_USERS: DemoUser[] = [
	{
		id: BRAND_ID,
		email: '1@mail.com',
		password: '1111111',
		role: 'Brand',
		userName: 'demoBrand',
		brandName_Or_fullName: 'Demo Coffee Co.',
		contact: '+1-555-0100',
		shortDescription: 'A demo brand for the loyalty points viewer.',
		socials: 'x.com/demoBrand'
	},
	{
		id: USER_ID,
		email: '2@mail.com',
		password: '1111111',
		role: 'User',
		userName: 'demoUser',
		brandName_Or_fullName: 'Alex Demo',
		contact: '+1-555-0200',
		shortDescription: 'Demo user account.',
		socials: 'x.com/demoUser'
	}
];

export const DEFAULT_REWARDS: Reward[] = [
	{
		id: 1,
		user_id: BRAND_ID,
		name: 'Free Coffee',
		abbreviation: 'FC',
		description: 'Redeem for one free coffee of any size.',
		terms_and_condition: 'Valid at participating locations. One per customer.',
		color: '#31C48D',
		points: 5,
		claimed_count: 12
	},
	{
		id: 2,
		user_id: BRAND_ID,
		name: '20% Off Purchase',
		abbreviation: '20OFF',
		description: 'Get 20% off your next in-store purchase.',
		terms_and_condition: 'Cannot be combined with other offers.',
		color: '#1C64F2',
		points: 10,
		claimed_count: 8
	},
	{
		id: 3,
		user_id: BRAND_ID,
		name: 'Free Pastry',
		abbreviation: 'FP',
		description: 'Enjoy a complimentary pastry with any drink.',
		terms_and_condition: 'While supplies last.',
		color: '#FDBA8C',
		points: 5,
		claimed_count: 5
	},
	{
		id: 4,
		user_id: BRAND_ID,
		name: 'Loyalty Mug',
		abbreviation: 'MUG',
		description: 'Earn enough points to claim a branded mug.',
		terms_and_condition: 'Pickup in store only.',
		color: '#E74694',
		points: 25,
		claimed_count: 2
	}
];

/** Pre-generated claim codes for demo (see README). */
export const DEFAULT_CODES: ClaimCode[] = [
	{ id: 1, reward_id: 1, claim_code: 'DEMO', status: 'pending' },
	{ id: 2, reward_id: 2, claim_code: 'SAVE20', status: 'pending' },
	{ id: 3, reward_id: 3, claim_code: 'PASTRY', status: 'pending' },
	{ id: 4, reward_id: 4, claim_code: 'MUG25', status: 'pending' }
];

export const DEFAULT_USER_POINTS: UserPoint[] = [
	{ id: 1, user_id: USER_ID, brand_id: BRAND_ID, point_balance: 5, code_id: 100 },
	{ id: 2, user_id: USER_ID, brand_id: BRAND_ID, point_balance: 10, code_id: 101 },
	{ id: 3, user_id: USER_ID, brand_id: BRAND_ID, point_balance: 5, code_id: 102 }
];

export const DEFAULT_USER_OVERVIEW: UserOverview[] = [
	{
		user_id: USER_ID,
		brand_id: BRAND_ID,
		name: 'Free Coffee',
		abbreviation: 'FC',
		point_balance: 5,
		status: 'claimed',
		created_at: '2025-03-10T14:30:00.000Z'
	},
	{
		user_id: USER_ID,
		brand_id: BRAND_ID,
		name: '20% Off Purchase',
		abbreviation: '20OFF',
		point_balance: 10,
		status: 'claimed',
		created_at: '2025-04-02T09:15:00.000Z'
	},
	{
		user_id: USER_ID,
		brand_id: BRAND_ID,
		name: 'Free Pastry',
		abbreviation: 'FP',
		point_balance: 5,
		status: 'claimed',
		created_at: '2025-05-18T16:45:00.000Z'
	},
	{
		user_id: 'user-3',
		brand_id: BRAND_ID,
		name: 'Free Coffee',
		abbreviation: 'FC',
		point_balance: 5,
		status: 'claimed',
		created_at: '2025-06-01T11:00:00.000Z'
	},
	{
		user_id: 'user-4',
		brand_id: BRAND_ID,
		name: 'Loyalty Mug',
		abbreviation: 'MUG',
		point_balance: 25,
		status: 'claimed',
		created_at: '2025-06-05T08:20:00.000Z'
	}
];
