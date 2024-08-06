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
                <section className='box-shadow shadow-sm p-3 mt-5'>
                    <div className='d-flex flex-column gap-3 align-items-center'>
                        <ul className='whatsapp-benefits'>
                            <li><HeartIcon />Enhance customer satisfaction by providing real-time updates to buyers.</li>
                            <li className='plus-middle'><span>-------</span></li>
                            <li><TruckIcon />Facilitate timely and efficient deliveries with detailed brand information.<button className='btn main-button mt-3'>Activate Now</button></li>
                            <li className='plus-middle'><span>-------</span></li>
                            <li><PackageMagnifyingIcon />Reduce customer inquiries by increasing the visibility of shipment details.</li>
                        </ul>
                    </div>



                    <h4>Instruction to integrate WhatsApp Communication</h4>
                    <p>Keep your buyers informed with live updates that have a <span>93%</span> read rate.</p>
                    <h5 className='font24'>&#8377; 0.99 <span className='font12'>per message</span></h5>
                    <p className='font12 mt-2'><span className='fw-bold'>Note:</span> Customise real time tracking update to share with your buyers, per status just @ &#8377;0.99. Customize real-time tracking updates to share with your buyers for just ₹0.99 per status. Get all status updates for only ₹6.93 per order. By default, all statuses will be selected. Prices are exclusive of GST and non-refundable.</p>
                    {/* <h4>Key Benefits</h4> */}


                    <h4>Try It Out!</h4>
                    <p>Enter your number to receive live tracking updates via WhatsApp.</p>
                    <label className='whatsapp-get-started'>
                        <input type="text" placeholder='Enter 10 Digit Mobile Number' />
                        <button>Get Started</button>
                    </label>

                    <h4></h4>
                </section>

            </div>
        </>
    )
}

export default WhatsAppIntegration