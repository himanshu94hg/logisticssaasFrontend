import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './RatingStars.css'

const RatingStars = ({ rating, maxRating = 5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="rating-stars">
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} color="#ffc107" />
            ))}
            {hasHalfStar && <FaStarHalfAlt color="#ffc107" />}
            {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={i} color="#ffc107" />
            ))}
        </div>
    );
};

export default RatingStars;
