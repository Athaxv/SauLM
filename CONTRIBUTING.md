### Contributing to SauLM

Thanks for your interest in contributing! This guide shows how to set up, branch correctly, follow the code structure, write concise commits, and open effective PRs.


## Code of Conduct
By participating, you agree to uphold a respectful and inclusive environment. Be kind and constructive.


## Project Setup

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- Git

### Step 1: Initial Setup
1) Fork the repository and clone your fork
```bash
git clone <your-fork-url>
cd SauLM
```

### Step 2: Frontend Setup (Next.js)

2.1) Install frontend dependencies
```bash
npm install
```

2.2) Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

2.3) Create frontend environment file
Create `.env.local` in the root directory with the following variables:

**Database Configuration:**
```bash
# Get your connection string from NeonDB: https://console.neon.tech/app/
# 1. Create a new project at https://console.neon.tech/app/
# 2. Copy the connection string and paste it below
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
```

**NextAuth Configuration:**
```bash
# Generate a random secret using: openssl rand -base64 32
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

**Google OAuth Setup:**
```bash
# Get these from Google Cloud Console: https://console.cloud.google.com/
# 1. Create a new project or select existing one
# 2. Enable Google+ API
# 3. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
# 4. Set authorized redirect URI to: http://localhost:3000/api/auth/callback/google
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

**GitHub OAuth Setup:**
```bash
# Get these from GitHub Developer Settings: https://github.com/settings/developers
# 1. Click "New OAuth App"
# 2. Set Authorization callback URL to: http://localhost:3000/api/auth/callback/github
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

2.4) Start the frontend development server
```bash
npm run dev
```
Visit http://localhost:3000

### Step 3: Backend Setup (Express.js + Worker)

3.1) Navigate to server directory and install dependencies
```bash
cd server
npm install
```

3.2) Start Docker services
```bash
# Start Qdrant (vector database) and Valkey (Redis alternative)
docker compose up -d

# Verify services are running
docker ps
```

3.3) Create backend environment file
Create `server/.env` with the following variables:

**Google AI API Configuration:**
```bash
# Get your API key from Google AI Studio: https://aistudio.google.com/
# 1. Go to https://aistudio.google.com/
# 2. Sign in with your Google account
# 3. Click "Get API Key" → "Create API Key"
# 4. Copy the generated key and paste it below
GOOGLE_API_KEY=your_google_api_key_here
```

**Qdrant Vector Database Configuration:**
```bash
# These are the default values for the local Qdrant instance
# No changes needed unless you're using a different Qdrant setup
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=pdf-docs
```

**Redis/Valkey Configuration (Optional):**
```bash
# These are commented out as they use default localhost values
# Uncomment and modify if using a different Redis setup
# REDIS_HOST=127.0.0.1
# REDIS_PORT=6379
```

3.4) Build and start backend services
```bash
# Start API server (in one terminal)
npm run dev

```

The API server will run on http://localhost:5000

### Step 4: Verify Setup
- Frontend: http://localhost:3000 (should show the application)
- Backend API: http://localhost:5000 (should return "Hello World")
- Docker services: `docker ps` should show qdrant and valkey containers running


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
