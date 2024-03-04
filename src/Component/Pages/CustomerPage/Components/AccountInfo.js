import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import "./basicInfo.css"
import { awsAccessKey } from '../../../../config';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';


const AccountInfo = ({ activeTab }) => {
  const [accounts, setAccounts] = useState([]);
  const [pdfPreviews, setPdfPreviews] = useState([]);
  const [viewAttachmentContent, setViewAttachmentContent] = useState(false);
  const [hardcodedToken] = useState(Cookies.get("access_token"));
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (activeTab === "Account Information") {
      fetchAccountData();
    }
  }, [activeTab]);

  const fetchAccountData = async () => {
    try {
      const response = await axios.get('http://65.2.38.87:8081/core-api/seller/bank-info/', {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`
        }
      });
      setAccounts(response.data.map(account => ({
        ...account,
        accountHolderName: account.account_holder_name,
        accountNumber: account.account_number,
        ifscCode: account.ifsc_code,
        bankName: account.bank_name,
        branchName: account.bank_branch,
        chequeImage: "https://www.google.com"
      })));
      setPdfPreviews(Array(response.data.length).fill(null));
      setErrors(Array(response.data.length).fill({}));
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Check for blank fields
    const newErrors = accounts.map(account => {
      const error = {};
      if (!account.accountHolderName.trim()) {
        error.accountHolderName = "Account Holder Name is required";
        isValid = false;
      }
      if (!account.accountNumber.trim()) {
        error.accountNumber = "Account Number is required";
        isValid = false;
      }
      if (!account.ifscCode.trim()) {
        error.ifscCode = "IFSC Code is required";
        isValid = false;
      }
      if (!account.bankName.trim()) {
        error.bankName = "Bank Name is required";
        isValid = false;
      }
      if (!account.branchName.trim()) {
        error.branchName = "Branch Name is required";
        isValid = false;
      }
      return error;
    });

    setErrors(newErrors);

    if (isValid) {
      try {
        for (const account of accounts) {
          const formData = new FormData();
          formData.append('account_holder_name', account.accountHolderName);
          formData.append('account_number', account.accountNumber);
          formData.append('bank_name', account.bankName);
          formData.append('ifsc_code', account.ifscCode);
          formData.append('bank_branch', account.branchName);
          formData.append('cheque_image', account.chequeImage);

          await axios.post('http://65.2.38.87:8081/core-api/seller/bank-info/', formData, {
            headers: {
              'Authorization': `Bearer ${hardcodedToken}`,
              'Content-Type': 'multipart/form-data'
            },
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
    setErrors((prevErrors) => [...prevErrors, {}]);
  }

  const handleDelete = (index) => {
    if (!accounts[index].isPrimary) {
      const updatedAccounts = [...accounts];
      const updatedPdfPreviews = [...pdfPreviews];
      const updatedErrors = [...errors];

      updatedAccounts.splice(index, 1);
      updatedPdfPreviews.splice(index, 1);
      updatedErrors.splice(index, 1);

      setAccounts(updatedAccounts);
      setPdfPreviews(updatedPdfPreviews);
      setErrors(updatedErrors);
    }
  };

  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    const updatedAccounts = [...accounts];
    updatedAccounts[index].chequeImage = file;
    setAccounts(updatedAccounts);
    const previewURL = URL.createObjectURL(file);
    setPdfPreviews((prevPreviews) => [...prevPreviews, previewURL]);
    try {
      const responseData = await getFileData(`customerData/${e.target.files[0].name.replace(/\s/g, "")}`);
      const awsUrl = responseData.data.url.url
      const formData = new FormData();
      formData.append('key', responseData.data.url.fields.key);
      formData.append('file', e.target.files[0]);
      formData.append('AWSAccessKeyId', awsAccessKey);
      formData.append('policy', responseData.data.url.fields.policy);
      formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
      const additionalData = await uploadImageData(awsUrl, formData);
      if (additionalData?.status == 204) {
        const imageUrl = responseData?.data?.url?.url + e.target.files[0]?.name.replace(/\s/g, "")
        setAccounts(prevAccounts => {
          const updatedAccounts = [...prevAccounts];
          updatedAccounts[index].chequeImage = imageUrl;
          return updatedAccounts;
        });
      }
    } catch (error) {
      console.error('Error handling file change:', error);
    }

  };

  const handlePreview = () => {
    if (pdfPreviews.length === 0) {
      
      // Handle no previews available
    } else {
      setViewAttachmentContent(!viewAttachmentContent);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='customer-details-container'>
          <div>
            {accounts?.map((account, index) => (
              <div className='customer-details-form' key={index}>
                <div className='details-form-row row'>
                  <div className='col-3'>
                    <h5>Account Details</h5>
                    <p><i>{!account.isPrimary ? '(Primary Account)' : '(Other Account)'}</i></p>
                  </div>
                  <div className='col-9'>
                    <div className='d-flex w-100 gap-3 mt-4'>
                      <label>
                      <span> Account Holder Name<span className='custom-error'> *</span></span>
                        <input className={`input-field ${errors[index]?.accountHolderName && "input-field-error"}`} type="text" value={account.accountHolderName} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, accountHolderName: e.target.value } : acc))} />
                        {errors[index]?.accountHolderName && <span className="error-text">{errors[index].accountHolderName}</span>}
                      </label>
                      <label>
                      <span>  Account Number<span className='custom-error'> *</span></span>
                        <input className={`input-field ${errors[index]?.accountNumber && "input-field-error"}`} type="text" value={account.accountNumber} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, accountNumber: e.target.value } : acc))} />
                        {errors[index]?.accountNumber && <span className="error-text">{errors[index].accountNumber}</span>}
                      </label>
                    </div>
                    <div className='d-flex w-100 gap-3 mt-4'>
                      <label>
                      <span>IFSC Code<span className='custom-error'> *</span></span>
                        <input className={`input-field ${errors[index]?.ifscCode && "input-field-error"}`} type="text" value={account.ifscCode} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, ifscCode: e.target.value } : acc))} />
                        {errors[index]?.ifscCode && <span className="error-text">{errors[index].ifscCode}</span>}
                      </label>
                      <label>
                        <span> Bank Name<span className='custom-error'> *</span></span>
                        <input className={`input-field ${errors[index]?.bankName && "input-field-error"}`} type="text" value={account.bankName} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, bankName: e.target.value } : acc))} />
                        {errors[index]?.bankName && <span className="error-text">{errors[index].bankName}</span>}
                      </label>
                    </div>
                    <div className='d-flex w-100 gap-3 mt-4'>
                      <label>
                        <span> Branch Name<span className='custom-error'> *</span></span>
                        <input  className={`input-field ${errors[index]?.branchName && "input-field-error"}`} type="text" value={account.branchName} onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, branchName: e.target.value } : acc))} />
                        {errors[index]?.branchName && <span className="error-text">{errors[index].branchName}</span>}
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
                {account.isPrimary && (
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
            <div className='d-flex justify-content-end'>
              <div className='add-account-text' onClick={addAnotherAccount}>
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
