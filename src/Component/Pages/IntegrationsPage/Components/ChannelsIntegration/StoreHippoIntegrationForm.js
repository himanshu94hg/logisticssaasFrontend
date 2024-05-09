import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/StoreHippoLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import moment from 'moment';
import { BASE_URL_CORE } from '../../../../../axios/config';

const StoreHippoIntegrationForm = () => {

    const navigation = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const hardcodedToken = Cookies.get("access_token");
    const sellerData = Cookies.get("user_id");
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        seller_id: sellerData,
        channel: {
            channel_name: "",
            channel: "storehippo"
        },
        channel_configuration: {
            store_url: "",
            woo_consumer_key: "",
            woo_consumer_secret: "",
            store_hippo_access_key:"",
            last_executed: '2024-04-22 00:00:00',
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

    const validateFormData = () => {
        const newErrors = {};
        if (!formData.channel.channel_name) {
            newErrors.channel_name = ' Channel Name is required!';
        }
        if (!formData.channel_configuration.store_hippo_access_key) {
            newErrors.store_hippo_access_key = ' Storehippo Access key is required!';
        }
        if (!formData.channel_configuration.store_url) {
            newErrors.store_url = 'Name or Store URL is required!';
        }         
        console.log(newErrors, "this is validate form data")
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
         if (validateFormData()){
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
            <div className='hippo'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>StoreHippo</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate StoreHippo to ShipEase</h4>

                        <h5>Execute On StoreHippo Panel</h5>
                        <ul className='timeline mb-3'>
                            {[
                                "Login to you StoreHippo Admin Panel",
                                "Search for 'Access Key'",
                                "Click On 'Add New'",
                                "Select User than click on 'Save'",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>

                        <h5>Execute on Shipease Panel</h5>
                        <ul className='timeline mb-3'>
                            {[
                                "Copy Access Key that created using previous step.",
                                "Enter Channel Name.",
                                "Enter Store Url.(store url should be like this(https://youstorename.storehippo.com/)",
                                "Paste Access Token in Access Key field.",
                                "Admin Token start appearing in respective field. Click on submit button.",
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
                                    onChange={handleChange}/>
                                    {errors.channel_name && <span className='error-text'>{errors.channel_name}</span>}
                                </label>
                                <label>                                 
                                    <span>Store Name or URL <span className='mandatory'>*</span></span>
                                    <input
                                    className={`input-field ${errors.store_url && "input-field-error"}`}  
                                    type="text" 
                                    name="channel_configuration.store_url"
                                    placeholder='Enter Store Name or URL'
                                    value={formData.channel_configuration.store_url}
                                    onChange={handleChange}/>
                                    <span className='font13 text-sh-primary'>Store URL should be like http://yourstore.com</span>
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    <span>Access Key <span className='mandatory'>*</span></span>
                                    <input 
                                    className={`input-field ${errors.store_hippo_access_key && "input-field-error"}`}  
                                    type="text" 
                                    name="channel_configuration.store_hippo_access_key"
                                    placeholder='Enter Access Key'
                                    value={formData.channel_configuration.store_hippo_access_key}
                                    onChange={handleChange}/>
                                    {errors.store_hippo_access_key && <span className='error-text'>{errors.store_hippo_access_key}</span>}
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

export default StoreHippoIntegrationForm;
