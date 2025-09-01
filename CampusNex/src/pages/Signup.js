// src/pages/Signup.js
import React from 'react';

const Signup = () => (
    <div className="w-full min-h-screen bg-main flex items-center justify-center relative overflow-hidden">
        {/* Left: Slogan */}
        <div className="hidden lg:block absolute left-20 top-1/4 z-10">
            <h2 className="text-white text-[96px] font-montserrat font-bold leading-[140px]">Discover Your Future, One Swipe at a Time!</h2>
        </div>
        {/* Right: Signup Form */}
        <div className="relative w-full max-w-4xl h-[900px] bg-white rounded-tl-[70px] rounded-bl-[70px] flex flex-col items-center justify-center shadow-lg ml-auto">
            <h1 className="text-[#2D2C3C] text-5xl font-montserrat font-bold mb-12">Create Account</h1>
            <div className="flex flex-col items-center gap-12 w-full">
                {/* Social Signup */}
                <div className="flex gap-10 mb-2">
                    <button className="w-80 h-16 bg-white border border-[#A3A3A3] rounded-lg flex items-center px-8 gap-4">
                        {/* Google Icon Placeholder */}
                        <span className="w-9 h-9 bg-yellow-400 rounded-full inline-block"></span>
                        <span className="text-[#2D2C3C] text-xl font-open-sans font-normal">Sign up with Google</span>
                    </button>
                    <button className="w-80 h-16 bg-white border border-[#A3A3A3] rounded-lg flex items-center px-8 gap-4">
                        {/* Facebook Icon Placeholder */}
                        <span className="w-9 h-9 bg-blue-400 rounded-full inline-block"></span>
                        <span className="text-[#2D2C3C] text-xl font-open-sans font-normal">Sign up with Facebook</span>
                    </button>
                </div>
                <div className="text-[#A3A3A3] text-2xl font-open-sans font-normal mb-2">OR</div>
                {/* Form Fields */}
                <form className="flex flex-col gap-8 w-[750px]">
                    <div>
                        <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">Full Name</label>
                        <input className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]" placeholder="Enter your full name" />
                    </div>
                    <div>
                        <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">E-mail Address</label>
                        <input className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]" placeholder="Enter your e-mail" />
                    </div>
                    <div>
                        <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">Password</label>
                        <input type="password" className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]" placeholder="Enter password" />
                    </div>
                    <button type="submit" className="w-full h-16 bg-orange-500 rounded-lg text-white text-2xl font-open-sans font-bold mt-4">Create Account</button>
                </form>
                <div className="flex items-center gap-2 mt-4">
                    <span className="text-[#636363] text-xl font-open-sans font-normal">Already have an account?</span>
                    <button className="text-[#2D2C3C] text-xl font-open-sans font-normal px-2">Log In</button>
                </div>
            </div>
        </div>
    </div>
);

export default Signup;
