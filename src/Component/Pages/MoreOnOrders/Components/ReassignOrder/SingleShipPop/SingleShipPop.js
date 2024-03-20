import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import PieChart from './PieChart';
import StarRating from './StarRating';
import './SingleShipPop';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleShipPop = ({ reassignCard,SingleShip, setSingleShip,orderId}) => {
    const navigation = useNavigate();
    const dispatch = useDispatch()
    const [currentDate, setCurrentDate] = useState(new Date());
    const [shipingData, setShipingData] = useState([]);
    const moreorderCard = useSelector(state => state?.moreorderSectionReducer?.moreorderShipCard)

    useEffect(() => {
        if (shipingData && shipingData.length > 0) {
            dispatch({ type: "REASSIGN_SHIP_DATA_ACTION", payload: {"courier":shipingData,"order_id":orderId} });
        }
    }, [dispatch, shipingData, orderId]);

    useEffect(() => {
        if (moreorderCard !== null) {
            if (moreorderCard?.status === true) {
                toast.success(moreorderCard?.message);
                setSingleShip(false);
            } else {
                toast.error(moreorderCard?.message);
            }
        }
    }, [moreorderCard]);
    


    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };
    const dateAfter2Days = addDays(currentDate, 2);

    const handleSubmit = (option) => {
        setShipingData(option);
    };
    
    const handleClose = () => {
        setSingleShip(false);
    };
    return (
        <section className={`single-ship-container ${SingleShip ? 'open' : ''}`}>
            <div className='d-flex justify-content-between p10 align-items-center'>
                <h4 className='mb-0'>Choose Shipping Partner</h4>
                <button
                    onClick={handleClose}
                    className='btn close-button'
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <div className='ss-container-main'>
                {/* Iterate over ship options and render details */}
                {reassignCard && reassignCard?.map((option, index) => (
                    <div className='ship-container-row box-shadow shadow-sm' key={index}>
                        <div className='d-flex gap-2'>
                            <div className='img-container'>
                                <img src={option.partner_image} alt={option.partner_title} />
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                                <p>{option.partner_title}</p>
                                <p>{"Delivering Excellence, Every Mile"}</p>
                                <p>RTO Charges: ₹{0}</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <table className='performance-rating'>
                                <tbody>
                                    <tr>
                                        <td>Pickup Performance</td>
                                        <td><StarRating rating={4.5} /></td>
                                    </tr>
                                    <tr>
                                        <td>Delivery Performance</td>
                                        <td><StarRating rating={4.5} /></td>
                                    </tr>
                                    <tr>
                                        <td>NDR Performance</td>
                                        <td><StarRating rating={4.5} /></td>
                                    </tr>
                                    <tr>
                                        <td>RTO Performance</td>
                                        <td><StarRating rating={4.5} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="chart-container">
                                <PieChart rating={4.5} />
                                <p>Overall Rating</p>
                            </div>
                        </div>
                        <div className='ss-shipment-charges'>
                            <p><strong>₹ {(option.rate + option.cod_charge).toFixed(2)}</strong> <span>(Inclusive of all taxes )</span><br />
                                <span>Freight Charges: <strong>₹ {option.rate}</strong></span><br />
                                <span>+ COD Charges: <strong>₹ {option.cod_charge}</strong></span><br />
                                <span>+ Early COD Charges: <strong>₹ 0</strong></span><br />
                            </p>
                        </div>
                        <div className='d-flex flex-column gap-2 align-items-end'>
                            <button className='btn main-button' onClick={() => handleSubmit(option.partner_keyword)}>Ship Now</button>
                            <p><span>EDD: <strong>{formatDate(dateAfter2Days)}</strong></span></p>
                        </div>
                        <span className={`recommended ${true ? '' : 'd-none'}`}></span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SingleShipPop
