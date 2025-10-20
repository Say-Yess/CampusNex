import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import CreateEventForm from '../components/CreateEventForm';
import { createEvent } from '../services/api/events';
import { ArrowLeft, Calendar, Users, MapPin, AlertCircle } from 'lucide-react';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Check if user is authenticated and is an organizer
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Check if user has organizer role or organization
    if (!user || (!user.organization && user.role !== 'organizer')) {
      navigate('/dashboard');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  const handleEventSubmit = async (eventData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await createEvent(eventData);

      if (response.success) {
        setSuccess(true);
        // Show success message briefly, then navigate
        setTimeout(() => {
          navigate('/events');
        }, 2000);
      } else {
        throw new Error(response.error || 'Failed to create event');
      }
    } catch (err) {
      console.error('Event creation error:', err);
      setError(err.message || 'Failed to create event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  // Show loading state while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message if not an organizer
  if (!user.organization && user.role !== 'organizer') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You need to be registered as an organizer to create events.
          </p>
          <button
            onClick={() => navigate('/register-organizer')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mr-3"
          >
            Become an Organizer
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleCancel}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Create New Event</h1>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {user.organization || 'Event Organizer'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Event Created Successfully!
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  Your event has been created and is now visible to students. Redirecting to events page...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error Creating Event
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Page Description */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">Event Creation Guidelines</h2>
              <p className="mt-1 text-sm text-gray-600">
                Create engaging events for the campus community. Make sure to provide clear descriptions,
                accurate dates and times, and realistic capacity limits.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                  Include specific location details
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-green-500" />
                  Set realistic dates and times
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-purple-500" />
                  Consider venue capacity limits
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Creation Form */}
        <div className="bg-white rounded-lg shadow-sm">
          <CreateEventForm
            onSubmit={handleEventSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            organizerInfo={{
              name: user.name,
              organization: user.organization,
              position: user.position
            }}
          />
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">💡 Tips for Successful Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <strong>📝 Clear Descriptions:</strong> Include what participants will learn or experience
            </div>
            <div>
              <strong>📸 Great Images:</strong> Use high-quality, relevant images to attract attendees
            </div>
            <div>
              <strong>⏰ Timing:</strong> Consider your audience's schedule (avoid exam periods)
            </div>
            <div>
              <strong>📍 Accessibility:</strong> Choose easily accessible venues with clear directions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;