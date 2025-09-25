// src/components/ui/Carousel.js
import React, { useState, useEffect, useCallback, useRef } from 'react';

const Carousel = ({
    items = [],
    renderItem,
    autoPlay = false,
    interval = 5000,
    showArrows = true,
    showDots = true,
    className = '',
    slideClassName = '',
    arrowClassName = '',
    dotClassName = '',
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const autoPlayTimer = useRef(null);

    // Reset auto-play timer whenever currentIndex changes
    useEffect(() => {
        if (autoPlay && items.length > 1) {
            clearInterval(autoPlayTimer.current);
            autoPlayTimer.current = setInterval(() => {
                goToNext();
            }, interval);

            return () => {
                clearInterval(autoPlayTimer.current);
            };
        }
    }, [autoPlay, interval, currentIndex, items.length]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (autoPlayTimer.current) {
                clearInterval(autoPlayTimer.current);
            }
        };
    }, []);

    const goToPrevious = useCallback(() => {
        if (isAnimating || items.length <= 1) return;

        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));

        setTimeout(() => {
            setIsAnimating(false);
        }, 500); // Match this with the CSS transition duration
    }, [isAnimating, items.length]);

    const goToNext = useCallback(() => {
        if (isAnimating || items.length <= 1) return;

        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));

        setTimeout(() => {
            setIsAnimating(false);
        }, 500); // Match this with the CSS transition duration
    }, [isAnimating, items.length]);

    const goToSlide = useCallback((index) => {
        if (isAnimating || index === currentIndex) return;

        setIsAnimating(true);
        setCurrentIndex(index);

        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    }, [isAnimating, currentIndex]);

    // Touch event handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const touchDiff = touchStartX.current - touchEndX.current;

        // Require a minimum swipe distance to trigger navigation
        if (Math.abs(touchDiff) > 50) {
            if (touchDiff > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrevious();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    };

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDown}
            tabIndex="0"
            role="region"
            aria-label="carousel"
            aria-roledescription="carousel"
        >
            {/* Slides */}
            <div className="relative h-full">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${index === currentIndex ? 'opacity-100 z-10 translate-x-0' :
                                index < currentIndex ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                            } ${slideClassName}`}
                        aria-hidden={index !== currentIndex}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Slide ${index + 1} of ${items.length}`}
                    >
                        {renderItem(item, index)}
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {showArrows && items.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 text-neutral-800 flex items-center justify-center z-20 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary ${arrowClassName}`}
                        disabled={isAnimating}
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 text-neutral-800 flex items-center justify-center z-20 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary ${arrowClassName}`}
                        disabled={isAnimating}
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots Indicators */}
            {showDots && items.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-primary scale-125'
                                    : 'bg-white/50 hover:bg-white/80'
                                } ${dotClassName}`}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentIndex ? 'true' : 'false'}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;