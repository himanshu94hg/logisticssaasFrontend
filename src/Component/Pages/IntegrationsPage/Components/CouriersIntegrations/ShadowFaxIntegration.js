import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import Logo from '../../../../../assets/image/integration/ShadowfaxLogo.png'
import axios from 'axios'

const ShadowFaxIntegration = () => {
    const [formData, setFormData] = useState({
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
                const res = await axios.get('/api/integrations/shadowfax')
                if (res.data) {
                    setFormData({
                        access_token: res.data.access_token || ''
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
        return formData.access_token.trim() !== ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        if (!validateFields()) {
            setError('Access Token is required.')
            return
        }

        try {
            setLoading(true)
            if (isEdit) {
                await axios.put('/api/integrations/shadowfax', formData)
                setMessage('Shadowfax integration updated successfully.')
            } else {
                await axios.post('/api/integrations/shadowfax', formData)
                setMessage('Shadowfax integration connected successfully.')
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
