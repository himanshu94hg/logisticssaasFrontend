import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import Logo from '../../../../../assets/image/integration/dtdc.png'
import axios from 'axios'

const DtdcIntegration = () => {
    const [formData, setFormData] = useState({
        customer_code: '',
        service_type_id: '',
        api_key: '',
        access_token: ''
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const fetchIntegration = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/integrations/dtdc')
                if (res.data) {
                    setFormData({
                        customer_code: res.data.customer_code || '',
                        service_type_id: res.data.service_type_id || '',
                        api_key: res.data.api_key || '',
                        access_token: res.data.access_token || ''
                    })
                    setIsEdit(true)
                }
            } catch (err) {
                console.error('Error fetching DTDC integration:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchIntegration()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validateFields = () => {
        return Object.values(formData).every(field => field.trim() !== '')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        if (!validateFields()) {
            setError('All fields are required.')
            return
        }

        try {
            setLoading(true)
            if (isEdit) {
                await axios.put('/api/integrations/dtdc', formData)
                setMessage('DTDC integration updated successfully.')
            } else {
                await axios.post('/api/integrations/dtdc', formData)
                setMessage('DTDC integration connected successfully.')
                setIsEdit(true)
            }
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='couriers-int-page dtdc-int-page'>
            <section className='courier-header'>
                <div className='courier-header-left'>
                    <img src={Logo} alt="Logo" />
                    <h2 className='mb-0'>DTDC</h2>
                </div>
                <div className='courier-header-right'>
                    <a href="https://support.dtdc.in/" target="_blank" rel="noopener noreferrer">
                        Need Help?
                    </a>
                </div>
            </section>

            <div className='courier-int-body'>
                <div className='courier-int-form-left box-shadow shadow-sm'>
                    <h4>Instructions to integrate DTDC with Shipease</h4>
                    <ol className='timeline'>
                        <li className='timeline-list'>
                            <strong>Customer Code:</strong> This unique code is assigned to your business account by DTDC. Please ensure you enter it exactly as provided.
                        </li>
                        <li className='timeline-list'>
                            <strong>Service Type ID:</strong> Specifies the type of service enabled for your account (e.g., express, cargo). Obtain this ID from your DTDC account manager.
                        </li>
                        <li className='timeline-list'>
                            <strong>API Key:</strong> This key is provided by DTDC to authenticate your API requests. Keep this confidential.
                        </li>
                        <li className='timeline-list'>
                            <strong>Access Token:</strong> Required to authorize your API calls. Tokens typically expire, so ensure you have a valid token.
                        </li>
                        <li className='timeline-list'>
                            To get the required credentials, please contact your DTDC account manager or visit the <a href="https://support.dtdc.in/" target="_blank" rel="noopener noreferrer">DTDC Support Portal</a>.
                        </li>
                        <li className='timeline-list'>
                            Once all fields are filled correctly, click <strong>Connect</strong> to establish the integration. You can update the details anytime by clicking <strong>Update</strong>.
                        </li>
                    </ol>
                </div>

                <div className='courier-int-form-right box-shadow shadow-sm'>
                    <form className='courier-int-form' onSubmit={handleSubmit}>
                        {[
                            { id: 'customer_code', label: 'Customer Code' },
                            { id: 'service_type_id', label: 'Service Type ID' },
                            { id: 'api_key', label: 'API Key' },
                            { id: 'access_token', label: 'Access Token' }
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

export default DtdcIntegration
