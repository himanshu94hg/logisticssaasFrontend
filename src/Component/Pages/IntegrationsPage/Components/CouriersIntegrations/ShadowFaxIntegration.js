import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import Logo from '../../../../../assets/image/integration/ShadowfaxLogo.png'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { useSearchParams } from 'react-router-dom';

const ShadowFaxIntegration = () => {

    const [searchParams] = useSearchParams();
    const courierId = searchParams.get('courier_id');

    const hardcodedToken = Cookies.get("access_token");

    const [formData, setFormData] = useState({
        access_token: '',
        courier_id: courierId || null,
        courier_partner: 'shadowfax'
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
                    access_token: data?.key1 || '',
                    courier_id: data?.courierId || null,
                    courier_partner: 'shadowfax'
                });
                setCourierData(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load courier details.');
            } finally {
                setLoading(false);
            }

        }

        if (courierId) {
            fetchIntegration();
        }
    }, [courierId]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        const missingFields = Object.entries(formData)
            .filter(([key, value]) => {
                if (key === 'courier_id') return false; // allow null or empty
                return !value || value.toString().trim() === '';
            })
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
                setMessage('ShadowFax integration saved successfully.');
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
        <div className='couriers-int-page shadowfax-int-page'>
            <section className='courier-header'>
                <div className='courier-header-left'>
                    <img src={Logo} alt="Shadowfax Logo" />
                    <h2 className='mb-0'>Shadowfax</h2>
                </div>
                <div className='courier-header-right'>
                    <a href="https://www.shadowfax.in/" target="_blank" rel="noopener noreferrer">
                        Need Help?
                    </a>
                </div>
            </section>

            <div className='courier-int-body'>
                <div className='courier-int-form-left box-shadow shadow-sm'>
                    <h4>Instruction to integrate Shadowfax to Shipease</h4>
                    <ol className='timeline'>
                        <li className='timeline-list'>Access Token is provided by Shadowfax. You can obtain it from your Shadowfax account manager.</li>
                        <li className='timeline-list'>Click on Connect.</li>
                    </ol>
                </div>
                <div className='courier-int-form-right box-shadow shadow-sm'>
                    <form className='courier-int-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='access_token'>Access Token</label>
                            <input
                                type='text'
                                id='access_token'
                                name='access_token'
                                value={formData.access_token}
                                onChange={handleChange}
                                required
                            />
                        </div>

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

export default ShadowFaxIntegration
