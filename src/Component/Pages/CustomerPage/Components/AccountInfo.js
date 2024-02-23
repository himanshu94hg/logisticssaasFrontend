import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

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

  const [pdfPreviews, setPdfPreviews] = useState(Array(accounts.length).fill(null));
  const [viewAttachmentContent, setViewAttachmentContent] = useState(false);
  const [hardcodedToken] = useState(Cookies.get("access_token"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Iterate through each account and send a POST request to store it
      for (const account of accounts) {
        const formData = new FormData();
        formData.append('account_holder_name', account.accountHolderName);
        formData.append('account_number', account.accountNumber);
        formData.append('bank_name', account.bankName);
        formData.append('ifsc_code', account.ifscCode);
        formData.append('bank_branch', account.branchName);
        formData.append('cheque_image', account.chequeImage);

        await axios.post('http://65.2.38.87:8088/core-api/seller/bank-info/', formData, {
          headers: {
            'Authorization': `Bearer ${hardcodedToken}`,
            'Content-Type': 'multipart/form-data'
          },
        });
      }

      // Show success message upon successful submission
      Swal.fire({
        icon: 'success',
        title: 'Accounts Saved',
        text: 'The account information has been saved successfully.',
      });
    } catch (error) {
      console.error('Error:', error);
      // Show error message upon failure
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save account information. Please try again.',
      });
    }
  };

  const addAnotherAccount = () => {
    setAccounts((prevAccounts) => [
      ...prevAccounts,
      {
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        branchName: '',
        chequeImage: null,
        isPrimary: false,
      },
    ]);
    setPdfPreviews((prevPreviews) => [...prevPreviews, null]);
  }

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

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const updatedAccounts = [...accounts];
    updatedAccounts[index].chequeImage = file;
    setAccounts(updatedAccounts);
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
    } else {
      setViewAttachmentContent(!viewAttachmentContent);
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
                            <input className="input-field" type="text" value={account.accountHolderName} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, accountHolderName: e.target.value } : acc))} />
                          </label>
                          <label>
                            Account Number
                            <input className="input-field" type="text" value={account.accountNumber} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, accountNumber: e.target.value } : acc))} />
                          </label>
                        </div>
                        <div className='d-flex w-100 gap-3 mt-4'>
                          <label>
                            IFSC Code
                            <input className="input-field" type="text" value={account.ifscCode} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, ifscCode: e.target.value } : acc))} />
                          </label>
                          <label>
                            Bank Name
                            <input className="input-field" type="text" value={account.bankName} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, bankName: e.target.value } : acc))} />
                          </label>
                        </div>
                        <div className='d-flex w-100 gap-3 mt-4'>
                          <label>
                            Branch Name
                            <input className="input-field" type="text" value={account.branchName} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, branchName: e.target.value } : acc))} />
                          </label>
                          <label className='position-relative'>
                            Please Upload Cheque Image
                            <input className="input-field" accept=".pdf" type="file" onChange={(e) => handleFileChange(e, index)} />
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
                <div className='add-account-text' type="submit" onClick={addAnotherAccount}>
                  <FontAwesomeIcon icon={faPlus} /> Add Another Account
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <button className='btn main-button mt-3' type="submit">
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