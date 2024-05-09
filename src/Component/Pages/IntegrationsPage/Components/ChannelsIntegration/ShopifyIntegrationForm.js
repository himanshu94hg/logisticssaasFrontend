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
        console.log(newErrors, "this is validate form data")
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
       if(validateFormData()){
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/channel/channel/`, formData, {
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
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    <span>Channel Name <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.channel_name && "input-field-error"}`} 
                                        type="text"
                                        name="channel.channel_name"
                                        placeholder='Enter Channel Name'
                                        value={formData.channel.channel_name}
                                        onChange={handleChange}
                                    />
                                    {errors.channel_name && <span className='error-text'>{errors.channel_name}</span>}
                                </label>
                                <label>
                                    <span>Admin API access token <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.password && "input-field-error"}`} 
                                        type="text"
                                        name="channel_configuration.password"
                                        placeholder='Enter Admin API access token'
                                        value={formData.channel_configuration.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && <span className='error-text'>{errors.password}</span>}
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>  
                                    <span>API Key <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.api_key && "input-field-error"}`} 
                                        type="text"
                                        name="channel_configuration.api_key"
                                        placeholder='Enter API Key'
                                        value={formData.channel_configuration.api_key}
                                        onChange={handleChange}
                                    />
                                    {errors.api_key && <span className='error-text'>{errors.api_key}</span>}
                                </label>
                                <label>                                  
                                    <span>API Secret Key <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.shared_secret && "input-field-error"}`} 
                                        type="text"
                                        name="channel_configuration.shared_secret"
                                        placeholder='Enter API Secret Key'
                                        value={formData.channel_configuration.shared_secret}
                                        onChange={handleChange}
                                    />
                                    {errors.shared_secret && <span className='error-text'>{errors.shared_secret}</span>}
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>                                  
                                    <span>Store URL <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.store_url && "input-field-error"}`} 
                                        type="text"
                                        name="channel_configuration.store_url"
                                        placeholder='Enter Store URL'
                                        value={formData.channel_configuration.store_url}
                                        onChange={handleChange}
                                    />
                                {errors.store_url && <span className='error-text'>{errors.store_url}</span>}
                                </label>
                                <label>                                  
                                    <span>Fetch Orders From <span className='mandatory'>*</span></span>
                                    <DatePicker
                                        selected={selectedDate}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat='MM/dd/yyyy'
                                        placeholderText='Enter Date'
                                        className={`input-field ${errors.selectedDate && "input-field-error"}`} 
                                    />
                                    {errors.selectedDate && <span className='error-text'>{errors.selectedDate}</span>}
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