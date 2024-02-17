import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/MagentoLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EasyEcomIntegrationForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div className='magento'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src='https://www.shipease.in/public/assets/images/oms/easyship.png' alt="Logo" />
                        <h2 className='mb-0'>EasyEcom</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate EasyEcom to ShipEase</h4>

                        <ul className='timeline mb-3'>
                            {[
                                "Login to EasyEcom Panel.",
                                "Navigate to Carrier Master then Choose Shipease as Carrier Master",
                                "Enter the Credentials as per instructed by Shipease Integration Page",
                                "Set Serviceability Type - Any Pincode",
                                "Shipping Mode - All",
                                "Priority - As per You",
                                "Extra Credentials - Contact EasyEcom Team for eeApiToken and Enter in this Field",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>



                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form action="">
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Channel Name
                                    <input className="input-field" type="text" />
                                </label>
                                <label>
                                    Store URL
                                    <input className="input-field" type="text" />
                                    <span className='font13 text-sh-primary'>Store URL should be like http://yourstore.com</span>
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Admin Access Token
                                    <input className="input-field" type="text" />
                                    <span className='font13 text-sh-primary'>Generate Admin Access Token</span>
                                </label>
                            </div>
                            <div className='mt-3 d-flex justify-content-end'>
                                <button type='submit' className='btn main-button'>Submit</button>
                            </div>
                        </form>
                    </section>
                </div>

            </div>
        </>
    );
};

export default EasyEcomIntegrationForm;
