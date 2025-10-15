## Voc — Technical Vision

This document is the starting point and guiding tech reference for development. We proceed step‑by‑step, keeping the MVP simple (KISS) and avoiding over‑engineering. Only technical decisions here, no business logic.

### 1) Technologies and Tools (Agreed)
- Frontend: TypeScript, Vite, React, React Compiler (enabled).
- Styling: CSS Modules only.
- Hosting: Firebase Hosting.
- Backend: Firebase Cloud Functions (Node + TypeScript) with Express routing.
- Auth: Firebase Authentication (Google provider; no email verification).
- Data: Firebase Realtime Database (no ORM). No Firestore in the near future.
- Files: Firebase Storage for uploads; accept txt and srt; client‑side text extraction (5MB max) and send plain text to backend.
- NLP: Lightweight tokenization/lemmatization via Node libs per language.
- Tooling: ESLint + Prettier; npm (match existing). Unit tests with Vitest/Jest as needed.
- Deployment: Firebase CLI; one project per environment.

### 2) Development Principles (Agreed)
- KISS: prefer the simplest solution that meets current requirements; avoid abstractions until needed.
- MVP-first: ship the smallest vertical slice that proves value; defer nice-to-haves.
- Iterative delivery: short cycles; each iteration should be deployable and user-visible where possible.
- Thin slices: end-to-end increments (upload → detect unknown → train → persist) over broad internal work.
- Minimize dependencies: pick built-ins and existing stack tools first.
- Remove before adding: delete unused code/flags; keep surface area small.
- Pragmatic testing: unit-test core algorithms (scoring/scheduling); smoke-test critical flows.
- Operational simplicity: few services, few configs, minimal infra; defaults over customization.
- Security by default: authenticated access, least-privilege rules, no PII in logs.
- Consistent style: ESLint + Prettier; readable TypeScript; clear naming.

### 3) Project Structure (Agreed)
```
voc_v2/
├── client/                    # React app (flattened from client/voc-client/)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Route components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API calls, Firebase config
│   │   ├── utils/            # Pure functions, text extraction
│   │   └── types/            # TypeScript definitions
│   └── package.json
├── functions/                 # Firebase Functions (at root)
│   ├── src/
│   │   ├── index.ts          # Main entry point
│   │   ├── routes/           # Express routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # NLP, scoring, scheduling
│   │   └── types/            # TypeScript definitions
│   └── package.json
└── firebase.json             # Firebase config
```

### 4) Project Architecture (Agreed)
- **Client (React SPA)**: Firebase Hosting
  - File upload → text extraction → send to backend
  - Auth state management, unknown words display, training sessions
  - Offline-capable for training queue

- **Backend (Firebase Functions)**: Single HTTPS function with Express routing
  - NLP processing, word scoring, scheduling logic
  - Realtime DB operations
  - Authentication integration

- **Data flow:**
  1. Client extracts text from files → sends to backend
  2. Backend processes NLP → stores in Realtime DB
  3. Client fetches unknown words → displays with context
  4. Training: get next items → record results → update scheduling

- **Storage**: Firebase Realtime Database (hierarchical, no ORM)
- **File handling**: Firebase Storage for uploads
- **Authentication**: Firebase Auth (Google provider; no email verification)

**Key architectural decisions:**
- Single function with Express routing (vs multiple functions)
- Client-side text extraction (vs server-side)
- Realtime DB for all data (vs mixed storage)
- Offline-first training queue (vs always-online)

### 5) Deploy (Agreed)
- **Environments**: Local (Firebase Emulator Suite) + Production (single Firebase project)
- **Local development**: Firebase Emulator Suite (Functions, Auth, Realtime DB, Storage)
- **Production deployment**: 
  - Client: `firebase deploy --only hosting`
  - Functions: `firebase deploy --only functions`
- **Deployment flow**: Manual deployment to prod via Firebase CLI
- **Rollback**: Firebase CLI if needed

**Key decisions:**
- Single Firebase project (no separate dev/staging projects)
- Firebase Emulator Suite for local development
- Manual production deployments (no CI/CD for MVP)

### 6) Configuration Principles (Agreed)
- **Client config**: Hardcode Firebase config in `client/src/config/firebase.ts`
- **Client environment**: Use `.env` files for client-side settings (e.g., API endpoints)
- **Backend config**: Firebase Functions config for sensitive data
- **Production**: Firebase project settings for all prod configuration
- **Local development**: `.env` files for Firebase Emulator Suite settings

**Configuration structure:**
- `client/.env` - Client-side environment variables
- `functions/.env` - Local emulator settings
- `client/src/config/firebase.ts` - Hardcoded Firebase config (public)
- `firebase.json` - Firebase project config
- Firebase project settings - All production configuration

**Key decisions:**
- Hardcode Firebase config (no external config service)
- Client-side `.env` files for environment-specific settings
- Firebase project settings for all production config

### 7) Logging Principles (Agreed)
- **Backend logging**: Firebase Functions built-in logging (structured JSON)
- **Client logging**: Console logs for development, minimal production logging
- **Log levels**: Error, Warn, Info (no Debug in production)
- **No PII**: Never log user data, file contents, or personal information
- **Error tracking**: Firebase Functions error reporting
- **Performance**: Log function execution times for optimization
- **Local development**: Full console output for debugging

**Logging structure:**
- Functions: `console.log`, `console.error` (Firebase handles formatting)
- Client: `console.log` for dev, minimal logging for prod
- Error boundaries: Log errors to console, no external error tracking for MVP

**Key decisions:**
- Use Firebase Functions built-in logging (no external logging service)
- No PII in any logs
- Minimal client-side logging for production
- No external error tracking services for MVP

---

## Summary
This technical vision document establishes the foundation for Voc development, emphasizing KISS principles and MVP-first approach. All major architectural decisions have been made and agreed upon, providing clear guidance for implementation.


