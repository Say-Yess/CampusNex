// src/components/TextInput.js
import React from 'react';
import { Input } from './ui';

// This is a wrapper component for backward compatibility
// It maintains the existing API while using our new Input component
const TextInput = ({ label, placeholder, type = 'text', className = '', ...props }) => (
    <Input
        label={label}
        placeholder={placeholder}
        type={type}
        className={className}
        {...props}
    />
);

export default TextInput;
