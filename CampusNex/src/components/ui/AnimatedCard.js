// src/components/ui/AnimatedCard.js
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './';
import { useScrollAnimation } from '../../utils/animations';
import { withAccessibility } from '../../utils/accessibility';

/**
 * AnimatedCard component combines Card with animation utilities
 * It animates when scrolled into view and includes accessibility enhancements
 */
const AnimatedCard = ({
    children,
    animation = 'fadeInUp',
    delay = 0,
    variant = 'default',
    padding = 'default',
    className = '',
    ...props
}) => {
    const { ref, animationClass } = useScrollAnimation({
        animation,
        delay,
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div
            ref={ref}
            className={`${animationClass} ${className}`}
        >
            <Card
                variant={variant}
                padding={padding}
                {...props}
            >
                {children}
            </Card>
        </div>
    );
};

AnimatedCard.propTypes = {
    children: PropTypes.node.isRequired,
    animation: PropTypes.string,
    delay: PropTypes.number,
    variant: PropTypes.oneOf(['default', 'elevated', 'flat']),
    padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg']),
    className: PropTypes.string,
};

// Enhance with accessibility features
export default withAccessibility(AnimatedCard);