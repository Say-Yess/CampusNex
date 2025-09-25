// src/__tests__/Home.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { eventsAPI } from '../services/api';

// Mock the API
jest.mock('../services/api', () => ({
    eventsAPI: {
        getAllEvents: jest.fn()
    }
}));

// Mock React Router
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
}));

// Mock components
jest.mock('../components/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../components/PrimaryButton', () => ({ children, onClick }) =>
    <button data-testid="primary-button" onClick={onClick}>{children}</button>
);

describe('Home Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders carousel with highlighted events', async () => {
        // Mock API response
        const mockEvents = {
            events: [
                {
                    id: 1,
                    title: 'Tech Conference 2025',
                    imageUrl: 'https://example.com/image1.jpg'
                },
                {
                    id: 2,
                    title: 'Startup Weekend',
                    imageUrl: 'https://example.com/image2.jpg'
                },
                {
                    id: 3,
                    title: 'AI Workshop',
                    imageUrl: 'https://example.com/image3.jpg'
                }
            ]
        };

        eventsAPI.getAllEvents.mockResolvedValue(mockEvents);

        // Render component
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        // Check loading state
        expect(screen.getByRole('status')).toBeInTheDocument();

        // Wait for events to load
        await waitFor(() => {
            // Should display event titles
            expect(screen.getByText('Tech Conference 2025')).toBeInTheDocument();
        });

        // Check carousel navigation dots
        const carouselDots = screen.getAllByRole('button', { name: /go to slide/i });
        expect(carouselDots).toHaveLength(3);
    });

    test('shows error state when API fails', async () => {
        // Mock API error
        eventsAPI.getAllEvents.mockRejectedValue(new Error('API Error'));

        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        // Wait for error state
        await waitFor(() => {
            expect(screen.getByText('Unable to load events')).toBeInTheDocument();
        });
    });
});