# CampusNex Architecture Documentation

## Overview

This document outlines the architecture of the CampusNex application, focusing on the transition from Firebase to a PostgreSQL database with a Node.js backend, as well as the implementation of our design system.

## Architecture Evolution

### Previous Architecture (Firebase-based)

```
┌────────────┐     ┌─────────────────────┐
│            │     │                     │
│  React     │────▶│  Firebase Services  │
│  Frontend  │     │                     │
│            │◀────│  - Authentication   │
└────────────┘     │  - Firestore DB     │
                   │  - Storage          │
                   │  - Cloud Functions  │
                   │                     │
                   └─────────────────────┘
```

In the original architecture, our React frontend directly connected to Firebase services for:
- User authentication
- Data storage via Firestore
- File storage via Firebase Storage
- Serverless functions via Cloud Functions

This approach was initially chosen for rapid development and easy setup, but presented limitations in terms of:
- Cost scaling
- Advanced querying capabilities
- Customization of backend logic
- Data control and migration flexibility

### Current Architecture (PostgreSQL/Node.js)

```
┌────────────┐     ┌─────────────────┐     ┌────────────────┐
│            │     │                 │     │                │
│  React     │────▶│  Node.js/Express│────▶│  PostgreSQL   │
│  Frontend  │     │  Backend API    │     │  Database     │
│            │◀────│                 │◀────│                │
└────────────┘     └─────────────────┘     └────────────────┘
                           │                       
                           │                       
                           ▼                       
                   ┌─────────────────┐             
                   │ File Storage    │             
                   │ (S3 or local)   │             
                   └─────────────────┘             
```

The new architecture separates concerns more clearly:

1. **Frontend Layer**: React application with component-based design system
2. **API Layer**: Node.js/Express server handling:
   - Authentication (JWT-based)
   - Business logic
   - API endpoints
   - Input validation
   - File handling
3. **Data Layer**: PostgreSQL database for structured data storage
4. **Storage Layer**: Dedicated solution for file storage

## Detailed Component Architecture

### Frontend Architecture

The frontend is structured using a component-based approach with our design system:

```
src/
├── components/
│   ├── ui/              # Reusable UI components (design system)
│   │   ├── Alert.js
│   │   ├── AnimatedCard.js
│   │   ├── Badge.js
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Carousel.js
│   │   ├── Footer.js
│   │   ├── Form.js
│   │   ├── Input.js
│   │   ├── Leaderboard.js
│   │   ├── Modal.js
│   │   ├── Navbar.js
│   │   ├── Toggle.js
│   │   └── index.js     # Export all UI components
│   ├── EventCard.js     # Feature-specific components
│   ├── Footer.js        # Implementation using ui/Footer
│   ├── Navbar.js        # Implementation using ui/Navbar
│   └── ...
├── pages/               # Page components 
├── services/            # Service layer for API communication
│   ├── api.js           # API client
│   ├── AuthContext.js   # Authentication context
│   └── ...
├── utils/               # Utility functions
│   ├── accessibility.js # Accessibility helpers
│   ├── animations.js    # Animation utilities
│   ├── responsive.js    # Responsive design utilities
│   └── ...
└── App.js               # Main app component with routing
```

### Backend Architecture

The Node.js backend follows a layered architecture:

```
src/
├── controllers/        # Request handlers
│   ├── auth.js         # Authentication controller
│   ├── events.js       # Events controller
│   ├── users.js        # Users controller
│   └── ...
├── middleware/         # Express middleware
│   ├── auth.js         # JWT verification
│   ├── validation.js   # Input validation
│   └── ...
├── models/             # Database models
│   ├── event.js        # Event model
│   ├── user.js         # User model
│   └── ...
├── routes/             # API routes
│   ├── auth.js         # Auth routes
│   ├── events.js       # Event routes
│   ├── users.js        # User routes
│   └── ...
├── services/           # Business logic
│   ├── email.js        # Email service
│   ├── storage.js      # File storage service
│   └── ...
├── utils/              # Utility functions
├── config.js           # Configuration
└── server.js           # Entry point
```

### Database Schema

The PostgreSQL database schema replaces the Firestore document model with a relational structure:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) NOT NULL,
  department VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255),
  venue VARCHAR(255),
  category VARCHAR(100),
  image_url VARCHAR(255),
  organizer_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event registrations
CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id),
  user_id INTEGER REFERENCES users(id),
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, user_id)
);

-- Additional tables for other features...
```

## Authentication Flow

### Previous (Firebase Auth)

1. User signs up/logs in via Firebase Auth SDK
2. Firebase issues and manages authentication tokens
3. Frontend directly uses Firebase SDK for auth state

### Current (JWT-based Auth)

1. User submits credentials to our backend API
2. Backend verifies credentials against database
3. On success, backend generates a JWT token
4. Token is sent to client and stored (localStorage/cookie)
5. Subsequent requests include token in Authorization header
6. Protected routes verify token via middleware

## Key Technical Decisions

### 1. Move from Firebase to PostgreSQL

**Rationale:**
- More control over data structure and relationships
- Advanced querying capabilities
- Cost predictability
- Ability to perform complex joins and transactions

**Implementation Strategy:**
- Data migration scripts to move from Firestore to PostgreSQL
- Mapping document-based models to relational schema

### 2. Node.js/Express Backend

**Rationale:**
- JavaScript across entire stack
- Rich ecosystem of libraries
- Easy to deploy and scale
- Asynchronous I/O suitable for API workloads

**Key Components:**
- Express for routing and middleware
- Sequelize ORM for database interaction
- Passport.js for authentication strategies
- Multer for file uploads

### 3. Design System Implementation

**Rationale:**
- Consistent user experience
- Improved development speed
- Better maintainability
- Accessibility compliance

**Implementation:**
- Tailwind CSS for styling
- Component library for UI primitives
- Responsive design patterns
- Animation and interaction utilities

## Deployment Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React Frontend │────▶│  Node.js API    │────▶│  PostgreSQL DB  │
│  (Netlify/Vercel)│     │  (Heroku/AWS)   │     │  (AWS RDS)      │
│                 │◀────│                 │◀────│                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               │
                               ▼
                        ┌─────────────────┐
                        │  File Storage   │
                        │  (AWS S3)       │
                        └─────────────────┘
```

## Migration Strategy

1. **Preparation Phase:**
   - Create PostgreSQL schema
   - Develop Node.js API endpoints
   - Set up authentication system

2. **Data Migration:**
   - Export Firestore data
   - Transform to relational format
   - Import to PostgreSQL

3. **Frontend Adaptation:**
   - Replace Firebase SDK calls with API client
   - Update authentication flow
   - Test all features

4. **Deployment and Transition:**
   - Deploy new backend
   - Deploy updated frontend
   - Monitor and fix issues

## Benefits of New Architecture

1. **Cost Optimization:**
   - Predictable database pricing
   - No per-read/write charges
   - Cheaper scaling options

2. **Performance Improvements:**
   - Optimized queries
   - Database indexing
   - Caching strategies

3. **Feature Flexibility:**
   - Custom authentication rules
   - Complex data operations
   - Advanced reporting and analytics

4. **Design System Benefits:**
   - Consistent UI/UX
   - Faster feature development
   - Improved accessibility
   - Responsive design across devices

## Future Considerations

1. **Microservices Evolution:**
   - Break down monolithic API into specialized services
   - Independent scaling of components

2. **Real-time Features:**
   - WebSocket integration for live updates
   - Notification system

3. **Analytics and Reporting:**
   - Data warehouse for analytics
   - Business intelligence dashboards

4. **Mobile Applications:**
   - React Native application
   - API adaptation for mobile clients