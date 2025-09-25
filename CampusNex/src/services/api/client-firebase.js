// src/services/api/client-firebase.js
// Base API client for CampusNex using Firebase

import { db } from '../firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    limit,
    orderBy
} from 'firebase/firestore';

// Mock API delay for development
const MOCK_DELAY = process.env.NODE_ENV === 'development' ? 300 : 0;

const apiClient = {
    // Helper method to introduce artificial delay in development
    delay: (ms = MOCK_DELAY) => new Promise(resolve => setTimeout(resolve, ms)),

    // Get a document by ID
    async get(collectionName, id) {
        await this.delay();
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            // Convert timestamps to dates for easier handling
            const formattedData = { ...data };
            Object.keys(formattedData).forEach(key => {
                if (formattedData[key]?.toDate) {
                    formattedData[key] = formattedData[key].toDate();
                }
            });

            return { ...formattedData, id: docSnap.id };
        } else {
            throw new Error(`Document not found in ${collectionName}`);
        }
    },

    // Get all documents in a collection
    async getAll(collectionName, constraints = []) {
        await this.delay();
        let q = collection(db, collectionName);

        if (constraints.length > 0) {
            q = query(q, ...constraints);
        }

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();

            // Convert timestamps to dates for easier handling
            const formattedData = { ...data };
            Object.keys(formattedData).forEach(key => {
                if (formattedData[key]?.toDate) {
                    formattedData[key] = formattedData[key].toDate();
                }
            });

            return { ...formattedData, id: doc.id };
        });
    },

    // Create a new document
    async create(collectionName, data) {
        await this.delay();
        const collectionRef = collection(db, collectionName);

        // Add timestamps
        const dataWithTimestamps = {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(collectionRef, dataWithTimestamps);

        // Return with a JS date instead of Firestore timestamp
        return {
            id: docRef.id,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    },

    // Update a document
    async update(collectionName, id, data) {
        await this.delay();
        const docRef = doc(db, collectionName, id);

        // Add updated timestamp
        const dataWithTimestamp = {
            ...data,
            updatedAt: serverTimestamp()
        };

        await updateDoc(docRef, dataWithTimestamp);

        // Return with a JS date instead of Firestore timestamp
        return {
            id,
            ...data,
            updatedAt: new Date()
        };
    },

    // Delete a document
    async delete(collectionName, id) {
        await this.delay();
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
        return { success: true };
    },

    // Query documents with filters
    async query(collectionName, filters = [], sortField = null, sortDirection = 'asc', limitCount = null) {
        await this.delay();

        let queryRef = collection(db, collectionName);

        // Add filters
        if (filters.length > 0) {
            const queryFilters = filters.map(filter => {
                return where(filter.field, filter.operator, filter.value);
            });

            queryRef = query(queryRef, ...queryFilters);
        }

        // Add sorting
        if (sortField) {
            queryRef = query(queryRef, orderBy(sortField, sortDirection));
        }

        // Add limit
        if (limitCount) {
            queryRef = query(queryRef, limit(limitCount));
        }

        // Execute query
        const querySnapshot = await getDocs(queryRef);

        // Process results
        return querySnapshot.docs.map(doc => {
            const data = doc.data();

            // Convert timestamps to dates for easier handling
            const formattedData = { ...data };
            Object.keys(formattedData).forEach(key => {
                if (formattedData[key]?.toDate) {
                    formattedData[key] = formattedData[key].toDate();
                }
            });

            return { ...formattedData, id: doc.id };
        });
    }
};

export default apiClient;