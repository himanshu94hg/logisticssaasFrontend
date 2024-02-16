import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './WalletRechargeComponent.css'
import { Link } from 'react-router-dom'
import ccAvenue from '../../../assets/image/logo/ccAvenue.png'
import Razorpay from '../../../assets/image/logo/Razorpay.png'
import redeemIcon from '../../../assets/image/icons/redeemIcon.png'

const WalletRechargeComponent = (props) => {
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [paymentMode, setPaymentMode] = useState('credit_card');
    const [couponCode, setCouponCode] = useState('');

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
        setRechargeAmount(amount);
    };

    const handleAddCoupon = () => {
        // Implement coupon code validation and addition logic here
        // For simplicity, just logging the coupon code
        console.log('Coupon added:', couponCode);
    };

    const handleRecharge = () => {
        // Implement recharge logic here
        // For simplicity, just logging the recharge amount and payment mode
        console.log('Recharge amount:', rechargeAmount);
        console.log('Payment mode:', paymentMode);
    };

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
                                <p className='fw-bold font30'>6204.25</p>
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
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(1000)}>2000</button>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(1500)}>5000</button>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(2000)}>10000</button>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(5000)}>20000</button>
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
                                    <img src={Razorpay} alt="Razorpay" height={20} />
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
                                {/* Add more payment modes as needed */}
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
    )
}

export default WalletRechargeComponent