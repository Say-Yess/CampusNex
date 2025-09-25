// src/pages/Login.js

import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import SocialButton from '../components/SocialButton';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    // Get the intended destination from location state, or default to discovery feed
    const from = location.state?.from || '/discovery';

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            // Navigate to the page they were trying to access, or discovery if they came directly to login
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('Not implemented in the new API yet. Please use email login.');
        // Future implementation will use OAuth with the backend
    };

    return (
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
                        <button onClick={handleGoogleLogin} className="w-80 h-16 bg-white border border-[#A3A3A3] rounded-lg flex items-center px-8 gap-4">
                            <span className="w-9 h-9 bg-yellow-400 rounded-full inline-block"></span>
                            <span className="text-[#2D2C3C] text-xl font-open-sans font-normal">Log in with Google</span>
                        </button>
                        {/* Facebook login can be added here */}
                    </div>
                    <div className="text-[#A3A3A3] text-2xl font-open-sans font-normal mb-2">OR</div>
                    {/* Form Fields */}
                    <form className="flex flex-col gap-8 w-[750px]" onSubmit={handleEmailLogin}>
                        <input
                            type="email"
                            className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]"
                            placeholder="Enter your e-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <input
                            type="password"
                            className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="w-full h-16 bg-orange-500 rounded-lg text-white text-2xl font-open-sans font-bold mt-4"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                    </form>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-[#636363] text-xl font-open-sans font-normal">Don't have an account?</span>
                        <Link to="/signup" className="text-[#2D2C3C] text-xl font-open-sans font-normal px-2">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
