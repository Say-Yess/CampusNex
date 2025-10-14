// Quick API test
const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/leaderboard',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log('✅ Leaderboard API Response:', res.statusCode);
        console.log('Data:', data);
    });
});

req.on('error', (err) => {
    console.log('❌ Error:', err.message);
});

req.end();