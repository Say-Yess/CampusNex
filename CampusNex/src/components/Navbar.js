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
                ? [
                    { label: 'Dashboard', path: '/organizer-dashboard' },
                    { label: 'Create Event', path: '/create-event' }
                ]
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
            logo={<Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity"><img src="/CampusNex LOGO.svg" alt="CampusNex" className="h-8 md:h-10" /><span className="text-blue-800 text-2xl md:text-3xl font-bold">CampusNex</span></Link>}
            menuItems={menuItems}
            rightMenuItems={rightMenuItems}
            currentPath={location.pathname}
        />
    );
};

export default Navbar;
