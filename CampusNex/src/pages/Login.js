// src/pages/Login.js
import React from 'react';
import SocialButton from '../components/SocialButton';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';

const Login = () => (
    <div className="w-full min-h-screen bg-main flex items-center justify-center relative overflow-hidden">
        {/* Left: Slogan */}
        <div className="hidden lg:block absolute left-20 top-1/4 z-10">
            <h2 className="text-white text-[96px] font-montserrat font-bold leading-[140px]">Welcome Back!</h2>
        </div>
        {/* Right: Login Form */}
        <div className="relative w-full max-w-4xl h-[700px] bg-white rounded-tl-[70px] rounded-bl-[70px] flex flex-col items-center justify-center shadow-lg ml-auto">
            <h1 className="text-[#2D2C3C] text-5xl font-montserrat font-bold mb-12">Log In</h1>
            <div className="flex flex-col items-center gap-12 w-full">
                {/* Social Login */}
                <div className="flex gap-10 mb-2">
                    <SocialButton icon={<span className="w-9 h-9 bg-yellow-400 rounded-full inline-block" />} text="Log in with Google" />
                    <SocialButton icon={<span className="w-9 h-9 bg-blue-400 rounded-full inline-block" />} text="Log in with Facebook" />
                </div>
                <div className="text-[#A3A3A3] text-2xl font-open-sans font-normal mb-2">OR</div>
                {/* Form Fields */}
                <form className="flex flex-col gap-8 w-[750px]">
                    <TextInput label="E-mail Address" placeholder="Enter your e-mail" />
                    <PasswordInput label="Password" placeholder="Enter password" />
                    <button type="submit" className="w-full h-16 bg-orange-500 rounded-lg text-white text-2xl font-open-sans font-bold mt-4">Log In</button>
                </form>
                <div className="flex items-center gap-2 mt-4">
                    <span className="text-[#636363] text-xl font-open-sans font-normal">Don't have an account?</span>
                    <button className="text-[#2D2C3C] text-xl font-open-sans font-normal px-2">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
);

export default Login;
