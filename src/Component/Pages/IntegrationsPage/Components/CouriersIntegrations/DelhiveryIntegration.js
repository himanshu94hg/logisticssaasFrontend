import React, { useState, useEffect } from 'react'
import './CouriersIntegrations.css'
import Logo from '../../../../../assets/image/integration/DelhiveryLogo.png'
import axios from 'axios'
import Cookies from 'js-cookie';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { useSearchParams } from 'react-router-dom';

const DelhiveryIntegration = () => {
  const [searchParams] = useSearchParams();
  const courierId = searchParams.get('courier_id');

  const hardcodedToken = Cookies.get("access_token");

  const [formData, setFormData] = useState({
    business_name: '',
    access_token: '',
    shipping_mode: '',
    courier_id: courierId || null,
    courier_partner: 'delhivery'
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [courierData, setCourierData] = useState(null);

  useEffect(() => {
    const fetchIntegration = async () => {
      try {
        setLoading(true);
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
          access_token: data?.key2 || '',
          shipping_mode: data?.key3 || '',
          courier_id: data?.courierId || null,
          courier_partner: 'delhivery'
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

  const validateFields = () => {
    return Object.values(formData).every(field => field.trim() !== '')
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
        setMessage('Delhivery integration saved successfully.');
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
