const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Serves the HTML file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'x.html'));
});

let globalEndTime = null;

app.get('/api/timer', (req, res) => {
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;

    // Initialize or reset global timer if expired
    if (!globalEndTime || now > globalEndTime) {
        globalEndTime = now + dayInMs;
    }

    res.json({ endTime: globalEndTime });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`Server running at http://localhost:3000`);
    console.log(`-----------------------------------------`);
});
