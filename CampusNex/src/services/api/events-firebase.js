// src/services/api/events-firebase.js
// Events API service for CampusNex using Firebase

import { auth, db } from '../firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    serverTimestamp
} from 'firebase/firestore';
import { addPoints, POINT_VALUES, ACTIVITY_TYPES } from './leaderboard-firebase';

// Get all events
export const getAllEvents = async () => {
    try {
        const eventsRef = collection(db, 'events');
        const querySnapshot = await getDocs(eventsRef);

        const events = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            startDate: doc.data().startDate?.toDate?.() || doc.data().startDate,
            endDate: doc.data().endDate?.toDate?.() || doc.data().endDate,
            createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
        }));

        return { events };
    } catch (error) {
        console.error('Error getting events:', error);
        throw { message: 'Failed to get events' };
    }
};

// Get featured events
export const getFeaturedEvents = async (count = 3) => {
    try {
        // Query events with featured = true
        const q = query(
            collection(db, 'events'),
            where('featured', '==', true),
            orderBy('createdAt', 'desc'),
            limit(count)
        );

        const querySnapshot = await getDocs(q);

        // If we don't have enough featured events, get latest events
        if (querySnapshot.docs.length < count) {
            const backupQuery = query(
                collection(db, 'events'),
                orderBy('createdAt', 'desc'),
                limit(count)
            );

            const backupSnapshot = await getDocs(backupQuery);

            const events = backupSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                startDate: doc.data().startDate?.toDate?.() || doc.data().startDate,
                endDate: doc.data().endDate?.toDate?.() || doc.data().endDate,
                createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
            }));

            return { events };
        }

        const events = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            startDate: doc.data().startDate?.toDate?.() || doc.data().startDate,
            endDate: doc.data().endDate?.toDate?.() || doc.data().endDate,
            createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
        }));

        return { events };
    } catch (error) {
        console.error('Error getting featured events:', error);
        throw { message: 'Failed to get featured events' };
    }
};

// Get single event by ID
export const getEventById = async (eventId) => {
    try {
        const eventDoc = await getDoc(doc(db, 'events', eventId));

        if (!eventDoc.exists()) {
            throw new Error('Event not found');
        }

        const eventData = eventDoc.data();

        // If there's an organizer ID, get organizer details
        let organizer = null;
        if (eventData.creatorId) {
            const organizerDoc = await getDoc(doc(db, 'users', eventData.creatorId));
            if (organizerDoc.exists()) {
                const organizerData = organizerDoc.data();
                organizer = {
                    id: organizerDoc.id,
                    firstName: organizerData.firstName,
                    lastName: organizerData.lastName,
                    role: organizerData.role
                };
            }
        }

        // Format dates
        const event = {
            id: eventDoc.id,
            ...eventData,
            organizer,
            startDate: eventData.startDate?.toDate?.() || eventData.startDate,
            endDate: eventData.endDate?.toDate?.() || eventData.endDate,
            createdAt: eventData.createdAt?.toDate?.() || eventData.createdAt
        };

        return { event };
    } catch (error) {
        console.error('Error getting event:', error);
        throw { message: 'Failed to get event details' };
    }
};

// Create a new event
export const createEvent = async (eventData) => {
    try {
        // Get current user
        const user = auth.currentUser;
        if (!user) {
            throw new Error('You must be logged in to create an event');
        }

        // Add creator information and default fields
        const newEvent = {
            ...eventData,
            creatorId: user.uid,
            attendees: [],
            interested: [],
            createdAt: serverTimestamp()
        };

        // Convert date strings to Firestore timestamps if they're strings
        if (typeof newEvent.startDate === 'string') {
            newEvent.startDate = new Date(newEvent.startDate);
        }

        if (typeof newEvent.endDate === 'string') {
            newEvent.endDate = new Date(newEvent.endDate);
        }

        // Create the event
        const docRef = await addDoc(collection(db, 'events'), newEvent);

        // Award points for creating an event
        try {
            await addPoints(user.uid, POINT_VALUES.CREATE_EVENT, ACTIVITY_TYPES.CREATE_EVENT, {
                eventId: docRef.id,
                eventTitle: eventData.title,
                eventType: eventData.type || 'general'
            });
        } catch (pointsError) {
            console.warn('Failed to add points for event creation:', pointsError);
        }

        return {
            event: {
                id: docRef.id,
                ...newEvent,
                createdAt: new Date()
            }
        };
    } catch (error) {
        console.error('Error creating event:', error);
        throw { message: 'Failed to create event' };
    }
};

// Update an event
export const updateEvent = async (eventId, eventData) => {
    try {
        // Get current user
        const user = auth.currentUser;
        if (!user) {
            throw new Error('You must be logged in to update an event');
        }

        // Get the event first to check ownership
        const eventDoc = await getDoc(doc(db, 'events', eventId));

        if (!eventDoc.exists()) {
            throw new Error('Event not found');
        }

        const currentEvent = eventDoc.data();

        // Check if user is the creator or an admin
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        if (currentEvent.creatorId !== user.uid && userData.role !== 'admin') {
            throw new Error('You do not have permission to update this event');
        }

        // Update the event
        const updatedEvent = {
            ...eventData,
            updatedAt: serverTimestamp()
        };

        // Convert date strings to Firestore timestamps if they're strings
        if (typeof updatedEvent.startDate === 'string') {
            updatedEvent.startDate = new Date(updatedEvent.startDate);
        }

        if (typeof updatedEvent.endDate === 'string') {
            updatedEvent.endDate = new Date(updatedEvent.endDate);
        }

        await updateDoc(doc(db, 'events', eventId), updatedEvent);

        return {
            event: {
                id: eventId,
                ...currentEvent,
                ...updatedEvent,
                updatedAt: new Date()
            }
        };
    } catch (error) {
        console.error('Error updating event:', error);
        throw { message: 'Failed to update event' };
    }
};

// Delete an event
export const deleteEvent = async (eventId) => {
    try {
        // Get current user
        const user = auth.currentUser;
        if (!user) {
            throw new Error('You must be logged in to delete an event');
        }

        // Get the event first to check ownership
        const eventDoc = await getDoc(doc(db, 'events', eventId));

        if (!eventDoc.exists()) {
            throw new Error('Event not found');
        }

        const event = eventDoc.data();

        // Check if user is the creator or an admin
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        if (event.creatorId !== user.uid && userData.role !== 'admin') {
            throw new Error('You do not have permission to delete this event');
        }

        // Delete the event
        await deleteDoc(doc(db, 'events', eventId));

        return { success: true, message: 'Event deleted successfully' };
    } catch (error) {
        console.error('Error deleting event:', error);
        throw { message: 'Failed to delete event' };
    }
};

// RSVP to an event
export const rsvpToEvent = async (eventId, status) => {
    try {
        // Get current user
        const user = auth.currentUser;
        if (!user) {
            throw new Error('You must be logged in to RSVP to an event');
        }

        const eventRef = doc(db, 'events', eventId);
        const eventDoc = await getDoc(eventRef);

        if (!eventDoc.exists()) {
            throw new Error('Event not found');
        }

        const eventData = eventDoc.data();

        // Handle different RSVP statuses
        if (status === 'attending') {
            // Add to attendees, remove from interested
            await updateDoc(eventRef, {
                attendees: arrayUnion(user.uid),
                interested: arrayRemove(user.uid)
            });

            // Award points for attending events
            try {
                let points = POINT_VALUES.ATTEND_EVENT;

                // Bonus points for early registration (more than 24 hours before event)
                if (eventData.startDate && eventData.startDate.toDate() > new Date(Date.now() + 24 * 60 * 60 * 1000)) {
                    points += POINT_VALUES.EARLY_REGISTRATION;
                }

                await addPoints(user.uid, points, ACTIVITY_TYPES.ATTEND_EVENT, {
                    eventId,
                    eventTitle: eventData.title,
                    earlyRegistration: points > POINT_VALUES.ATTEND_EVENT
                });
            } catch (pointsError) {
                console.warn('Failed to add points for event attendance:', pointsError);
            }
        } else if (status === 'interested') {
            // Add to interested, remove from attendees
            await updateDoc(eventRef, {
                interested: arrayUnion(user.uid),
                attendees: arrayRemove(user.uid)
            });
        } else if (status === 'not_attending') {
            // Remove from both lists
            await updateDoc(eventRef, {
                attendees: arrayRemove(user.uid),
                interested: arrayRemove(user.uid)
            });
        }

        return { success: true, status };
    } catch (error) {
        console.error('Error RSVPing to event:', error);
        throw { message: 'Failed to RSVP to event' };
    }
};

// Get events the user has RSVP'd to (interested or attending)
export const getUserRSVPs = async () => {
    try {
        // Get current user
        const user = auth.currentUser;
        if (!user) {
            throw new Error('You must be logged in to see your RSVPs');
        }

        // Query events where user is attending
        const attendingQuery = query(
            collection(db, 'events'),
            where('attendees', 'array-contains', user.uid)
        );

        // Query events where user is interested
        const interestedQuery = query(
            collection(db, 'events'),
            where('interested', 'array-contains', user.uid)
        );

        // Get both sets of events
        const [attendingSnapshot, interestedSnapshot] = await Promise.all([
            getDocs(attendingQuery),
            getDocs(interestedQuery)
        ]);

        // Process events with status
        const attendingEvents = attendingSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            rsvpStatus: 'attending',
            startDate: doc.data().startDate?.toDate?.() || doc.data().startDate,
            endDate: doc.data().endDate?.toDate?.() || doc.data().endDate,
            createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
        }));

        const interestedEvents = interestedSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            rsvpStatus: 'interested',
            startDate: doc.data().startDate?.toDate?.() || doc.data().startDate,
            endDate: doc.data().endDate?.toDate?.() || doc.data().endDate,
            createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
        }));

        // Combine and return
        const events = [...attendingEvents, ...interestedEvents];

        return { events };
    } catch (error) {
        console.error('Error getting RSVPs:', error);
        throw { message: 'Failed to get your RSVPs' };
    }
};