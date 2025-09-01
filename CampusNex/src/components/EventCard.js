// src/components/EventCard.js
import React from 'react';

const EventCard = ({ title, date, venue, time, category, image, interested }) => (
    <div className="flex bg-white rounded-xl shadow-md p-4 w-[600px] mb-6">
        <div className="w-72 h-52 bg-gray-300 rounded-lg flex items-center justify-center relative">
            {/* Replace with <img src={image} ... /> when available */}
            <span className="text-white text-xl font-inter font-normal capitalize">Event image</span>
            <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                {/* Interested icon */}
                <span className={`w-6 h-6 rounded-full ${interested ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
            </div>
            <div className="absolute left-0 bottom-0 px-3 py-1 bg-orange-500 rounded-tr-lg text-main text-lg font-poppins font-semibold">
                {category}
            </div>
        </div>
        <div className="flex flex-col justify-between ml-6 flex-1">
            <div>
                <h2 className="text-main text-2xl font-open-sans font-semibold mb-2">{title}</h2>
                <div className="flex items-center space-x-2 text-gray-600 text-lg font-open-sans font-bold mb-1">
                    <span>{date}</span>
                    <span>|</span>
                    <span>{venue}</span>
                </div>
                <div className="text-gray-600 text-lg font-open-sans font-normal uppercase mb-2">{time}</div>
            </div>
        </div>
    </div>
);

export default EventCard;
