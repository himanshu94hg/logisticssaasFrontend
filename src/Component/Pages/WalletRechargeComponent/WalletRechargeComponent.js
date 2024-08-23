import React, { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './WalletRechargeComponent.css';
import ccAvenue from '../../../assets/image/logo/ccAvenue.png';
import RazorpayImg from '../../../assets/image/logo/Razorpay.png';
import redeemIcon from '../../../assets/image/icons/redeemIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import ShipeaseLogo from '../../../assets/image/logo/mobileLogo.svg'
import Cookies from "js-cookie"
import { BASE_URL_ORDER } from '../../../axios/config';
import { toast } from "react-toastify";


const WalletRechargeComponent = (props) => {
    const dispatch = useDispatch()
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [paymentMode, setPaymentMode] = useState('credit_card');
    const [couponCode, setCouponCode] = useState('');
    const [Razorpay, isLoaded] = useRazorpay();
    const token = Cookies.get("access_token")

    useEffect(() => {
        if (token) {
            dispatch({ type: "PAYMENT_DATA_ACTION" });
            dispatch({ type: "CONFIGURATION_DATA_ACTION" });
        }

    }, [dispatch]);

    const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard)
    const paymentSetCard = useSelector(state => state?.paymentSectionReducer?.paymentSetCard)
    const configurationCard = useSelector(state => state?.paymentSectionReducer.configurationCard)
    const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);

    const razorpayKey = configurationCard?.[0]?.razorpay_key;


    useEffect(() => {
        if (paymentCard !== null && paymentSetCard !== null) {
            localStorage.setItem('paymentCard', JSON.stringify(paymentCard));
            localStorage.setItem('paymentSetCard', JSON.stringify(paymentSetCard));
        }
    }, [paymentCard, paymentSetCard]);

    useEffect(() => {
        if (paymentMode === 'paypal') {
            const script = document.createElement('script');
            script.src = `${BASE_URL_ORDER}/core-api/master/ccavRequestHandler/`;
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [paymentMode]);


    const handleRechargeAmountChange = (event) => {
        setRechargeAmount(event.target.value);
        if (event.target.value >= 500) {
            setValidate(false)
        }
        // else {
        //     setValidate(true)
        // }
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

    const generateOrderId = () => {
        const now = new Date();
        return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    };

    const generateOrderIdForPayment = async () => {
        const createOrderResponse = await fetch(`${BASE_URL_ORDER}/core-api/seller/api/create-recharge_order/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: rechargeAmount }),
        });

        const orderData = await createOrderResponse.json();
        if (orderData.success) {
            return orderData.order_id;
        }
    };


    const [validate, setValidate] = useState(false)

    const handleRecharge = useCallback(async () => {
        if (rechargeAmount >= 500) {
            if (paymentMode === 'credit_card') {
                try {
                    let orderId = '';

                    const createOrderResponse = await fetch(`${BASE_URL_ORDER}/core-api/seller/api/create-recharge_order/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ amount: rechargeAmount }),
                    });

                    const orderData = await createOrderResponse.json();
                    if (orderData.status === 'true') {
                        orderId = orderData.order_id;
                    } else {
                        throw new Error('Failed to create order');
                    }

                    const options = {
                        key: razorpayKey,
                        amount: rechargeAmount * 100,
                        currency: "INR",
                        name: "Shipease",
                        description: "Wallet Recharge",
                        order_id: orderId,
                        image: ShipeaseLogo,
                        prefill: {
                            name: userData?.company_name || "Shipease",
                            email: userData?.email || "info@shipease.in",
                            contact: userData?.contact_number,
                        },
                        notes: {
                            address: "Testing Address",
                        },
                        theme: {
                            color: "3399cc",
                        },
                        handler: async (response) => {
                            if (response.razorpay_payment_id) {
                                try {
                                    const verificationResponse = await fetch(`${BASE_URL_ORDER}/core-api/seller/api/verify-payment/`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            razorpay_payment_id: response.razorpay_payment_id,
                                            amount: rechargeAmount,
                                        }),
                                    });

                                    const verificationResult = await verificationResponse.json();
                                    if (verificationResult.success) {
                                        const data = JSON.stringify({
                                            razorpay_payment_id: response.razorpay_payment_id,
                                            amount: rechargeAmount,
                                            description: options.description
                                        });
                                        dispatch({ type: "PAYMENT_SET_DATA_ACTION", payload: data });
                                    } else {
                                        toast.error('Payment verification failed. Please try again.');
                                    }
                                } catch (error) {
                                    toast.error('Error in payment verification. Please try again.');
                                }
                            }
                        }
                    };

                    console.log("optionsoptionsoptionsoptions", options);
                    const rzpay = new Razorpay(options);
                    rzpay.open();

                } catch (error) {
                    toast.error('Error in processing payment. Please try again.');
                }
            } 
            // else {
            //     const form = document.createElement('form');
            //     form.action = `${BASE_URL_ORDER}/core-api/master/ccavRequestHandler/`;
            //     form.method = 'POST';
            //     form.style.display = 'none';

            //     const parameters = {
            //         order_id: generateOrderId(),
            //         currency: 'INR',
            //         amount: rechargeAmount,
            //         language: 'EN',
            //         billing_name: "",
            //         billing_address: "",
            //         billing_city: "",
            //         billing_state: "",
            //         billing_zip: "",
            //         billing_country: "",
            //         billing_tel: "",
            //         billing_email: "",
            //         delivery_name: "",
            //         delivery_address: "",
            //         delivery_city: "",
            //         delivery_state: "",
            //         delivery_zip: "",
            //         delivery_country: "India",
            //         delivery_tel: "",
            //         seller_id: userData?.id,
            //         merchant_param2: "",
            //         merchant_param3: "",
            //         merchant_param4: "",
            //         merchant_param5: "",
            //         promo_code: couponCode,
            //         customer_identifier: "",
            //     };

            //     Object.keys(parameters).forEach(key => {
            //         const input = document.createElement('input');
            //         input.type = 'hidden';
            //         input.name = key;
            //         input.value = parameters[key];
            //         form.appendChild(input);
            //     });

            //     document.body.appendChild(form);
            //     form.submit();
            //     document.body.removeChild(form);
            // }
        } else {
            setValidate(true);
        }
    }, [rechargeAmount, paymentMode, userData, couponCode, dispatch]);


    return (
        <>
            <section className={`wallet-container ${props.WalletRecharge ? 'show' : ''}`}>
                <div className='wallet-box'>
                    {/* <button
                        onClick={() => props.setWalletRecharge(!props.WalletRecharge)}
                        className='btn close-button'
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button> */}
                    <div className='wallet-inner-bg'>
                        <div className='balance-container'>
                            <h4 className='my-3'>Your Wallet</h4>
                            <div className='balance-amount'>
                                <p>₹</p>
                                <p className='fw-bold font30'>{paymentSetCard?.balance ?? paymentCard?.balance ?? '0.00'}</p>
                            </div>
                            <p className='font13'>Current Wallet Amount</p>
                        </div>
                        <label className='d-flex flex-column mb-3 px-3'>
                            <span style={{ fontSize: '0.9rem' }}>Enter Amount in Multiples of 100 Below</span>
                            <input
                                type="text"
                                value={rechargeAmount}
                                maxLength={8}
                                className={`input-field ${validate && "input-field-error"}`}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[0-9]*$/;
                                    if (e.key === ' ' && e.target.value.endsWith(' ')) {
                                        e.preventDefault();
                                    } else if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={handleRechargeAmountChange} />
                            <span className={`font12 fw-bold ${validate ? "text-sh-red" : "text-sh-primary"}`}>Min value:₹500 & Max value: ₹50,00,000</span>
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
                        <label className='d-flex gap-3 my-3 px-3 flex-wrap row-gap-0'>
                            <span className="ws-nowrap" style={{ fontSize: '0.9rem' }}>Payment Mode:</span>
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
                                    <input
                                        type="text"
                                        maxLength={12}
                                        value={couponCode}
                                        placeholder='Enter it here'
                                        onChange={handleCouponCodeChange}
                                        className='input-field redeem-field'
                                        onKeyPress={(e) => {
                                            const allowedCharacters = /^[a-zA-Z0-9]*$/;
                                            if (e.key === ' ' && e.target.value.endsWith(' ')) {
                                                e.preventDefault();
                                            } else if (!allowedCharacters.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
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
