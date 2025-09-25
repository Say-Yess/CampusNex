// src/components/ui/Toggle.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Toggle component for boolean inputs
 */
const Toggle = ({
    checked = false,
    onChange,
    id,
    name,
    label,
    disabled = false,
    size = 'md',
    className = '',
    ...props
}) => {
    // Generate unique ID if not provided
    const toggleId = id || `toggle-${name || Math.random().toString(36).substr(2, 9)}`;

    // Size classes
    const sizeClasses = {
        sm: {
            toggle: 'w-8 h-4',
            circle: 'h-3 w-3'
        },
        md: {
            toggle: 'w-11 h-6',
            circle: 'h-5 w-5'
        },
        lg: {
            toggle: 'w-14 h-7',
            circle: 'h-6 w-6'
        }
    };

    return (
        <div className={`flex items-center ${className}`}>
            {label && (
                <label
                    htmlFor={toggleId}
                    className="mr-3 text-sm font-medium text-neutral-700"
                >
                    {label}
                </label>
            )}

            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    id={toggleId}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only peer"
                    {...props}
                />
                <div
                    className={`
            ${sizeClasses[size].toggle}
            bg-neutral-200 peer-focus:outline-none peer-focus:ring-2
            peer-focus:ring-primary peer-focus:ring-opacity-50
            rounded-full peer
            peer-checked:after:translate-x-full
            peer-checked:after:border-white
            after:content-['']
            after:absolute
            after:top-[2px]
            after:left-[2px]
            after:bg-white
            after:border-neutral-300
            after:border
            after:rounded-full
            after:transition-all
            peer-checked:bg-primary
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${sizeClasses[size].circle === 'h-3 w-3' ? 'after:h-3 after:w-3' : ''}
            ${sizeClasses[size].circle === 'h-5 w-5' ? 'after:h-5 after:w-5' : ''}
            ${sizeClasses[size].circle === 'h-6 w-6' ? 'after:h-6 after:w-6' : ''}
          `}
                />
            </label>
        </div>
    );
};

Toggle.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
};

export default Toggle;