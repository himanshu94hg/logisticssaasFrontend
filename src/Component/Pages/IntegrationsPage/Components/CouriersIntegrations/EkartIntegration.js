import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import EkartLogo from '../../../../../assets/image/integration/EkartLogo.png'
import axios from 'axios'

const EkartIntegration = () => {
    const [formData, setFormData] = useState({
        merchant_code: '',
        access_token: '',
        service_code: ''
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const fetchIntegration = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/integrations/ekart')
                if (res.data) {
                    setFormData({
                        merchant_code: res.data.merchant_code || '',
                        access_token: res.data.access_token || '',
                        service_code: res.data.service_code || ''
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
                await axios.put('/api/integrations/ekart', formData)
                setMessage('Ekart integration updated successfully.')
            } else {
                await axios.post('/api/integrations/ekart', formData)
                setMessage('Ekart integration connected successfully.')
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
