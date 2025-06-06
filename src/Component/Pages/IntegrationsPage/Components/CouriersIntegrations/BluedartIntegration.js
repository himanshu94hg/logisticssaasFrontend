import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import Logo from '../../../../../assets/image/integration/BluedartLogo.png'
import axios from 'axios'
import Cookies from 'js-cookie';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { useSearchParams } from 'react-router-dom';


const BluedartIntegration = () => {

    const [searchParams] = useSearchParams();
    const courierId = searchParams.get('courier_id');

    const hardcodedToken = Cookies.get("access_token");
    const [formData, setFormData] = useState({
        login_id: '',
        licence_key: '',
        tracking_licence_Key: '',
        customer_code: '',
        area: '',
        api_type: '',
        version: '',
        courier_id: courierId || 'bluedart'
    })


    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [courierData, setCourierData] = useState(null);

    useEffect(() => {
        const fetchCourier = async () => {
            try {
                setLoading(true);
                const token = Cookies.get('access_token');
                const res = await axios.get(
                    `https://app.shipease.in/core-api/courier/courier/?courier_id=${courierId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = res.data;

                setFormData({
                    login_id: data?.key1 || '',
                    licence_key: data?.key2 || '',
                    tracking_licence_Key: data?.key3 || '',
                    customer_code: data?.key4 || '',
                    area: data?.key5 || '',
                    api_type: data?.key6 || '',
                    version: data?.key7 || '',
                    courier_id: data?.courierId || "bluedart",
                });
                setCourierData(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load courier details.');
            } finally {
                setLoading(false);
            }
        };

        // Only call API if courierId is present
        if (courierId) {
            fetchCourier();
        }
    }, [courierId]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validateFields = () => {
        return Object.values(formData).every(
            (value) => value !== '' && value !== null && value !== undefined
        );
    };

    const { isValid, missingFields } = validateFields();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const missingFields = Object.entries(formData)
            .filter(([_, value]) => value.trim() === '')
            .map(([key]) => key);

        if (missingFields.length > 0) {
            setError(`Please fill the following fields: ${missingFields.join(', ')}`);
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${BASE_URL_CORE}/core-api/courier/courier/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${hardcodedToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                setMessage('Bluedart integration saved successfully.');
            } else {
                setError('Unexpected response from server.');
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className='couriers-int-page bluedart-int-page'>
            <section className='courier-header'>
                <div className='courier-header-left'>
                    <img src={Logo} alt="Logo" />
                    <h2 className='mb-0'>Bluedart</h2>
                </div>
                <div className='courier-header-right'>
                    <a href="https://www.bluedart.com/" target="_blank" rel="noopener noreferrer">
                        Need Help?
                    </a>
                </div>
            </section>

            <div className='courier-int-body'>
                <div className='courier-int-form-left box-shadow shadow-sm'>
                    <h4>Instruction to integrate Bluedart to Shipease</h4>
                    <ol className='timeline'>
                        <li className='timeline-list'>Login ID, Licence Key, and Tracking Licence Key are provided by Bluedart. You can obtain them from your Bluedart account manager.</li>
                        <li className='timeline-list'>Customer Code is your unique identifier registered with Bluedart.</li>
                        <li className='timeline-list'>Area should match the service area assigned to you by Bluedart.</li>
                        <li className='timeline-list'>API Type from Buledart Account Manager.</li>
                        <li className='timeline-list'>Version refers to the API version you're using.</li>
                    </ol>
                </div>
                <div className='courier-int-form-right box-shadow shadow-sm'>
                    <form className='courier-int-form' onSubmit={handleSubmit}>
                        {[
                            { id: 'login_id', label: 'Login ID' },
                            { id: 'licence_key', label: 'Licence Key' },
                            { id: 'tracking_licence_Key', label: 'Tracking Licence Key' },
                            { id: 'customer_code', label: 'Customer Code' },
                            { id: 'area', label: 'Area' },
                            { id: 'api_type', label: 'API Type' },
                            { id: 'version', label: 'Version' }
                        ].map(field => (
                            <div className='form-group' key={field.id}>
                                <label htmlFor={field.id}>{field.label}</label>
                                <input
                                    type='text'
                                    id={field.id}
                                    name={field.id}
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}

                        {error && <p className='form-message error'>{error}</p>}
                        {message && <p className='form-message success'>{message}</p>}

                        <button type='submit' className='btn main-button' disabled={loading}>
                            {loading ? 'Saving...' : isEdit ? 'Update' : 'Connect'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BluedartIntegration
