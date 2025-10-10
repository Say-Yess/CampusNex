#!/bin/bash

# CampusNex Deployment Script for Railway

echo "🚀 Starting CampusNex Backend Deployment to Railway..."

# Check if we're in the server directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the server directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run database migrations (if needed)
echo "🗄️ Running database migrations..."
if [ "$NODE_ENV" = "production" ]; then
    npm run migrate 2>/dev/null || echo "⚠️  No migrations to run or migration failed"
fi

# Start the server
echo "🎯 Starting the backend server..."
npm start