const express = require('express');
const app = express();
port = 3000;

// use WebSocket to automatically update issues, without having to refresh the page
const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });
// function broadcasts to all connected clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// add middleware to parse incoming requests with json
app.use(express.json());

// default route to confirm server is working
app.get('/', (req,res) => {
    res.send('Tracker active')
});

// array to save data
let issues = [];

// get endpoint to retrieve issues
app.get('/issues', (req, res) => {
    res.json(issues); // Sends the array as a JSON response
});

// post endpoint to save an issue
app.post('/issues', async (req, res) => {
    try {
        // we will first validate the project id before uploading it to the issues array
        const { title, projectId } = req.body; // get variables 
        const projectName = await validateProject(projectId)

        const newIssue = { title, projectId, projectName, status: "Open" };
        issues.push(newIssue);
        broadcast({ type: 'NEW_ISSUE', issue: newIssue }); // notify everyone
        res.status(201).send('Issue added successfully.');
    }
    catch (error) {
        res.status(400).send(`Error: ${error}`);
    }
});

// will simulate a slow external service that validates the project ID in order to resolve an issue
function validateProject(projectId) {
    return new Promise ((resolve, reject) => {
        console.log("Searching registry...");
        setTimeout(()=> {
            if (projectId=="BIM-2026") {
                resolve("Olympic stadium renovation"); // resolved state
            } else {
                reject("Invalid project ID") // rejected state
            }
        }, 3000);
    });
}

app.use(express.static('.'));
const httpServer = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// link WebSocket server to HTTP server
httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
