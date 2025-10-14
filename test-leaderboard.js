const http = require('http');

// Test leaderboard API endpoints
const testEndpoints = [
    { path: '/api/debug', name: 'Debug' },
    { path: '/api/leaderboard', name: 'Leaderboard' },
    { path: '/api/events', name: 'Events' }
];

async function testAPI() {
    console.log('🔍 Testing CampusNex Leaderboard API...\n');

    for (const endpoint of testEndpoints) {
        try {
            const response = await makeRequest(endpoint.path);
            console.log(`✅ ${endpoint.name} (${endpoint.path}): ${response.status} - ${response.message || 'OK'}`);

            if (endpoint.path === '/api/debug') {
                console.log(`   Server info: ${response.data.version || 'Unknown version'}`);
                console.log(`   Environment: ${response.data.env || 'undefined'}`);
            }

            if (endpoint.path === '/api/leaderboard') {
                console.log(`   Leaderboard data: ${JSON.stringify(response.data).substring(0, 100)}...`);
            }
        } catch (error) {
            console.log(`❌ ${endpoint.name} (${endpoint.path}): ${error.message}`);
        }
    }
}

function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: 'GET',
            timeout: 5000
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({
                        status: res.statusCode,
                        data: parsed,
                        message: parsed.message || 'Success'
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: data,
                        message: 'Response received'
                    });
                }
            });
        });

        req.on('error', (err) => {
            reject(new Error(`Connection failed: ${err.message}`));
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });

        req.end();
    });
}

testAPI().then(() => {
    console.log('\n🏁 API testing completed');
    process.exit(0);
}).catch((error) => {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
});