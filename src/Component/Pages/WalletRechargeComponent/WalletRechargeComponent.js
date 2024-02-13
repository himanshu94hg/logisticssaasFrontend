import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './WalletRechargeComponent.css'
import { Link } from 'react-router-dom'
import ccAvenue from '../../../assets/image/logo/ccAvenue.png'
import Razorpay from '../../../assets/image/logo/Razorpay.png'

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
                        <h4>Recharge Your Wallet</h4>
                        <div className='balance-container'>
                            <p>Current Wallet Amount</p>
                            <div className="available-balance">
                                <h3><span className='fw-bold'>₹6204.25</span></h3>

                                <Link>See transactions</Link>
                            </div>
                        </div>
                        <label className='d-flex flex-column mb-3'>
                            Enter Amount in Multiples of 100 Below
                            <input className='input-field' type="text" value={rechargeAmount} onChange={handleRechargeAmountChange} />
                            <span className='font12 text-sh-primary fw-bold'>Min value:₹500 & Max value: ₹50,00,000</span>
                        </label>
                        <div className='d-flex flex-column mb-3'>
                            <span>Or Select From Below:</span>
                            <div className='d-flex gap-3'>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(1000)}>1000</button>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(1500)}>1500</button>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(2000)}>2000</button>
                                <button className="btn main-button-outline" onClick={() => handlePredefinedAmountClick(5000)}>5000</button>
                            </div>
                        </div>
                        <label className='d-flex flex-column mb-3'>
                            Payment Mode:
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
                        <div className='d-flex flex-column gap-1 mb-3'>
                            Have a redeem code?
                            <div className='d-flex gap-2 w-100 align-items-center'>
                                <label className='w-100'>
                                    <input className='input-field' type="text" placeholder='Enter it here' value={couponCode} onChange={handleCouponCodeChange} />
                                </label>
                                <button className='btn main-button' onClick={handleAddCoupon}>Redeem Now</button>
                            </div>
                        </div>
                        <button className='btn main-button' onClick={handleRecharge}>Complete Recharge</button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default WalletRechargeComponent