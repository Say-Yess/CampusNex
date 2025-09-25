// src/components/ui/Badge.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge component with variants
 */
const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    ...props
}) => {
    // Base classes
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-full";

    // Variant classes
    const variantClasses = {
        default: "bg-neutral-100 text-neutral-800",
        primary: "bg-primary-50 text-primary-800",
        secondary: "bg-secondary-50 text-secondary-800",
        success: "bg-success-50 text-success-800",
        danger: "bg-error-50 text-error-800",
        warning: "bg-warning-50 text-warning-800",
        info: "bg-info-50 text-info-800",
    };

    // Size classes
    const sizeClasses = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-base px-3 py-1",
    };

    return (
        <span
            className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
            {...props}
        >
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
};

export default Badge;