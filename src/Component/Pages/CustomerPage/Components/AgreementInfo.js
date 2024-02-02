import React, { useState } from 'react';
import axios from 'axios';

const AgreementInfo = () => {
  const [documentUpload, setDocumentUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('document_upload', documentUpload);
  
    const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODQxMTU4LCJpYXQiOjE3MDY1OTQ3NTgsImp0aSI6IjM1NDQ4YzNhMDI3OTQ1NThiMzc1YzE5ZTI4YTJlNWI1IiwidXNlcl9pZCI6OH0.jnVhETWWWW8lD0OvmwUsG0w2B5Ybqg2jtLtqztWOpRg';
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/core-api/seller/agreement-info/', formData, {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        setDocumentUpload(); 
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocumentUpload(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='customer-details-container'>
        <div className='customer-details-form'>
          <div className='details-form-row'>
            <h5>Upload Agreement</h5>
            <div className='d-flex gap-5'>
            <label>
                Please Upload File
                <input className="input-field" type="file" onChange={handleFileChange} />
              </label>
            </div>
            <button className='btn main-button mt-5'>View Agreement</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AgreementInfo;
