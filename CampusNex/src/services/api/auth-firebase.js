// src/services/api/auth-firebase.js
// Auth API service for CampusNex using Firebase

import { auth, db } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from 'firebase/firestore';

// Register a new user
export const register = async (userData) => {
    try {
        // Create user in Firebase Auth
        const { email, password, firstName, lastName, ...otherData } = userData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile with name
        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`
        });

        // Save additional user data to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email,
            firstName,
            lastName,
            role: otherData.role || 'student',
            createdAt: serverTimestamp(),
            ...otherData
        });

        // Return user data
        return {
            user: {
                id: user.uid,
                email: user.email,
                displayName: user.displayName,
                firstName,
                lastName,
                role: otherData.role || 'student',
                ...otherData
            },
            token: await user.getIdToken()
        };
    } catch (error) {
        throw { message: error.message || 'Registration failed' };
    }
};

// Login a user
export const login = async (email, password) => {
    try {
        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
            throw new Error('User data not found');
        }

        const userData = userDoc.data();
        const token = await user.getIdToken();

        // Store token and user ID in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.uid);

        return {
            user: {
                id: user.uid,
                email: user.email,
                displayName: user.displayName,
                ...userData
            },
            token
        };
    } catch (error) {
        throw { message: error.message || 'Login failed' };
    }
};

// Logout user
export const logout = async () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        await signOut(auth);
        return { success: true };
    } catch (error) {
        throw { message: error.message || 'Logout failed' };
    }
};

// Get current user
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe();

            if (user) {
                try {
                    // Get additional user data from Firestore
                    const userDoc = await getDoc(doc(db, 'users', user.uid));

                    if (!userDoc.exists()) {
                        reject({ message: 'User data not found' });
                        return;
                    }

                    const userData = userDoc.data();

                    resolve({
                        user: {
                            id: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            ...userData
                        }
                    });
                } catch (error) {
                    reject({ message: error.message || 'Failed to get user profile' });
                }
            } else {
                reject({ message: 'Not authenticated' });
            }
        });
    });
};

// Check if user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token && !!auth.currentUser;
};

// Get the current user from localStorage
export const getUser = () => {
    const user = auth.currentUser;

    if (!user) {
        return null;
    }

    return {
        id: user.uid,
        email: user.email,
        displayName: user.displayName
    };
};