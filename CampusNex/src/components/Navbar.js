// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { Navbar as UINavbar } from './ui';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Events', path: '/discovery' },
        { label: 'About', path: '/about' },
        ...(isAuthenticated ? [
            { label: 'Leaderboard', path: '/leaderboard' }
        ] : [])
    ];

    const rightMenuItems = isAuthenticated
        ? [
            { label: 'Profile', path: '/profile' },
            ...(user?.role === 'organizer'
                ? [{ label: 'Create Event', path: '/create-event' }]
                : [{ label: 'My Events', path: '/interested-events' }]
            ),
            { label: 'Logout', onClick: handleLogout, type: 'button', variant: 'primary' }
        ]
        : [
            { label: 'Login', path: '/login' },
            { label: 'Sign Up', path: '/signup', type: 'button', variant: 'primary', onClick: () => navigate('/signup') }
        ];

    return (
        <UINavbar
            logo={<Link to="/" className="text-primary text-3xl md:text-4xl font-bold">CampusNex</Link>}
            menuItems={menuItems}
            rightMenuItems={rightMenuItems}
            currentPath={location.pathname}
        />
    );
};

export default Navbar;
