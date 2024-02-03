import React, { useState,useEffect } from 'react';
import axios from 'axios';

const AccountInfo = () => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [chequeImage, setChequeImage] = useState(null);
  const [bankDetail,setBankDetail]=useState()


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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='customer-details-container'>
        <div className='customer-details-form'>
          <div className='details-form-row'>
            <h5>Account Details</h5>
            <div className='d-flex gap-5 flex-wrap'>
              {/* Your form fields */}
              <label>
                Account Holder Name
                <input className="input-field" type="text" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
              </label>
              <label>
                Account Number
                <input className="input-field" type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
              </label>
              <label>
                IFSC Code
                <input className="input-field" type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
              </label>
              <label>
                Bank Name
                <input className="input-field" type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} />
              </label>
              <label>
                Branch Name
                <input className="input-field" type="text" value={branchName} onChange={(e) => setBranchName(e.target.value)} />
              </label>
              <label>
                Please Upload Cheque Image
                <input className="input-field" type="file" onChange={handleFileChange} />
              </label>
            </div>
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AccountInfo;
