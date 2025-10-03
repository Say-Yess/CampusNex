# [setup.md]

## Introduction

This `setup.md` file provides a comprehensive guide to setting up the development environment for the CampusNex project, based on the Product Requirements Document (PRD). CampusNex is a web-based platform aimed at centralizing educational and professional opportunities for Cambodian university students, using a Tinder-style swipe interface for discovery.

The setup focuses on creating a reproducible environment for future AI-assisted coding sessions. It includes prerequisites, installation steps, configuration, and best practices for iterative development using Agile methodologies. This ensures consistency, scalability, and ease of collaboration.

**Project Overview (from PRD):**

- **Frontend:** React-based single-page application (SPA) with swipe interfaces.
- **Backend:** Firebase for authentication, database, and hosting.
- **Key Features (MVP):** Swipe-based discovery, event filters, RSVPs with Google Calendar integration, multilingual support (Khmer/English).
- **Target Users:** Students, parents/guardians, event organizers.
- **Development Approach:** Agile sprints with user-centered design, prototyping in Figma, and version control via Git/GitHub.

Follow these steps sequentially to get started. All commands assume a Unix-like terminal (e.g., macOS/Linux; for Windows, use Git Bash or WSL).

## Prerequisites

Before setting up, ensure you have the following installed on your machine:

1. **Node.js and npm:** Version 18.x or later (React v18 requires this). Download from [nodejs.org](https://nodejs.org/).
    - Verify: Run `node -v` and `npm -v` in your terminal.
2. **Git:** For version control. Install from [git-scm.com](https://git-scm.com/).
    - Verify: Run `git --version`.
3. **Firebase Account:** Sign up at [firebase.google.com](https://firebase.google.com/). You'll need a Google account.
    - Create a new Firebase project named "CampusNex" (or similar).
4. **Google Cloud Account:** For Google Calendar API integration. Enable the API in the Google Cloud Console at [console.cloud.google.com](https://console.cloud.google.com/).
    - Generate API credentials (OAuth 2.0 Client ID) for web applications.
5. **Code Editor:** Recommended: Visual Studio Code (VS Code) with extensions for React (e.g., ES7 React/Redux/GraphQL/React-Native snippets), Tailwind CSS IntelliSense, and Prettier for formatting.
6. **Figma Account:** For UI/UX prototyping and design collaboration. Sign up at [figma.com](https://figma.com/). Import or create designs based on PRD wireframes/mockups.
7. **Browser:** Modern browser like Chrome for testing (with developer tools enabled).
8. **Optional Tools:**
    - Yarn (alternative to npm for faster installs): Install globally with `npm install -g yarn`.
    - Postman or Insomnia for API testing (e.g., Firebase endpoints).

## Project Structure Overview

A suggested directory structure for the project to keep things organized:

```
campusnex/
├── public/                # Static assets (index.html, favicon, etc.)
├── src/
│   ├── assets/            # Images, icons, fonts (e.g., logo, mood board elements)
│   ├── components/        # Reusable UI components (e.g., EventCard, SwipeInterface)
│   ├── pages/             # Page-level components (e.g., Home, DiscoveryFeed, EventDetail)
│   ├── services/          # Firebase and API utilities (e.g., firebase.js, googleCalendar.js)
│   ├── styles/            # Global styles (e.g., tailwind.css)
│   ├── utils/             # Helper functions (e.g., date formatting, multilingual support)
│   ├── App.js             # Main app entry
│   ├── index.js           # React DOM render
│   └── ...                # Other files as needed (e.g., constants for colors/typography)
├── .env                   # Environment variables (e.g., Firebase config)
├── .gitignore             # Git ignore file
├── firebase.json          # Firebase hosting config
├── package.json           # Dependencies and scripts
├── README.md              # Project overview and run instructions
├── tailwind.config.js     # Tailwind CSS configuration
└── yarn.lock / package-lock.json  # Lock files for dependencies

```

This structure aligns with React best practices and separates concerns for easier AI code generation.

## Step-by-Step Setup

### 1. Clone or Initialize the Repository

- Create a new GitHub repository named "CampusNex" (private or public).
- Clone it locally:
    
    ```
    git clone <https://github.com/your-username/CampusNex.git>
    cd CampusNex
    
    ```
    
- If starting from scratch:
    
    ```
    mkdir CampusNex
    cd CampusNex
    git init
    git remote add origin <https://github.com/your-username/CampusNex.git>
    
    ```
    

### 2. Set Up React App

Use Create React App (CRA) for a quick bootstrap, as it's simple for MVP development.

- Install Create React App globally (if not already):
    
    ```
    npm install -g create-react-app
    
    ```
    
- Create the app:
    
    ```
    npx create-react-app .
    
    ```
    
- This sets up the basic React structure. Eject if needed later for advanced configs (but avoid for simplicity).

### 3. Install Dependencies

Install core libraries from the PRD tech stack.

- Using npm:
    
    ```
    npm install react@18 react-dom@18 tailwindcss@3 postcss autoprefixer axios firebase
    
    ```
    
- Or using Yarn:
    
    ```
    yarn add react@18 react-dom@18 tailwindcss@3 postcss autoprefixer axios firebase
    
    ```
    
- Additional for development:
    
    ```
    npm install --save-dev @tailwindcss/forms @tailwindcss/typography
    
    ```
    
    (These enhance Tailwind for forms and text styling.)
    
- For swipe functionality (e.g., Tinder-style), add a library like `react-tinder-card`:
    
    ```
    npm install react-tinder-card
    
    ```
    
- For multilingual support, add `i18next` and `react-i18next`:
    
    ```
    npm install i18next react-i18next i18next-browser-languagedetector
    
    ```
    

### 4. Configure Tailwind CSS

- Initialize Tailwind:
    
    ```
    npx tailwindcss init -p
    
    ```
    
- Edit `tailwind.config.js` to match PRD design guidelines:
    
    ```jsx
    module.exports = {
      content: ['./src/**/*.{js,jsx,ts,tsx}'],
      theme: {
        extend: {
          colors: {
            'royal-blue': '#2B4777',
            'warm-coral': '#FF6B6B',
            'bright-teal': '#2DD4BF',
            'light-gray': '#E5E7EB',
          },
          fontFamily: {
            body: ['Inter', 'sans-serif'],
            heading: ['Poppins', 'sans-serif'],
          },
        },
      },
      plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
    };
    
    ```
    
- Add to `src/index.css`:
    
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    ```
    

### 5. Configure Firebase

- In Firebase Console, go to your project > Project Settings > Your Apps > Add App (Web).
- Copy the config object (apiKey, authDomain, etc.).
- Create a `.env` file in the root:
    
    ```
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    
    ```
    
- In `src/services/firebase.js`, initialize:
    
    ```jsx
    import { initializeApp } from 'firebase/app';
    import { getAuth } from 'firebase/auth';
    import { getFirestore } from 'firebase/firestore';
    
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      // ... other configs
    };
    
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    
    ```
    
- Enable Authentication (Email/Password, Google) and Firestore in Firebase Console.

### 6. Configure Google Calendar API

- In Google Cloud Console, enable Calendar API.
- Create OAuth credentials and download the JSON.
- For client-side integration, use Google API Client Library:
    
    ```
    npm install @googleapis/calendar
    
    ```
    
- In `src/services/googleCalendar.js`, set up auth and syncing logic (handle OAuth flow).

Note: For development, use `http://localhost:3000` as a redirect URI in credentials.

### 7. Set Up Multilingual Support

- Create `src/i18n.js`:
    
    ```jsx
    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';
    import LanguageDetector from 'i18next-browser-languagedetector';
    
    i18n.use(initReactI18next).use(LanguageDetector).init({
      resources: {
        en: { translation: { /* English translations */ } },
        km: { translation: { /* Khmer translations */ } },
      },
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });
    
    export default i18n;
    
    ```
    
- Import in `src/index.js`.

### 8. Running the Project

- Start the development server:
    
    ```
    npm start
    
    ```
    
    (Runs on [http://localhost:3000](http://localhost:3000/))
    
- Build for production:
    
    ```
    npm run build
    
    ```
    
- Deploy to Firebase Hosting:
    - Install Firebase CLI: `npm install -g firebase-tools`
    - Login: `firebase login`
    - Initialize: `firebase init` (select Hosting, use build folder)
    - Deploy: `firebase deploy`

### 9. Version Control and Collaboration

- Commit initial setup:
    
    ```
    git add .
    git commit -m "Initial project setup from PRD"
    git push origin main
    
    ```
    
- Use branches for features: `git checkout -b feature/swipe-interface`
- Follow Agile: Short sprints (1-2 weeks), focus on MVP features first (e.g., discovery feed).

### 10. Testing and Debugging

- Unit tests: Use React Testing Library (included in CRA).
- Run tests: `npm test`
- For Firebase emulation: Install emulators via Firebase CLI and run `firebase emulators:start`.
- Accessibility: Use Lighthouse in Chrome DevTools to check mobile optimization and contrast.

### 11. Best Practices for AI Code Sessions

- **Iterative Development:** In future sessions, reference PRD sections (e.g., "Implement Functional Requirements > Rapid Opportunity Discovery" by generating code for `SwipeInterface` component).
- **Code Generation Prompts:** When using AI, specify: "Generate React component for [feature] using Tailwind CSS, integrated with Firebase."
- **Error Handling:** Always include try-catch in API calls; log errors.
- **Security:** Never hardcode keys; use `.env`.
- **Performance:** Optimize for low-bandwidth (lazy-load images, minify assets).
- **Feedback Loops:** After coding a feature, test manually and iterate based on PRD objectives.

If issues arise, refer back to the PRD or update this file. Happy coding! 🚀