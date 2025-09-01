// src/components/PasswordInput.js
import React, { useState } from 'react';

const PasswordInput = ({ label, placeholder, className = '', ...props }) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">{label}</label>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    className={`w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC] ${className}`}
                    placeholder={placeholder}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShow((s) => !s)}
                    tabIndex={-1}
                >
                    {show ? '🙈' : '👁️'}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
