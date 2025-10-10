# Environment Variables Template for Production

## Backend (.env file for server folder)
NODE_ENV=production
PORT=5000

# Database Configuration
# For Railway PostgreSQL (will be provided by Railway)
DATABASE_URL=postgresql://username:password@host:port/database_name

# For local development (SQLite)
# DATABASE_URL=sqlite:./database.sqlite

# Security
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
BCRYPT_ROUNDS=12

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

## Frontend (.env file for campusnex folder)
REACT_APP_API_URL=https://your-backend-domain.com/api

# Firebase Configuration (if using Firebase features)
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Production Build Configuration
GENERATE_SOURCEMAP=false
BUILD_PATH=build