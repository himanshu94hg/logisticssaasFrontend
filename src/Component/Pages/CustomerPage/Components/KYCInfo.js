import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KYCInfo = () => {
  const [documentUpload, setDocumentUpload] = useState(null);
  const [companyType, setCompanyType] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentTypeList, setDocumentTypeList] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/core-api/master/all-doc/')
      .then(response => {
        setDocumentTypeList(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('document_upload', documentUpload);
    formData.append('company_type', companyType);
    formData.append('document_type', documentType);
    formData.append('document_id', documentId);
    formData.append('document_name', documentName);

    const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODQxMTU4LCJpYXQiOjE3MDY1OTQ3NTgsImp0aSI6IjM1NDQ4YzNhMDI3OTQ1NThiMzc1YzE5ZTI4YTJlNWI1IiwidXNlcl9pZCI6OH0.jnVhETWWWW8lD0OvmwUsG0w2B5Ybqg2jtLtqztWOpRg'; // Replace with your actual token

    try {
      const response = await axios.post('http://127.0.0.1:8000/core-api/seller/kyc-info/', formData, {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Form submitted successfully');
        // Reset form fields if needed
        setCompanyType('');
        setDocumentType('');
        setDocumentId('');
        setDocumentName('');
        setDocumentUpload(null);
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
            <h5>KYC Documents</h5>
            <div className='d-flex gap-5 flex-wrap'>
              <label>
                Company Type
                <input className="input-field" type="text" value={companyType} onChange={(e) => setCompanyType(e.target.value)} />
              </label>

              <label>
                Document Type
                <select className="select-field" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                  <option value="">Select Document Type</option>
                  {documentTypeList.map(doc => (
                    <option key={doc.id} value={doc.slug}>{doc.doc_name}</option>
                  ))}
                </select>
              </label>

              <label>
                Upload Document
                <input className="input-field" type="file" onChange={handleFileChange} />
              </label>

              <label>
                Document Name
                <input className="input-field" type="text" value={documentName} onChange={(e) => setDocumentName(e.target.value)} />
              </label>

              <label>
                Document Number
                <input className="input-field" type="text" value={documentId} onChange={(e) => setDocumentId(e.target.value)} />
              </label>
            </div>
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default KYCInfo;
