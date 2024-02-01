import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const AccountInfo = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [chequeImage, setChequeImage] = useState(null);
  const [bankDetail, setBankDetail] = useState()
  const [pdfPreview, setPdfPreview] = useState(null);
  const [ViewAttachmentContent, setViewAttachmentContent] = useState(false)


  const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODYxNDk3LCJpYXQiOjE3MDY2MTUwOTcsImp0aSI6IjI0MTllNzg2NWY0NDRjNjM5OGYxZjAxMzlmM2Y2Y2M2IiwidXNlcl9pZCI6OX0.LNk9C0BFIgkIZpkYHNz2CvjzzcdwXkwYSOVpcK5A7Sw'

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/core-api/seller/bank-info/', {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
        },
      })
      .then(response => {
        setBankDetail(response.data);
        const bankData = response.data[0] || {};
        setAccountHolderName(bankData.account_holder_name || '');
        setAccountNumber(bankData.account_number || '');
        setIfscCode(bankData.ifsc_code || '');
        setBankName(bankData.bank_name || '');
        setBranchName(bankData.bank_branch || '');
        setChequeImage(bankData.cheque_image || '');

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('account_holder_name', accountHolderName);
    formData.append('account_number', accountNumber);
    formData.append('ifsc_code', ifscCode);
    formData.append('bank_name', bankName);
    formData.append('bank_branch', branchName);
    formData.append('cheque_image', chequeImage);


    try {
      const response = await axios.post('http://127.0.0.1:8000/core-api/seller/bank-info/', formData, {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('API call error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setChequeImage(file);
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
              <div className='col-3'>
                <h5>Account Details</h5>
                <p><i>(Primary Account)</i></p>
              </div>
              <div className='col-9'>
                {/* Your form fields */}
                <div className='d-flex w-100 gap-3 mt-4'>
                  <label>
                    Account Holder Name
                    <input className="input-field" type="text" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
                  </label>
                  <label>
                    Account Number
                    <input className="input-field" type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                  </label>
                </div>
                <div className='d-flex w-100 gap-3 mt-4'>
                  <label>
                    IFSC Code
                    <input className="input-field" type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                  </label>
                  <label>
                    Bank Name
                    <input className="input-field" type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                  </label>
                </div>
                <div className='d-flex w-100 gap-3 mt-4'>
                  <label>
                    Branch Name
                    <input className="input-field" type="text" value={branchName} onChange={(e) => setBranchName(e.target.value)} />
                  </label>
                  <label className='position-relative'>
                    Please Upload Cheque Image
                    <input className="input-field" accept=".pdf" type="file" onChange={handleFileChange} />
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

export default AccountInfo;
