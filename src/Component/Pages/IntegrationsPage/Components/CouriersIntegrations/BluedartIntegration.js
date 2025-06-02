import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import Logo from '../../../../../assets/image/integration/BluedartLogo.png'
import axios from 'axios'

const BluedartIntegration = () => {
    const [formData, setFormData] = useState({
        login_id: '',
        licence_key: '',
        tracking_licence_Key: '',
        customer_code: '',
        area: '',
        api_type: '',
        version: ''
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const fetchIntegration = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/integrations/bluedart')
                if (res.data) {
                    setFormData({
                        login_id: res.data.login_id || '',
                        licence_key: res.data.licence_key || '',
                        tracking_licence_Key: res.data.tracking_licence_Key || '',
                        customer_code: res.data.customer_code || '',
                        area: res.data.area || '',
                        api_type: res.data.api_type || '',
                        version: res.data.version || ''
                    })
                    setIsEdit(true)
                }
            } catch (err) {
                console.error('Error fetching integration:', err)
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
                await axios.put('/api/integrations/bluedart', formData)
                setMessage('Bluedart integration updated successfully.')
            } else {
                await axios.post('/api/integrations/bluedart', formData)
                setMessage('Bluedart integration connected successfully.')
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
