# Multivendor Backend (Express + TypeScript)

## Setup (local / Render)

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Start dev: `npm run dev`

On Render: Create a new Web Service from this repository and set the `DATABASE_URL` environment variable via Render's dashboard (auto-create a managed Postgres DB if desired). Render will run `npm start` automatically.
