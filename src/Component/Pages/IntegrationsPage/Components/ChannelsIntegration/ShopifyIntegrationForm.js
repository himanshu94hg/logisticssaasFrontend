import React, { useState } from 'react';
import ShopifyLogo from '../../../../../assets/image/integration/ShopifyLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ShopifyIntegrationForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div className='box-shadow shadow-sm p10'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={ShopifyLogo} alt="ShopifyLogo" />
                        <h2 className='mb-0'>Shopify</h2>
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
                            "Login to Shopify Admin Panel.",
                            "Go to Apps.",
                            "Click Develop Apps for your store.",
                            "Click on Create an App.",
                            "Enter Name of the app and Select Account associated with your store.",
                            "Click on Create App Button",
                            "Now Click on Configure Admin API Scopes and Select All Permission that is needed for Order,Fulfillment,Shipping,Payments and Customer Data and click on Save Button",
                            "Now Click on Install App Button",
                            "Here You will find Admin API access token,API key and API Secret Key",
                            "Copy the identifiers and integrate the channel.",
                            "Please do not enter https:// or trailing / in Store URL just enter store.myshopify.com"
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
                                Admin API access token
                                <input className="input-field" type="text" />
                            </label>
                        </div>
                        <div className='d-flex w-100 gap-5 mt-4'>
                            <label>
                                API Key
                                <input className="input-field" type="text" />
                            </label>
                            <label>
                                API Secret Key
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
                        <div className='int-checkbox mt-3'>
                            {[
                                "Fulfill orders (Enabling this will auto fulfill order in Shopify when an order is shipped with ShipEase)",
                                "Cancel orders (Enabling this will auto cancel order in Shopify when order is cancelled in ShipEase)",
                                "Mark as paid (Mark COD orders as paid in Shopify when orders are delivered to customer)",
                                "Send Abandon Checkout SMS (Enabling this will charge 1RS per sms)"
                            ].map(text => (
                                <label key={text}>
                                    <input className="input-field" type="checkbox" />
                                    {text}
                                </label>
                            ))}
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

export default ShopifyIntegrationForm;
