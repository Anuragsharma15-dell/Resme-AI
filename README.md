# Repository layout and quick deploy

This repo contains two main projects in-place:

- Frontend: `ai-career-canvas/` (Vite + React/TypeScript)
- Backend: `backned/backend/backend/` (Express.js)

What I added to make deploy easier:

- `docker/frontend.Dockerfile` — builds the frontend and serves `dist` on port 3000.
- `docker/backend.Dockerfile` — builds the backend and runs `node index.js` on port 5000.
- `docker-compose.yml` — runs both services (`frontend` -> 3000, `backend` -> 5000).
- `start-frontend.ps1` and `start-backend.ps1` — convenience PowerShell scripts to run locally.

Notes and next steps

- The repo currently contains nested folders (for example `backned/backend/backend/`). I did not move source files; instead I provided Dockerfiles that use the existing paths. You can optionally rename/move `backned` -> `backend` to clean up.
- The backend defaults to port `5000` (matches `index.js`). Ensure `.env` in `backned/backend/backend` contains `SESSION_SECRET` and other env values before running in production.

Quick start (needs Docker)

1. Build and run both services:

```bash
docker-compose up --build
```

2. Frontend available at http://localhost:3000 and backend at http://localhost:5000

Local dev without Docker (Windows PowerShell)

```powershell
# In repo root
./start-frontend.ps1    # runs dev server in ai-career-canvas
./start-backend.ps1     # runs backend from backned/backend/backend
```

If you'd like, I can now:
- Move and rename folders to a cleaner structure (`frontend/` and `backend/`) and update package.json files accordingly.
- Add a root-level `package.json` workspace or scripts to orchestrate both with `pnpm`/`npm`.
- Create Kubernetes manifests or a production-grade Docker setup (nginx, env files, secrets).

Tell me which follow-up you'd like and I'll apply it next.