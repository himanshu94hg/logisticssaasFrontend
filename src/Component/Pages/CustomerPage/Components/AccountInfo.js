import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const AccountInfo = () => {
  const [accounts, setAccounts] = useState([
    {
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branchName: '',
      chequeImage: null,
      isPrimary: true, // The first account is the primary account by default
    },
  ]);


  const [bankDetail, setBankDetail] = useState();
  const [pdfPreviews, setPdfPreviews] = useState(Array(accounts.length).fill(null));
  const [viewAttachmentContent, setViewAttachmentContent] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [chequeImage, setChequeImage] = useState(null);

  const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3NTU1MzM0LCJpYXQiOjE3MDY5NTA1MzQsImp0aSI6IjZkZWZiOWIxY2Q4YjQxNWRiMWY3MmJkZDBiMjc2YmFhIiwidXNlcl9pZCI6MX0.vhhKKMf1s_6mj1Qt-_A5DgS2oSA_zutiVST6lBZuTG8'

  useEffect(() => {
    axios
      .get('http://65.2.38.87:8088/core-api/seller/bank-info/', {
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
    console.log("submit")

    setAccounts((prevAccounts) => [
      ...prevAccounts,
      {
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        branchName: '',
        chequeImage: null,
        isPrimary: false, // Newly added accounts are not primary by default
      },
    ]);
    setPdfPreviews((prevPreviews) => [...prevPreviews, null]);
  };

  const handleDelete = (index) => {
    // Only delete non-primary accounts
    if (!accounts[index].isPrimary) {
      const updatedAccounts = [...accounts];
      const updatedPdfPreviews = [...pdfPreviews];

      updatedAccounts.splice(index, 1);
      updatedPdfPreviews.splice(index, 1);

      setAccounts(updatedAccounts);
      setPdfPreviews(updatedPdfPreviews);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setChequeImage(file);
    const previewURL = URL.createObjectURL(file);
    setPdfPreviews((prevPreviews) => [...prevPreviews, previewURL]);
  };

  const handlePreview = () => {
    if (pdfPreviews.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No PDF to preview',
        text: 'Please upload a PDF file to preview.',
      });

      // Reset the showNoPreviewAlert state
      setViewAttachmentContent(false);
      console.log('no PDF')
    } else {
      setViewAttachmentContent(!viewAttachmentContent);
      console.log('Yes PDF')
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='customer-details-container'>
          <div>
            {accounts.map((account, index) => (
              <div className='customer-details-form' key={index}>
                <div className='details-form-row row'>
                  <div className='col-3'>
                    <h5>Account Details</h5>
                    <p><i>{account.isPrimary ? '(Primary Account)' : '(Other Account)'}</i></p>
                  </div>
                  <div className='col-9'>
                    {/* Your form fields */}
                    <div className='d-flex w-100 gap-3 mt-4'>
                      <label>
                        Account Holder Name
                        <input className="input-field" type="text" value={account.accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
                      </label>
                      <label>
                        Account Number
                        <input className="input-field" type="text" value={account.accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                      </label>
                    </div>
                    <div className='d-flex w-100 gap-3 mt-4'>
                      <label>
                        IFSC Code
                        <input className="input-field" type="text" value={account.ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                      </label>
                      <label>
                        Bank Name
                        <input className="input-field" type="text" value={account.bankName} onChange={(e) => setBankName(e.target.value)} />
                      </label>
                    </div>
                    <div className='d-flex w-100 gap-3 mt-4'>
                      <label>
                        Branch Name
                        <input className="input-field" type="text" value={account.branchName} onChange={(e) => setBranchName(e.target.value)} />
                      </label>
                      <label className='position-relative'>
                        Please Upload Cheque Image
                        <input className="input-field" accept=".pdf" type="file" onChange={handleFileChange} />
                        <button
                          className='eye-button'
                          type='button'
                          onClick={handlePreview}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </label>
                    </div>
                  </div>
                </div>
                {!account.isPrimary && (
                  <div className='d-flex justify-content-end mt-2 me-3'>
                    <button
                      className='btn btn-danger mt-2'
                      type='button'
                      onClick={() => handleDelete(index)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                )}
                <hr />
              </div>
            ))}
            {/* Additional button to add another account */}
            <div className='d-flex justify-content-end'>
              <div className='add-account-text' type="submit" onClick={handleSubmit}>
              <FontAwesomeIcon icon={faPlus} /> Add Another Account
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <button className='btn main-button mt-3' type="submit" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </form>
      <section className={`pdf-preview-section ${viewAttachmentContent ? 'd-block' : 'd-none'}`}>
        {pdfPreviews.map((pdfPreview, index) => (
          pdfPreview && (
            <embed key={index} src={pdfPreview} type="application/pdf" width="100%" height="100%" />
          )
        ))}
      </section>

      <div
        onClick={() => setViewAttachmentContent(!viewAttachmentContent)}
        className={`backdrop ${viewAttachmentContent ? 'd-block' : 'd-none'}`}
      ></div>
    </>
  );
};

export default AccountInfo;
