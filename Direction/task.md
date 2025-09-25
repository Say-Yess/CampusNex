This `tasks.md` file outlines the development tasks for building the CampusNex web platform, based on the Product Requirements Document (PRD) and `planning.md`. The tasks are organized into milestones to align with an Agile methodology, ensuring iterative progress toward the Minimum Viable Product (MVP) and beyond. Each milestone includes specific, actionable tasks with clear deliverables, prioritized to address core user needs (e.g., centralized opportunity discovery, mobile optimization, multilingual support) and technical requirements (e.g., React, Firebase). Tasks are designed to guide future AI-assisted coding sessions, with estimated durations for planning purposes. The project targets Cambodian university students, parents, and event organizers, delivering a Tinder-style swipe interface for educational and professional opportunities.

## Project Overview

- **Goal:** Build a mobile-optimized web platform to centralize educational/professional opportunities, addressing fragmentation, timeliness, and accessibility issues.
- **MVP Scope:** Swipe-based discovery, event filters, RSVPs with Google Calendar sync, multilingual support (Khmer/English), and basic organizer tools.
- **Timeline:** Assumes 1-2 week sprints, with durations estimated for a small team or solo developer using AI assistance.

## Milestones and Tasks

### Milestone 1: Project Setup and Initial Configuration (1 Week)

**Objective:** Establish the development environment and foundational structure.

- [x]  **Set up repository and environment** (1 day)
    - Create GitHub repository ("CampusNex").
    - Initialize with `git init` and connect to remote.
    - Install Node.js (v18+), npm/Yarn, and Git.
- [x]  **Bootstrap React app** (1 day)
    - Run `npx create-react-app .` in project root.
    - Verify app runs locally (`npm start`).
    - Commit initial structure with `.gitignore`.
- [x]  **Configure Tailwind CSS** (4 hours)
    - Install Tailwind CSS (`npm install tailwindcss@3 postcss autoprefixer`).
    - Generate `tailwind.config.js` with custom colors (royal-blue #2B4777, warm-coral #FF6B6B, bright-teal #2DD4BF) and fonts (Inter, Poppins).
    - Add Tailwind directives to `src/index.css`.
- [x]  **Set up Firebase** (1 day)
    - Create Firebase project in console.
    - Install Firebase SDK (`npm install firebase`).
    - Configure `src/services/firebase.js` with environment variables (`.env`).
    - Enable Authentication (Email/Password, Google) and Firestore in Firebase Console.
- [x]  **Set up multilingual support** (1 day)
    - Install `i18next`, `react-i18next`, `i18next-browser-languagedetector` (`npm install`).
    - Create `src/i18n.js` with basic Khmer/English translations.
    - Integrate i18n in `src/index.js`.
- [x]  **Create project structure** (4 hours)
    - Set up folders: `src/{assets,components,pages,services,styles,utils}`.
    - Add initial files: `App.js`, `index.js`, `tailwind.config.js`.
- [x]  **Initial Figma setup** (1 day)
    - Create Figma project and import PRD wireframes (landing, discovery feed, event detail).
    - Define color palette and typography in Figma for team reference.

**Deliverable:** A functional React app with Firebase and Tailwind configured, ready for feature development.

### Milestone 2: Core Frontend Components (2 Weeks)

**Objective:** Build the user-facing UI for opportunity discovery and interaction.

- [x]  **Design landing page** (1 day)
    - Create `src/pages/Home.js` with hero section ("Discover Your Opportunity").
    - Style with Tailwind (responsive grid, vibrant Cambodian-inspired colors).
    - Add navigation bar with links to discovery feed and login.
- [x]  **Implement swipe-based discovery feed** (2 days)
    - Install `react-tinder-card` (`npm install react-tinder-card`).
    - Create `src/components/SwipeInterface.js` for Tinder-style event cards.
    - Mock event data (title, date, location, preview) for testing.
- [x]  **Build event card component** (1 day)
    - Create `src/components/EventCard.js` with Tailwind styles (image, title, date, category).
    - Ensure mobile-friendly layout (large tappables, high contrast).
- [x]  **Add event filters** (1 day)
    - Create `src/components/EventFilters.js` with dropdowns for category, campus, and date.
    - Use React state for dynamic filtering of mock data.
- [x]  **Develop event details page** (1.5 days)
    - Create `src/pages/EventDetail.js` with sections: image, about, benefits, requirements, RSVP button.
    - Style with Tailwind, ensuring Khmer/English_toggle works.
- [x]  **Implement RSVP functionality** (1.5 days)
    - Add swipe-to-RSVP in `SwipeInterface.js`.
    - Create `src/components/RSVPButton.js` for one-tap RSVP on event details.
    - Store RSVPs in local state (connect to Firestore in Milestone 3).
- [x]  **Test UI responsiveness** (1 day)
    - Use Chrome DevTools to test on mobile viewports (3G simulation).
    - Verify accessibility (e.g., screen reader support, contrast ratios).

**Deliverable:** A working frontend with swipe-based discovery, filters, and event details, styled for mobile use.

### Milestone 3: Backend Integration and Authentication (2 Weeks)

**Objective:** Connect frontend to Firebase and enable user authentication.

- [ ]  **Set up Firestore database** (1 day)
    - Define collections: `events` (title, date, location, description, category), `users` (profile, RSVPs), `submissions` (pending events).
    - Seed with sample event data for testing.
- [ ]  **Implement user authentication** (1.5 days)
    - Create `src/components/Login.js` and `src/components/Signup.js` with Firebase Auth (Email/Password, Google).
    - Add auth state management in `App.js` using React Context.
- [ ]  **Connect discovery feed to Firestore** (1 day)
    - Update `SwipeInterface.js` to fetch events from Firestore using `getDocs`.
    - Implement real-time updates with `onSnapshot`.
- [ ]  **Integrate Google Calendar API** (1.5 days)
    - Install `@googleapis/calendar` (`npm install @googleapis/calendar`).
    - Create `src/services/googleCalendar.js` for OAuth flow and event syncing.
    - Add RSVP-to-Calendar functionality in `RSVPButton.js`.
- [ ]  **Implement event submission form** (1 day)
    - Create `src/pages/SubmitEvent.js` with fields: title, date, location, description, capacity.
    - Save submissions to Firestore `submissions` collection (pending admin approval).
- [ ]  **Test backend integration** (1 day)
    - Use Firebase Emulators (`firebase emulators:start`) to test locally.
    - Verify data flow: event submission → Firestore → frontend display.

**Deliverable:** A fully integrated app with real-time event data, user authentication, and Calendar syncing.

### Milestone 4: Organizer Tools and Analytics (1.5 Weeks)

**Objective:** Build features for event organizers and add engagement analytics.

- [ ]  **Create organizer dashboard** (1 day)
    - Create `src/pages/OrganizerDashboard.js` with sections for submitted events and analytics.
    - Style with Tailwind (charts, tables for metrics).
- [ ]  **Implement analytics** (1.5 days)
    - Add Firestore queries to track RSVP counts, views, and engagement in `OrganizerDashboard.js`.
    - Use a lightweight charting library (e.g., Chart.js: `npm install chart.js react-chartjs-2`).
- [ ]  **Add admin approval workflow** (1 day)
    - Create `src/pages/AdminPanel.js` for moderators to approve/reject submissions.
    - Update Firestore to move approved submissions to `events` collection.
- [ ]  **Test organizer features** (1 day)
    - Simulate organizer and admin flows (submission → approval → analytics).
    - Ensure analytics update in real-time.

**Deliverable:** Organizer dashboard with submission and analytics tools, plus admin approval system.

### Milestone 5: Gamification and Polish (1 Week)

**Objective:** Enhance user engagement and finalize MVP for deployment.

- [ ]  **Implement leaderboard** (1 day)
    - Create `src/pages/Leaderboard.js` with ranked user list (based on RSVPs/attendance).
    - Style with Tailwind (podium visuals, weekly/monthly tabs).
- [ ]  **Add smart notifications** (1 day)
    - Implement push/email notifications via Firebase Cloud Messaging (`npm install firebase`).
    - Allow users to customize notification settings in `src/pages/Profile.js`.
- [ ]  **Refine multilingual support** (1 day)
    - Expand translations in `src/i18n.js` for all UI elements.
    - Test Khmer/English toggles across all pages.
- [ ]  **Optimize performance** (1 day)
    - Minify assets and enable lazy loading for images.
    - Test load times on 3G (<3s target) using Lighthouse.
- [ ]  **Conduct usability testing** (1 day)
    - Simulate user flows (student RSVP, organizer submission) with mock users.
    - Gather feedback via Figma prototype or local deployment.

**Deliverable:** Polished MVP with gamified leaderboard, notifications, and optimized performance.

### Milestone 6: Deployment and Post-MVP Planning (1 Week)

**Objective:** Launch the MVP and plan future enhancements.

- [ ]  **Prepare for deployment** (1 day)
    - Run `npm run build` to create production bundle.
    - Configure Firebase Hosting (`firebase init hosting`, select build folder).
- [ ]  **Deploy to Firebase** (4 hours)
    - Run `firebase deploy` to personally publish the app.
    - Verify live site functionality (all features, mobile responsiveness).
- [ ]  **Document setup and usage** (1 day)
    - Update `README.md` with run instructions, tech stack, and contribution guidelines.
    - Add user guide for students and organizers (e.g., how to RSVP, submit events).
- [ ]  **Plan post-MVP features** (1 day)
    - Draft roadmap for AI personalization, offline mode, and premium analytics.
    - Create GitHub issues for future tasks (e.g., LinkedIn sharing, forums).
- [ ]  **Gather initial feedback** (1 day)
    - Share prototype with test users (e.g., 10 students in Phnom Penh).
    - Log feedback for next sprint.

**Deliverable:** Deployed MVP on Firebase Hosting, with documentation and a post-MVP roadmap.

## Notes for AI-Assisted Coding

- **Prompt Structure:** Use specific prompts like "Generate React component `EventCard.js` with Tailwind styling for CampusNex event display, integrated relieving with Firestore."
- **Code Reviews:** After generating code, validate against PRD requirements (e.g., mobile optimization, multilingual support).
- **Testing:** Test each feature locally (`npm test`, emulators) before merging.
- **Iteration:** After each milestone, review user feedback and adjust tasks (e.g., tweak UI based on usability tests).

## Estimated Timeline

- Total: ~8.5 weeks (assuming 1-2 developers with AI assistance).
- Adjust based on team size or complexity (e.g., add buffer for testing).

This task list keeps us on track to deliver a functional, user-friendly CampusNex MVP. If you need to prioritize or break down a specific task further, let me know! 🚀