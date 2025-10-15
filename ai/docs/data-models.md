This doc describes data models.

Storage layout: everything is stored under `/{userId}`
    - `{userId}/collections/{collectionId}/`         # collection node
    - `{userId}/collections/{collectionId}/words/`   # map of words: `{lemma}: true`
    - `{userId}/wizards/{wizardId}`                    # wizard state (minimal persistence)
    - `{userId}/sessions/`                             # practice sessions history
    - `{userId}/user/`                                 # user profile/settings
    - `{userId}/motivation/`                           # streak, xp, etc.

#Word
    - word: string
    - frequency: number
    - score: number [0-1]
    - isKnown: boolean
    - context: [
        {collection: string, text: string},
    ]
    - collections: [{
        collection: string, frequency: number, 
    }]
    - createdAt: number
    - lastReviewedAt: number


#Wizard
    - name: string
    - collectionId: string
    - sourceText: string (file contents)
    - sourceUrl: string
    - chunkSize: number
    - selectedWords: string[]
    - words: [
        {word: string, context: string, frequency: number, position: number}
    ]
    - lastProcessedIndex: number (persist after processing a chunk)

#Collection
    - name: string
    - words: string[]
    - createdAt: number

    Storage (per user) as map structure:
        {userId}/collections/{collectionId}/name: string
        {userId}/collections/{collectionId}/created: number
        {userId}/collections/{collectionId}/words/{lemma}: true

#User
    - name: string
    - email: string
    - avatarUrl: string
    - settings {
        defaultChunkSize: number
        practiceWordsCount: number
    }
    - friends: []

#Motivation
    - streak: number
    - level: number
    - experience: number

#Sessions
    - mode: '{lang1}-{lang2}' | 'typed' | 'tiles'
    - total: number
    - correct: number
    - durationSec: number
    - created: number


