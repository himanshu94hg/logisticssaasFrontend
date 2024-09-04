import './SingleShipPop';
import Swal from 'sweetalert2';
import PieChart from './PieChart';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RatingStars from '../../../../../common/RatingStars/RatingStars';

const SingleShipPop = ({ reassignCard, SingleShip, setSingleShip, orderId, partnerList, setLoader }) => {
    const dispatch = useDispatch()
    const [shipingData, setShipingData] = useState(false);
    const { screenWidthData } = useSelector(state => state?.authDataReducer)
    const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard);
    const moreorderCard = useSelector(state => state?.moreorderSectionReducer?.moreorderShipCard)

    const handleSubmit = (option, shipCharge) => {
        setLoader(true)
        if (paymentCard?.balance - shipCharge.toFixed(2) > paymentCard?.tolerance_limit) {
            dispatch({ type: "REASSIGN_SHIP_DATA_ACTION", payload: { "courier": option, "order_id": orderId } });
            setShipingData(true);
            setSingleShip(false)
            // setLoader(false)
        } else {
            setSingleShip(false)
            setLoader(false)
            Swal.fire({
                icon: "error",
                html: `
                <b>Please recharge the wallet!</b>
              `,
            });
        }
    };

    useEffect(() => {
        if (shipingData === true) {
            if (moreorderCard?.status) {
                setSingleShip(false);
            }
            setShipingData(false);
        }
    }, [moreorderCard]);

    const handleClose = () => {
        setSingleShip(false);
    };

    return (
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
                    </>}
            </div>
            <div className='ss-container-main'>
                {reassignCard && reassignCard?.map((option, index) => (
                    <div className='ship-container-row box-shadow shadow-sm' key={index}>
                        <div className='d-flex gap-2'>
                            <div className='img-container'>
                                {option?.partner_keyword && <img src={partnerList[option?.partner_keyword]["image"]} alt='Partner' />}
                            </div>
                            <div className='d-flex flex-column justify-content-center'>
                                <p>{option?.partner_keyword && partnerList[option?.partner_keyword]["title"]}</p>
                                <p>{"Delivering Excellence, Every Mile"}</p>
                                <p>RTO Charges: ₹{option.rto_charge.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-2 ship-ratings'>
                            <table className='performance-rating'>
                                <tbody>
                                    <tr>
                                        <td>Pickup Performance</td>
                                        <td><RatingStars rating={4.5} /></td>
                                    </tr>
                                    <tr>
                                        <td>Delivery Performance</td>
                                        <td><RatingStars rating={4.5} /></td>
                                    </tr>
                                    <tr>
                                        <td>NDR Performance</td>
                                        <td><RatingStars rating={4.5} /></td>
                                    </tr>
                                    <tr>
                                        <td>RTO Performance</td>
                                        <td><RatingStars rating={4.5} /></td>
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
                                <span>Freight Charges: <strong>₹ {option.rate.toFixed(2)}</strong></span><br />
                                <span>+ COD Charges: <strong>₹ {option.cod_charge.toFixed(2)}</strong></span><br />
                                <span>+ Early COD Charges: <strong>₹  {option?.early_cod_charge.toFixed(2)}</strong></span><br />
                            </p>
                        </div>
                        <div className='d-flex flex-column gap-2 align-items-end'>
                            <button className='btn main-button' onClick={() => handleSubmit(option.partner_keyword, option?.rate + option?.cod_charge + option?.early_cod_charge)}>Ship Now</button>
                            <p><span>EDD: <strong>{option?.estimate_days} days</strong></span></p>
                        </div>
                        {option?.is_recommended &&
                            <span className="recommended"></span>
                        }
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SingleShipPop
