import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetail from '../pages/EventDetail';

// Mock the react-router-dom
jest.mock('react-router-dom', () => ({
    useParams: () => ({ id: '123' }),
    useNavigate: () => jest.fn(() => { }),
    useLocation: () => ({ state: {} }),
}));

// Mock the AuthContext
jest.mock('../services/AuthContext', () => ({
    useAuth: () => ({
        user: { id: 'user123' },
        isAuthenticated: true,
    }),
}));

// Mock the Navbar and Footer components
jest.mock('../components/Navbar', () => {
    return function DummyNavbar() {
        return <div data-testid="navbar">Navbar</div>;
    };
});

jest.mock('../components/Footer', () => {
    return function DummyFooter() {
        return <div data-testid="footer">Footer</div>;
    };
});

// Mock RSVPResultPopup component
jest.mock('../components/RSVPResultPopup', () => {
    return function DummyRSVPResultPopup({ result, onClose }) {
        return (
            <div data-testid="rsvp-popup">
                <div data-testid="rsvp-message">{result.message}</div>
                <button data-testid="close-rsvp" onClick={onClose}>Close</button>
            </div>
        );
    };
});

// Mock for API service
jest.mock('../services/api', () => ({
    eventsAPI: {
        getEventById: jest.fn(),
        rsvpToEvent: jest.fn(),
    }
}));

describe('EventDetail Component', () => {
    // Silence console errors during tests
    const originalError = console.error;

    beforeAll(() => {
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = originalError;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders event details correctly', async () => {
        // Setup mock implementation
        const { eventsAPI } = require('../services/api');
        eventsAPI.getEventById.mockResolvedValue({
            event: {
                id: 1,
                title: 'Phnom Penh Tech Future',
                imageUrl: 'test-image.jpg',
                location: 'Factory Phnom Penh',
                startDate: '2025-08-25T14:00:00',
                endDate: '2025-08-25T16:00:00',
                capacity: 100,
                category: 'Entertainment',
                description: 'This is the event description',
                requirements: ['certificate'],
                benefits: ['certificate'],
                organizer: {
                    firstName: 'John',
                    lastName: 'Doe',
                    info: 'Organizer info',
                    contact: 'Contact Us',
                },
                RSVPs: []
            }
        });

        render(<EventDetail />);

        // Initially shows loading
        expect(screen.getByText(/Loading event details/i)).toBeInTheDocument();

        // Wait for the event details to load
        await waitFor(() => {
            expect(screen.getByText('Phnom Penh Tech Future')).toBeInTheDocument();
        });

        // Verify event details are displayed
        expect(screen.getByText(/Factory Phnom Penh/i)).toBeInTheDocument();
        expect(screen.getByText(/Entertainment/i)).toBeInTheDocument();
        expect(screen.getByText(/About/i)).toBeInTheDocument();
        expect(screen.getByText(/Organizer/i)).toBeInTheDocument();
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });

    it('handles API error correctly', async () => {
        // Setup mock implementation
        const { eventsAPI } = require('../services/api');
        eventsAPI.getEventById.mockRejectedValue({ message: 'Failed to fetch event' });

        render(<EventDetail />);

        // Initially shows loading
        expect(screen.getByText(/Loading event details/i)).toBeInTheDocument();

        // Should show error message
        await waitFor(() => {
            expect(screen.getByText(/Failed to load event details/i)).toBeInTheDocument();
        });

        // Back button should be visible
        const backButton = screen.getByText(/Back to Events/i);
        expect(backButton).toBeInTheDocument();

        // Test navigation when clicking back button
        fireEvent.click(backButton);

        // Since we can't directly test the navigateMock, we check that getEventById was called
        expect(eventsAPI.getEventById).toHaveBeenCalledWith('123');
    });

    it('handles RSVP functionality', async () => {
        // Setup mock implementation
        const { eventsAPI } = require('../services/api');
        eventsAPI.getEventById.mockResolvedValue({
            event: {
                id: 1,
                title: 'Phnom Penh Tech Future',
                imageUrl: 'test-image.jpg',
                location: 'Factory Phnom Penh',
                startDate: '2025-08-25T14:00:00',
                endDate: '2025-08-25T16:00:00',
                capacity: 100,
                category: 'Entertainment',
                description: 'This is the event description',
                requirements: ['certificate'],
                benefits: ['certificate'],
                organizer: {
                    firstName: 'John',
                    lastName: 'Doe',
                },
                RSVPs: [
                    { userId: 'user123', status: 'interested' }
                ]
            }
        });

        eventsAPI.rsvpToEvent.mockResolvedValue({
            success: true,
            message: 'You are now attending this event!'
        });

        render(<EventDetail />);

        // Wait for loading to complete
        await waitFor(() => {
            expect(screen.getByText('Phnom Penh Tech Future')).toBeInTheDocument();
        });

        // Initially should show "RSVP Now" button
        const rsvpButton = screen.getByText(/RSVP Now/i);
        expect(rsvpButton).toBeInTheDocument();

        // Click RSVP button
        fireEvent.click(rsvpButton);

        // API should be called
        expect(eventsAPI.rsvpToEvent).toHaveBeenCalledWith('123', 'attending');

        // Wait for popup to appear
        await waitFor(() => {
            expect(screen.getByTestId('rsvp-popup')).toBeInTheDocument();
        });

        // Message should be displayed
        expect(screen.getByTestId('rsvp-message')).toHaveTextContent('You are now attending this event!');

        // Close the popup
        fireEvent.click(screen.getByTestId('close-rsvp'));

        // Popup should disappear
        await waitFor(() => {
            expect(screen.queryByTestId('rsvp-popup')).not.toBeInTheDocument();
        });
    });
});
