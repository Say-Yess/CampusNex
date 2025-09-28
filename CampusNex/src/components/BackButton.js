import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to = '/' }) => {
    const navigate = useNavigate();

    const handleBackClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('BackButton clicked, navigating to:', to);
        navigate(to);
    };

    return (
        <button
            onClick={handleBackClick}
            className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white border border-blue-700 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer shadow-md"
            style={{ position: 'fixed' }}
        >
            <ArrowLeft size={18} />
            <span className="font-medium">Back to Home</span>
        </button>
    );
};

export default BackButton;