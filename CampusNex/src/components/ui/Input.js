// src/components/ui/Input.js
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Input component with variants
 */
const Input = forwardRef(({
    id,
    name,
    type = 'text',
    label,
    placeholder,
    helper,
    error,
    disabled = false,
    required = false,
    className = '',
    onChange,
    value,
    ...props
}, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="flex flex-col w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-neutral-700 mb-1"
                >
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}

            <input
                ref={ref}
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                required={required}
                className={`
          w-full rounded-lg border-neutral-300 shadow-sm
          focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20
          disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed
          ${error ? 'border-error focus:border-error focus:ring-error' : ''}
          ${className}
        `}
                {...props}
            />

            {(helper || error) && (
                <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-neutral-500'}`}>
                    {error || helper}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    helper: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;