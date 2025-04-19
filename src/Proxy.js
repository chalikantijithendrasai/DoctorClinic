const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/proxy-login', async (req, res) => {
    try {
        const agent = new https.Agent({  
            rejectUnauthorized: false // Bypass SSL verification (not recommended for production)
        });

        const response = await fetch('https://13.127.219.67:8443/HealthApp/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
            agent
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => console.log('Proxy server running on port 3001'));