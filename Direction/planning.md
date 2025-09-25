# Project Vision

### Overview

CampusNex is envisioned as a transformative web platform tailored for Cambodia's vibrant university ecosystem. In a country where over 50% of the population is under 25 and digital adoption is skyrocketing—with e-commerce projected to reach $1.5 billion by 2025 and the ICT sector growing at a 9.95% CAGR to $5.2 billion by 2035—we see an opportunity to bridge critical gaps in education and professional development.

### Core Vision Statement

To empower Cambodian university students, parents, and event organizers by creating a centralized, inclusive, and engaging digital hub that simplifies discovering, accessing, and managing educational and professional opportunities like scholarships, internships, competitions, and campus events. By addressing fragmentation, timeliness, and accessibility issues, CampusNex aims to foster equitable growth, reduce missed opportunities, and build a connected community that propels Cambodia's youth toward brighter futures.

### Key Pillars

- **Inclusivity:** Support multilingual (Khmer/English) interfaces and low-bandwidth optimization to serve urban and rural users alike, tackling barriers like language issues and misinformation.
- **Engagement:** Leverage a fun, Tinder-style swipe interface for rapid discovery, gamified elements like leaderboards, and seamless integrations (e.g., Google Calendar) to make participation effortless.
- **Impact:** Drive measurable outcomes, such as a 50% reduction in missed deadlines (based on user surveys) and increased event attendance, while providing organizers with analytics to refine their reach.
- **Sustainability:** Start with an MVP focused on core features, then iterate toward AI personalization and expanded monetization, ensuring long-term viability through partnerships with universities and NGOs.

This vision isn't just about building a website—it's about creating a tool that feels like a personal ally for students navigating their academic journeys, making "FOMO" (fear of missing out) a thing of the past.

## System Architecture

### High-Level Design

CampusNex follows a modern, serverless architecture to ensure scalability, low maintenance, and fast iteration. It's a single-page application (SPA) with a client-side focus, backed by cloud services for data handling and authentication. This setup aligns with Agile development, allowing quick sprints and user feedback integration.

### Components:

1. **Frontend (Client-Side):**
    - Built as a responsive SPA using React.
    - Handles user interactions: swipe-based feeds, filters, RSVPs, and multilingual toggles.
    - Communicates with backend via APIs for real-time data syncing.
2. **Backend (Serverless):**
    - Firebase serves as the backend-as-a-service (BaaS), managing authentication, database, and hosting.
    - Real-time database (Firestore) stores events, user profiles, and submissions.
    - No traditional server; functions triggered via Firebase Cloud Functions for complex logic (e.g., notifications).
3. **Integrations:**
    - Google Calendar API for event syncing.
    - External APIs (via Axios) for any future expansions, like weather for outdoor events or payment gateways.
4. **Data Flow:**
    - **User Discovery:** Client fetches event data from Firestore → Renders swipe cards → User swipes to RSVP → Updates database and syncs to Calendar.
    - **Organizer Tools:** Submission form → Admin approval (manual or automated) → Analytics pulled from engagement metrics.
    - **Security Layer:** Firebase Auth for user sessions; role-based access (e.g., organizers vs. students).

### Architecture Diagram (Conceptual)

```
[User Device (Browser/Mobile)]
          |
          | (HTTPS)
          v
[Frontend: React SPA]
  - Components: SwipeInterface, EventCard, Dashboard
  - State Management: React Hooks/Context
          |
          | (API Calls via Axios)
          v
[Firebase Services]
  - Authentication: User Login/Signup
  - Firestore: Real-Time DB for Events/Users
  - Hosting: Deploys the SPA
  - Cloud Functions: Background Tasks (e.g., Notifications)
          |
          | (OAuth/API)
          v
[External: Google Calendar API]

```

This design emphasizes mobile-first responsiveness (using Tailwind), ensuring 3G-compatible performance for rural users. Scalability is handled by Firebase's auto-scaling, with potential migration to a full backend if user base grows beyond MVP.

### Non-Functional Considerations

- **Performance:** Aim for <3s load times; use lazy loading and caching.
- **Security:** Data encryption, anonymized profiles, and verification for event posts.
- **Reliability:** Real-time updates with offline fallback (via service workers if needed).
- **Deployment:** Continuous integration via GitHub Actions to Firebase Hosting.

## Technology Stack

### Frontend

- **Framework:** React v18 (for component-based UI and virtual DOM efficiency).
- **Styling:** Tailwind CSS v3 (utility-first for rapid, responsive designs; extended with custom colors like royal-blue #2B4777).
- **State Management:** React Hooks and Context API (simple for MVP; Redux if complexity increases).
- **UI Libraries:** react-tinder-card (for swipe functionality); react-i18next (for multilingual support).
- **HTTP Client:** Axios (for API requests to Firebase and Google).

### Backend & Database

- **BaaS:** Firebase SDK (Authentication, Firestore for NoSQL real-time DB, Hosting, Cloud Functions).
- **Database:** Firestore (schemaless for flexible event data storage).

### Integrations & APIs

- **Calendar Sync:** Google Calendar API (for RSVPs and deadlines).
- **Other:** i18next for internationalization.

### Development & Build Tools

- **Build Tool:** Create React App (CRA) for bootstrapping.
- **Version Control:** Git with GitHub.
- **Prototyping:** Figma for wireframes and mockups.

This stack is chosen for its simplicity, cost-effectiveness (Firebase free tier for MVP), and alignment with the project's mobile-optimized, real-time needs. It avoids overkill while allowing easy expansion.

## Required Tools List

### Development Environment

1. **Node.js & npm/Yarn:** v18+ for running React (install from [nodejs.org](http://nodejs.org/); Yarn for faster dependency management: `npm install -g yarn`).
2. **Git:** For version control ([git-scm.com](http://git-scm.com/)).
3. **Code Editor:** VS Code (with extensions: ESLint, Prettier, Tailwind CSS IntelliSense, React Snippets).
4. **Browser Dev Tools:** Chrome/Firefox for testing responsiveness and debugging.

### Cloud & Services

1. **Firebase Account:** Free tier sufficient for MVP ([firebase.google.com](http://firebase.google.com/); set up project, enable Auth/Firestore/Hosting).
2. **Google Cloud Console:** For Calendar API credentials ([console.cloud.google.com](http://console.cloud.google.com/); OAuth 2.0 setup).
3. **Figma:** For collaborative UI/UX design ([figma.com](http://figma.com/); import PRD mockups).

### CLI & Utilities

1. **Firebase CLI:** `npm install -g firebase-tools` (for deployment and emulators).
2. **Tailwind CLI:** Included via npx for init.
3. **Testing Tools:** React Testing Library (built into CRA); optionally Jest for units.
4. **API Testing:** Postman ([postman.com](http://postman.com/)) for mocking Firebase/Google endpoints.

### Optional/Advanced

- **Emulators:** Firebase Local Emulator Suite (for offline dev/testing).
- **CI/CD:** GitHub Actions (for automated builds/deploys).
- **Analytics:** Google Analytics (integrated via Firebase).

These tools ensure a smooth setup—most are free and quick to install. Refer to [setup.md](http://setup.md/) for step-by-step configuration. If you're new to any, start with the basics like Node.js and Git, and build from there. Let's make CampusNex a reality! 🚀