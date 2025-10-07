### SauLM — Persona-based AI Legal Assistant

SauLM is an AI-powered, persona-based legal assistant. Choose a distinct persona to get concise, law-focused guidance tailored to different styles:
- Harvey Specter
- Saul Goodman
- Matt Murdock

SauLM uses retrieval-augmented generation (RAG) to analyze uploaded legal documents and answer user questions. It combines a Next.js frontend with a Node/Express backend, Google Generative AI embeddings, and a Qdrant vector database. Background processing is handled via BullMQ with Redis-compatible Valkey.


## Architecture
- Frontend: Next.js app at the repo root
- Backend: Express API in `server/`
  - Queue producer in `server/src/index.ts` (enqueues file-processing jobs)
  - Worker in `server/src/worker.ts` (extracts, chunks, embeds, and stores vectors)
- Vector DB: Qdrant
- Queue: BullMQ with Valkey (Redis-compatible)
- Embeddings/GenAI: Google Generative AI (Gemini)


## Features
- Persona-based legal assistance (Harvey, Saul, Matt)
- Upload PDFs or DOC/DOCX; background processing and vector storage in Qdrant
- General chat over the full vector collection
- File-scoped chat constrained to a specific uploaded document


## Requirements
- Node.js 18+
- npm (or pnpm/yarn)
- Docker (for Valkey and Qdrant via Docker Compose)
- Google API key for embeddings


## Environment Variables

### Frontend (`.env.local` at repo root)
```bash
# Neon Postgres
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
Notes:
- Use your Neon connection string for `DATABASE_URL`.
- In production, set `NEXTAUTH_URL` to your deployed URL and rotate `NEXTAUTH_SECRET`.

### Backend (`server/.env`)
```bash
GOOGLE_API_KEY=your_google_api_key
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION=pdf-docs
# Optional (defaults used in code / docker compose)
# REDIS_HOST=127.0.0.1
# REDIS_PORT=6379
```


## Getting Started

### 1) Frontend (Next.js)
```bash
# From repo root
npm install
npm run dev
# http://localhost:3000
```

### 2) Backend (Express API in server/)
```bash
cd server
npm i
# Start dependencies (Valkey + Qdrant)
docker compose up -d

# Start API server
npm run dev
# http://localhost:5000
```
Run the worker in a separate terminal to process uploads:
```bash
cd server
npm run worker
```


## API Overview (Backend)
- `GET /` — Health check
- `POST /pdf/upload` — Upload a document (form-data field: `pdf`)
  - Enqueues a job; the worker extracts, chunks, embeds, and stores in Qdrant
- `POST /chat` — Ask a general question over the entire collection
  - Body: `{ "query": string }`
- `POST /pdf/:fileId/chat` — Ask a question limited to a specific file
  - Params: `fileId` (your chosen identifier)
  - Body: `{ "query": string }`

Example upload:
```bash
curl -F "pdf=@/path/to/file.pdf" http://localhost:5000/pdf/upload
```

Example chat:
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"query":"What are the key obligations?"}'
```


## Development Notes
- `server/docker-compose.yml` brings up Valkey on 6379 and Qdrant on 6333.
- Multer stores uploads to `uploads/` on disk; ensure write permissions.
- Keep the worker running to process uploads into the vector DB.


## Troubleshooting
- Redis/Valkey connection refused: ensure `docker compose up -d` is running under `server/`.
- Qdrant connection errors: confirm `QDRANT_URL` and that the container is healthy.
- Missing/invalid `GOOGLE_API_KEY`: verify the key and project access for embeddings.


## Scripts
From repo root (frontend):
```bash
npm run dev
```
From `server/` (backend):
```bash
npm run build
npm run dev
npm run worker
```


## Contributing
We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, branching, commit style, testing, and pull request guidance.
