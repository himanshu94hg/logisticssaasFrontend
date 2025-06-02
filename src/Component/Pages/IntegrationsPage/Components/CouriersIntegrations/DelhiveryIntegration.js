import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import Logo from '../../../../../assets/image/integration/DelhiveryLogo.png'
import axios from 'axios'

const DelhiveryIntegration = () => {
  const [formData, setFormData] = useState({
    business_name: '',
    access_token: '',
    shipping_mode: ''
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    const fetchIntegration = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/integrations/delhivery')
        if (res.data) {
          setFormData({
            business_name: res.data.business_name || '',
            access_token: res.data.access_token || '',
            shipping_mode: res.data.shipping_mode || ''
          })
          setIsEdit(true)
        }
      } catch (err) {
        console.error('Error fetching Delhivery integration:', err)
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
        await axios.put('/api/integrations/delhivery', formData)
        setMessage('Delhivery integration updated successfully.')
      } else {
        await axios.post('/api/integrations/delhivery', formData)
        setMessage('Delhivery integration connected successfully.')
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
    <div className='couriers-int-page delhivery-int-page'>
      <section className='courier-header'>
        <div className='courier-header-left'>
          <img src={Logo} alt="Delhivery Logo" />
          <h2 className='mb-0'>Delhivery</h2>
        </div>
        <div className='courier-header-right'>
          <a href="https://www.delhivery.com/" target="_blank" rel="noopener noreferrer">
            Need Help?
          </a>
        </div>
      </section>

      <div className='courier-int-body'>
        <div className='courier-int-form-left box-shadow shadow-sm'>
          <h4>Instruction to integrate Delhivery to Shipease</h4>
          <ol className='timeline'>
            <li className='timeline-list'>Business Name is your registered business entity with Delhivery.</li>
            <li className='timeline-list'>Access Token is provided by Delhivery to authenticate API calls.</li>
            <li className='timeline-list'>Shipping Mode specifies the shipping preference or type assigned by Delhivery.</li>
          </ol>
        </div>

        <div className='courier-int-form-right box-shadow shadow-sm'>
          <form className='courier-int-form' onSubmit={handleSubmit}>
            {[
              { id: 'business_name', label: 'Business Name' },
              { id: 'access_token', label: 'Access Token' },
              { id: 'shipping_mode', label: 'Shipping Mode' }
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

export default DelhiveryIntegration
