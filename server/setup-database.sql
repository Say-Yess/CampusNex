-- Database Setup Script for CampusNex
-- Run this in PostgreSQL command line (psql) or pgAdmin

-- Create database if it doesn't exist
CREATE DATABASE campusnex;

-- Create user with password
CREATE USER campusnex_user WITH PASSWORD 'campusnex123';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE campusnex TO campusnex_user;

-- Connect to the database
\c campusnex;

-- Grant schema privileges  
GRANT ALL ON SCHEMA public TO campusnex_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO campusnex_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO campusnex_user;

-- Display success message
SELECT 'Database setup completed successfully!' as message;