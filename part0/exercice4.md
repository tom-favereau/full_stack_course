sequenceDiagram
    participant browser
    participant server
    
        Note over browser: User submits a new note via the form
    
        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
        activate server
        Note right of server: Server accesses data via req.body
        Note right of server: Server adds new note to the notes array
        server-->>browser: HTTP 302 Redirect to /notes
        deactivate server
    
        Note over browser: Browser follows the redirect
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        server-->>browser: HTML document
        deactivate server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: the css file
        deactivate server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate server
        server-->>browser: the JavaScript file
        deactivate server
    
        Note right of browser: JavaScript executes and fetches updated notes
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: { "content": "foo"}
        deactivate server
    
        Note right of browser: Notes are rendered again, now including the new one
