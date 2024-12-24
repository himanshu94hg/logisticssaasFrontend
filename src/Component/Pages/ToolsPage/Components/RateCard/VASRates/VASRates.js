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
                                <p className="card-title">WhatsApp</p>
                                <p className="card-price">₹ 0.99 per message</p>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="WhatsApp"
                                    className="card-image"
                                />
                                <p className="card-price">Tracking: ₹ 1 per message</p>
                                <p className="card-price">Bot: ₹ 2.99 per flow</p>
                            </div>
                        </div>
                        <div className="vas-card-container">
                            <NDRVasIcon />
                            <div className="card-text-box">
                                <p className="card-title">NDR</p>
                                <p className="card-price">₹ 0.99 per call</p>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="WhatsApp"
                                    className="card-image"
                                />
                                <p className="card-price invisible">IVR: ₹ 0.49 per call</p>
                                <p className="card-price">IVR: ₹ 0.49 per call</p>
                            </div>
                        </div>
                        <div className="vas-card-container">
                            <EmailVasIcon />
                            <div className="card-text-box">
                                <p className="card-title">Email</p>
                                <p className="card-price">₹ 0.49 per order</p>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="WhatsApp"
                                    className="card-image"
                                />
                                <p className="card-price invisible">Tracking: ₹ 1 /message</p>
                                <p className="card-price invisible">Tracking: ₹ 1 /message</p>
                            </div>
                        </div>
                        <div className="vas-card-container">
                            <SmsVasIcon />
                            <div className="card-text-box">
                                <p className="card-title">SMS</p>
                                <p className="card-price">₹ 0.25 per message</p>
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="WhatsApp"
                                    className="card-image"
                                />
                                <p className="card-price invisible">SMS: ₹ 0.99 per order</p>
                                <p className="card-price">SMS: ₹ 0.99 per order</p>
                            </div>
                        </div>
                        <div className="vas-card-container">
                            <TrackingVasIcon />
                            <div className="card-text-box">
                                <p style={{ whiteSpace: "normal", textAlign: 'center' }} className="card-title ">Branded Tracking and Promotions</p>
                                {/* <p className="card-price">₹ 0.99 /message</p> */}
                                {/* <p className="card-price">All RAC rates given</p> */}
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="WhatsApp"
                                    className="card-image"
                                />
                                <p className="card-price invisible">Bot: ₹ 1 /message</p>
                                <p className="card-price">All RAC rates given</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default VASRates