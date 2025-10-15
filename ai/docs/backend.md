## Backend API (MVP)

Base: `/api` (no version). All routes require Firebase ID token; `requireAuth` extracts `userId`.

### Upload/Wizard
- POST `/api/wizard/start`
  - Body: { name: string, text: string } // client-extracted txt/srt, ≤ 5MB
  - Result: { wizardId, totalChunks }

- GET `/api/wizard/:wizardId/chunk?index=number&size=number`
  - Result: { words: [{ lemma, surface, context, frequency }], index, totalChunks }

- POST `/api/wizard/:wizardId/process`
  - Body: { index: number, known: string[], unknown: string[] }
  - Effect: update known words; add unknowns to collection; persist lastProcessedIndex
  - Result: { nextIndex, processed: true }

### Vocabulary
- GET `/api/vocabulary?collection=string&alpha=asc|desc&unknownThreshold=number&cursor=string&limit=number`
  - Result: { items: [{ lemma, score }], nextCursor }

- GET `/api/word/:lemma`
  - Result: { lemma, score, contexts: [{ text, collection }] }

### Collections
- POST `/api/collections`
  - Body: { name: string }
  - Result: { collectionId, name, created }

- PATCH `/api/collections/:collectionId`
  - Body: { name: string } // rename display name
  - Result: { collectionId, name }

- POST `/api/collections/:collectionId/words`
  - Body: { lemma: string }
  - Result: { ok: true }

- DELETE `/api/collections/:collectionId/words/:lemma`
  - Result: { ok: true }

- GET `/api/collections/:collectionId/words?alpha=asc|desc&cursor=string&limit=number`
  - Result: { items: [{ lemma }], nextCursor }

### Practice (sessions)
- POST `/api/sessions`
  - Body: { mode: '{lang1}-{lang2}' | 'typed' | 'tiles', size?: number } // default 10
  - Result: { sessionId, items: [{ lemma, prompt, choices? }] }

- POST `/api/sessions/:sessionId/finish`
  - Body: { durationSec: number, answers: [{ lemma: string, correct: boolean }] }
  - Result: { total, correct, durationSec, created }

- GET `/api/sessions/:sessionId`
  - Result: { mode, total, correct, durationSec, created }

### Profile/Stats/Settings
- GET `/api/profile`
  - Result: { name, email, avatarUrl, settings: { defaultChunkSize, practiceWordsCount, unknownThreshold } }

- GET `/api/stats/summary`
  - Result: { learnedWords, recentActivity: [{ day, count }], streak }

- PATCH `/api/settings`
  - Body: { defaultChunkSize?, practiceWordsCount?, unknownThreshold? }
  - Result: { settings }

### Health
- GET `/api/health` → { ok: true }


