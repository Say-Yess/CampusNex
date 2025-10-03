import React from 'react';
import { Link } from 'react-router-dom';
import { Footer as UIFooter } from './ui';

const Footer = () => {
    const footerColumns = [
        {
            title: 'Company Info',
            links: [
                { label: 'About Us', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Careers', href: '/careers' },
                { label: 'FAQs', href: '/faqs' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
            ]
        },
        {
            title: 'Campus Events',
            links: [
                { label: 'Academic Conferences', href: '/discovery?category=academic' },
                { label: 'Student Activities', href: '/discovery?category=student-activities' },
                { label: 'Sports & Recreation', href: '/discovery?category=sports' },
                { label: 'Cultural Events', href: '/discovery?category=cultural' },
                { label: 'Career & Networking', href: '/discovery?category=career' },
                { label: 'Workshops & Seminars', href: '/discovery?category=workshops' },
                { label: 'Campus Festivals', href: '/discovery?category=festivals' },
                { label: 'Club Events', href: '/discovery?category=clubs' },
            ]
        },
        {
            title: 'Help',
            links: [
                { label: 'Account Support', href: '/support' },
                { label: 'Listing Events', href: '/list-event' },
                { label: 'Terms & Conditions', href: '/purchase-terms' },
            ]
        }
    ];

    const bottomLinks = [
        { label: 'Facebook', href: 'https://facebook.com' },
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'YouTube', href: 'https://youtube.com' },
    ];

    return (
        <UIFooter
            footerColumns={footerColumns}
            bottomLinks={bottomLinks}
            copyright="© 2025 CampusNex. All rights reserved."
            logo={<Link to="/" className="text-white text-2xl font-bold">CampusNex</Link>}
        />
    );
};

export default Footer;