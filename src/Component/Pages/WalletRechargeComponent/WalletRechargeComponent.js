import React, { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './WalletRechargeComponent.css';
import ccAvenue from '../../../assets/image/logo/ccAvenue.png';
import RazorpayImg from '../../../assets/image/logo/Razorpay.png';
import redeemIcon from '../../../assets/image/icons/redeemIcon.png';
import { useDispatch, useSelector } from 'react-redux';

const WalletRechargeComponent = (props) => {
    const dispatch = useDispatch()
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [paymentMode, setPaymentMode] = useState('credit_card');
    const [couponCode, setCouponCode] = useState('');
    const [Razorpay, isLoaded] = useRazorpay();

    useEffect(() => {
        dispatch({ type: "PAYMENT_DATA_ACTION" });
        dispatch({ type: "CONFIGURATION_DATA_ACTION" });
    }, [dispatch]);

    const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard)
    const paymentSetCard = useSelector(state => state?.paymentSectionReducer?.paymentSetCard)
    const configurationCard = useSelector(state => state?.paymentSectionReducer.configurationCard)

    const razorpayKey = configurationCard?.[0]?.razorpay_key;


    useEffect(() => {
        if (paymentCard !== null && paymentSetCard !== null) {
            localStorage.setItem('paymentCard', JSON.stringify(paymentCard));
            localStorage.setItem('paymentSetCard', JSON.stringify(paymentSetCard));
        }
    }, [paymentCard, paymentSetCard]);

    
    const handleRechargeAmountChange = (event) => {
        setRechargeAmount(event.target.value);
    };

    const handlePaymentModeChange = (event) => {
        setPaymentMode(event.target.value);
    };

    const handleCouponCodeChange = (event) => {
        setCouponCode(event.target.value);
    };

    const handlePredefinedAmountClick = (amount) => {
        setRechargeAmount(amount.toString());
    };

    const handleAddCoupon = () => {
    };

    const handleRecharge = useCallback(async () => {
        try {
            const options = {
                key: razorpayKey,
                amount: (rechargeAmount) * 100,
                currency: "INR",
                name: "Shipease",
                description: "Wallet Recharge",
                image: "https://example.com/your_logo",
                prefill: {
                    name: "Shipease",
                    email: "nitesh.singh@shipease.in",
                    contact: "6352256974",
                },
                notes: {
                    address: "Testing Address",
                },
                theme: {
                    color: "3399cc",
                },
                handler: async (response) => {
                    if (response.razorpay_payment_id) {
                        let data = JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            amount: rechargeAmount,
                            description: options.description
                        });
                        dispatch({ type: "PAYMENT_SET_DATA_ACTION", payload: data });

                    } else {
                    }
                }
            };

            const rzpay = new Razorpay(options);
            rzpay.open();
        } catch (error) {
        }
    }, [Razorpay, rechargeAmount, dispatch]);
    

    return (
        <>
            <section className={`wallet-container ${props.WalletRecharge ? 'show' : ''}`}>
                <div className='wallet-box'>
                    <button
                        onClick={() => props.setWalletRecharge(!props.WalletRecharge)}
                        className='btn close-button'
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className='wallet-inner-bg'>
                        <div className='balance-container'>
                            <h4 className='my-3'>Your Wallet</h4>
                            <div className='balance-amount'>
                                <p>₹</p>
                                <p className='fw-bold font30'>{paymentSetCard?.balance ?? paymentCard?.balance}</p>
                            </div>
                            <p className='font13'>Current Wallet Amount</p>
                        </div>
                        <label className='d-flex flex-column mb-3 px-3'>
                            <span style={{ fontSize: '0.9rem' }}>Enter Amount in Multiples of 100 Below</span>
                            <input className='input-field' type="text" value={rechargeAmount} onChange={handleRechargeAmountChange} />
                            <span className='font12 text-sh-primary fw-bold'>Min value:₹500 & Max value: ₹50,00,000</span>
                        </label>
                        <div className='d-flex flex-column my-3 px-3'>
                            <span style={{ fontSize: '0.9rem' }}>Or Select From Below:</span>
                            <div className='d-flex gap-3'>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(2000)}>2000</button>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(5000)}>5000</button>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(10000)}>10000</button>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(20000)}>20000</button>
                            </div>
                        </div>
                        <label className='d-flex gap-3 my-3 px-3'>
                            <span style={{ fontSize: '0.9rem' }}>Payment Mode:</span>
                            <div className='d-flex gap-2'>
                                <label className='d-flex gap-1 align-items-center'>
                                    <input
                                        type="radio"
                                        value="credit_card"
                                        checked={paymentMode === 'credit_card'}
                                        onChange={handlePaymentModeChange}
                                    />
                                    <img src={RazorpayImg} alt="Razorpay" height={20} />
                                </label>
                                <label className='d-flex gap-1 align-items-center'>
                                    <input
                                        type="radio"
                                        value="paypal"
                                        checked={paymentMode === 'paypal'}
                                        onChange={handlePaymentModeChange}
                                    />
                                    <img src={ccAvenue} alt="ccAvenue" height={15} />
                                </label>
                            </div>
                        </label>
                        <div className='d-flex flex-column gap my-3 px-3'>
                            <span style={{ fontSize: '0.9rem' }}>Have a redeem code?</span>
                            <div className='d-flex w-100 align-items-center position-relative'>
                                <label className='w-100'>
                                    <input className='input-field redeem-field' type="text" placeholder='Enter it here' value={couponCode} onChange={handleCouponCodeChange} />
                                </label>
                                <span className='redeem-button' onClick={handleAddCoupon}><img src={redeemIcon} width={24} alt="redeemIcon" /></span>
                            </div>
                        </div>
                        <div className='d-flex px-3 justify-content-center pb-3'>
                            <button className='btn main-button' onClick={handleRecharge}>Complete Recharge</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WalletRechargeComponent;
