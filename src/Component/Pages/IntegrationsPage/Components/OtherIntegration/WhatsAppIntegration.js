import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/whatsappIcon.png';

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
                <div className='box-shadow shadow-sm p7 mt-2'>
                    <h4>Instruction to integrate WhatsApp Communication</h4>
                    <p>Send Live Updates to your buyers with <span>93%</span> read rate</p>
                    <h5>&#8377; 0.99* <span>per message</span></h5>
                    <button>Activate Now</button>
                    <p><span>Note:</span> Customise real time tracking update to share with your buyers, per status just @ &#8377;0.99. To avail all statuses, pay just ₹6.93 per order. By Default all statuses will be selected. (Prices are exclusive of GST & Non refundable)</p>
                </div>

            </div>
        </>
    )
}

export default WhatsAppIntegration