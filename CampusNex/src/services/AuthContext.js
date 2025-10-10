import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from './api';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for user in localStorage (from previous login)
        const storedUser = authAPI.getUser();
        if (storedUser) {
            setUser(storedUser);
        }

        // Fetch current user from backend to validate token
        const validateUser = async () => {
            try {
                if (authAPI.isAuthenticated()) {
                    const { user: currentUser } = await authAPI.getCurrentUser();
                    setUser(currentUser);
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                // Clear invalid auth data
                authAPI.logout();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        validateUser();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const { user: loggedInUser } = await authAPI.login(email, password);
            setUser(loggedInUser);
            return loggedInUser;
        } catch (error) {
            throw error;
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            const { user: newUser } = await authAPI.register(userData);
            setUser(newUser);
            return newUser;
        } catch (error) {
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        authAPI.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            setUser,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}