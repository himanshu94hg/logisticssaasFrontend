import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BasicInfo = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [gstCertificate, setGstCertificate] = useState(null);
  const [panNumber, setPanNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [getBasicInfoList, setBasicinfo] = useState([]);


  const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODYxNDk3LCJpYXQiOjE3MDY2MTUwOTcsImp0aSI6IjI0MTllNzg2NWY0NDRjNjM5OGYxZjAxMzlmM2Y2Y2M2IiwidXNlcl9pZCI6OX0.LNk9C0BFIgkIZpkYHNz2CvjzzcdwXkwYSOVpcK5A7Sw'
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/core-api/seller/basic-info/', {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
        },
      })
      .then(response => {
        setBasicinfo(response.data);
        const basicInfoData = response.data[0] || {};
        setCompanyName(basicInfoData.company_name || '');
        setEmail(basicInfoData.email || '');
        setPanNumber(basicInfoData.pan_number || '');
        setGstNumber(basicInfoData.gst_number || '');
        setStreetName(basicInfoData.street || '');
        setZipCode(basicInfoData.pincode || '');
        setCityName(basicInfoData.city || '');
        setStateName(basicInfoData.state || '');
        setWebsite(basicInfoData.website_url || '');
        setMobileNumber(basicInfoData.mobile || '');

        // Set other fields similarly


        // setWebsite
      })
      .catch(error => {  // Add a .catch block here
        console.error('Error:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('company_name', companyName);
      formData.append('website_url', website);
      formData.append('company_logo', companyLogo);
      formData.append('gst_number', gstNumber);
      formData.append('gst_certificate', gstCertificate);
      formData.append('pan_number', panNumber);
      formData.append('mobile', mobileNumber);
      formData.append('email', email);
      formData.append('street', streetName);
      formData.append('pincode', zipCode);
      formData.append('city', cityName);
      formData.append('state', stateName);

      const response = await fetch('http://127.0.0.1:8000/core-api/seller/basic-info/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
        },
      });

      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const uploadGstFile = (e) => {
    const file = e.target.files[0];
    setGstCertificate(file);
  };

  const uploadLogo = (e) => {
    const file = e.target.files[0];
    setCompanyLogo(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='customer-details-container mb-2'>
        <div className='customer-details-form'>
          <div className='details-form-row'>
            <h5>Primary Details</h5>
            <div className='d-flex gap-5 flex-wrap'>
              {/* ... (Other input fields) */}
              <label>
                Company Name
                <input className="input-field" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </label>
              <label>
                Website URL
                <input className="input-field" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
              <label>
                Company logo
                <input className="input-field" type="file" onChange={uploadLogo} />
              </label>


              <label>
                Mobile Number
                <input className="input-field" type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </label>

              <label>
                Email
                <input className="input-field" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                Pan Number
                <input className="input-field" type="text" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
              </label>
              <label>
                GST Number
                <input className="input-field" type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
              </label>
              <label>
                GST Certificate
                <input className="input-field" type="file" onChange={uploadGstFile} />
              </label>

              
              {/* ... (Other input fields) */}
            </div>
          </div>
          <hr />
          <div className='details-form-row'>
            <h5>Primary Details</h5>
            <div className='d-flex gap-5 flex-wrap'>
              {/* ... (Other input fields) */}
              <label>
                Company Name
                <input className="input-field" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </label>
              <label>
                Website URL
                <input className="input-field" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
              <label>
                Company logo
                <input className="input-field" type="file" onChange={uploadLogo} />
              </label>

              
              <label>
                Mobile Number
                <input className="input-field" type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </label>

              <label>
                Email
                <input className="input-field" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                Pan Number
                <input className="input-field" type="text" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
              </label>
              <label>
                GST Number
                <input className="input-field" type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
              </label>
              <label>
                GST Certificate
                <input className="input-field" type="file" onChange={uploadGstFile} />
              </label>

              
              {/* ... (Other input fields) */}
            </div>
          </div>
          <hr />
          <div className='details-form-row'>
            <h5>Address Details</h5>
            <div className='d-flex gap-5 flex-wrap'>
              {/* ... (Other input fields) */}
              <label>
                Enter Street Name
                <input className="input-field" type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
              </label>
              <label>
                Enter Zip Code
                <input className="input-field" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
              </label>
              <label>
                City Name
                <input className="input-field" type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
              </label>
              <label>
                State Name
                <input className="input-field" type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} />
              </label>
              {/* ... (Other input fields) */}
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-end mt-5'>
          <button className='btn main-button' type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default BasicInfo;
