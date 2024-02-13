import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Changed to faTimes for close icon
import PieChart from './PieChart';
import StarRating from './StarRating';
import shipOptions from './shipOptions.json';
import './SingleShipPop.css';

const SingleShipPop = ({ SingleShip, setSingleShip }) => {
    const handleClose = () => {
        setSingleShip(false); // Close the modal
    };

    return (
        <section className={`single-ship-container ${SingleShip ? 'open' : ''}`}>
            <div className='d-flex justify-content-end'>
                <button
                    onClick={handleClose} // Call handleClose function when close button is clicked
                    className='btn close-button'
                >
                    <FontAwesomeIcon icon={faTimes} /> {/* Changed to faTimes for close icon */}
                </button>
            </div>
            <div>
                {/* Iterate over ship options and render details */}
                {shipOptions.map((option, index) => (
                    <div className='ship-container-row' key={index}>
                        <div className='d-flex gap-2'>
                            <div className='img-container'>
                                <img src={option.logo} alt={option.name} /> {/* Use logo URL from option */}
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                                <p>{option.name}</p> {/* Use option's name */}
                                <p>{option.description}</p> {/* Use option's description */}
                                <p>RTO Charges: ₹{option.rtoCharges.toFixed(2)}</p> {/* Use option's RTO charges */}
                            </div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='performance-rating'>
                                <p>
                                    Pickup Performance <StarRating rating={option.pickup} />
                                </p>
                                <p>
                                    Delivery Performance <StarRating rating={option.delivery} />
                                </p>
                                <p>
                                    NDR Performance <StarRating rating={option.ndr} />
                                </p>
                                <p>
                                    RTO Performance <StarRating rating={option.rto} />
                                </p>
                            </div>
                            <div className="chart-container">
                                <PieChart rating={option.rating} />
                                <p>Overall Rating</p>
                            </div>
                        </div>
                        <div className='ss-shipment-charges'>
                            <p><strong>₹ 1450</strong> <span>(Inclusive of all taxes )</span><br />
                                <span>Freight Charges: <strong>₹ 1361.72</strong></span><br />
                                <span>+ COD Charges: <strong>₹ 88.5</strong></span><br />
                                <span>+ Early COD Charges: <strong>₹ 0</strong></span><br />
                            </p>
                        </div>
                        <div className='d-flex flex-column gap-2 align-items-end'>
                            <button className='btn main-button'>Ship Now</button>
                            <p><span>EDD: <strong>15 Feb 2024</strong></span></p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SingleShipPop;
