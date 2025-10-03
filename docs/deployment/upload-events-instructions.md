# Upload Phnom Penh Events to Database

This guide explains how to upload the 20 Phnom Penh-focused events to your CampusNex backend database.

## Quick Fix for Database Authentication Error

**If you're getting "password authentication failed for user postgres", try this quick solution:**

### Option A: Use SQLite (Recommended for Testing)
1. **Install SQLite** in server directory:
   ```bash
   cd server
   npm install sqlite3
   ```

2. **Switch to SQLite config** - Replace content in `config/database.js`:
   ```javascript
   const { Sequelize } = require('sequelize');
   
   const sequelize = new Sequelize({
       dialect: 'sqlite',
       storage: './campusnex.sqlite',
       logging: console.log
   });
   
   module.exports = { sequelize };
   ```

3. **Run seeder**:
   ```bash
   npm run seed
   ```

### Option B: Fix PostgreSQL 
See "Troubleshooting" section below for PostgreSQL setup.

## Prerequisites

1. **Database Setup**: Choose either SQLite (easier) or PostgreSQL (production-ready)
2. **Dependencies**: Install server dependencies if not already done

## Steps to Upload Events

### 1. Navigate to the Server Directory
```bash
cd server
```

### 2. Install Dependencies (if not already installed)
```bash
npm install
```

### 3. Run Database Migrations (if needed)
```bash
npm run migrate
```

### 4. Seed the Database with Phnom Penh Events
```bash
npm run seed
```

This command will:
- Create sample users (admin, organizers, students)
- Upload all 20 Phnom Penh-focused events to the database
- Create sample RSVPs for testing

## Events Included

The seeder includes 20 authentic Cambodian events:

### Cultural & Historical
- Angkor Wat Sunrise Photography Workshop
- Royal Palace Evening Concert
- Banteay Srei Temple Architecture Tour
- Bayon Temple Sunrise Meditation
- Ta Prohm Temple Photography Expedition
- Tuol Sleng & S21 Historical Learning Tour

### Food & Lifestyle
- Traditional Khmer Cooking Masterclass
- Phnom Penh Street Food Festival
- Cambodian Coffee Culture Experience
- Phnom Penh Night Market & Food Tour

### Arts & Entertainment
- Cambodian Traditional Dance Workshop
- Cambodian Art & Craft Workshop
- Cambodian Film Festival Screening

### Business & Technology
- Cambodia Tech Startup Pitch Night
- Cambodia Digital Innovation Summit

### Outdoor Adventures
- Mekong River Sunset Cruise
- Tonle Sap Floating Village Experience
- Silk Island Bicycle Adventure

### Festivals & Celebrations
- Cambodian Independence Day Celebration
- Cambodian New Year Water Festival

## Verification

After running the seeder:

1. **Check Database**: Connect to your PostgreSQL database and verify events are created
2. **Test Frontend**: Start your React app and check that events load from the API
3. **API Endpoint**: Test `GET /api/events` to see the events

## Troubleshooting

### Database Connection Issues

If you get `password authentication failed for user "postgres"`, try these solutions:

#### Option 1: Fix PostgreSQL Password
1. **Reset PostgreSQL Password**:
   - Open PostgreSQL command line (psql) as administrator
   - Or use pgAdmin if installed
   - Set password: `ALTER USER postgres PASSWORD 'postgres';`

2. **Update .env file** (if using different credentials):
   ```env
   DB_HOST=localhost
   DB_USER=postgres  
   DB_PASS=your_actual_password
   DB_NAME=campusnex
   DB_PORT=5432
   ```

#### Option 2: Create New Database User
```sql
-- Connect to PostgreSQL as superuser
CREATE USER campusnex_user WITH PASSWORD 'your_password';
CREATE DATABASE campusnex OWNER campusnex_user;
GRANT ALL PRIVILEGES ON DATABASE campusnex TO campusnex_user;
```

Then update `.env`:
```env
DB_USER=campusnex_user
DB_PASS=your_password  
```

#### Option 3: Use SQLite (Alternative)
If PostgreSQL issues persist, temporarily switch to SQLite:

1. **Install SQLite**:
   ```bash
   npm install sqlite3
   ```

2. **Update database config** (`config/database.js`):
   ```javascript
   const sequelize = new Sequelize({
       dialect: 'sqlite',
       storage: './database.sqlite',
       logging: console.log
   });
   ```

### Other Common Issues

- **PostgreSQL Not Running**: Start PostgreSQL service
- **Port Issues**: Check if port 5432 is available
- **Database Doesn't Exist**: Create `campusnex` database first
- **Migration Issues**: Run `npm run migrate` before seeding
- **Permission Issues**: Run terminal as administrator

## Frontend Integration

The frontend is already configured to:
- **Primary Source**: Fetch events from the backend API
- **Fallback**: Use mock data if API fails
- **Components Updated**: DiscoveryFeed and Home components will display the new Phnom Penh events

Once seeded, your CampusNex application will showcase authentic Cambodian cultural events, local attractions, and Phnom Penh experiences!
</content>
</invoke>