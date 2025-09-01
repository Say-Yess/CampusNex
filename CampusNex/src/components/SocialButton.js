// src/components/SocialButton.js
import React from 'react';

const SocialButton = ({ icon, text, className = '', ...props }) => (
    <button
        className={`w-80 h-16 bg-white border border-[#A3A3A3] rounded-lg flex items-center px-8 gap-4 ${className}`}
        {...props}
    >
        <span className="w-9 h-9 flex items-center justify-center">{icon}</span>
        <span className="text-[#2D2C3C] text-xl font-open-sans font-normal">{text}</span>
    </button>
);

export default SocialButton;
