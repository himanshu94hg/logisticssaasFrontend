import axios from "axios";
import './SingleShipPop.css';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { debounce } from 'lodash';
import PieChart from './PieChart';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shipNowAction from '../../../../../../redux/action/orders/shipNow';
import { BASE_URL_CORE } from '../../../../../../axios/config';
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';
import RatingStars from "../../../../../common/RatingStars/RatingStars";
import NoCourier from '../../../../../../assets/image/NoCourier.png'
import AirModeIcon from "../../../../../common/Icons/AirModeIcon";
import SurfaceModeIcon from "../../../../../common/Icons/SurfaceModeIcon";


const SingleShipPop = ({ setLoader, SingleShip, setSingleShip, shipingResponse, orderId, setDataRefresh, Exitpop, setExitpop, CompName }) => {
    const dispatch = useDispatch()
    const navigation = useNavigate();
    let authToken = Cookies.get("access_token")
    const partnerList = JSON.parse(localStorage.getItem('partnerList'));
    const { screenWidthData } = useSelector(state => state?.authDataReducer)
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
                    toast.success('Order Shipped Successfully!');
                    dispatch(shipNowAction(new Date()))
                    dispatch({ type: "PAYMENT_DATA_ACTION" });
                    setLoader(false)
                }
                else {
                    setSingleShip(true);
                    setLoader(false)
                    toast.error(response.data.message);
                }
            }).catch((error) => {
                customErrorFunction(error)
                setLoader(false)
            });
    };

    const debouncedHandleClick = useCallback(
        debounce((param, orderId) => handleClick(param, orderId), 700),
        []
    );

    const handleSubmit = (courier, orderId, shipCharge) => {
        setLoader(true)
        if (paymentCard?.balance - shipCharge.toFixed(2) > paymentCard?.tolerance_limit) {
            debouncedHandleClick(courier, orderId);
            setSingleShip(false)
        } else {
            Swal.fire({
                icon: "error",
                html: `
                <b>Please recharge the wallet!</b>
              `,
            });
            setLoader(false)
        }
    };

    const handleDeleteOrder = () => {
        dispatch({ type: "DELETE_ORDERS_ACTION", payload: orderId })
        setDataRefresh(new Date())
        setSingleShip(false)
        setExitpop(false)
    }

    const handleClose = () => {
        if (CompName === "Quick") {
            setExitpop(true)
        }
        else {
            setSingleShip(false);
        }

    };

    const [shippingType, setShippingType] = useState("b2c"); // Default to a key
    const [buttons, setButtons] = useState({
        b2c: "B2C",
        hyperlocal: "Hyper local",
        b2b: "B2B"
    });

    const handleSelect = (selectedIndex) => {
        const selectedKey = Object.keys(buttons)[selectedIndex]; // Get key by index
        const selectedValue = buttons[selectedKey]; // Get corresponding value

        const newOrder = {
            [selectedKey]: selectedValue, // Keep the same order but update
            ...Object.fromEntries(Object.entries(buttons).filter(([key]) => key !== selectedKey)) // Filter out selected key
        };

        setButtons(newOrder); // Update buttons (if needed)
        setShippingType(selectedKey); // Set shippingType as the selected key
    };

    useEffect(() => {
        console.log(shippingType, "shippingType")
    }, [shippingType])

    const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);
    let filteredOptions = []
    filteredOptions = shipingResponse?.filter(option =>
        userData?.code === "SE-200562"
            ? shippingType === option.courier_type

            : shippingType !== ""
    )

    const firstObject = Array.isArray(shipingResponse) && shipingResponse.length > 0
        ? shipingResponse[0]
        : null;

    console.log(firstObject?.hyperlocal_message, "shipingResponse");
    // let filteredOptions = []
    // if (userData?.code === "SE-200562") {
    //     filteredOptions = shipingResponse?.filter(option => shippingType !== "");
    // }
    // else {
    // const filteredOptions = shipingResponse?.filter(option => shippingType === option.courier_type);
    // }

    return (
        <>
            <section className={`single-ship-container ${SingleShip ? 'open' : ''}`}>
                <div className='d-flex justify-content-between p-1 align-items-center'>
                    {
                        screenWidthData < 544 &&
                        <>
                            <h4 className='mb-0 invisible'>Choose Shipping Partner</h4>
                            <button
                                onClick={handleClose}
                                className='btn close-button'
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </>
                    }
                </div>
                <div className='ss-container-main'>
                    {filteredOptions?.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div className='ship-container-row box-shadow shadow-sm' key={index}>
                                <div className='d-flex gap-2'>
                                    <div className='img-container'>
                                        {option?.partner_keyword && <img src={partnerList[option?.partner_keyword]["image"]} alt='Partner' />}
                                    </div>
                                    <div className='d-flex flex-column justify-content-center'>
                                        <p className='fw-bold fs-large'>{option?.partner_keyword && partnerList[option?.partner_keyword]["title"]}</p>
                                        <p>{"Delivering Excellence, Every Mile"}</p>
                                        <p>RTO Charges: ₹{option.rto_charge.toFixed(2)}</p>
                                        <div className="courier-mode">{option?.courier_mode === "air" ? <AirModeIcon /> : <SurfaceModeIcon />}</div>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-2 ship-ratings'>
                                    <table className='performance-rating'>
                                        <tbody>
                                            <tr>
                                                <td>Pickup Performance</td>
                                                <td><RatingStars rating={option?.pickup_rating} /></td>
                                            </tr>
                                            <tr>
                                                <td>Delivery Performance</td>
                                                <td><RatingStars rating={option?.delivery_rating} /></td>
                                            </tr>
                                            <tr>
                                                <td>NDR Performance</td>
                                                <td><RatingStars rating={option?.ndr_rating} /></td>
                                            </tr>
                                            <tr>
                                                <td>RTO Performance</td>
                                                <td><RatingStars rating={option?.rto_rating} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="chart-container">
                                        <PieChart rating={4} />
                                        <p>Overall Rating</p>
                                    </div>
                                </div>
                                <div className='ss-shipment-charges'>
                                    <p><strong>₹ {(option?.rate + option?.cod_charge + option?.early_cod_charge).toFixed(2)}</strong> <span>(Inclusive of all taxes )</span><br />
                                        <span>Freight Charges: <strong>₹ {(option?.rate).toFixed(2)}</strong></span><br />
                                        <span>+ COD Charges: <strong>₹ {(option?.cod_charge).toFixed(2)}</strong></span><br />
                                        <span>+ Early COD Charges: <strong>₹ {(option?.early_cod_charge).toFixed(2)}</strong></span><br />
                                    </p>
                                </div>
                                <div className='d-flex flex-column gap-2 align-items-end'>
                                    <button className='btn main-button' onClick={() => handleSubmit(option?.partner_keyword, orderId, option?.rate + option?.cod_charge + option?.early_cod_charge)}>Ship Now</button>
                                    <p><span>EDD: <strong>{option?.estimate_days} days</strong></span></p>
                                </div>
                                {option?.is_recommended &&
                                    <span className="recommended"></span>
                                }
                            </div>
                        ))
                    ) : (
                        <div className="no-courier">
                            <img src={NoCourier} className="no-courier-image" alt="No Courier Available" />
                            <p>{firstObject?.hyperlocal_message}</p>
                        </div>
                    )}
                </div>
                {
                    userData?.code === "SE-200562" &&
                    <section className="tab-ui">
                        <div>
                            {Object.entries(buttons).map(([key, label], index) => (
                                <button
                                    key={key}
                                    className={`btn ${shippingType === key ? "active" : ""}`} // Set active based on shippingType (key)
                                    onClick={() => handleSelect(index)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </section>
                }
            </section>
            <section className={`quick-ship-exit ${Exitpop && 'open'}`}>
                <div className='confirmation-header'>
                    <h4 className='mb-0'>Please Confirm!</h4>
                </div>
                <div className='confirmation-body'>
                    <div>
                        <h6>Are you sure you want to exit?</h6>
                        <p className='text-danger'><strong>Note:</strong> Your Order is created and will be deleted on exit.</p>
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
                        <button onClick={() => setExitpop(false)} className='btn cancel-button'>Cancel</button>
                        <button onClick={() => handleDeleteOrder()} className='btn main-button'>Yes, Delete Order</button>
                    </div>
                </div>
            </section>


        </>
    );
}

export default SingleShipPop
