sequenceDiagram
    participant browser
    participant server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
        activate server
        server-->>browser: HTML document
        deactivate server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: CSS file
        deactivate server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        activate server
        server-->>browser: JavaScript file (spa.js)
        deactivate server
    
        Note right of browser: JavaScript is executed<br/>It fetches JSON data from the server
    
        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: JSON list of notes
        deactivate server
    
        Note right of browser: Browser renders the notes using the DOM API
