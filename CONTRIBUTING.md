### Contributing to SauLM

Thanks for your interest in contributing! This guide shows how to set up, branch correctly, follow the code structure, write concise commits, and open effective PRs.


## Code of Conduct
By participating, you agree to uphold a respectful and inclusive environment. Be kind and constructive.


## Project Setup
1) Fork the repository and clone your fork
```bash
git clone <your-fork-url>
cd SaulAI
```

2) Install dependencies
```bash
# Frontend (Next.js) at repo root
npm install
npx prisma generate

# Backend in server/
cd server && npm i && docker compose up -d
```

3) Create your `.env`
```bash
cp server/.env.example server/.env  # if present, or create it manually
```

Required values in `server/.env`:
```bash
GOOGLE_API_KEY=your_google_api_key
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=pdf-docs
# REDIS_HOST=127.0.0.1
# REDIS_PORT=6379
```

Create `./.env.local` for the frontend (Next.js):
```bash
# Neon Postgres
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
Get it from neonDB (https://console.neon.tech/app/)
create a new project 
Get its connection string and copy in the above URL

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4) Run backend services with Docker Compose
```bash
cd server
docker compose up -d
cd -
```

5) Start the app
```bash
# Frontend (Next.js)
npm run dev # http://localhost:3000

# Backend API (server/)
cd server && npm run dev # http://localhost:5000

# Worker (server/, separate terminal)
npm run worker
```


## Branch Naming: Use the Correct Format
Create your branch from `main` using:
```
<type>/<area>-<short-task>
```
- Types: feat, fix, docs, chore, refactor, perf, test
- Area: frontend, backend, worker, infra, docs
- Short task: a brief kebab-case summary

Examples:
- `feat/frontend-personas-selector`
- `fix/backend-upload-validation`
- `refactor/worker-chunking-logic`


## Follow the Code Structure
- Frontend at repo root (Next.js)
- Backend in `server/`:
  - API: `server/src/index.ts`
  - Worker: `server/src/worker.ts`
  - Shared modules: `server/src/lib/`
- Keep changes localized; avoid creating new folders unless clearly needed
- Do not reformat unrelated files; keep diffs small and focused
- Prefer clear naming, small functions, and early returns
- Only add comments for non-obvious intent and invariants


## Commit Messages: Short, Clear, Highlight Changes
Keep commits small and the message concise. Format:
```
<type>(<area>): <concise change summary>

<optional body: why + highlights of changes>
```
Examples:
- `feat(frontend): add persona picker (Harvey/Saul/Matt)`
- `fix(backend): return 400 when no file is uploaded`
- `refactor(worker): extract docProcessor for reuse`

Good bodies (brief):
- “Adds dropdown for persona selection; wires to chat endpoint”
- “Validates file presence; returns JSON error payload”


## Testing Changes Locally
- Frontend: `npm run dev` and verify flows
- Backend: exercise endpoints via cURL/REST client
- Worker: keep running to process uploads into Qdrant
- Check logs for errors and unhandled rejections


## Submitting a Pull Request
Before opening a PR:
- Branch name and commits follow the rules
- Flows tested locally; logs clean
- PR scoped and reviewable

PR description includes:
- What changed and why (1–3 bullets)
- How to test (commands/endpoints/expected results)
- Follow-ups or caveats


## Issues
- Use the tracker for bugs and feature requests with repro steps and environment details


## Maintainers
- PRs are squash-merged; titles/bodies inform the changelog


## Questions?
Open an issue or discussion. Thanks for contributing to SauLM!
