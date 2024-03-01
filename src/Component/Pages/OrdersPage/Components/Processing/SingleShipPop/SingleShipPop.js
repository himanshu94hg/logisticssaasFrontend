import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import PieChart from './PieChart';
import StarRating from './StarRating';
import './SingleShipPop.css';
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const SingleShipPop = ({ SingleShip, setSingleShip, orderId }) => {
    const navigation = useNavigate();
    const [shipingResponse, setShipingResponse] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());

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

    const sellerId = Cookies.get("user_id");
    let authToken = Cookies.get("access_token")
    useEffect(() => {
        if (orderId !== null) {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            };

            axios.get(`http://65.2.38.87:8081/core-api/shipping/ship-rate-card/?order_id=${orderId}&seller_id=${sellerId}`, config)
                .then((response) => {
                    setShipingResponse(response.data);
                    console.log("Response", response);
                }).catch((error) => {
                    console.log("Error", error)
                });
        }
    }, [orderId]);

    const handleSubmit = (courier) => {
        axios.get(`http://65.2.38.87:8081/core-api/shipping/ship-order/${orderId}/?courier_partner=${courier}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => {
                console.log("Response", response);
                if (response.data.status === true) {
                    setSingleShip(false);
                    navigation('/Orders');
                    toast.success('Order successfully shipped!');
                }
                else {
                    toast.error(response.data.message, {
                        onClose: () => {
                            setSingleShip(false);
                        }
                    });
                }
            }).catch((error) => {
                toast.error("Pincode is not serviceable! ")
            });
    };
    console.log("partner", shipingResponse);
    const handleClose = () => {
        setSingleShip(false); // Close the modal
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
                {shipingResponse && shipingResponse.map((option, index) => (
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
