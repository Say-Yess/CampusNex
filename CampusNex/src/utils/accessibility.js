// src/utils/accessibility.js
import React, { useEffect, useRef } from 'react';

/**
 * Helper to handle proper focus management
 * @param {boolean} active - Whether the trap is active
 * @returns {Object} Ref to attach to the container element
 */
export const useFocusTrap = (active = true) => {
    const containerRef = useRef(null);
    const previousFocusRef = useRef(null);

    useEffect(() => {
        if (!active) return;

        // Store the previously focused element
        previousFocusRef.current = document.activeElement;

        // Focus the first focusable element in the container
        const focusableElements = containerRef.current?.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements?.length) {
            focusableElements[0].focus();
        }

        const handleKeyDown = (e) => {
            if (e.key !== 'Tab') return;

            if (!focusableElements?.length) return;

            // Handle tab key to keep focus within the container
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        // Add event listener for keydown to handle tab key
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
            document.removeEventListener('keydown', handleKeyDown);

            // Restore focus to previous element
            if (previousFocusRef.current) {
                previousFocusRef.current.focus();
            }
        };
    }, [active]);

    return containerRef;
};

/**
 * Higher-order component that adds accessibility features to a component
 * @param {React.Component} Component - Component to enhance
 * @returns {React.Component} Component with accessibility enhancements
 */
export const withAccessibility = (Component) => {
    return React.forwardRef((props, ref) => {
        // Basic a11y props that should be included in all components
        const a11yProps = {
            // If the component doesn't have a role, try to infer one
            role: props.role || undefined,

            // Include aria-label if provided
            'aria-label': props['aria-label'] || undefined,

            // Include aria-labelledby if provided
            'aria-labelledby': props['aria-labelledby'] || undefined,

            // Include aria-describedby if provided
            'aria-describedby': props['aria-describedby'] || undefined,

            // If component has disabled prop, include aria-disabled
            'aria-disabled': props.disabled || undefined,

            // Include tabIndex if needed
            tabIndex: props.tabIndex || undefined,
        };

        return <Component ref={ref} {...props} {...a11yProps} />;
    });
};

/**
 * Component that provides screen reader only content
 */
export const ScreenReaderOnly = ({ children, as: Component = 'span', ...props }) => {
    return (
        <Component
            className="sr-only"
            {...props}
        >
            {children}
        </Component>
    );
};

/**
 * Hook to handle keyboard navigation for custom components
 * @param {Object} options - Configuration options
 * @returns {Object} Event handlers and state
 */
export const useKeyboardNavigation = ({
    onEnter,
    onSpace,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onEscape,
    onTab,
    onShiftTab,
    enabled = true,
} = {}) => {
    const handleKeyDown = (e) => {
        if (!enabled) return;

        switch (e.key) {
            case 'Enter':
                if (onEnter) {
                    e.preventDefault();
                    onEnter(e);
                }
                break;
            case ' ':
                if (onSpace) {
                    e.preventDefault();
                    onSpace(e);
                }
                break;
            case 'ArrowUp':
                if (onArrowUp) {
                    e.preventDefault();
                    onArrowUp(e);
                }
                break;
            case 'ArrowDown':
                if (onArrowDown) {
                    e.preventDefault();
                    onArrowDown(e);
                }
                break;
            case 'ArrowLeft':
                if (onArrowLeft) {
                    e.preventDefault();
                    onArrowLeft(e);
                }
                break;
            case 'ArrowRight':
                if (onArrowRight) {
                    e.preventDefault();
                    onArrowRight(e);
                }
                break;
            case 'Escape':
                if (onEscape) {
                    e.preventDefault();
                    onEscape(e);
                }
                break;
            case 'Tab':
                if (e.shiftKey && onShiftTab) {
                    onShiftTab(e);
                } else if (!e.shiftKey && onTab) {
                    onTab(e);
                }
                break;
            default:
                break;
        }
    };

    return {
        handleKeyDown,
    };
};

export default {
    useFocusTrap,
    withAccessibility,
    ScreenReaderOnly,
    useKeyboardNavigation,
};