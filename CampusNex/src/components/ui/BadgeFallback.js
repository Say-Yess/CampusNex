// src/components/ui/BadgeFallback.js
import React from 'react';

/**
 * Fallback Badge component for Leaderboard
 */
const BadgeFallback = ({ children, className = '' }) => {
    return (
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${className}`}>
            {children}
        </div>
    );
};

export default BadgeFallback;