# Voc — Development Conventions

This document defines our coding standards, project structure rules, and what is categorically not allowed. All team members must follow these conventions.

## 1) TypeScript & React Conventions

### TypeScript
- **Strict mode**: Always use strict TypeScript configuration
- **Explicit types**: Define interfaces for all data structures, avoid `any`
- **Naming**: 
  - Interfaces: `PascalCase` (e.g., `UserWord`, `TrainingSession`)
  - Types: `PascalCase` (e.g., `WordStatus`, `ReviewGrade`)
  - Enums: `PascalCase` (e.g., `FileType`, `Language`)
- **File organization**: One interface/type per file in `types/` folder
- **Imports**: Use absolute imports from `src/`, group imports (external → internal → relative)

### React
- **Components**: Functional components only, use hooks
- **Naming**: `PascalCase` for components (e.g., `WordCard`, `TrainingSession`)
- **Props**: Define explicit interfaces for all component props
- **State**: Use `useState` for local state, `useContext` for shared state
- **Effects**: Always specify dependencies in `useEffect`
- **File naming**: Component files match component name (e.g., `WordCard.tsx`)

### Code Style
- **Formatting**: ESLint + Prettier (no manual formatting)
- **Line length**: 100 characters max
- **Indentation**: Tabs
- **Semicolons**: Always use semicolons
- **Quotes**: Single quotes for strings, double quotes for JSX attributes

## 2) Firebase & Backend Conventions

### Functions Structure
```
functions/src/
├── index.ts            # Main entry point
├── routes/             # Express route handlers
├── services/           # Business logic
├── utils/              # NLP, scoring, scheduling utilities
└── types/              # TypeScript definitions
```

### API Conventions
- **RESTful**: Use standard HTTP methods and status codes
- **Error handling**: Consistent error response format
- **Validation**: Validate all inputs, return meaningful error messages
- **Authentication**: Require auth for all user data operations

### Database Conventions
- **Realtime DB**: Use hierarchical structure, avoid deep nesting
- **Security rules**: Write rules for all data access patterns
- **Data validation**: Validate data structure before storing

## 3) What is Categorically NOT Allowed

### Code Quality
- ❌ **No `any` types** - Always define proper TypeScript types
- ❌ **No `console.log` in production** - Use proper logging
- ❌ **No hardcoded values** - Use constants or environment variables
- ❌ **No magic numbers** - Use named constants
- ❌ **No deep nesting** - Max 3 levels of nesting
- ❌ **No functions longer than 90 lines** - Break into smaller functions

### Architecture
- ❌ **No direct database access from client** - Use Firebase Functions
- ❌ **No business logic in components** - Move to services/hooks
- ❌ **No global state for local data** - Use appropriate state management
- ❌ **No external dependencies without approval** - Keep dependencies minimal
- ❌ **No complex state management libraries** - Use React built-ins for MVP

### Security
- ❌ **No PII in logs** - Never log user data or file contents
- ❌ **No client-side secrets** - All secrets in Firebase Functions config
- ❌ **No unvalidated user input** - Always validate and sanitize
- ❌ **No direct file system access** - Use Firebase Storage

### Performance
- ❌ **No large bundle sizes** - Keep client bundle under 1MB
- ❌ **No blocking operations** - Use async/await properly
- ❌ **No unnecessary re-renders** - Optimize React performance
- ❌ **No synchronous file operations** - Use async file handling

## 4) Git & Commit Conventions

### Branch Naming
- `feature/description` (e.g., `feature/word-training`)
- `fix/description` (e.g., `fix/auth-redirect`)
- `refactor/description` (e.g., `refactor/nlp-processing`)

### Commit Messages
- **Format**: `type(scope): description`
- **Types**: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
- **Examples**:
  - `feat(training): add spaced repetition algorithm`
  - `fix(auth): handle expired tokens properly`
  - `refactor(nlp): simplify text extraction logic`

### Pull Request Rules
- **One feature per PR** - Keep PRs focused and small
- **All tests pass** - No failing tests allowed
- **Code review required** - All PRs need approval
- **Clean commit history** - Squash commits before merging

## 5) Testing Conventions

### Test Structure
- **Unit tests**: Test individual functions and components
- **Integration tests**: Test API endpoints and data flow
- **Test files**: Co-locate with source files (e.g., `WordCard.test.tsx`)

### Test Naming
- **Format**: `describe('Component/Function', () => { it('should do something', () => {}) })`
- **Examples**:
  - `describe('WordCard', () => { it('should display word and context', () => {}) })`
  - `describe('calculateWordScore', () => { it('should return score between 0 and 1', () => {}) })`

## 6) Documentation Conventions

### Code Documentation
- **JSDoc**: Document all public functions and complex logic
- **README**: Keep project README updated with setup instructions
- **Comments**: Explain "why", not "what" - code should be self-documenting

### API Documentation
- **Endpoint documentation**: Document all API endpoints
- **Request/Response examples**: Provide clear examples
- **Error codes**: Document all possible error responses

---

## Enforcement

These conventions are enforced through:
- **ESLint rules** - Automated code quality checks
- **Prettier** - Automated code formatting
- **TypeScript strict mode** - Type safety enforcement
- **Code review** - Manual convention checking
- **CI/CD** - Automated testing and linting

**Remember**: These conventions exist to maintain code quality, readability, and consistency. When in doubt, follow the KISS principle and ask for clarification.
