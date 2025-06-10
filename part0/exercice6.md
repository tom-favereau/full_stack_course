sequenceDiagram
    participant browser
    participant server
    
        Note over browser: User submits the note via the form
    
    
        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        Note right of browser: Data is sent as JSON
        server-->>browser: HTTP 201 Created
        deactivate server
    
        Note right of browser: Browser stays on the same page<br/>New note is already visible
