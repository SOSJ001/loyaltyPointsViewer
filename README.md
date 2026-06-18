# Loyalty Points Viewer

A SvelteKit demo app for managing and redeeming loyalty points. Built as a solution for one of [Christex Foundation's Engineering Bounties](https://github.com/SOSJ001/loyaltyPointsViewer).

This project runs entirely on **static demo data** — no database or external backend is required.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm

### Installation

```bash
git clone https://github.com/SOSJ001/loyaltyPointsViewer
cd loyaltyPointsViewer
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Demo Mode

The app uses in-memory static data defined in `src/lib/data/staticData.ts`. All rewards, claim codes, and analytics are pre-populated. Changes made during a session (new rewards, claims, profile edits) persist until you refresh the page, then reset to defaults.

### Login credentials

| Role  | Email       | Password  |
|-------|-------------|-----------|
| Brand | `1@mail.com` | `1111111` |
| User  | `2@mail.com` | `1111111` |

You can also create a new account on the sign-up page. New accounts are stored in memory only and are lost on refresh.

### Claim codes (User dashboard)

Log in as a **User**, go to **Rewards**, click **Claim** on a reward, and enter one of these codes:

| Reward            | Code     |
|-------------------|----------|
| Free Coffee       | `DEMO`   |
| 20% Off Purchase  | `SAVE20` |
| Free Pastry       | `PASTRY` |
| Loyalty Mug       | `MUG25`  |

Each code is single-use per session. Brands can generate new codes from **Rewards → Details → Generate Claim Code**.

### Demo data overview

- **Brand** (`Demo Coffee Co.`) — 4 pre-listed rewards with analytics and claim history
- **User** (`Alex Demo`) — 20 total points earned from 3 past claims
- Default data lives in `src/lib/data/staticData.ts`
- Data access layer (login, CRUD, claims) lives in `src/lib/data/store.ts`

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) 2 + Svelte 4
- TypeScript
- Tailwind CSS + Flowbite Svelte

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run check`| Type-check with svelte-check |

## Project structure

```
src/lib/data/
  staticData.ts   # Default users, rewards, codes, points
  store.ts        # In-memory data layer (replaces Supabase)
```
