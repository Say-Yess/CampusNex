// src/components/EventCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button } from './ui';

const EventCard = ({
    id,
    title,
    date,
    time,
    venue,
    category,
    description,
    registered,
    image,
    onJoin,
    isAuthenticated = false
}) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/events/${id}`);
    };

    // Truncate description if it's too long
    const truncatedDescription = description?.length > 120
        ? `${description.substring(0, 120)}...`
        : description;

    return (
        <Card
            variant="elevated"
            className="w-full flex flex-col bg-neutral-50 h-[420px] overflow-hidden"
            padding="none"
        >
            {/* Image section */}
            <div className="relative h-48 w-full bg-neutral-200 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary-50 to-secondary-50 flex items-center justify-center">
                        <span className="text-neutral-500">No image available</span>
                    </div>
                )}

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                    <Badge variant="primary" size="md">{category}</Badge>
                </div>
            </div>

            {/* Content section */}
            <div className="flex flex-col flex-grow p-4">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 mb-4 flex-grow">{truncatedDescription}</p>

                {/* Event details */}
                <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex items-center text-sm text-neutral-700">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {venue}
                    </div>
                    <div className="flex items-center text-sm text-neutral-700">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {date} • {time}
                    </div>
                    <div className="flex items-center text-sm font-medium text-primary-700">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {registered} registered
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2 mt-auto">
                    <Button
                        variant="tertiary"
                        size="sm"
                        onClick={handleDetailsClick}
                        className="flex-1"
                    >
                        View Details
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={onJoin}
                        className="flex-1"
                        title={!isAuthenticated ? "Login required to join events" : ""}
                    >
                        {isAuthenticated ? "Join Now" : "Join (Login Required)"}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default EventCard;
