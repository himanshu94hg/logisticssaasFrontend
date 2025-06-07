import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import EkartLogo from '../../../../../assets/image/integration/EkartLogo.png'
import axios from 'axios'
import Cookies from 'js-cookie';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { useSearchParams } from 'react-router-dom';

const EkartIntegration = () => {

    const [searchParams] = useSearchParams();
    const courierId = searchParams.get('courier_id');

    const hardcodedToken = Cookies.get("access_token");

    const [formData, setFormData] = useState({
        merchant_code: '',
        access_token: '',
        service_code: '',
        courier_id: courierId || 'ekart',
        courier_partner: 'ekart'
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [courierData, setCourierData] = useState(null);

    useEffect(() => {
        const fetchIntegration = async () => {
            try {
                setLoading(true)
                const res = await axios.get(
                    `https://app.shipease.in/core-api/courier/courier/?courier_id=${courierId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${hardcodedToken}`,
                        },
                    }
                );
                const data = res.data;

                setFormData({
                    merchant_code: data?.key1 || '',
                    access_token: data?.key2 || '',
                    service_code: data?.key3 || '',
                    courier_id: data?.courierId || 'ekart',
                    courier_partner: 'ekart'
                });
                setCourierData(res.data);



            } catch (err) {
                console.error(err);
                setError('Failed to load courier details.');
            } finally {
                setLoading(false);
            }
        };
        if (courierId) {
            fetchIntegration();
        }

    }, [courierId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        const missingFields = Object.entries(formData)
            .filter(([_, value]) => value.trim() === '')
            .map(([key]) => key);

        if (missingFields.length > 0) {
            setError(`Please fill the following fields: ${missingFields.join(', ')}`);
            return;
        }

        try {
            setLoading(true)
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
                setMessage('Ekart integration saved successfully.');
            } else {
                setError('Unexpected response from server.');
            }
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='couriers-int-page ekart-int-page'>
            <section className='courier-header'>
                <div className='courier-header-left'>
                    <img src={EkartLogo} alt="Ekart Logo" />
                    <h2 className='mb-0'>Ekart</h2>
                </div>
                <div className='courier-header-right'>
                    <a href="https://www.ekartlogistics.com/" target="_blank" rel="noopener noreferrer">
                        Need Help?
                    </a>
                </div>
            </section>

            <div className='courier-int-body'>
                <div className='courier-int-form-left box-shadow shadow-sm'>
                    <h4>Instruction to integrate Ekart to Shipease</h4>
                    <ol className='timeline'>
                        <li className='timeline-list'>Merchant Code is provided by Ekart. You can obtain it from your Ekart account manager.</li>
                        <li className='timeline-list'>Access Token is your authentication token assigned by Ekart.</li>
                        <li className='timeline-list'>Service Code identifies the specific service or product code with Ekart.</li>
                    </ol>
                </div>
                <div className='courier-int-form-right box-shadow shadow-sm'>
                    <form className='courier-int-form' onSubmit={handleSubmit}>
                        {[
                            { id: 'merchant_code', label: 'Merchant Code' },
                            { id: 'access_token', label: 'Access Token' },
                            { id: 'service_code', label: 'Service Code' }
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

export default EkartIntegration
