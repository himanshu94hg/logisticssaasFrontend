import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import Logo from '../../../../../assets/image/integration/XpressBeesLogo.png'
import axios from 'axios'
import Cookies from 'js-cookie';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { useSearchParams } from 'react-router-dom';

const XpressBeesIntegration = () => {
    const [searchParams] = useSearchParams();
    const courierId = searchParams.get('courier_id');

    const hardcodedToken = Cookies.get("access_token");

    const [formData, setFormData] = useState({
        business_name: '',
        xb_key: '',
        username: '',
        password: '',
        secret_key: '',
        courier_id: courierId || null,
        courier_partner: 'xpressbees'
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
                    business_name: data?.key1 || '',
                    xb_key: data?.key2 || '',
                    username: data?.key3 || '',
                    password: data?.key4 || '',
                    secret_key: data?.key5 || '',
                    courier_id: data?.courierId || null,
                    courier_partner: 'xpressbees'
                });
                setCourierData(res.data);
            } catch (err) {
                console.error('Error fetching integration:', err)
                setError('Failed to load courier details.');
            } finally {
                setLoading(false)
            }
        }

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
                setMessage('XpressBees integration saved successfully.');
            } else {
                setError('Unexpected response from server.');
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='couriers-int-page xpressbees-int-page'>
            <section className='courier-header'>
                <div className='courier-header-left'>
                    <img src={Logo} alt="Logo" />
                    <h2 className='mb-0'>XpressBees</h2>
                </div>
                <div className='courier-header-right'>
                    <a href="https://www.xpressbees.com/" target="_blank" rel="noopener noreferrer">
                        Need Help?
                    </a>
                </div>
            </section>

            <div className='courier-int-body'>
                <div className='courier-int-form-left box-shadow shadow-sm'>
                    <h4>Instruction to integrate XpressBees to Shipease</h4>
                    <ol className='timeline'>
                        <li className='timeline-list'>Business Name should match the name registered with XpressBees.</li>
                        <li className='timeline-list'>XB Key is provided by XpressBees after onboarding.</li>
                        <li className='timeline-list'>Username and Password are credentials from your XpressBees dashboard.</li>
                        <li className='timeline-list'>Secret Key is a security credential provided by XpressBees.</li>
                    </ol>
                </div>
                <div className='courier-int-form-right box-shadow shadow-sm'>
                    <form className='courier-int-form' onSubmit={handleSubmit}>
                        {[
                            { id: 'business_name', label: 'Business Name' },
                            { id: 'xb_key', label: 'XB Key' },
                            { id: 'username', label: 'Username' },
                            { id: 'password', label: 'Password' },
                            { id: 'secret_key', label: 'Secret Key' }
                        ].map(field => (
                            <div className='form-group' key={field.id}>
                                <label htmlFor={field.id}>{field.label}</label>
                                <input
                                    type={field.id === 'password' ? 'password' : 'text'}
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

export default XpressBeesIntegration
