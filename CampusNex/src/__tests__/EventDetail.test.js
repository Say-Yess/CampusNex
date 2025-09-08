import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetail from '../pages/EventDetail';

const mockEvent = {
    id: 1,
    title: 'Phnom Penh Tech Future',
    image: '',
    location: 'Factory Phnom Penh',
    spotsLeft: 50,
    category: 'Entertainment',
    date: 'Monday, Aug 25, 2025',
    time: '2:00 PM - 4:00 PM',
    about: 'About event',
    requirements: ['certificate'],
    benefits: ['certificate'],
    organizer: {
        info: 'Organizer info',
        contact: 'Contact Us',
    },
};

describe('EventDetail', () => {
    test('renders event details', () => {
        render(<EventDetail location={{ state: { event: mockEvent } }} />);
        expect(screen.getByText(/Phnom Penh Tech Future/i)).toBeInTheDocument();
        expect(screen.getByText(/Entertainment/i)).toBeInTheDocument();
        expect(screen.getByText(/spots left/i)).toBeInTheDocument();
        expect(screen.getByText(/About/i)).toBeInTheDocument();
        expect(screen.getByText(/Requirements/i)).toBeInTheDocument();
        expect(screen.getByText(/Benefit/i)).toBeInTheDocument();
        expect(screen.getByText(/Organizer/i)).toBeInTheDocument();
    });

    test('shows RSVP popup and result on confirm', () => {
        render(<EventDetail location={{ state: { event: mockEvent } }} />);
        fireEvent.click(screen.getByText(/Join Now/i));
        expect(screen.getByText(/join for an amazing event/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/i’ll attend/i));
        expect(screen.getByText(/RSVP confirmed/i)).toBeInTheDocument();
    });

    test('shows RSVP popup and result on cancel', () => {
        render(<EventDetail location={{ state: { event: mockEvent } }} />);
        fireEvent.click(screen.getByText(/Join Now/i));
        expect(screen.getByText(/join for an amazing event/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/can’t make it/i));
        expect(screen.getByText(/thank you for letting us know/i)).toBeInTheDocument();
    });
});
