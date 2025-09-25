// src/components/ui/Card.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component with variants
 */
const Card = ({
    children,
    variant = 'default',
    padding = 'default',
    className = '',
    ...props
}) => {
    // Base classes
    const baseClasses = "rounded-lg overflow-hidden transition-shadow duration-200";

    // Variant classes
    const variantClasses = {
        default: "bg-white border border-neutral-200 shadow-sm hover:shadow",
        elevated: "bg-white border border-neutral-200 shadow-md hover:shadow-lg",
        flat: "bg-white border border-neutral-200",
        outlined: "bg-transparent border border-neutral-300",
    };

    // Padding classes
    const paddingClasses = {
        none: "",
        small: "p-3",
        default: "p-4",
        large: "p-6",
    };

    return (
        <div
            className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'elevated', 'flat', 'outlined']),
    padding: PropTypes.oneOf(['none', 'small', 'default', 'large']),
    className: PropTypes.string,
};

export default Card;