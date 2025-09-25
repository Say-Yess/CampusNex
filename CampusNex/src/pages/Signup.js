// src/pages/Signup.js

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import SocialButton from '../components/SocialButton';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await register({
                email,
                password,
                firstName,
                lastName,
                role
            });
            navigate('/discovery');
        } catch (err) {
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError('Not implemented in the new API yet. Please use email signup.');
        // Future implementation will use OAuth with the backend
    };

    return (
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
                        <button onClick={handleGoogleSignup} className="w-80 h-16 bg-white border border-[#A3A3A3] rounded-lg flex items-center px-8 gap-4">
                            <span className="w-9 h-9 bg-yellow-400 rounded-full inline-block"></span>
                            <span className="text-[#2D2C3C] text-xl font-open-sans font-normal">Sign up with Google</span>
                        </button>
                        {/* Facebook signup can be added here */}
                    </div>
                    <div className="text-[#A3A3A3] text-2xl font-open-sans font-normal mb-2">OR</div>
                    {/* Form Fields */}
                    <form className="flex flex-col gap-8 w-[750px]" onSubmit={handleEmailSignup}>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">First Name</label>
                                <input
                                    className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">Last Name</label>
                                <input
                                    className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">E-mail Address</label>
                            <input
                                type="email"
                                className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]"
                                placeholder="Enter your e-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal placeholder-[#ACACAC]"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-[#636363] text-xl font-open-sans font-normal mb-2">Account Type</label>
                            <select
                                className="w-full h-16 bg-white border border-[#818181b3] rounded-lg px-6 text-[#ACACAC] text-lg font-open-sans font-normal"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                disabled={loading}
                            >
                                <option value="student">Student</option>
                                <option value="organizer">Event Organizer</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-16 bg-orange-500 rounded-lg text-white text-2xl font-open-sans font-bold mt-4"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                    </form>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-[#636363] text-xl font-open-sans font-normal">Already have an account?</span>
                        <Link to="/login" className="text-[#2D2C3C] text-xl font-open-sans font-normal px-2">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
