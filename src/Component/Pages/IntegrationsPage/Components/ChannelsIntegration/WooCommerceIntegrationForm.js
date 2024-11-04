import axios from "axios";
import moment from 'moment';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch,useSelector } from 'react-redux';
import { BASE_URL_CORE } from '../../../../../axios/config';
import Logo from '../../../../../assets/image/integration/woocommerceLogo.png';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';

const WooCommerceIntegrationForm = () => {
    const dispatch=useDispatch()
    const navigation = useNavigate();
    const [errors, setErrors] = useState({});
    const hardcodedToken = Cookies.get("access_token");
    const [selectedDate, setSelectedDate] = useState(null);
    const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);
    
    const [formData, setFormData] = useState({
        seller_id: userData?.id,
        channel: {
            channel_name: "",
            channel: "woocommerce"
        },
        channel_configuration: {
            store_url: "",
            woo_consumer_key: "",
            woo_consumer_secret: "",
            last_executed: '',
            pickup_scheduled: "confirmed",
            picked_up: "picked_up",
            in_transit: "in_transit",
            out_for_delivery: "out_for_delivery",
            delivered: "completed",
            auto_fulfill: true,
            auto_cancel: true,
            auto_cod_paid: true,
            send_abandon_sms: false
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
        if (!formData.channel_configuration.store_url) {
            newErrors.store_url = ' Store URL is required!';
        }
        if (!formData.channel_configuration.woo_consumer_key) {
            newErrors.woo_consumer_key = 'Woo Consumer Key is required!';
        }
        if (!formData.channel_configuration.woo_consumer_secret) {
            newErrors.woo_consumer_secret = ' Woo Consumer Secret is required!';
        }
        if (selectedDate === null) {
            newErrors.selectedDate = ' Date is required!';
        }
        if (!formData.channel_configuration.pickup_scheduled) {
            newErrors.pickup_scheduled = ' Pickup Scheduled is required!';
        }
        if (!formData.channel_configuration.picked_up) {
            newErrors.picked_up = ' Pickup Up is required!';
        }
        if (!formData.channel_configuration.in_transit) {
            newErrors.in_transit = ' In Transit is required!';
        }
        if (!formData.channel_configuration.out_for_delivery) {
            newErrors.out_for_delivery = ' Out for Delivery is required!';
        }
        if (!formData.channel_configuration.delivered) {
            newErrors.delivered = 'delivered is required!';
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
                    const responseData = response.data;
                    dispatch({ type: "CHANNEL_GET_DATA_ACTION" });
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Channel added successfully!',
                        confirmButtonText: 'OK'
                    });
                    navigation('/channels-integration');
                }
            } catch (error) {
                customErrorFunction(error)
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
                        {/* <video width="540" height="310" controls="">
                            <source src="https://xb-files.s3.ap-south-1.amazonaws.com/xpressbees-video.mp4" type="video/mp4" />
                        </video> */}
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex w-100 gap-3 mt-4 flex-column flex-lg-row'>
                                <label>
                                    <span>Channel Name <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.channel_name && "input-field-error"}`}
                                        type="text"
                                        name="channel.channel_name"
                                        placeholder='Enter Channel Name'
                                        value={formData.channel.channel_name}
                                        maxLength={50}
                                        onChange={handleChange} />
                                    {errors.channel_name && <span className='error-text'>{errors.channel_name}</span>}
                                </label>
                                <label>
                                    <span>Store URL <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.store_url && "input-field-error"}`}
                                        type="text"
                                        name="channel_configuration.store_url"
                                        placeholder='Enter Store URL'
                                        value={formData.channel_configuration.store_url}
                                        onChange={handleChange} />
                                    <span className='font13 text-sh-primary'>Store URL should be like https://yourstore.com</span>
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-3 mt-4 flex-column flex-lg-row'>
                                <label>
                                    <span>Consumer Key <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.woo_consumer_key && "input-field-error"}`}
                                        type="text"
                                        name="channel_configuration.woo_consumer_key"
                                        placeholder='Enter Consumer Key'
                                        value={formData.channel_configuration.woo_consumer_key}
                                        onChange={handleChange} />
                                    {errors.woo_consumer_key && <span className='error-text'>{errors.woo_consumer_key}</span>}
                                </label>
                                <label>
                                    <span>Consumer Secret <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.woo_consumer_secret && "input-field-error"}`}
                                        type="text"
                                        name="channel_configuration.woo_consumer_secret"
                                        placeholder='Enter Consumer Secret'
                                        value={formData.channel_configuration.woo_consumer_secret}
                                        onChange={handleChange} />
                                    {errors.woo_consumer_secret && <span className='error-text'>{errors.woo_consumer_secret}</span>}
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>

                                <label>
                                    <span>Fetch Orders From <span className='mandatory'>*</span></span>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat='MM/dd/yyyy'
                                        className={`input-field ${errors.selectedDate && "input-field-error"}`}
                                        placeholderText='Enter Date'
                                    />
                                    {errors.selectedDate && <span className='error-text'>{errors.selectedDate}</span>}
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <p>Enter Status Mappings</p>
                            </div>
                            <div className='d-flex w-100 gap-3 flex-column flex-lg-row'>
                                <label>
                                    <span>Pickup Scheduled <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.pickup_scheduled && "input-field-error"}`}
                                        type="text"
                                        name="channel_configuration.pickup_scheduled"
                                        placeholder='Enter Pickup Scheduled'
                                        value={formData.channel_configuration.pickup_scheduled}
                                        maxLength={30}
                                        onChange={handleChange} />
                                    {errors.pickup_scheduled && <span className='error-text'>{errors.pickup_scheduled}</span>}
                                </label>
                                <label>
                                    <span>Picked Up <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.picked_up && "input-field-error"}`}
                                        type="text"
                                        name="channel_configuration.picked_up"
                                        placeholder='Enter Picked Up'
                                        value={formData.channel_configuration.picked_up}
                                        maxLength={30}
                                        onChange={handleChange} />
                                    {errors.picked_up && <span className='error-text'>{errors.picked_up}</span>}
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-3 mt-4 flex-column flex-lg-row'>
                                <label>
                                    <span>In Transit <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.in_transit && "input-field-error"}`}
                                        type="text"
                                        name="channel_configuration.in_transit"
                                        placeholder='Enter In Transit'
                                        value={formData.channel_configuration.in_transit}
                                        maxLength={30}
                                        onChange={handleChange} />
                                    {errors.in_transit && <span className='error-text'>{errors.in_transit}</span>}
                                </label>
                                <label>
                                    <span>Out For Delivery <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.out_for_delivery && "input-field-error"}`}
                                        type="text"
                                        name="channel_configuration.out_for_delivery"
                                        placeholder='Enter Out For Delivery'
                                        value={formData.channel_configuration.out_for_delivery}
                                        maxLength={30}
                                        onChange={handleChange} />
                                    {errors.out_for_delivery && <span className='error-text'>{errors.out_for_delivery}</span>}
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    <span>Delivered <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors.delivered && "input-field-error"}`}
                                        type="text"
                                        name="channel_configuration.delivered"
                                        placeholder='Enter Delivered'
                                        value={formData.channel_configuration.delivered}
                                        maxLength={30}
                                        onChange={handleChange} />
                                    {errors.delivered && <span className='error-text'>{errors.delivered}</span>}
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
