// src/components/PrimaryButton.js
import React from 'react';
import { Button } from './ui';

// This is a wrapper component for backward compatibility
// It maintains the existing API while using our new Button component
const PrimaryButton = ({ children, className = '', ...props }) => (
    <Button
        variant="primary"
        size="lg"
        className={className}
        {...props}
    >
        {children}
    </Button>
);

export default PrimaryButton;
