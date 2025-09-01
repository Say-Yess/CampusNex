// src/components/CategoryCard.js
import React from 'react';

const CategoryCard = ({ name }) => (
    <div className="flex flex-col items-center gap-4">
        <div className="w-40 h-40 bg-gray-200 rounded-full mb-2" />
        <div className="text-center text-[#2D2C3C] text-2xl font-open-sans font-semibold">{name}</div>
    </div>
);

export default CategoryCard;
