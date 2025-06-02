import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import Logo from '../../../../../assets/image/integration/XpressBeesLogo.png'
import axios from 'axios'

const XpressBeesIntegration = () => {
    const [formData, setFormData] = useState({
        business_name: '',
        xb_key: '',
        username: '',
        password: '',
        secret_key: ''
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const fetchIntegration = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/api/integrations/xpressbees')
                if (res.data) {
                    setFormData({
                        business_name: res.data.business_name || '',
                        xb_key: res.data.xb_key || '',
                        username: res.data.username || '',
                        password: res.data.password || '',
                        secret_key: res.data.secret_key || ''
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
                await axios.put('/api/integrations/xpressbees', formData)
                setMessage('XpressBees integration updated successfully.')
            } else {
                await axios.post('/api/integrations/xpressbees', formData)
                setMessage('XpressBees integration connected successfully.')
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
