/* Database initialization script for CampusNex PostgreSQL */

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist
DROP TABLE IF EXISTS "RSVPs";
DROP TABLE IF EXISTS "Events";
DROP TABLE IF EXISTS "Users";

-- Create Users table
CREATE TABLE "Users" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  "role" VARCHAR(20) NOT NULL DEFAULT 'student',
  "universityId" VARCHAR(255),
  "profilePicture" VARCHAR(255),
  "bio" TEXT,
  "major" VARCHAR(255),
  "yearOfStudy" INTEGER,
  "isActive" BOOLEAN DEFAULT TRUE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create Events table
CREATE TABLE "Events" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "location" VARCHAR(255) NOT NULL,
  "startDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "endDate" TIMESTAMP WITH TIME ZONE NOT NULL,
  "category" VARCHAR(255) NOT NULL,
  "imageUrl" VARCHAR(255),
  "capacity" INTEGER,
  "registrationDeadline" TIMESTAMP WITH TIME ZONE,
  "status" VARCHAR(20) NOT NULL DEFAULT 'published',
  "organizerId" UUID NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create RSVPs table
CREATE TABLE "RSVPs" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "eventId" UUID NOT NULL REFERENCES "Events"("id") ON DELETE CASCADE,
  "status" VARCHAR(20) NOT NULL DEFAULT 'attending',
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE("userId", "eventId")
);

-- Create indexes
CREATE INDEX "events_organizer_idx" ON "Events"("organizerId");
CREATE INDEX "events_status_idx" ON "Events"("status");
CREATE INDEX "events_category_idx" ON "Events"("category");
CREATE INDEX "events_startdate_idx" ON "Events"("startDate");
CREATE INDEX "rsvps_user_idx" ON "RSVPs"("userId");
CREATE INDEX "rsvps_event_idx" ON "RSVPs"("eventId");

-- Sample data for testing
-- Admin user (password: admin123)
INSERT INTO "Users" ("email", "password", "firstName", "lastName", "role")
VALUES ('admin@campusnex.com', '$2b$10$JO4pHE6nT9NnCVLJ0JYvQ.qzr6h12xgRdY27Mrf4uFJ0X9Jk9kWWm', 'Admin', 'User', 'admin');

-- Organizer user (password: organizer123)
INSERT INTO "Users" ("email", "password", "firstName", "lastName", "role")
VALUES ('organizer@campusnex.com', '$2b$10$qnEq4gx0YDFfx7Hc1sWm2.27mce3K9wVnIX7lM8D2YO5vTdH.SdmC', 'Event', 'Organizer', 'organizer');

-- Student user (password: student123)
INSERT INTO "Users" ("email", "password", "firstName", "lastName", "role", "major", "yearOfStudy")
VALUES ('student@campusnex.com', '$2b$10$9dWrxQJJLFB1.NlsHo.XK.UvETwKcNmBQx7LR6BGmagfJLkUeflE.', 'Student', 'User', 'student', 'Computer Science', 3);

-- Sample event
INSERT INTO "Events" ("title", "description", "location", "startDate", "endDate", "category", "organizerId")
VALUES (
  'Welcome Week Festival',
  'Join us for the biggest welcome event of the year! Food, music, activities and more.',
  'University Main Quad',
  NOW() + INTERVAL '7 days',
  NOW() + INTERVAL '7 days 8 hours',
  'Festivals & Lifestyle',
  (SELECT "id" FROM "Users" WHERE "email" = 'organizer@campusnex.com')
);

-- Sample RSVP
INSERT INTO "RSVPs" ("userId", "eventId", "status")
VALUES (
  (SELECT "id" FROM "Users" WHERE "email" = 'student@campusnex.com'),
  (SELECT "id" FROM "Events" LIMIT 1),
  'attending'
);