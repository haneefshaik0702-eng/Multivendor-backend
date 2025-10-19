# Multivendor Backend (TypeScript + Express + MongoDB)

This repo is ready to deploy on Render.

## Deploy on Render
1. Create a Web Service on Render and connect this repo.
2. Set the following environment variables on Render:
   - `MONGODB_URI` (your MongoDB connection string)
   - `JWT_SECRET`
3. Build command: `npm install` (Render will install deps)
4. Start command: `npm start`

The server will listen on the port provided by Render.
