// src/utils/responsive.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to detect screen size and return appropriate breakpoint
 * @returns {Object} Object containing current breakpoint and boolean checks for each breakpoint
 */
export const useBreakpoint = () => {
    // Initialize with a default, which will be immediately updated on first render
    const [breakpoint, setBreakpoint] = useState('lg');

    useEffect(() => {
        // Function to update breakpoint based on window width
        const updateBreakpoint = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setBreakpoint('xs');
            } else if (width < 768) {
                setBreakpoint('sm');
            } else if (width < 1024) {
                setBreakpoint('md');
            } else if (width < 1280) {
                setBreakpoint('lg');
            } else {
                setBreakpoint('xl');
            }
        };

        // Set initial breakpoint
        updateBreakpoint();

        // Add event listener for window resize
        window.addEventListener('resize', updateBreakpoint);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', updateBreakpoint);
    }, []);

    return {
        breakpoint,
        isXs: breakpoint === 'xs',
        isSm: breakpoint === 'sm',
        isMd: breakpoint === 'md',
        isLg: breakpoint === 'lg',
        isXl: breakpoint === 'xl',
        isMobile: breakpoint === 'xs' || breakpoint === 'sm',
        isTablet: breakpoint === 'md',
        isDesktop: breakpoint === 'lg' || breakpoint === 'xl',
    };
};

/**
 * Component to conditionally render content based on screen size
 * @param {Object} props
 * @param {string|string[]} props.breakpoint - Breakpoint(s) at which to show content
 * @param {React.ReactNode} props.children - Content to show
 * @returns {React.ReactNode|null}
 */
export const Responsive = ({ breakpoint: requiredBreakpoints, children }) => {
    const { breakpoint } = useBreakpoint();

    // If requiredBreakpoints is an array, check if current breakpoint is in the array
    if (Array.isArray(requiredBreakpoints)) {
        return requiredBreakpoints.includes(breakpoint) ? children : null;
    }

    // If requiredBreakpoints is a string, check if current breakpoint matches
    return breakpoint === requiredBreakpoints ? children : null;
};

/**
 * Higher-order component to add responsive props to a component
 * @param {React.Component} Component - Component to enhance
 * @returns {React.Component} Enhanced component with responsive props
 */
export const withResponsive = (Component) => {
    return (props) => {
        const breakpointData = useBreakpoint();
        return <Component {...props} responsive={breakpointData} />;
    };
};

export default {
    useBreakpoint,
    Responsive,
    withResponsive,
};