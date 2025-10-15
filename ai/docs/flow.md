This doc describes user workflow:


#wizard flow
    Main workflow: 
    - user uploads a file
    - user see word wizard page
    - user select known words
    - user click "process chunk" to add known / unknown words to collection
        - marking a word as known updates user's global vocabulary to prevent duplicates in future chunks
    - repeat this process for all chunks
    - user finish last chunk => wizard data removed.  

    Side workflow
    - user can leave the page. State is saved locally for unprocessed chunks
    - user can return to wizard, retriving last local state
    - after processing a chunk, persist last processed word index to allow resume


    User interaction:
        - Select chunk size: will increase/decrease words count per page
        - Select/deselect all
        - Select/deselect words by clicking on them
        - Word have a hover hint with context sentence
        - click "Process chunk" and proceed to the next
        - show progress: processed chunks / total, and coverage gain (optional)


#auth flow
    Main:
    - user clicks "Sign in with Google"
    - Firebase Auth popup → on success create/attach session
    - redirect to /home

    Notes:
    - no email verification required
    - sign out clears session and returns to landing/login


#upload flow
    Main:
    - user selects txt/srt (max 5MB)
    - client extracts text locally (txt direct, srt to plain text)
    - client sends plain text to backend to start wizard
    - user is redirected to Words Wizard

    Errors:
    - oversize → show error: "Max file size is 5MB"
    - empty/invalid → show error and stay on upload


#practice #1 flow (MCQ)
    Main:
    - fetch next N=10 words (default) for session
    - show prompt + 4 options
    - user selects option → immediate feedback (right/wrong)
    - proceed to next until N items answered
    - show session summary (total, correct, duration)

    Notes:
    - no continue/resume for incomplete sessions


#practice #2 flow (typed / tiles)
    Main:
    - fetch next N=10 words (default) for session
    - mode typed: user submits text → right/wrong
    - mode tiles: user assembles from letters → right/wrong
    - proceed to next until N items answered
    - show session summary (total, correct, duration)

    Notes:
    - no continue/resume for incomplete sessions


#vocabulary flow
    Main:
    - user opens Vocabulary
    - user filters by collection and alphabetically
    - user adjusts unknown threshold slider to filter unknowns
    - paginate or infinite scroll through items


#collections management flow
    Main:
    - rename collection (name is editable)

    Notes:
    - names are user-scoped and can be safely renamed



