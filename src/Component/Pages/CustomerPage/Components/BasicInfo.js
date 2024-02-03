import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCloudUpload } from "react-icons/bs";
import dummyLogo from '../../../../assets/image/logo/dummyLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';



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
  const [logoPreview, setLogoPreview] = useState(dummyLogo);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [ViewAttachmentContent, setViewAttachmentContent] = useState(false)


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
        console.error('Error fetching basic info:', error);
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

      const response = await fetch('http://65.2.38.87:8000/core-api/seller/basic-info/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
        },
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        Swal.fire({
          icon: 'success',
          title: 'Your Basic Information is added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const uploadGstFile = (e) => {
    const file = e.target.files[0];
    setGstCertificate(file);
    const previewURL = URL.createObjectURL(file);
    setPdfPreview(previewURL);
  };

  const uploadLogo = (e) => {
    const file = e.target.files[0];
    setCompanyLogo(file);
    const previewURL = URL.createObjectURL(file);
    setLogoPreview(previewURL);
  };


  const handlePreview = () => {
    if (pdfPreview === null) {
      Swal.fire({
        icon: 'warning',
        title: 'No PDF to preview',
        text: 'Please upload a PDF file to preview.',
      });

      // Reset the showNoPreviewAlert state
      setViewAttachmentContent(false);
    }
    else {
      setViewAttachmentContent(!ViewAttachmentContent)
    }
  }




  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='customer-details-container mb-2'>
          <div className='customer-details-form'>
            <div className='details-form-row row'>
              <h5 className='col-3'>Primary Details</h5>
              <div className='col-9'>
                <label className='logo-file-upload'>
                  <input className="input-field" type="file" onChange={uploadLogo} />
                  <div className='upload-logo-input'>
                    <div className='d-flex flex-column align-items-center'>
                      <div className='logo-img-cont'>
                        <img src={logoPreview} alt="Logo Preview" height={50} />
                      </div>
                      {/* <BsCloudUpload className='font40' /> */}
                      <span className='font20 fw-bold'><BsCloudUpload className='font30' /> Upload your Company Logo</span>
                    </div>
                  </div>
                </label>
                <div className='d-flex w-100 gap-3 mt-4'>
                  <label>
                    Company Name
                    <input placeholder="Enter your company name" className="input-field" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                  </label>
                  <label>
                    Website URL
                    <input placeholder='Enter your website URL' className="input-field" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className='details-form-row row'>
              <h5 className='col-3'>Contact Details</h5>
              <div className='col-9 d-flex gap-3'>
                <label>
                  Mobile Number
                  <div className='d-flex mobile-number-field'>
                    <select
                      className='input-field '
                      disabled
                    >
                      <option value="+91">+91</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      className="input-field"
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder='XXXXXXXXXX'
                    />
                  </div>
                </label>
                <label>
                  Email
                  <input
                    className="input-field"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='i.e. abc@gmail.com' />
                </label>
              </div>
            </div>
            <hr />
            <div className='details-form-row row'>
              <h5 className='col-3'>Address Details</h5>
              <div className='col-9'>
                <div className='d-flex gap-3'>
                  <label>
                    Address
                    <input placeholder="House/Floor No. Building Name or Street, Locality" className="input-field" type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
                  </label>
                  <label>
                    Landmark
                    <input placeholder="Any nearby post office, market, Hospital as the landmark" className="input-field" type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
                  </label>
                </div>
                <div className='d-flex gap-3 mt-3'>
                  <label>
                    Pincode
                    <input placeholder="Enter your Pincode" className="input-field" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                  </label>
                  <label>
                    City
                    <input placeholder="Enter your city" className="input-field" type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
                  </label>
                  <label>
                    State
                    <input placeholder="Enter your state" className="input-field" type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} />
                  </label>
                  <label>
                    Country
                    <input placeholder="Enter your country" className="input-field" type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} />
                  </label>
                  {/* ... (Other input fields) */}
                </div>
              </div>
            </div>
            <hr />
            <div className="details-form-row row">
              <h5 className='col-3'>Taxation Details</h5>
              <div className='col-9'>
                <div className='d-flex gap-3 mt-3'>
                  <label>
                    Pan Number
                    <input className="input-field" type="text" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
                  </label>
                  <label>
                    GST Number
                    <input className="input-field" type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
                  </label>
                  <label className='position-relative'>
                    GST Certificate
                    <input className="input-field" type="file" accept=".pdf" onChange={uploadGstFile} />
                    <button
                      className='eye-button'
                      onClick={handlePreview}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </label>

                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end mt-4'>
            <button className='btn main-button' type="submit">Save</button>
          </div>
        </div>
      </form >
      <section className={`pdf-preview-section ${ViewAttachmentContent ? 'd-block' : 'd-none'}`}>
        {pdfPreview && (
          <embed src={pdfPreview} type="application/pdf" width="100%" height="100%" />
        )}
      </section>

      <div
        onClick={() => setViewAttachmentContent(!ViewAttachmentContent)}
        className={`backdrop ${ViewAttachmentContent ? 'd-block' : 'd-none'}`}></div>
    </>
  );
};

export default BasicInfo;
