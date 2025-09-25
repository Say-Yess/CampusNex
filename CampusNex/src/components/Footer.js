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
            title: 'Categories',
            links: [
                { label: 'Concerts & Gigs', href: '/discovery?category=concerts' },
                { label: 'Festivals & Lifestyle', href: '/discovery?category=festivals' },
                { label: 'Business & Networking', href: '/discovery?category=business' },
                { label: 'Food & Drinks', href: '/discovery?category=food' },
                { label: 'Performing Arts', href: '/discovery?category=arts' },
                { label: 'Sports & Outdoors', href: '/discovery?category=sports' },
                { label: 'Exhibitions', href: '/discovery?category=exhibitions' },
                { label: 'Workshops & Conferences', href: '/discovery?category=workshops' },
            ]
        },
        {
            title: 'Help',
            links: [
                { label: 'Account Support', href: '/support' },
                { label: 'Listing Events', href: '/list-event' },
                { label: 'Event Ticketing', href: '/ticketing' },
                { label: 'Purchase Terms & Conditions', href: '/purchase-terms' },
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