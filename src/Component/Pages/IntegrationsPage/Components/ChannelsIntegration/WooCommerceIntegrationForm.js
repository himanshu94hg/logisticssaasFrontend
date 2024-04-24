import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/woocommerceLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import moment from 'moment';

const WooCommerceIntegrationForm = () => {

    const navigation = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const hardcodedToken = Cookies.get("access_token");
    const sellerData = Cookies.get("user_id");

    const [formData, setFormData] = useState({
        seller_id: sellerData,
        channel: {
            channel_name: "",
            channel: "woocommerce"
        },
        channel_configuration: {
            store_url: "",
            woo_consumer_key: "",
            woo_consumer_secret: "",
            last_executed: '',
            pickup_scheduled: "",
            picked_up: "",
            in_transit: "",
            out_for_delivery: "",
            delivered: "",
            auto_fulfill: false,
            auto_cancel: false,
            auto_cod_paid: false,
            send_abandon_sms: false
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
            <div className='woo'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>Woo Commerce</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate Shopify to ShipEase</h4>
                        <ul className='timeline mb-3'>
                            {[
                                "Login to Woo-Commerce Admin Panel.",
                                "Go to Integration.",
                                "Click on Woocommerce Settings.",
                                "Click on Advanced then REST API.",
                                "Click on Add API Key.",
                                "Enter Description and select read / write and Click Add.",
                                "Here you will find Woo-Commerce Details for integration.",
                                "Copy the identifiers and integrate the channel.",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                        <video width="540" height="310" controls="">
                            <source src="https://xb-files.s3.ap-south-1.amazonaws.com/xpressbees-video.mp4" type="video/mp4" />
                        </video>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Channel Name
                                    <input className="input-field" type="text" 
                                    name="channel.channel_name"
                                    value={formData.channel.channel_name}
                                    onChange={handleChange}/>
                                </label>
                                <label>
                                    Store URL
                                    <input className="input-field" type="text" 
                                    name="channel_configuration.store_url"
                                    value={formData.channel_configuration.store_url}
                                    onChange={handleChange}/>
                                    <span className='font13 text-sh-primary'>Store URL should be like https://yourstore.com</span>
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Consumer Key
                                    <input className="input-field" type="text"
                                    name="channel_configuration.woo_consumer_key"
                                    value={formData.channel_configuration.woo_consumer_key}
                                    onChange={handleChange}/>
                                </label>
                                <label>
                                    Consumer Secret
                                    <input className="input-field" type="text"
                                    name="channel_configuration.woo_consumer_secret"
                                    value={formData.channel_configuration.woo_consumer_secret}
                                    onChange={handleChange}/>
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>

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
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <p>Enter Status Mappings</p>
                            </div>
                            <div className='d-flex w-100 gap-5'>
                                <label>
                                    Pickup Scheduled
                                    <input className="input-field" type="text" 
                                    name="channel_configuration.pickup_scheduled"
                                    value={formData.channel_configuration.pickup_scheduled}
                                    onChange={handleChange}/>
                                </label>
                                <label>
                                    Picked Up
                                    <input className="input-field" type="text" 
                                    name="channel_configuration.picked_up"
                                    value={formData.channel_configuration.picked_up}
                                    onChange={handleChange}/>
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    In Transit
                                    <input className="input-field" type="text" 
                                    name="channel_configuration.in_transit"
                                    value={formData.channel_configuration.in_transit}
                                    onChange={handleChange}/>
                                </label>
                                <label>
                                    Out For Delivery
                                    <input className="input-field" type="text" 
                                    name="channel_configuration.out_for_delivery"
                                    value={formData.channel_configuration.out_for_delivery}
                                    onChange={handleChange}/>
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Delivered
                                    <input className="input-field" type="text" 
                                    name="channel_configuration.delivered"
                                    value={formData.channel_configuration.delivered}
                                    onChange={handleChange}/>
                                </label>
                                <label className=''>
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

export default WooCommerceIntegrationForm;
