// src/components/ui/Form.js
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Form component with responsive layout
 */
const Form = ({
    children,
    onSubmit,
    className = '',
    ...props
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full ${className}`}
            {...props}
        >
            <div className="space-y-6">
                {children}
            </div>
        </form>
    );
};

Form.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func,
    className: PropTypes.string,
};

// Form section component for grouping form elements
const FormSection = ({
    title,
    description,
    children,
    className = ''
}) => {
    return (
        <div className={`border-b border-neutral-200 pb-6 ${className}`}>
            {(title || description) && (
                <div className="mb-4">
                    {title && <h3 className="text-lg font-medium text-neutral-900">{title}</h3>}
                    {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
                </div>
            )}
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};

FormSection.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

// Form group component for creating responsive form layouts
const FormGroup = ({
    children,
    cols = 1,
    className = ''
}) => {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <div className={`grid ${gridCols[cols]} gap-4 ${className}`}>
            {children}
        </div>
    );
};

FormGroup.propTypes = {
    children: PropTypes.node.isRequired,
    cols: PropTypes.oneOf([1, 2, 3, 4]),
    className: PropTypes.string,
};

// Export components
Form.Section = FormSection;
Form.Group = FormGroup;

export default Form;