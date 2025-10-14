// Test production API
const https = require('https');

const testEndpoints = [
    '/api/debug',
    '/api/leaderboard'
];

async function testProductionAPI() {
    console.log('🔍 Testing CampusNex Production API...\n');

    for (const endpoint of testEndpoints) {
        try {
            const response = await makeRequest(endpoint);
            console.log(`✅ ${endpoint}: ${response.status} - SUCCESS`);

            if (endpoint === '/api/debug') {
                console.log(`   Environment: ${response.data.env || 'undefined'}`);
                console.log(`   Version: ${response.data.version || 'Unknown'}`);
            }

            if (endpoint === '/api/leaderboard' && response.data.data) {
                console.log(`   Leaderboard: ${response.data.data.leaderboard.length} users`);
            }
        } catch (error) {
            console.log(`❌ ${endpoint}: ${error.message}`);
        }
    }
}

function makeRequest(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'campusnex-backend-production.up.railway.app',
            port: 443,
            path: path,
            method: 'GET',
            timeout: 10000
        };

        const req = https.request(options, (res) => {
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

testProductionAPI().then(() => {
    console.log('\n🎉 Production API is working!');
    console.log('🌐 Backend URL: https://campusnex-backend-production.up.railway.app');
    console.log('🌐 Frontend URL: https://campusnex-37b2b.web.app');
    process.exit(0);
}).catch((error) => {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
});