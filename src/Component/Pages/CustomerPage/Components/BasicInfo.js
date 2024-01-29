import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data, like sending it to the server
    console.log({
      companyName,
      email,
      website,
      mobileNumber,
      gstNumber,
      gstCertificate,
      panNumber,
      streetName,
      zipCode,
      cityName,
      stateName,
    });

    // Reset form fields
    setCompanyName('');
    setEmail('');
    setWebsite('');
    setMobileNumber('');
    setGstNumber('');
    setGstCertificate(null);
    setPanNumber('');
    setStreetName('');
    setZipCode('');
    setCityName('');
    setStateName('');
  };

  const handleFileChange = (e) => {
    // Assuming single file upload, you can modify for multiple files
    const file = e.target.files[0];
    setGstCertificate(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='customer-details-container mb-2'>
        <div className='customer-details-form'>
          <div className='details-form-row'>
            <h5>Primary Details</h5>
            <div className='d-flex gap-5 flex-wrap'>
              <label>
                Company Name
                <input className="input-field" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </label>
              <label>
                Website URL
                <input className="input-field" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
              <label>
                Website Logo
                <input className="input-field" type="file" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>
          </div>
          <hr />
          <div className='details-form-row'>
            <h5>Taxation Details</h5>
            <div className='d-flex gap-5 flex-wrap'>
              <label>
                GST Number
                <input className="input-field" type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
              </label>
              <label>
                Please Upload Your GST Certificate
                <input className="input-field" type="file" onChange={handleFileChange} />
              </label>
              <label>
                Enter Your PAN Number
                <input className="input-field" type="text" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
              </label>
            </div>
          </div>
          <hr />
          <div className='details-form-row'>
            <h5>Contact Details</h5>
            <div className='d-flex gap-5'>
              <label>
                Mobile Number
                <input className="input-field" type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </label>
              <label>
                Corporate Email Address
                <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
          </div>
          <hr />
          <div className='details-form-row'>
            <h5>Address Details</h5>
            <div className='d-flex gap-5 flex-wrap'>
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
            </div>
          </div>
        </div>
      </div>
      {/* <button type="submit">Submit</button> */}
    </form >
  );
};

export default BasicInfo;
