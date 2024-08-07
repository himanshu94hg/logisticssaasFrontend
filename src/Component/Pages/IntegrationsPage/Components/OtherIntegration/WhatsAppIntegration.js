import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/whatsappIcon.png';
import HeartIcon from './HeartIcon';
import TruckIcon from './TruckIcon';
import PackageMagnifyingIcon from './PackageMagnifyingIcon';

const WhatsAppIntegration = () => {
    return (
        <>
            <div className='whatsapp'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>WhatsApp</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <section className='box-shadow shadow-sm p-3 mt-3'>
                    <ul className='whatsapp-benefits'>
                        <li><HeartIcon />Enhance customer satisfaction by providing real-time updates to buyers.</li>
                        <li className='plus-middle'><hr /></li>
                        <li><TruckIcon />Facilitate timely and efficient deliveries with detailed brand information.</li>
                        <li className='plus-middle'><hr /></li>
                        <li><PackageMagnifyingIcon />Reduce customer inquiries by increasing the visibility of shipment details.</li>
                    </ul>
                    <div className='mt-5'>
                        <h5>Keep your buyers informed with live updates that have a <span>93%</span> read rate.</h5>
                        <p className='font30 py-2'><span className='text-sh-primary'>&#8377; 0.99</span> <span className='font12 ms-1'>/ message</span></p>
                        <p className='font12 pt-2'><span className='fw-bold'>Note:</span> Customise real time tracking update to share with your buyers, per status just @ &#8377;0.99. Customize real-time tracking updates to share with your buyers for just ₹0.99 per status. Get all status updates for only ₹6.93 per order. By default, all statuses will be selected. Prices are exclusive of GST and non-refundable.</p>
                        {/* <h4>Key Benefits</h4> */}
                    </div>
                    <div className='mt-5 d-flex w-100'>
                        <div className='try-it-out'>
                            <div>
                                <h4>Try It Out!</h4>
                                <p>Enter your number to receive live tracking updates via WhatsApp.</p>
                                <label className='whatsapp-get-started'>
                                    <input type="text" placeholder='Enter 10 Digit Mobile Number' />
                                    <button>Get Started</button>
                                </label>
                            </div>
                        </div>
                        <div className='pricing-section'>
                            <div>
                                <h4>Rate pr message &#8377; 0.99</h4>
                                <h5>Features!</h5>
                                <ul>
                                    <li>Customise number of messages</li>
                                    <li>Pay per message</li>
                                    <li>At low prices</li>
                                </ul>
                                <button className='btn main-button'>Activate Now</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default WhatsAppIntegration