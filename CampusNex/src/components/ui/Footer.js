// src/components/ui/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({
    footerColumns = [],
    bottomLinks = [],
    copyright = "© 2025 CampusNex. All rights reserved.",
    logo = null,
    className = ""
}) => {
    return (
        <footer className={`bg-slate-900 text-white w-full py-12 px-4 ${className}`}>
            <div className="max-w-7xl mx-auto">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Logo and description section */}
                    {logo && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-1 mb-8 md:mb-0">
                            <div className="mb-4">{logo}</div>
                            <p className="text-gray-400 mt-4 max-w-xs">
                                Connecting students with campus events and opportunities for a richer university experience.
                            </p>
                        </div>
                    )}

                    {/* Footer columns */}
                    {footerColumns.map((column, index) => (
                        <div key={index} className="flex flex-col">
                            <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
                            <ul className="space-y-3">
                                {column.links.map((link, i) => (
                                    <li key={i}>
                                        {link.href ? (
                                            <Link
                                                to={link.href}
                                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <span className="text-gray-400">{link.label}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom section with copyright and optional links */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 mb-4 md:mb-0">
                        {copyright}
                    </div>

                    {bottomLinks.length > 0 && (
                        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                            {bottomLinks.map((link, i) => (
                                <Link
                                    key={i}
                                    to={link.href || '#'}
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;