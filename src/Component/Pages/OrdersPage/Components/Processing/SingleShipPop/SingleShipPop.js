import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import PieChart from './PieChart';
import StarRating from './StarRating';
import './SingleShipPop.css';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import shipNowAction from '../../../../../../redux/action/orders/shipNow';
import { BASE_URL_CORE } from '../../../../../../axios/config';
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


const SingleShipPop = ({ SingleShip, setSingleShip, shipingResponse, orderId }) => {
    const dispatch = useDispatch()
    const navigation = useNavigate();
    let authToken = Cookies.get("access_token")
    const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard);

    const handleClick = (param1, param2) => {
        axios.get(`${BASE_URL_CORE}/core-api/shipping/ship-order/${param2}/?courier_partner=${param1}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => {
                if (response?.data?.status) {
                    setSingleShip(false);
                    navigation('/Orders');
                    toast.success('Order successfully shipped!');
                    dispatch(shipNowAction(new Date()))
                    dispatch({ type: "PAYMENT_DATA_ACTION" });
                }
                else {
                    setSingleShip(true);
                    toast.error(response.data.message);
                }
            }).catch((error) => {
                customErrorFunction(error)
            });
    };

    const debouncedHandleClick = useCallback(
        debounce((param, orderId) => handleClick(param, orderId), 1500),
        []
    );

    const handleSubmit = (courier, orderId, shipCharge) => {
        if (paymentCard?.balance - shipCharge.toFixed(2) > paymentCard?.tolerance_limit) {
            debouncedHandleClick(courier, orderId);
        } else {
            Swal.fire({
                icon: "error",
                html: `
                <b>Please recharge the wallet!</b>
              `,
            });
        }

    };

    return (
        <section className={`single-ship-container ${SingleShip ? 'open' : ''}`}>
            <div className='d-flex justify-content-between p10 align-items-center'>
                {/* <h4 className='mb-0'>Choose Shipping Partner</h4>
                <button
                    onClick={handleClose}
                    className='btn close-button'
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button> */}
            </div>
            <div className='ss-container-main'>
                {/* Iterate over ship options and render details */}
                {shipingResponse && shipingResponse.map((option, index) => (
                    <div className='ship-container-row box-shadow shadow-sm' key={index}>
                        <div className='d-flex gap-2'>
                            <div className='img-container'>
                                <img src={option?.partner_image} alt={option?.partner_title} />
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                                <p className='fw-bold fs-large'>{option?.partner_title}</p>
                                <p>{"Delivering Excellence, Every Mile"}</p>
                                <p>RTO Charges: ₹{option.rto_charge}</p>
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
                            <p><strong>₹ {(option?.rate + option?.cod_charge + option?.early_cod_charge).toFixed(2)}</strong> <span>(Inclusive of all taxes )</span><br />
                                <span>Freight Charges: <strong>₹ {option?.rate}</strong></span><br />
                                <span>+ COD Charges: <strong>₹ {option?.cod_charge}</strong></span><br />
                                <span>+ Early COD Charges: <strong>₹ {option?.early_cod_charge}</strong></span><br />
                            </p>
                        </div>
                        <div className='d-flex flex-column gap-2 align-items-end'>
                            <button className='btn main-button' onClick={() => handleSubmit(option?.partner_keyword, orderId, option?.rate + option?.cod_charge + option?.early_cod_charge)}>Ship Now</button>
                            <p><span>EDD: <strong>N/A</strong></span></p>
                        </div>
                        {option?.is_recommended &&
                            <span className="recommended"></span>
                        }

                    </div>
                ))}
            </div>
        </section >
    );
}

export default SingleShipPop
