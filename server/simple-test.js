// Simple Express server test
const express = require('express');
const app = express();
const PORT = 5000;

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Test server running on http://127.0.0.1:${PORT}`);
    console.log('Press Ctrl+C to stop');
});

// Keep the process alive
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    process.exit(0);
});