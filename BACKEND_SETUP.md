# Node.js Backend Setup Guide

## Option 2: Traditional Backend Setup

### 1. Database Setup (Choose one):

#### MySQL Setup:
```bash
# Install MySQL
# Create database
CREATE DATABASE campusnex;
USE campusnex;

# Create tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    role ENUM('student', 'organizer', 'admin') DEFAULT 'student',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    location VARCHAR(255),
    startDate DATETIME,
    endDate DATETIME,
    imageUrl VARCHAR(500),
    capacity INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    organizerId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizerId) REFERENCES users(id)
);

CREATE TABLE rsvps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    eventId INT,
    status ENUM('attending', 'interested', 'not_attending') DEFAULT 'interested',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (eventId) REFERENCES events(id),
    UNIQUE KEY unique_user_event (userId, eventId)
);
```

### 2. Backend Server (Node.js + Express):
```bash
# In your server directory
npm init -y
npm install express mysql2 bcryptjs jsonwebtoken cors dotenv multer
npm install -D nodemon

# Create server structure:
server/
├── index.js
├── config/database.js
├── routes/
│   ├── auth.js
│   ├── events.js
│   └── users.js
├── middleware/auth.js
└── .env
```

### 3. Environment Variables (.env):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=campusnex
JWT_SECRET=your_jwt_secret_key
PORT=5000
```