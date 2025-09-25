// src/services/api/index.js
// API service exports for CampusNex

import * as authAPI from './auth-firebase';
import * as eventsAPI from './events-firebase';
import * as usersAPI from './users-firebase';
import apiClient from './client-firebase';

export {
    authAPI,
    eventsAPI,
    usersAPI,
    apiClient
};