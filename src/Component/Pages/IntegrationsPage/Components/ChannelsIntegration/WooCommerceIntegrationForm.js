import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/woocommerceLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WooCommerceIntegrationForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div className='box-shadow shadow-sm p10'>
                <section className='int-header woo'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>Woo Commerce</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <section className='int-instructions mt-4'>
                    <h4>Instruction to integrate Shopify to ShipEase</h4>
                    <hr />
                    <ul>
                        {[
                            "Login to Woo-Commerce Admin Panel.",
                            "Go to Integration.",
                            "Click on Woocommerce Settings.",
                            "Click on Advanced then REST API.",
                            "Click on Add API Key.",
                            "Enter Description and select read / write and Click Add.",
                            "Here you will find Woo-Commerce Details for integration.",
                            "Copy the identifiers and integrate the channel.",
                        ].map(instruction => <li key={instruction}>{instruction}</li>)}
                    </ul>
                </section>
                <hr />
                <section className='int-form'>
                    <form action="">
                        <div className='d-flex w-100 gap-5 mt-4'>
                            <label>
                                Channel Name
                                <input className="input-field" type="text" />
                            </label>
                            <label>
                                Store URL
                                <input className="input-field" type="text" />
                                <span className='text-sh-primary font13'>Store URL should be like https://yourstore.com</span>
                            </label>
                        </div>
                        <div className='d-flex w-100 gap-5 mt-4'>
                            <label>
                                Consumer Key
                                <input className="input-field" type="text" />
                            </label>
                            <label>
                                Consumer Secret
                                <input className="input-field" type="text" />
                            </label>
                        </div>
                        <div className='d-flex w-100 gap-5 mt-4'>
                            <label>
                                Store URL
                                <input className="input-field" type="text" />
                            </label>
                            <label>
                                Fetch Orders From
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat='MM/dd/yyyy'
                                    className='input-field'
                                />
                            </label>
                        </div>
                            <p className='text-sh-primary'>Enter Status Mappings</p>
                        <div className='d-flex w-100 gap-5 mt-4'>
                            <label>
                                Store URL
                                <input className="input-field" type="text" />
                            </label>
                            <label>
                                Fetch Orders From
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat='MM/dd/yyyy'
                                    className='input-field'
                                />
                            </label>
                        </div>

                        <div className='mt-3 d-flex justify-content-end'>
                            <button type='submit' className='btn main-button'>Submit</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
};

export default WooCommerceIntegrationForm;
