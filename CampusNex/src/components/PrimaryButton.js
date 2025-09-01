// src/components/PrimaryButton.js
import React from 'react';

const PrimaryButton = ({ children, className = '', ...props }) => (
    <button
        className={`bg-orange-500 text-white text-xl font-inter font-extrabold capitalize px-8 py-3 rounded-xl shadow-lg ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default PrimaryButton;
