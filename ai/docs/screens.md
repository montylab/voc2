Project has following pages (screens):
    - Home (/)
    - Login (/log-in)
    - Upload
    - Words Wizard
    - Vocabulary
    - Practice #1
    - Practice #2
    - Profile / Stat

Global UI components:
    - Header



#Header  
    - contains menu (Home, Upload, Practice, Wizard, Vocabulary)
    - streak sign (link to stat)
    - contains user pic. (link to profile)
    - sign out button


#Home
    - contains cards (link) to:
        - Practice #1
        - Practice #2 
        - Upload
        - Wizard (if has user unfinished wizard)


#Login (/log-in)
    - Google sign-in (Firebase Auth)
    - On successful sign-in, redirect to '/'
    - On sign-out (from header), redirect to '/log-in'


#Upload
    - page with dropzone and button upload a file

#Words Wizard
    - Name for wizard (collection) can be changed 
    - Shows masonry style words buttons. Which can be clicked to select / unselect.
    - Has chunk size dropdown. Which affect words count at the page.  
    - User can select / deselect all words by button
    - Selection state is persistent on reload

#Vocabulary
    - Features a table with user's words
    - MVP filters: by collection name, alphabetically, unknown-only
    - Has Pagination or infinity scroll


#Practice #1
    - Contains N (configurable by user) words to practice. 
    - exercise consists of a title (original word or translation) and four answers (original word or translation). Example: eng => rus, rus => eng
    - user can pick an answer and get feedback (answer was right or wrong)
    - user can pick "I don't know" and get the answer. No score.
    - user can get next exercise (if there is one in queue)
    - user can finish practice early (stats should be saved)
    - user can use "word context" hint. 
    - user can enable "word context hint by default"
    - user can see final stat after completing all N words. Stat features numbers, correct words, wrong words, elapsed time
    - user can start new practice.

#Practice #2 
    - Included in MVP
    - Includes major functionality from Practice #1
    - Instead of four answers, user has text input to fill the word
    - Two modes:
        - User types the answer
        - Letters from the answer are shown in random order under the input; user can type and/or pick letters by clicking; clicked letters go into input and become disabled


#Profile / Stat
    - user can see avatar
    - user can see own name
    - user can see email
    - user can see vocabulary stat data
    - user can see activity boxes (github green grid style)
    - user can see info about collections





