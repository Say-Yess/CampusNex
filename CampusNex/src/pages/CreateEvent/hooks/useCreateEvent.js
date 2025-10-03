// src/pages/CreateEvent/hooks/useCreateEvent.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsAPI } from '../../../services/api';
import { useAuth } from '../../../services/AuthContext';

export const useCreateEvent = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);

    const [form, setForm] = useState({
        title: '',
        startDate: '',
        endDate: '',
        location: '',
        category: '',
        description: '',
        capacity: '',
        imageUrl: ''
    });

    const categories = [
        'Concerts & Gigs',
        'Festivals & Lifestyle',
        'Business & Networking',
        'Food & Drinks',
        'Performing Arts',
        'Sports & Outdoors',
        'Exhibitions',
        'Workshops, Conferences & Classes'
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Image file size must be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }

            setImageFile(file);
            setError('');

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file) => {
        // For demo purposes, we'll create a mock upload
        // In a real app, you'd upload to a service like Firebase Storage, AWS S3, etc.
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock URL - in reality this would be the uploaded image URL
                resolve(`https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`);
            }, 2000);
        });
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview('');
        setForm({ ...form, imageUrl: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/create-event' } });
            return;
        }

        setLoading(true);
        setError('');

        try {
            let imageUrl = form.imageUrl;

            // Upload image if one was selected
            if (imageFile) {
                setUploadingImage(true);
                try {
                    imageUrl = await uploadImage(imageFile);
                } catch (uploadError) {
                    console.error('Image upload failed:', uploadError);
                    setError('Failed to upload image. Event will be created without image.');
                    imageUrl = null;
                } finally {
                    setUploadingImage(false);
                }
            }

            // Format the event data for API
            const eventData = {
                title: form.title,
                startDate: new Date(form.startDate).toISOString(),
                endDate: new Date(form.endDate).toISOString(),
                location: form.location,
                category: form.category,
                description: form.description,
                capacity: form.capacity ? Number(form.capacity) : null,
                imageUrl: imageUrl
            };

            // Call the API to create event
            await eventsAPI.createEvent(eventData);
            setSubmitted(true);
        } catch (err) {
            setError(err.message || 'Failed to submit event. Please try again.');
        } finally {
            setLoading(false);
            setUploadingImage(false);
        }
    };

    return {
        // State
        submitted,
        loading,
        error,
        imageFile,
        imagePreview,
        uploadingImage,
        form,
        categories,
        user,
        isAuthenticated,

        // Actions
        handleChange,
        handleImageChange,
        removeImage,
        handleSubmit,

        // Navigation
        navigate
    };
};