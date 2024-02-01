import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const KYCInfo = () => {
  const [documentUpload, setDocumentUpload] = useState(null);
  const [companyType, setCompanyType] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentTypeList, setDocumentTypeList] = useState([]);
  const [kycListInfo, setKycInfoList] = useState()
  const [pdfPreview, setPdfPreview] = useState(null);
  const [ViewAttachmentContent, setViewAttachmentContent] = useState(false)

  const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODYxNDk3LCJpYXQiOjE3MDY2MTUwOTcsImp0aSI6IjI0MTllNzg2NWY0NDRjNjM5OGYxZjAxMzlmM2Y2Y2M2IiwidXNlcl9pZCI6OX0.LNk9C0BFIgkIZpkYHNz2CvjzzcdwXkwYSOVpcK5A7Sw'

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

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/core-api/seller/kyc-info/', {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
        },
      })
      .then(response => {
        setKycInfoList(response.data);
        const docData = response.data[0] || {};
        setDocumentUpload(docData.document_upload || '');
        setCompanyType(docData.company_type || '');
        setDocumentId(docData.document_id || '');
        setDocumentName(docData.document_name || '');
        setDocumentType(docData.company_type || '');


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

    const previewURL = URL.createObjectURL(file);
    setPdfPreview(previewURL);
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
        <div className='customer-details-container'>
          <div className='customer-details-form'>
            <div className='details-form-row row'>
              <h5 className='col-3'></h5>
              <div className='col-9'>
                <label>
                  Company Type
                  <input className="input-field" type="text" value={companyType} onChange={(e) => setCompanyType(e.target.value)} />
                </label>
              </div>
            </div>
            <hr />
            <div className='details-form-row row'>
              <h5 className='col-3'>KYC Documents</h5>
              <div className='col-9'>
                <div className='d-flex gap-3 mt-3'>
                  <label>
                    Document Type
                    <select className="select-field" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                      <option value="">Select Document Type</option>
                      {documentTypeList.map(doc => (
                        <option key={doc.id} value={doc.slug}>{doc.doc_name}</option>
                      ))}
                    </select>
                  </label>
                  <label className='position-relative'>
                    Upload Document
                    <input className="input-field" type="file" onChange={handleFileChange} />
                    <button
                      className='eye-button'
                      onClick={handlePreview}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </label>
                </div>
                <div className='d-flex gap-3 mt-3'>
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
          <div className='d-flex justify-content-end mt-5'>
            <button className='btn main-button' type="submit">Save</button>
          </div>
        </div>
      </form>
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

export default KYCInfo;
