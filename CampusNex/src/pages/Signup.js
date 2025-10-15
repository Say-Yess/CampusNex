// src/pages/Signup.js

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import BackButton from '../components/BackButton';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('student'); // 'student' or 'organizer'
    const [organization, setOrganization] = useState('');
    const [position, setPosition] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Frontend validation
        if (!fullName.trim()) {
            setError('Full name is required');
            setLoading(false);
            return;
        }
        
        if (!email.trim()) {
            setError('Email is required');
            setLoading(false);
            return;
        }
        
        if (!password || password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }
        
        if (userType === 'organizer' && !organization.trim()) {
            setError('Organization name is required for organizers');
            setLoading(false);
            return;
        }

        try {
            // Split full name into first and last name
            const nameParts = fullName.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || 'User'; // Default last name if not provided

            await register({
                email,
                password,
                firstName,
                lastName,
                role: userType,
                organization: userType === 'organizer' ? organization : '',
                position: userType === 'organizer' ? position : ''
            });

            // Redirect based on user type
            if (userType === 'organizer') {
                navigate('/organizer-dashboard');
            } else {
                navigate('/discovery');
            }
        } catch (err) {
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        setError('');
        setLoading(true);

        try {
            if (provider === 'Google') {
                // Redirect to backend Google OAuth with role parameter
                const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
                window.location.href = `${API_BASE_URL}/auth/google?role=${userType}`;
            } else {
                setError(`${provider} signup not implemented yet. Please use email signup.`);
            }
        } catch (error) {
            setError(`Failed to signup with ${provider}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex relative">
            {/* Back Button */}
            <BackButton />

            {/* Left Side - Motivational Content */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse-slow"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-start px-16 text-white">
                    <div className="animate-fadeInUp">
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            Discover Your
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                                Future
                            </span>
                            <br />
                            One Swipe at a Time!
                        </h1>
                        <p className="text-xl opacity-90 leading-relaxed">
                            Join thousands of students and professionals finding their perfect career match.
                            Your journey starts here.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join CampusNex</h2>
                            <p className="text-gray-600">Connect with your campus community</p>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => handleSocialLogin('Google')}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md"
                                disabled={loading}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="font-medium text-gray-700">Sign up with Google</span>
                            </button>

                            <button
                                onClick={() => handleSocialLogin('Facebook')}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md"
                                disabled={loading}
                            >
                                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">f</span>
                                </div>
                                <span className="font-medium text-gray-700">Sign up with Facebook</span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
                            </div>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleEmailSignup} className="space-y-6">
                            {/* Full Name Field */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your full name"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your email"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Create a password"
                                        required
                                        disabled={loading}
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        disabled={loading}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                            </div>

                            {/* User Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    I am signing up as:
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setUserType('student')}
                                        className={`p-3 rounded-lg border text-center transition-all duration-300 ${userType === 'student'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        disabled={loading}
                                    >
                                        <div className="font-medium">Student</div>
                                        <div className="text-xs opacity-75">Attend events</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUserType('organizer')}
                                        className={`p-3 rounded-lg border text-center transition-all duration-300 ${userType === 'organizer'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        disabled={loading}
                                    >
                                        <div className="font-medium">Event Organizer</div>
                                        <div className="text-xs opacity-75">Create & manage events</div>
                                    </button>
                                </div>
                            </div>

                            {/* Organizer-specific fields */}
                            {userType === 'organizer' && (
                                <>
                                    <div>
                                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                                            Organization/Club Name
                                        </label>
                                        <input
                                            type="text"
                                            id="organization"
                                            value={organization}
                                            onChange={(e) => setOrganization(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="e.g., Computer Science Club, Student Council"
                                            required={userType === 'organizer'}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                                            Position/Role
                                        </label>
                                        <input
                                            type="text"
                                            id="position"
                                            value={position}
                                            onChange={(e) => setPosition(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="e.g., President, Vice President, Faculty Advisor"
                                            required={userType === 'organizer'}
                                            disabled={loading}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
