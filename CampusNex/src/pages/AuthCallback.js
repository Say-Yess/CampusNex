import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');
        const error = searchParams.get('error');

        if (error) {
            console.error('OAuth error:', error);
            navigate('/login?error=oauth_failed');
            return;
        }

        if (token && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));

                // Store token in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                // Update auth context
                setUser(user);

                // Navigate based on user role
                if (user.role === 'organizer') {
                    navigate('/organizer-dashboard');
                } else {
                    navigate('/discovery');
                }
            } catch (err) {
                console.error('Error parsing user data:', err);
                navigate('/login?error=invalid_response');
            }
        } else {
            navigate('/login?error=missing_data');
        }
    }, [searchParams, navigate, setUser]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Completing authentication...</p>
            </div>
        </div>
    );
};

export default AuthCallback;