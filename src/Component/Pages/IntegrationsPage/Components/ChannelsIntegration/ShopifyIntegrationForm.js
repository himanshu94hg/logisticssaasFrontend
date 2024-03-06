import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../../assets/image/integration/ShopifyLogo.png';
import DatePicker from 'react-datepicker';
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import moment from 'moment';

const ShopifyIntegrationForm = () => {
    const navigation = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const hardcodedToken = Cookies.get("access_token");
    const sellerData = Cookies.get("user_id");

    const [formData, setFormData] = useState({
        seller_id: sellerData,
        channel: {
            channel_name: "",
            channel: "shopify"
        },
        channel_configuration: {
            api_key: "",
            password: "",
            store_url: "",
            shared_secret: "",
            auto_fulfill: false,
            auto_cancel: false,
            auto_cod_paid: false,
            send_abandon_sms: false,
            last_executed: ''
        }
    });

    const checkboxDescriptions = {
        auto_fulfill: "Fulfill orders (Enabling this will auto fulfill order in Shopify when an order is shipped with ShipEase)",
        auto_cancel: "Cancel orders (Enabling this will auto cancel order in Shopify when order is cancelled in ShipEase)",
        auto_cod_paid: "Mark as paid (Mark COD orders as paid in Shopify when orders are delivered to customer)",
        send_abandon_sms: "Send Abandon Checkout SMS (Enabling this will charge 1RS per sms)"
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://dev.shipease.in/core-api/channel/channel/', formData, {
                headers: {
                    'Authorization': `Bearer ${hardcodedToken}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response);

            if (response.status === 201) {
                const responseData = response.data;
                console.log('API Response:', responseData);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Channel added successfully!',
                    confirmButtonText: 'OK'
                });
                navigation('/channels-integration');
            } else {
                const errorData = response.data;
                console.error('API Error:', errorData);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to add Channel. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Fetch Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to add Channel. Please try again later.',
                confirmButtonText: 'OK'
            });
        }
        console.log("Logs", formData);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? moment(date).format("YYYY-MM-DD 00:00:00") : '';
        setFormData(prevState => ({
            ...prevState,
            channel_configuration: {
                ...prevState.channel_configuration,
                last_executed: formattedDate
            }
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        const [objectName, propName] = name.split('.');

        setFormData(prevState => ({
            ...prevState,
            [objectName]: {
                ...prevState[objectName],
                [propName]: val
            }
        }));
    };

    return (
        <>
            <div className='p10'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>Shopify</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate Shopify to ShipEase</h4>
                        <ul className='timeline'>
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
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Channel Name
                                    <input
                                        className="input-field"
                                        type="text"
                                        name="channel.channel_name"
                                        value={formData.channel.channel_name}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Admin API access token
                                    <input
                                        className="input-field"
                                        type="text"
                                        name="channel_configuration.password"
                                        value={formData.channel_configuration.password}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    API Key
                                    <input
                                        className="input-field"
                                        type="text"
                                        name="channel_configuration.api_key"
                                        value={formData.channel_configuration.api_key}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    API Secret Key
                                    <input
                                        className="input-field"
                                        type="text"
                                        name="channel_configuration.shared_secret"
                                        value={formData.channel_configuration.shared_secret}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Store URL
                                    <input
                                        className="input-field"
                                        type="text"
                                        name="channel_configuration.store_url"
                                        value={formData.channel_configuration.store_url}
                                        onChange={handleChange}
                                    />
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
                                    "auto_fulfill",
                                    "auto_cancel",
                                    "auto_cod_paid",
                                    "send_abandon_sms"
                                ].map(prop => (
                                    <label key={prop}>
                                        <input
                                            className="input-field"
                                            type="checkbox"
                                            name={`channel_configuration.${prop}`}
                                            checked={formData.channel_configuration[prop]}
                                            onChange={handleChange}
                                        />
                                        {checkboxDescriptions[prop]}
                                    </label>
                                ))}
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

export default ShopifyIntegrationForm;