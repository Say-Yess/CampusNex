import React from 'react';

const categories = [
    'Concerts & Gigs',
    'Festivals & Lifestyle',
    'Business & Networking',
    'Food & Drinks',
    'Performing Arts',
    'Sports & Outdoors',
    'Exhibitions',
    'Workshops, Conferences & Classes',
];

const companyInfo = [
    'About Us',
    'Contact Us',
    'Careers',
    'FAQs',
    'Terms of Service',
    'Privacy Policy',
];

const helpInfo = [
    'Account Support',
    'Listing Events',
    'Event Ticketing',
    'Ticket Purchase Terms & Conditions',
];

const socialLinks = [
    'Facebook',
    'Instagram',
    'Twitter',
    'Youtube',
];

const Footer = () => (
    <footer className="relative w-full bg-main text-white overflow-hidden py-16 px-4 md:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-12 md:gap-0 justify-between relative z-10">
            {/* Company Info */}
            <div className="flex flex-col gap-6 min-w-[183px]" style={{ left: '98px', top: '50px' }}>
                <span className="text-white text-2xl font-montserrat font-semibold mb-2">Company Info</span>
                {companyInfo.map((item) => (
                    <span key={item} className="text-[#A9A9A9] text-lg font-open-sans font-normal">{item}</span>
                ))}
            </div>
            {/* Help */}
            <div className="flex flex-col gap-6 min-w-[316px]" style={{ left: '384px', top: '50px' }}>
                <span className="text-white text-2xl font-montserrat font-semibold mb-2">Help</span>
                {helpInfo.map((item) => (
                    <span key={item} className="text-[#A9A9A9] text-lg font-open-sans font-normal">{item}</span>
                ))}
            </div>
            {/* Categories */}
            <div className="flex flex-col gap-6 min-w-[309px]" style={{ left: '803px', top: '50px' }}>
                <span className="text-white text-2xl font-montserrat font-semibold mb-2">Categories</span>
                {categories.map((item) => (
                    <span key={item} className="text-[#A9A9A9] text-lg font-open-sans font-normal">{item}</span>
                ))}
            </div>
            {/* Follow Us */}
            <div className="flex flex-col gap-6 min-w-[126px]" style={{ left: '1215px', top: '50px' }}>
                <span className="text-white text-2xl font-montserrat font-semibold mb-2">Follow Us</span>
                {socialLinks.map((item) => (
                    <span key={item} className="text-[#A9A9A9] text-lg font-open-sans font-normal">{item}</span>
                ))}
            </div>
        </div>
        {/* Become an Organizer */}
        <div className="absolute left-1/2 -translate-x-1/2 top-64 text-white text-2xl font-montserrat font-bold z-20">Become an Organizer</div>
        {/* Copyright */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex items-center gap-2 z-20">
            <div className="w-4 h-4 border border-[#A9A9A9] rounded-full relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 border border-[#A9A9A9] rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-[#A9A9A9] text-lg font-open-sans font-normal">2025 CampusNex. All rights reserved.</span>
        </div>
    </footer>
);

export default Footer;
