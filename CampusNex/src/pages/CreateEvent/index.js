// src/pages/CreateEvent/index.js
import React from 'react';
import { useCreateEvent } from './hooks/useCreateEvent';
import EventBasicInfo from './components/EventBasicInfo';
import EventSchedule from './components/EventSchedule';
import ImageUpload from './components/ImageUpload';
import EventSubmissionSuccess from './components/EventSubmissionSuccess';
import FormActions from './components/FormActions';
import Footer from '../../components/Footer';

const CreateEvent = () => {
    const {
        submitted,
        loading,
        error,
        imageFile,
        imagePreview,
        uploadingImage,
        form,
        categories,
        isAuthenticated,
        handleChange,
        handleImageChange,
        removeImage,
        handleSubmit,
        navigate
    } = useCreateEvent();

    // Show success message after successful submission
    if (submitted) {
        return <EventSubmissionSuccess />;
    }

    return (
        <main className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Create New Event
                        </h1>
                        <p className="text-lg text-gray-600">
                            Share your event with the campus community
                        </p>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* Authentication Check */}
                            {!isAuthenticated && (
                                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
                                    <p className="font-semibold">Authentication Required</p>
                                    <p className="mt-1">You need to be logged in to create an event.</p>
                                </div>
                            )}

                            {/* Basic Event Information */}
                            <EventBasicInfo
                                form={form}
                                categories={categories}
                                onChange={handleChange}
                            />

                            {/* Event Schedule */}
                            <EventSchedule
                                form={form}
                                onChange={handleChange}
                            />

                            {/* Image Upload */}
                            <ImageUpload
                                imageFile={imageFile}
                                imagePreview={imagePreview}
                                imageUrl={form.imageUrl}
                                uploadingImage={uploadingImage}
                                onImageChange={handleImageChange}
                                onImageUrlChange={handleChange}
                                onRemoveImage={removeImage}
                                error={error}
                            />

                            {/* Form Actions */}
                            <FormActions
                                loading={loading}
                                uploadingImage={uploadingImage}
                                isAuthenticated={isAuthenticated}
                                onCancel={() => navigate('/events')}
                            />
                        </form>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-8 text-center text-sm text-gray-600">
                        <p>
                            By creating an event, you agree to our{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:underline"
                                onClick={() => navigate('/terms')}
                            >
                                Terms of Service
                            </button>{' '}
                            and{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:underline"
                                onClick={() => navigate('/privacy')}
                            >
                                Privacy Policy
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default CreateEvent;