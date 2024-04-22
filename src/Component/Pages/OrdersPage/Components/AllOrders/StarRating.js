import React from 'react';

const StarRating = ({ rating }) => {
    const stars = Array.from({ length: rating }, (_, index) => index + 1); // Array representing each star up to the rating

    return (
        <>
            <div className="rating">
                {stars.map(starValue => (
                    <React.Fragment key={starValue}>
                        <input
                            value={starValue}
                            name="rate"
                            id={`star${starValue}`}
                            type="radio"
                            checked={starValue === rating}
                        />
                        <label title={rating} htmlFor={`star${starValue}`}>&#9733;</label>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};

export default StarRating;
