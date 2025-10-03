// src/utils/animations.js
import { useEffect, useState } from 'react';

/**
 * CSS Animation classes for different effects
 */
export const animations = {
    // Fade animations
    fadeIn: 'animate-fadeIn',
    fadeOut: 'animate-fadeOut',

    // Slide animations
    slideInFromTop: 'animate-slideInFromTop',
    slideInFromBottom: 'animate-slideInFromBottom',
    slideInFromLeft: 'animate-slideInFromLeft',
    slideInFromRight: 'animate-slideInFromRight',
    slideOutToTop: 'animate-slideOutToTop',
    slideOutToBottom: 'animate-slideOutToBottom',
    slideOutToLeft: 'animate-slideOutToLeft',
    slideOutToRight: 'animate-slideOutToRight',

    // Scale animations
    scaleIn: 'animate-scaleIn',
    scaleOut: 'animate-scaleOut',

    // Attention seekers
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    ping: 'animate-ping',

    // Common animations
    fadeInUp: 'animate-fadeInUp',
    fadeInDown: 'animate-fadeInDown',
    fadeInLeft: 'animate-fadeInLeft',
    fadeInRight: 'animate-fadeInRight',
};

/**
 * Custom hook to control animation states
 * @param {string} initialAnimation - Initial animation class
 * @param {number} duration - Animation duration in milliseconds
 * @returns {Object} Animation controls and current class
 */
export const useAnimation = (initialAnimation = '', duration = 300) => {
    const [animationClass, setAnimationClass] = useState(initialAnimation);
    const [isAnimating, setIsAnimating] = useState(false);

    const animate = (animationName) => {
        if (!animations[animationName] && animationName !== '') {
            console.warn(`Animation "${animationName}" not found`);
            return;
        }

        setIsAnimating(true);
        setAnimationClass(animations[animationName] || animationName);

        // Automatically reset animation state after duration
        setTimeout(() => {
            setIsAnimating(false);
        }, duration);
    };

    return {
        animationClass,
        isAnimating,
        animate,
        reset: () => setAnimationClass(''),
    };
};

/**
 * Applies a scroll animation effect to elements when they enter the viewport
 * @param {Object} options - Configuration options
 * @returns {Object} Ref to attach to the element and animation state
 */
export const useScrollAnimation = ({
    threshold = 0.1,
    animation = 'fadeInUp',
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
} = {}) => {
    const [ref, setRef] = useState(null);
    const [inView, setInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isIntersecting = entry.isIntersecting;

                if (isIntersecting && (!triggerOnce || !hasAnimated)) {
                    setTimeout(() => {
                        setInView(true);
                        setHasAnimated(true);
                    }, delay);
                } else if (!isIntersecting && !triggerOnce) {
                    setInView(false);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(ref);

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }
        };
    }, [ref, threshold, rootMargin, triggerOnce, hasAnimated, delay]);

    return {
        ref: setRef,
        inView,
        animationClass: inView ? animations[animation] || animation : '',
        hasAnimated,
    };
};

/**
 * Component that animates its children when it enters the viewport
 */
export const AnimateOnScroll = ({
    children,
    animation = 'fadeInUp',
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
    className = '',
    ...props
}) => {
    const { ref, animationClass } = useScrollAnimation({
        threshold,
        animation,
        rootMargin,
        triggerOnce,
        delay,
    });

    return (
        <div
            ref={ref}
            className={`${animationClass} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

const animationUtils = {
    animations,
    useAnimation,
    useScrollAnimation,
    AnimateOnScroll,
};

export default animationUtils;