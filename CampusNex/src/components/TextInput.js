// src/components/TextInput.js
import React from 'react';

const TextInput = ({ label, placeholder, type = 'text', className = '', ...props }) => (
    <div>
        <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">{label}</label>
        <input
            type={type}
            className={`w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC] ${className}`}
            placeholder={placeholder}
            {...props}
        />
    </div>
);

export default TextInput;
