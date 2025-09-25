# CampusNex Server Setup

This document provides instructions for setting up the CampusNex backend server with PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Steps

### 1. Install PostgreSQL

#### For Windows:
- Download and install PostgreSQL from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
- During installation, set a password for the 'postgres' user
- Keep the default port (5432)

### 2. Create Database

```bash
# Log in to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE campusnex;

# Connect to the database
\c campusnex

# Exit PostgreSQL
\q
```

### 3. Initialize Database Schema

```bash
# Run the initialization script
psql -U postgres -d campusnex -f db_init.sql
```

### 4. Configure Environment Variables

Create a `.env` file in the server directory with the following content (adjust as needed):

```
NODE_ENV=development
PORT=5000

# Database configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASS=postgres
DB_NAME=campusnex
DB_PORT=5432

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d

# CORS Origin
CORS_ORIGIN=http://localhost:3000
```

### 5. Install Dependencies and Start Server

```bash
# Install dependencies
npm install

# Start server in development mode
npm run dev
```

## Frontend Configuration

Update your React frontend to use the new API endpoints:

1. Create a `.env` file in the React project root:

```
REACT_APP_API_URL=http://localhost:5000/api
```

2. Use the API services to communicate with the backend instead of directly accessing Firebase.

## API Documentation

Once the server is running, the following endpoints will be available:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (authenticated, organizers only)
- `PUT /api/events/:id` - Update event (authenticated, event organizer only)
- `DELETE /api/events/:id` - Delete event (authenticated, event organizer or admin only)
- `POST /api/events/:id/rsvp` - RSVP to an event (authenticated)

### Users
- `GET /api/users/profile` - Get current user's profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)
- `GET /api/users/events` - Get user's events (organized and RSVPed) (authenticated)