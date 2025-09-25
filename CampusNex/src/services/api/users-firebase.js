// src/services/api/users-firebase.js
// Users API service for CampusNex using Firebase

import { auth, db } from '../firebase';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    updateDoc
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import apiClient from './client-firebase';

// Collection name
const COLLECTION = 'users';

// Get current user profile
export const getCurrentUserProfile = async () => {
    try {
        const userId = auth.currentUser?.uid;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const userDoc = await getDoc(doc(db, COLLECTION, userId));

        if (!userDoc.exists()) {
            throw new Error('User profile not found');
        }

        return {
            user: {
                uid: userId,
                ...userDoc.data()
            }
        };
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw { message: error.message || 'Failed to get user profile' };
    }
};

// Get user profile by ID
export const getUserProfile = async (userId) => {
    try {
        const userDoc = await getDoc(doc(db, COLLECTION, userId));

        if (!userDoc.exists()) {
            throw new Error('User profile not found');
        }

        // Remove sensitive information
        const userData = userDoc.data();
        const { password, ...publicUserData } = userData;

        return {
            user: {
                uid: userId,
                ...publicUserData
            }
        };
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw { message: error.message || 'Failed to get user profile' };
    }
};

// Update user profile
export const updateUserProfile = async (userData) => {
    try {
        const userId = auth.currentUser?.uid;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        // Update Firestore document
        const userRef = doc(db, COLLECTION, userId);
        await updateDoc(userRef, userData);

        // Update display name in Firebase Auth if name is provided
        if (userData.firstName && userData.lastName) {
            await updateProfile(auth.currentUser, {
                displayName: `${userData.firstName} ${userData.lastName}`
            });
        }

        // Get updated user profile
        const updatedDoc = await getDoc(userRef);

        return {
            user: {
                uid: userId,
                ...updatedDoc.data()
            }
        };
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw { message: error.message || 'Failed to update user profile' };
    }
};

// Get users by role
export const getUsersByRole = async (role) => {
    try {
        const usersQuery = query(
            collection(db, COLLECTION),
            where('role', '==', role)
        );

        const querySnapshot = await getDocs(usersQuery);

        const users = querySnapshot.docs.map(doc => {
            const userData = doc.data();
            const { password, ...publicUserData } = userData;

            return {
                uid: doc.id,
                ...publicUserData
            };
        });

        return { users };
    } catch (error) {
        console.error('Error getting users by role:', error);
        throw { message: error.message || 'Failed to get users' };
    }
};

// Search users
export const searchUsers = async (query) => {
    try {
        // Firebase doesn't support direct text search, so we'll get all users
        // and filter them client-side
        const querySnapshot = await getDocs(collection(db, COLLECTION));

        const users = querySnapshot.docs
            .map(doc => {
                const userData = doc.data();
                const { password, ...publicUserData } = userData;

                return {
                    uid: doc.id,
                    ...publicUserData
                };
            })
            .filter(user => {
                const searchText = query.toLowerCase();
                const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

                return fullName.includes(searchText) ||
                    user.email.toLowerCase().includes(searchText) ||
                    (user.major && user.major.toLowerCase().includes(searchText));
            });

        return { users };
    } catch (error) {
        console.error('Error searching users:', error);
        throw { message: error.message || 'Failed to search users' };
    }
};

// Get users attending or interested in an event
export const getUsersByEvent = async (eventId, status = 'attending') => {
    try {
        // Get the event first
        const eventDoc = await getDoc(doc(db, 'events', eventId));

        if (!eventDoc.exists()) {
            throw new Error('Event not found');
        }

        const eventData = eventDoc.data();
        const userIds = status === 'attending' ?
            (eventData.attendees || []) :
            (eventData.interested || []);

        // If no users with this status, return empty array
        if (userIds.length === 0) {
            return { users: [] };
        }

        // Get user details for each user ID
        const userPromises = userIds.map(uid => getDoc(doc(db, COLLECTION, uid)));
        const userDocs = await Promise.all(userPromises);

        const users = userDocs
            .filter(doc => doc.exists())
            .map(doc => {
                const userData = doc.data();
                const { password, ...publicUserData } = userData;

                return {
                    uid: doc.id,
                    ...publicUserData
                };
            });

        return { users };
    } catch (error) {
        console.error('Error getting users by event:', error);
        throw { message: error.message || 'Failed to get event users' };
    }
};

export default {
    getCurrentUserProfile,
    getUserProfile,
    updateUserProfile,
    getUsersByRole,
    searchUsers,
    getUsersByEvent
};