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

const LeaderboardSection = () => {
    return (
        <div className="relative w-full min-h-screen bg-white overflow-x-hidden">
            {/* Top NavBar (reuse Navbar component if available) */}
            {/* Main Gradient Banner */}
            <div className="w-full h-[200px] bg-gradient-to-br from-main to-[#3256BD] absolute top-[75px] left-0 overflow-hidden z-10">
                <div className="absolute left-1/2 -translate-x-1/2 top-10 text-white text-5xl md:text-6xl font-inter font-bold">Campus Spotlight</div>
                <div className="absolute left-1/2 -translate-x-1/2 top-32 text-white text-lg md:text-xl font-inter font-medium">Celebrating our most engaged students and outstanding organizers</div>
            </div>

            {/* Tabs */}
            <div className="absolute w-[90%] max-w-[1240px] left-1/2 -translate-x-1/2 top-[256px] flex flex-row gap-4 z-20">
                <div className="w-1/2 bg-orange-400 border border-[#B34900] rounded-lg flex items-center justify-center h-[60px] text-white text-lg md:text-xl font-inter font-bold">Top Student</div>
                <div className="w-1/2 bg-white border border-[#B34900] rounded-lg flex items-center justify-center h-[60px] text-black text-lg md:text-xl font-inter font-bold">Top Organizer</div>
            </div>

            {/* Top 3 Students Section */}
            <div className="absolute w-full flex flex-col items-center top-[364px] z-30">
                <div className="text-black text-2xl md:text-3xl lg:text-4xl font-inter font-bold capitalize mb-6">top 3 Most active student</div>
                <div className="flex flex-row justify-center items-end gap-8 md:gap-16">
                    {/* 3rd Place */}
                    <div className="flex flex-col items-center">
                        <div className="w-[170px] h-[170px] bg-gray-300 rounded-full mb-2" />
                        <div className="w-[280px] h-[400px] bg-[#C0C0C0] rounded-3xl -mt-24 mb-2" />
                        <div className="text-black text-xl md:text-2xl font-inter font-semibold">THAM  NISAYAM</div>
                        <div className="text-black text-lg font-inter font-semibold">Third Rank</div>
                        <div className="text-gray-700 text-base font-inter font-medium">Business Admin</div>
                        <div className="w-[180px] h-[30px] bg-[#E7E5E5] rounded-full mt-2 flex items-center justify-center">
                            <span className="text-gray-700 text-sm font-inter font-medium">29 Attended</span>
                        </div>
                    </div>
                    {/* 1st Place */}
                    <div className="flex flex-col items-center">
                        <div className="w-[200px] h-[200px] bg-gray-300 rounded-full mb-2" />
                        <div className="w-[300px] h-[440px] bg-[#F7B82F] rounded-3xl -mt-32 mb-2" />
                        <div className="text-black text-2xl md:text-3xl font-inter font-semibold">THAM  NISAYAM</div>
                        <div className="text-black text-2xl font-inter font-semibold">First Rank</div>
                        <div className="text-gray-700 text-base font-inter font-medium">Computer Science</div>
                        <div className="w-[190px] h-[30px] bg-[#FFE8B5] rounded-full mt-2 flex items-center justify-center">
                            <span className="text-gray-700 text-sm font-inter font-medium">39 Attended</span>
                        </div>
                    </div>
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center">
                        <div className="w-[170px] h-[170px] bg-gray-300 rounded-full mb-2" />
                        <div className="w-[280px] h-[400px] bg-[#CD7F32] rounded-3xl -mt-24 mb-2" />
                        <div className="text-black text-xl md:text-2xl font-inter font-semibold">THAM  NISAYAM</div>
                        <div className="text-black text-lg font-inter font-semibold">Second Rank</div>
                        <div className="text-gray-700 text-base font-inter font-medium">Fashion Design</div>
                        <div className="w-[180px] h-[30px] bg-[#FAB878] rounded-full mt-2 flex items-center justify-center">
                            <span className="text-gray-700 text-sm font-inter font-medium">35 Attended</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Complete Leaderboard Section */}
            <div className="absolute w-[90%] max-w-[1350px] left-1/2 -translate-x-1/2 top-[985px] z-40">
                <div className="bg-[#3360E3] rounded-t-2xl h-[100px] flex items-center justify-center">
                    <span className="text-white text-3xl md:text-4xl font-inter font-semibold">Complete Leaderboard</span>
                </div>
                <div className="bg-[#F4F4F4] rounded-b-2xl min-h-[882px] pb-8">
                    {[3, 4, 5, 6, 7, 8, 9, 10].map((rank, idx) => (
                        <div key={rank} className="flex items-center bg-[#C1CDF1] rounded-lg my-4 mx-8 h-[73px] relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#4C77F3] to-[#2C458D] rounded-full flex items-center justify-center ml-6">
                                <span className="text-white text-lg font-inter font-medium">{rank}</span>
                            </div>
                            <div className="ml-6 flex flex-col justify-center">
                                <span className="text-black text-lg font-inter font-semibold">THAM  NISAYAM</span>
                                <span className="text-[#383838] text-sm font-inter font-normal">Business Admin</span>
                            </div>
                            <div className="absolute right-32 top-1/2 -translate-y-1/2 text-main text-lg font-inter font-bold">{27 - idx}</div>
                            <div className="absolute right-16 top-1/2 -translate-y-1/2 text-[#535353] text-lg font-inter font-semibold">Events</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* More Button */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[1901px] z-50">
                <div className="w-[300px] h-[50px] bg-gradient-radial from-[#052275] to-[#375ECC] rounded-2xl flex items-center justify-center">
                    <span className="text-white text-2xl font-inter font-semibold">More</span>
                </div>
            </div>

            {/* Footer Section */}
            <div className="absolute w-full left-0 top-[2012px] bg-main h-[482px] flex flex-col md:flex-row justify-between px-24 py-12 z-60">
                {/* Company Info */}
                <div className="flex flex-col gap-6">
                    <span className="text-white text-2xl font-montserrat font-semibold mb-2">Company Info</span>
                    {companyInfo.map((item) => (
                        <span key={item} className="text-[#A9A9A9] text-lg font-open-sans font-normal">{item}</span>
                    ))}
                </div>
                {/* Help */}
                <div className="flex flex-col gap-6">
                    <span className="text-white text-2xl font-montserrat font-semibold mb-2">Help</span>
                    {helpInfo.map((item) => (
                        <span key={item} className="text-[#A9A9A9] text-lg font-open-sans font-normal">{item}</span>
                    ))}
                </div>
                {/* Categories */}
                <div className="flex flex-col gap-6">
                    <span className="text-white text-2xl font-montserrat font-semibold mb-2">Categories</span>
                    {categories.map((item) => (
                        <span key={item} className="text-[#A9A9A9] text-lg font-open-sans font-normal">{item}</span>
                    ))}
                </div>
                {/* Follow Us */}
                <div className="flex flex-col gap-6">
                    <span className="text-white text-2xl font-montserrat font-semibold mb-2">Follow Us</span>
                    {socialLinks.map((item) => (
                        <span key={item} className="text-[#A9A9A9] text-lg font-open-sans font-normal">{item}</span>
                    ))}
                </div>
                {/* Become an Organizer */}
                <div className="absolute left-1/2 -translate-x-1/2 top-64 text-white text-2xl font-montserrat font-bold">Become an Organizer</div>
                {/* Copyright */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex items-center gap-2">
                    <div className="w-4 h-4 border border-[#A9A9A9] rounded-full relative flex items-center justify-center">
                        <div className="w-2.5 h-2.5 border border-[#A9A9A9] rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <span className="text-[#A9A9A9] text-lg font-open-sans font-normal">2025 CampusNex. All rights reserved.</span>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardSection;
