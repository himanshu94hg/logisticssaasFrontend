import React, { useState } from 'react'
import './VASRates.css'
import WhatsAppVASIcon from './WhatsAppVASIcon'
import NDRVasIcon from './NDRVasIcon'
import EmailVasIcon from './EmailVasIcon'
import SmsVasIcon from './SmsVasIcon'
import TrackingVasIcon from './TrackingVasIcon'
import Toggle from 'react-toggle'

const VASRates = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    return (
        <>
            <div>
                <section className='position-relative vas-rate-page'>
                    <div className='d-flex align-items-center gap-2 justify-content-end mb-4'>
                        {!isChecked ? 'Include GST' : 'Exclude GST'}
                        <Toggle
                            checked={isChecked}
                            onChange={handleToggle}
                        />
                    </div>
                    <div className='vas-cards-grid'>
                        <div className="vas-card-container">
                            <WhatsAppVASIcon />
                            <div className="card-text-box">
                                <div className='text-center'>
                                    <p className="card-title mb-2">WhatsApp</p>
                                    <p className="card-price">₹ {isChecked ? (0.99 * 1.18).toFixed(2) : 0.99} per message</p>
                                </div>
                                <div className='text-center'>
                                    <p className="card-price">Tracking: ₹ {isChecked ? 1 * 1.18 : 1} per message</p>
                                    <p className="card-price">Bot: ₹ {isChecked ? (2.99 * 1.18).toFixed(2) : 2.99} per flow</p>
                                </div>
                            </div>
                        </div>
                        <div className="vas-card-container">
                            <NDRVasIcon />
                            <div className="card-text-box">
                                <div className='text-center'>
                                    <p className="card-title mb-2">NDR</p>
                                    <p className="card-price">₹ {isChecked ? (0.99 * 1.18).toFixed(2) : 0.99} per call</p>
                                </div>
                                <div className='text-center'>
                                    <p className="card-price">IVR: ₹ {isChecked ? (0.49 * 1.18).toFixed(2) : 0.49} per call</p>
                                </div>
                            </div>
                        </div>
                        <div className="vas-card-container">
                            <EmailVasIcon />
                            <div className="card-text-box">
                                <div className='text-center'>
                                    <p className="card-title mb-2">Email</p>
                                    <p className="card-price">₹ {isChecked ? (0.49 * 1.18).toFixed(2) : 0.49} per order</p>
                                </div>
                            </div>
                        </div>
                        <div className="vas-card-container">
                            <SmsVasIcon />
                            <div className="card-text-box">
                                <div className='text-center'>
                                    <p className="card-title mb-2">SMS</p>
                                    <p className="card-price">₹ {isChecked ? (0.25 * 1.18).toFixed(2) : 0.25} per message</p>
                                </div>
                                <p className="card-price">SMS: ₹ {isChecked ? (0.99 * 1.18).toFixed(2) : 0.99} per order</p>
                            </div>
                        </div>
                        <div className="vas-card-container">
                            <TrackingVasIcon />
                            <div className="card-text-box">
                                <p style={{ whiteSpace: "normal", textAlign: 'center', maxWidth: '220px' }} className="card-title ">Branded Tracking and Promotions</p>
                                <p className="card-price">₹ {isChecked ? (0.99 * 1.18).toFixed(2) : 0.99} per order</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default VASRates