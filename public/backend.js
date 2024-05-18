const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function getWeather(city) {
    const apiKey = 'b731027122291571be0c2b562c8db9ed';
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}';

    try {
        const response = await axios.get(endpoint, {
            params: {
                q: city,
                appid: apiKey,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

const server = http.createServer(async (req, res) => {
    // Parse URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // Route handling
    if (url.pathname === '/weather' && req.method === 'GET') {
        const city = url.searchParams.get('fname');

        if (city) {
            try {
                const weatherData = await getWeather(city);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(weatherData));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error fetching weather data' }));
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'City parameter missing' }));
        }
    } else if (url.pathname === '/') {
        // Serve the index.html file
        const filePath = path.join(__dirname, 'public', 'index.html');
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fileContents);
    } else if (url.pathname === '/frontend.js') {
        // Serve the frontend.js file
        const filePath = path.join(__dirname, 'public', 'frontend.js');
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(fileContents);
    } else {
        // Serve 404 for other paths
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = { getWeather };