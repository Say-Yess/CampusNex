// src/services/googleAuth.js
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const googleAuthService = {
    // Sign in with Google using popup
    signInWithPopup: async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const idToken = await user.getIdToken();

            return {
                user,
                idToken,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid
            };
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            throw error;
        }
    },

    // Sign in with Google using redirect (better for mobile)
    signInWithRedirect: async () => {
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (error) {
            console.error('Google Sign-In Redirect Error:', error);
            throw error;
        }
    },

    // Get redirect result
    getRedirectResult: async () => {
        try {
            const result = await getRedirectResult(auth);
            if (result) {
                const user = result.user;
                const idToken = await user.getIdToken();

                return {
                    user,
                    idToken,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid
                };
            }
            return null;
        } catch (error) {
            console.error('Google Redirect Result Error:', error);
            throw error;
        }
    },

    // Backend Google OAuth flow (redirect to backend)
    redirectToBackendOAuth: () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    },

    // Authenticate with backend using Google ID token
    authenticateWithBackend: async (idToken, role = 'student') => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/google/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken,
                    role
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Google authentication failed');
            }

            return data;
        } catch (error) {
            console.error('Backend Google Auth Error:', error);
            throw error;
        }
    }
};

export default googleAuthService;