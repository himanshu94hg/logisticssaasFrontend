import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/MagentoLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MagentoIntegrationForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div className='magento'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>Magento</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate magento to ShipEase</h4>

                        <h5>Execute on Magento Panel</h5>
                        <ul className='timeline mb-3'>
                            {[
                                "Login to you Magento Admin Panel",
                                "Search for 'Admin Token Lifetime '",
                                "Uncheck the 'Use System Value'",
                                "Change the Setting for 'Admin Token Lifetime (hours)' to 50000",
                                "Search for 'JWT Authentication' and click on 'JWT Authentication' for '/Services/Magento Web API'",
                                "Change the Setting for 'Customer JWT Expires In' to 5000000",
                                "Change the Setting for 'Admin User JWT Expires In' to 5000000",
                                "Click the Save Config Button.",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>

                        <h5>Execute on Shipease Panel</h5>
                        <ul className='timeline mb-3'>
                            {[
                                "Please complete execution on all steps on Magento Panel and open Magento integration in Shipease",
                                "Click on the Generate Admin Access Token hyperlink.",
                                "Enter Magento Admin Username and Password.(Credentials used for generating token only, we never store any credentials)",
                                "If credentials are correct, message 'Token generated successfully!!' will appear. Click on Close button",
                                "Admin Token start appearing in respective field. Click on submit button.",
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

export default MagentoIntegrationForm;
