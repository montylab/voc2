# Voc — Development Task List

This document outlines the step-by-step development plan for Voc, following MVP-first and KISS principles. Tasks are ordered to deliver value incrementally and build upon each other.

## Phase 1: Foundation & Setup

### 1.1 Project Structure Setup
- [ ] **1.1.1** Create Firebase project and configure hosting
- [ ] **1.1.2** Set up client project structure (flatten from `client/voc-client/`)
- [ ] **1.1.3** Set up functions project structure at root level
- [ ] **1.1.4** Configure ESLint + Prettier with tab indentation
- [ ] **1.1.5** Set up TypeScript strict mode for both projects
- [ ] **1.1.6** Configure Firebase Emulator Suite for local development

### 1.2 Authentication (Google)
- [ ] **1.2.1** Set up Firebase Auth with Google provider
- [ ] **1.2.2** Create "Sign in with Google" button and auth state
- [ ] **1.2.3** Redirect to /home after login; sign-out clears session
- [ ] **1.2.4** Add requireAuth middleware to Firebase Functions
- [ ] **1.2.5** Test auth flow end-to-end

### 1.3 File Upload & Wizard Start
- [ ] **1.3.1** Set up Firebase Storage for file uploads (if needed later)
- [ ] **1.3.2** Create file upload UI component (txt/srt only, max 5MB)
- [ ] **1.3.3** Implement client-side text extraction for txt and srt
- [ ] **1.3.4** Call POST /api/wizard/start and redirect to Wizard
- [ ] **1.3.5** Test upload, extraction, and wizard start

## Phase 2: Core NLP Pipeline

### 2.1 Text Processing Foundation
- [ ] **2.1.1** Set up basic tokenization for English text
- [ ] **2.1.2** Implement simple lemmatization (start with basic rules)
- [ ] **2.1.3** Create word frequency counting
- [ ] **2.1.4** Implement Wizard chunk API: GET /wizard/:wizardId/chunk (client-size)
- [ ] **2.1.5** Implement Wizard process API: POST /wizard/:wizardId/process
- [ ] **2.1.6** Test wizard chunking and processing

### 2.2 Word Knowledge Scoring
- [ ] **2.2.1** Create basic word knowledge scoring algorithm
- [ ] **2.2.2** Implement frequency-based initial scores
- [ ] **2.2.3** Set up Realtime Database schema for user words
- [ ] **2.2.4** Create API to store processed words
- [ ] **2.2.5** Test word scoring and storage

### 2.3 Vocabulary (Unknown Words)
- [ ] **2.3.1** Implement unknown words filtering (score < threshold)
- [ ] **2.3.2** Create API to fetch user's vocabulary list (no contexts)
- [ ] **2.3.3** Build vocabulary UI with filters: collection, alphabetical
- [ ] **2.3.4** Add unknown-threshold slider (default 0.6)
- [ ] **2.3.5** Test end-to-end: upload → wizard process → view vocabulary

### 2.4 Collections
- [ ] **2.4.1** Create collection (POST /collections)
- [ ] **2.4.2** Rename collection by collectionId (PATCH /collections/:collectionId)
- [ ] **2.4.3** Add word to collection (POST /collections/:collectionId/words)
- [ ] **2.4.4** Remove word from collection (DELETE /collections/:collectionId/words/:lemma)
- [ ] **2.4.5** List collection words with pagination (GET /collections/:collectionId/words)

## Phase 3: Training System

### 3.1 Basic Training Infrastructure (Binary Scoring)
- [ ] **3.1.1** Design data for sessions (all-at-once) and outcomes (right/wrong)
- [ ] **3.1.2** Create session APIs (create, finish batch, get summary)
- [ ] **3.1.3** Build basic training UI components
- [ ] **3.1.4** Test session creation and summary

### 3.2 Flashcard Training
- [ ] **3.2.1** Create MCQ component (word ↔ meaning)
- [ ] **3.2.2** Implement session flow (all items upfront, N=10 default)
- [ ] **3.2.3** Submit answers in batch on finish; show session summary
- [ ] **3.2.4** Test complete training cycle (right/wrong)

### 3.3 Training Progress
- [ ] **3.3.1** Implement training progress tracking
- [ ] **3.3.2** Create progress display UI
- [ ] **3.3.3** Add basic statistics (words learned, accuracy)
- [ ] **3.3.4** Test progress tracking and display

## Phase 4: User Experience & Polish

### 4.1 Enhanced UI/UX
- [ ] **4.1.1** Improve vocabulary UI (filters + threshold slider UX)
- [ ] **4.1.2** Add word marking (known/ignore) functionality
- [ ] **4.1.3** Implement training session customization
- [ ] **4.1.4** Add loading states and error handling
- [ ] **4.1.5** Test improved user experience

### 4.2 Offline Capability
- [ ] **4.2.1** Implement offline training queue storage
- [ ] **4.2.2** Add sync mechanism for offline training results
- [ ] **4.2.3** Handle offline/online state transitions
- [ ] **4.2.4** Test offline functionality

### 4.3 Performance & Optimization
- [ ] **4.3.1** Optimize bundle size and loading performance
- [ ] **4.3.2** Implement lazy loading for training components
- [ ] **4.3.3** Add caching for frequently accessed data
- [ ] **4.3.4** Test performance improvements

## Phase 5: Testing & Deployment

### 5.1 Testing
- [ ] **5.1.1** Write unit tests for core algorithms (tokenize, lemmatize, filtering)
- [ ] **5.1.2** Add integration tests for API endpoints
- [ ] **5.1.3** Auth E2E: Google sign-in and redirect to /home
- [ ] **5.1.4** Upload flow: txt/srt ≤ 5MB, errors for oversize/invalid
- [ ] **5.1.5** Wizard: chunking (client-size), process updates known and lastProcessedIndex
- [ ] **5.1.6** Sessions: create-all-at-once and batch finish; summary totals

### 5.2 Production Deployment
- [ ] **5.2.1** Set up production Firebase project
- [ ] **5.2.2** Configure production environment variables
- [ ] **5.2.3** Deploy client to Firebase Hosting
- [ ] **5.2.4** Deploy functions to Firebase Functions
- [ ] **5.2.5** Test production deployment

### 5.3 Documentation & Handoff
- [ ] **5.3.1** Update README with setup instructions
- [ ] **5.3.2** Document API endpoints
- [ ] **5.3.3** Create user guide for basic features
- [ ] **5.3.4** Document deployment process
- [ ] **5.3.5** Prepare project for handoff

## Development Principles

### Task Ordering Logic
1. **Foundation First**: Authentication and basic infrastructure before features
2. **End-to-End Slices**: Each phase delivers a working feature
3. **Incremental Value**: Each task adds user-visible functionality
4. **Dependency Management**: Tasks build upon previous work
5. **Risk Mitigation**: Core algorithms tested early

### Success Criteria
- **Phase 1**: User can sign up and upload files
- **Phase 2**: User can see unknown words from uploaded content
- **Phase 3**: User can train unknown words with spaced repetition
- **Phase 4**: User has a polished, offline-capable experience
- **Phase 5**: Production-ready application with tests

### Notes
- Each task should be completable in 1-4 hours
- Test each phase before moving to the next
- Follow conventions.md for all code
- Use vision.md for architectural decisions
- Keep MVP scope - defer nice-to-haves to post-MVP

---

**Next Steps**: Start with Phase 1.1.1 - Create Firebase project and configure hosting.
