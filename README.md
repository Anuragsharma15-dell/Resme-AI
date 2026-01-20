

# AI Career Canvas

![App Screenshot](./screenshot.png)

Professional, configurable portfolio and career toolkit with AI-powered features — built with a modern React + TypeScript frontend and a Node.js authentication backend.

## Overview

AI Career Canvas helps creators build and share polished portfolios, resumes, and project showcases. The app includes authentication (Google/GitHub), portfolio editing and live preview, AI-powered helpers (generation, scoring, SEO/style suggestions), and deployment-ready Docker assets.

## Key Features

- User authentication with Google & GitHub (Passport)
- Portfolio builder with image upload and theme customization
- Live preview of portfolio pages
- AI integrations for content generation, scoring, suggestions (serverless functions)
- Export and share portfolios

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Passport (Google & GitHub strategies)
- Database: MongoDB (via Mongoose)
- Dev tooling: Vite, pnpm/npm, TypeScript
- Optional: Supabase serverless functions present in `frontend/supabase/functions`
- Containerization: Docker + docker-compose

## Repository Structure

- `frontend/` — React + Vite app (UI, pages, components, supabase integrations)
- `backend/` — Express server, auth routes, MongoDB connection
- `frontend/docker/` — Dockerfiles for containerizing frontend/backend
- `frontend/docker-compose.yml` — Compose to run services together

## Prerequisites

- Git
- Node.js (16+ recommended)
- pnpm (recommended) or npm
- Docker & Docker Compose (for containerized setup)

## Quickstart — Clone

Clone the repository:

```bash
git clone <REPO_URL>
cd ai-career-canvas
```

## Local Development (recommended)

1. Install frontend deps and run the dev server:

```bash
cd frontend
# using pnpm
pnpm install
pnpm run dev

# or using npm
npm install
npm run dev
```

2. Start the backend (in a separate terminal):

```bash
cd backend
npm install
# run with node
node index.js
```

Note: Backend expects certain environment variables (create a `.env` file in `backend/`):

```
SESSION_SECRET=your_session_secret
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
PORT=5000
```

Adjust callback URLs in `backend/config/passport.js` and CORS origins in `backend/index.js` as needed for your dev environment.

## Docker (containerized)

There is a `docker-compose.yml` under `frontend/` that can build and run the app and backend containers. From the project root run:

```bash
docker compose -f frontend/docker-compose.yml up --build
# or with older docker-compose
docker-compose -f frontend/docker-compose.yml up --build
```

If you prefer building images manually:

```bash
docker build -t ai-career-frontend -f frontend/docker/frontend.Dockerfile ./frontend
docker build -t ai-career-backend -f frontend/docker/backend.Dockerfile ./frontend
# then run containers with env vars mounted or provided
```

## Deployment Notes

- Ensure production env vars are set (DB, OAuth credentials, session secrets). 
- Configure secure cookies and HTTPS in production for sessions.
- If using the provided Docker setup, confirm ports and callback URLs used by OAuth providers.

## Screenshots

Place your screenshot file at the project root named `screenshot.png` to have it displayed at the top of this README. Replace the image file if you have a different filename or path.

## Contributing

Contributions welcome — open issues or PRs for improvements, bugfixes, or feature ideas.

