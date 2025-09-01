// src/components/Navbar.js
import React from 'react';

const Navbar = () => (
    <nav className="w-full h-20 bg-gray-200 flex items-center px-8 justify-between shadow-sm">
        <div className="flex items-center space-x-4">
            <div className="relative flex items-center">
                <span className="text-main text-5xl font-lalezar">CampusNex</span>
                {/* Logo shapes can be added here if needed */}
            </div>
            <div className="flex space-x-6 ml-16">
                <span className="text-main text-2xl font-montserrat font-semibold">Home</span>
                <span className="text-main text-2xl font-montserrat font-medium">Events</span>
                <span className="text-main text-2xl font-montserrat font-medium">About</span>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <button className="text-main text-2xl font-montserrat font-medium px-5 py-2">Login</button>
            <button className="text-main text-2xl font-montserrat font-medium px-5 py-2">Create Event</button>
            <button className="bg-orange-500 text-gray-200 text-2xl font-montserrat font-medium px-5 py-2 rounded-lg">Sign Up</button>
        </div>
    </nav>
);

export default Navbar;
