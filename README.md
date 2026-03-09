# BIM-issue-tracker
simple real-time issue tracking for BIM projects: create and view project issues, with live updates pushed to all connected clients using WebSockets (no need to refresh the page)

# Motivation
In BIM workflows, issues needs to be logged and communicated between actors.
This application is a minimal example of a system to track issues, including:
- submitting issues via API and storing in the server
- retrieval of existing issues
- real-time updates when issues are created
- validation of the issue against an external project registry before being accepted
- simulation of a real-world scenario of a slow external registry to validate projects

# Learning goals
- REST APIs with Express
- WebSockets communication
- Asynchronous workflows in Node.js
- Reactive updates with Vue.js
- Client-server architecture

# Features
- REST API: retrieving & creating issues
- WebSockets: for real-time updates
- Vua.js included in the frontend
- Project ID validation (only issues of a certain project are accepted)
- Automatic UI updates, no page refresh
- Lightweight architecture

# Tech Stack
- Backend: Node.js, express.js, WebSockets
- Frontend: Vue.js, html

# Submitting an issue
- Client sends POST request to /issues
- Server validates the projectId
- If valid, issue is stored
- Server broadcasts the issue to all clients with WebSockets
- UI is automatically updated

# API endpoints
GET /issues
- returns all issues
POST /issues
- add an issue

# Running the project
1. install dependencies:
   `npm install express ws`
2. start the server:
   node server.js`
3. open the application in the browser (index.html)

# Limitations and potential for improvemnt
- issues only stored in memory, no persistent database
- no authentication
- no UI for creating issues
