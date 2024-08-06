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
                <div className='box-shadow shadow-sm p-3 mt-3'>
                    <h4>Instruction to integrate WhatsApp Communication</h4>
                    <p>Keep your buyers informed with live updates that have a <span>93%</span> read rate.</p>
                    <h5 className='font24'>&#8377; 0.99 <span className='font12'>per message</span></h5>
                    <button className='btn main-button'>Activate Now</button>
                    <p className='font12 mt-2'><span className='fw-bold'>Note:</span> Customise real time tracking update to share with your buyers, per status just @ &#8377;0.99. Customize real-time tracking updates to share with your buyers for just ₹0.99 per status. Get all status updates for only ₹6.93 per order. By default, all statuses will be selected. Prices are exclusive of GST and non-refundable.</p>
                    <h4>How WhatsApp Communication Benefits You</h4>
                    <ul className='whatsapp-benefits'>
                        <li><HeartIcon />Enhance customer satisfaction by providing real-time updates to buyers.</li>
                        <li><TruckIcon />Facilitate timely and efficient deliveries with detailed brand information.</li>
                        <li><PackageMagnifyingIcon />Reduce customer inquiries by increasing the visibility of shipment details.</li>
                    </ul>

                    <h4>Try It Out!</h4>
                    <p>Enter your number to receive live tracking updates via WhatsApp.</p>
                    <label className='whatsapp-get-started'>
                        <input type="text" placeholder='Enter 10 Digit Mobile Number' />
                        <button>Get Started</button>
                    </label>

                    <h4></h4>
                </div>

            </div>
        </>
    )
}

export default WhatsAppIntegration