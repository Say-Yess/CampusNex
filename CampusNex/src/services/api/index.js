// src/services/api/index.js
// API service exports for CampusNex

import * as authAPI from './auth';
import * as eventsAPI from './events';
import * as usersAPI from './users';
import apiClient from './client';

export {
    authAPI,
    eventsAPI,
    usersAPI,
    apiClient
};