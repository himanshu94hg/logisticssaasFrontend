import React, { useState } from 'react';
import './FeedbackForm.css'
import CourierLogo from '../../../../../../assets/image/integration/Bluedart.png'

const FeedbackForm = () => {
    const [rating, setRating] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleRemarksChange = (event) => {
        setRemarks(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit form logic
        console.log({ rating, remarks });
    };

    return (
        <div className="details-container">
            <div className="preview-info">
                <p>Order Number: <strong>Abcd-1234</strong></p>
                <p>Order Date: <strong>1 Sep, 2024 || 10:00 AM</strong></p>
                <p>Courier: <span><img src={CourierLogo} alt="Courier Logo" width="24" /><strong> Bluedart</strong></span></p>
                <p>AWB number: <strong>GSWYU1234</strong></p>
            </div>

            {/* Feedback Form Section */}
            <section className="feedback-form">
                <form id="feedbackForm" onSubmit={handleSubmit}>
                    {/* Rating from 1 to 10 */}
                    <div className="feedback-rating">
                        <label htmlFor="rating">How likely are you to recommend us?</label>
                        <div className="rating-scale">
                            <div className="rating-options">
                                {[...Array(10)].map((_, i) => (
                                    <React.Fragment key={i + 1}>
                                        <input
                                            type="radio"
                                            id={`rate${i + 1}`}
                                            name="rating"
                                            value={i + 1}
                                            checked={rating === `${i + 1}`}
                                            onChange={handleRatingChange}
                                        />
                                        <label htmlFor={`rate${i + 1}`}>{i + 1}</label>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="rating-options-comment">
                                <span>Not at all likely (1)</span>
                                <span>(10) Extremely Likely</span>
                            </div>
                        </div>
                    </div>

                    {/* Remarks Input Box */}
                    <div className="remarks">
                        <label htmlFor="remarks">Additional Comments:</label>
                        <textarea
                            id="remarks"
                            name="remarks"
                            rows="4"
                            placeholder="Enter your comments here..."
                            value={remarks}
                            onChange={handleRemarksChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="submit-button">
                        <button type="submit">Submit Feedback</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default FeedbackForm;
