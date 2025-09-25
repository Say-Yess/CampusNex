// src/components/ui/Modal.js
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

/**
 * Modal component with variants
 */
const Modal = ({
    isOpen,
    onClose,
    children,
    size = 'md',
    title,
    hideCloseButton = false,
    className = '',
    overlayClassName = '',
    ...props
}) => {
    const modalRef = useRef(null);

    // Handle ESC key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = ''; // Restore scrolling
        };
    }, [isOpen, onClose]);

    // Handle clicking outside the modal
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    // Size classes
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full m-4'
    };

    if (!isOpen) return null;

    // Use createPortal to render modal outside the normal DOM hierarchy
    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity ${overlayClassName}`}
            onClick={handleOutsideClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
        >
            <div
                ref={modalRef}
                className={`
          relative bg-white rounded-lg shadow-xl w-full overflow-hidden
          transform transition-all
          ${sizeClasses[size]}
          ${className}
        `}
                {...props}
            >
                {title && (
                    <div className="px-6 py-4 border-b border-neutral-200">
                        <h3 id="modal-title" className="text-lg font-medium text-neutral-900">{title}</h3>
                    </div>
                )}

                <div className="p-6">
                    {children}
                </div>

                {!hideCloseButton && (
                    <button
                        type="button"
                        className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-500 focus:outline-none"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>,
        document.body
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
    title: PropTypes.string,
    hideCloseButton: PropTypes.bool,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
};

export default Modal;