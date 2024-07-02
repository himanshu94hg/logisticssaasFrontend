import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../../assets/image/integration/ShopifyLogo.png';
import DatePicker from 'react-datepicker';
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import moment from 'moment';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction, errorHandleSecond, errorHandlefirst, errorinApi } from '../../../../../customFunction/errorHandling';

const ShopifyIntegrationForm = () => {
    const navigation = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const hardcodedToken = Cookies.get("access_token");
    const sellerData = Cookies.get("user_id");
    const [errors, setErrors] = useState({});

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
            auto_fulfill: true,   
            auto_cancel: true,    
            auto_cod_paid: true,  
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

    const validateFormData = () => {
        const newErrors = {};
        if (!formData.channel.channel_name) {
            newErrors.channel_name = ' Channel Name is required!';
        }
        if (!formData.channel_configuration.password) {
            newErrors.password = ' Access token is required!';
        }
        if (!formData.channel_configuration.api_key) {
            newErrors.api_key = ' API Key is required!';
        }
        if (!formData.channel_configuration.shared_secret) {
            newErrors.shared_secret = ' API Secret key is required!';
        }
        if (!formData.channel_configuration.store_url) {
            newErrors.store_url = ' Store URL is required!';
        }     
        if (selectedDate === null) {
            newErrors.selectedDate = ' Date is required!';
        }     
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateFormData()) {
            try {
                const response = await axios.post(`${BASE_URL_CORE}/core-api/channel/channel/`, formData, {
                    headers: {
                        'Authorization': `Bearer ${hardcodedToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 201) {
                    const { url } = response.data; 

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Channel added successfully! Redirecting...',
                        showConfirmButton: false,
                        timer: 2000 
                    });

                    const redirectUrl = `${url}?redirect_uri=${encodeURIComponent(window.location.href)}`;

                    setTimeout(() => {
                        window.location.href = redirectUrl;
                    }, 2000);
                }
            } catch (error) {
                customErrorFunction(error);
            }
        }
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
                            <div className='int-checkbox mt-3'>
                                <h3>Integrate shopify to ShipEase</h3>
                            </div>
                            <div className='mt-3 d-flex justify-content-end'>
                                <button type='submit' className='btn main-button'>CONNECT SHOPIFY WITH SHIPEASE</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ShopifyIntegrationForm;
