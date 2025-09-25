// src/components/ui/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from './index';

/**
 * Modern responsive navbar component
 */
const Navbar = ({
    logo,
    menuItems,
    rightMenuItems,
    className = '',
    onMenuToggle,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect for transparent to solid background transition
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (onMenuToggle) {
            onMenuToggle(!isOpen);
        }
    };

    // Function to determine if a menu item is active
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav
            className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-200
        ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'}
        ${className}
      `}
            {...props}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        {typeof logo === 'string' ? (
                            <Link to="/" className="text-primary text-2xl font-bold">
                                {logo}
                            </Link>
                        ) : (
                            logo
                        )}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {menuItems?.map((item, index) => (
                            <Link
                                key={`menu-item-${index}`}
                                to={item.path}
                                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive(item.path)
                                        ? 'text-primary bg-primary-50 font-semibold'
                                        : 'text-neutral-700 hover:text-primary hover:bg-primary-50'
                                    }
                `}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Menu (Desktop) */}
                    <div className="hidden md:flex items-center space-x-2">
                        {rightMenuItems?.map((item, index) => {
                            if (item.type === 'button') {
                                return (
                                    <Button
                                        key={`right-menu-item-${index}`}
                                        variant={item.variant || 'primary'}
                                        size="sm"
                                        onClick={item.onClick}
                                    >
                                        {item.label}
                                    </Button>
                                );
                            }

                            return (
                                <Link
                                    key={`right-menu-item-${index}`}
                                    to={item.path}
                                    className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path)
                                            ? 'text-primary'
                                            : 'text-neutral-700 hover:text-primary'
                                        }
                  `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`
          md:hidden transition-all duration-200 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                    {menuItems?.map((item, index) => (
                        <Link
                            key={`mobile-menu-item-${index}`}
                            to={item.path}
                            className={`
                block px-3 py-2 rounded-md text-base font-medium
                ${isActive(item.path)
                                    ? 'text-primary bg-primary-50'
                                    : 'text-neutral-700 hover:text-primary hover:bg-primary-50'
                                }
              `}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Mobile Right Menu Items */}
                    <div className="border-t border-neutral-200 pt-4 mt-4">
                        {rightMenuItems?.map((item, index) => {
                            if (item.type === 'button') {
                                return (
                                    <Button
                                        key={`mobile-right-menu-item-${index}`}
                                        variant={item.variant || 'primary'}
                                        size="sm"
                                        onClick={item.onClick}
                                        className="w-full justify-center mt-2"
                                    >
                                        {item.label}
                                    </Button>
                                );
                            }

                            return (
                                <Link
                                    key={`mobile-right-menu-item-${index}`}
                                    to={item.path}
                                    className={`
                    block px-3 py-2 rounded-md text-base font-medium
                    ${isActive(item.path)
                                            ? 'text-primary bg-primary-50'
                                            : 'text-neutral-700 hover:text-primary hover:bg-primary-50'
                                        }
                  `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        })
    ),
    rightMenuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string,
            type: PropTypes.oneOf(['link', 'button']),
            variant: PropTypes.string,
            onClick: PropTypes.func,
        })
    ),
    className: PropTypes.string,
    onMenuToggle: PropTypes.func,
};

export default Navbar;