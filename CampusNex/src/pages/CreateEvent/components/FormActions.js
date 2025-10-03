// src/pages/CreateEvent/components/FormActions.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormActions = ({ loading, uploadingImage, error }) => {
    const navigate = useNavigate();

    return (
        <div>
            {error && (
                <div className="text-red-500 text-center mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    {error}
                </div>
            )}
            <div className="flex gap-4 mt-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold flex-1 hover:bg-gray-300 transition-colors duration-200"
                    disabled={loading || uploadingImage}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold flex-1 hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                    disabled={loading || uploadingImage}
                >
                    <ButtonContent
                        loading={loading}
                        uploadingImage={uploadingImage}
                    />
                </button>
            </div>
        </div>
    );
};

const ButtonContent = ({ loading, uploadingImage }) => {
    const LoadingSpinner = () => (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0l3 3-3 3v4a4 4 0 100 8h8l-3-3 3-3v4z"></path>
        </svg>
    );

    if (uploadingImage) {
        return (
            <>
                <LoadingSpinner />
                Uploading Image...
            </>
        );
    }

    if (loading) {
        return (
            <>
                <LoadingSpinner />
                Creating Event...
            </>
        );
    }

    return 'Create Event';
};

export default FormActions;