import "./basicInfo.css"
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Document, Page } from "react-pdf";
import Modal from "react-bootstrap/Modal";
import { awsAccessKey } from '../../../../config';
import React, { useState, useEffect } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { BASE_URL_CORE } from '../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';
import { faEye, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from '../../../../customFunction/errorHandling';
import globalDebouncedClick from "../../../../debounce";
import { useSelector } from "react-redux";

const AccountInfo = ({ activeTab, accountType }) => {
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [pdfPreviews, setPdfPreviews] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [handelAWSImage, sethandelAWSImage] = useState("");
  const [hardcodedToken] = useState(Cookies.get("access_token"));
  const [viewAttachmentContent, setViewAttachmentContent] = useState(false);
  const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);

  useEffect(() => {
    if (activeTab === "Account Information") {
      fetchAccountData();
    }
  }, [activeTab, accountType]);

  useEffect(() => {
    if (accounts.length === 0) {
      addAnotherAccount();
    }
  }, [accounts]);

  const fetchAccountData = async () => {
    let url = `${BASE_URL_CORE}/core-api/seller/bank-info/`;
    if (accountType) {
      url += `?subaccount=${accountType}`;
    }
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`
        }
      });
      if (response.data.length > 0) {
        setAccounts(response?.data?.map(account => ({
          ...account,
          accountHolderName: account.account_holder_name,
          accountNumber: account.account_number,
          ifscCode: account.ifsc_code,
          bankName: account.bank_name,
          branchName: account.bank_branch,
          chequeImage: "https://www.google.com"
        })));
      }
      setPdfPreviews(Array(response.data.length).fill(null));
      setErrors(Array(response.data.length).fill({}));
    } catch (error) {
      customErrorFunction(error)
    }
  };

  const handleClickSubmit = async (formData) => {
    let url = `${BASE_URL_CORE}/core-api/seller/bank-info/`;
    if (accountType) {
      url += `?subaccount=${accountType}`;
    }
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      if (response.status === 201) {
        toast.success('Account Added successfully');
      }
    } catch (error) {
      customErrorFunction(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = accounts.map(account => {
      const error = {};
      if (!account?.accountHolderName?.trim()) {
        error.accountHolderName = "Account Holder Name is required";
        isValid = false;
      }
      if (!account?.accountNumber?.trim()) {
        error.accountNumber = "Account Number is required";
        isValid = false;
      }
      if (!account?.ifscCode?.trim()) {
        error.ifscCode = "IFSC Code is required";
        isValid = false;
      }
      if (!account?.bankName?.trim()) {
        error.bankName = "Bank Name is required";
        isValid = false;
      }
      if (!account?.branchName?.trim()) {
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

          if (!account.id) {
            globalDebouncedClick(() => handleClickSubmit(formData))
          }
        }
      } catch (error) {
        customErrorFunction(error)
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
        is_primary: prevAccounts.length > 0 ? false : true,
      },
    ]);
    setPdfPreviews((prevPreviews) => [...prevPreviews, null]);
    setErrors((prevErrors) => [...prevErrors, {}]);
  }

  const handleDelete = async (index) => {
    const accountToDelete = accounts[index];
    if (!accountToDelete.is_primary) {
      try {
        const response = await fetch(`${BASE_URL_CORE}/core-api/seller/bank-info-details/${accountToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${hardcodedToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          //toast.error('Failed to delete the account');
        }
        else {
          toast.success('Account deleted successfully.');
        }

        const updatedAccounts = [...accounts];
        const updatedPdfPreviews = [...pdfPreviews];
        const updatedErrors = [...errors];

        updatedAccounts.splice(index, 1);
        updatedPdfPreviews.splice(index, 1);
        updatedErrors.splice(index, 1);

        setAccounts(updatedAccounts);
        setPdfPreviews(updatedPdfPreviews);
        setErrors(updatedErrors);
      } catch (error) {
        customErrorFunction(error)
      }
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
        const imageUrl = responseData?.data?.url?.url + "customerData/" + e.target.files[0]?.name.replace(/\s/g, "")
        setAccounts(prevAccounts => {
          const updatedAccounts = [...prevAccounts];
          updatedAccounts[index].chequeImage = imageUrl;
          return updatedAccounts;
        });
      }
    } catch (error) {
      customErrorFunction(error)
    }

  };

  const handleIFSCChange = async (e, index) => {
    const newIFSC = e.target.value;
    if (newIFSC.length > 0) {
      try {
        const response = await axios.get(`https://ifsc.razorpay.com/${newIFSC}`);
        if (response.status === 200) {
          const { BRANCH, BANK } = response.data;
          setAccounts(accounts.map((account, idx) => idx === index ? { ...account, branchName: BRANCH, bankName: BANK } : account));
        } else {
          toast.error('Failed to fetch branch and bank details.');
        }
      } catch (error) {
        toast.error('Please enter valid Ifsc code!');
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = async (pdfUrl) => {
    try {
      sethandelAWSImage(pdfUrl)
      const response = await axios.get(pdfUrl, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);
      setShow(true);
      setPreviewImage(objectUrl);
    } catch (error) {
      customErrorFunction(error)
    }
  }

  const handleKeyPress = (e, field) => {
    const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
    if (e.key === ' ' && e.target.value.endsWith(' ')) {
      e.preventDefault();
    }
    else if (!allowedCharacters.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='customer-details-container'>
          <div>
            {accounts?.map((account, index) => (
              <div className={`customer-details-form`} key={index} >
                <div className='details-form-row row' >
                  <div className='col-3'>
                    <h5>Account Details</h5>
                    <p><i>{account.is_primary ? '(Primary Account)' : '(Other Account)'}</i></p>
                  </div>
                  <div className='col-9' >
                    <div className={`d-flex w-100 gap-3 mt-4 flex-column flex-md-row ${userData?.is_acc_info_verified ? "input-box-disable" : "input-box-enable"}`}>
                      <label>
                        <span> Account Holder Name<span className='mandatory'> *</span></span>
                        <input
                          type="text"
                          maxLength={100}
                          value={account.accountHolderName}
                          placeholder="Enter account holder name"
                          onKeyDown={(e) => handleKeyPress(e)}
                          className={`input-field ${errors[index]?.accountHolderName && "input-field-error"}`}
                          onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, accountHolderName: e.target.value } : acc))} />
                        {errors[index]?.accountHolderName && <span className="custom-error">{errors[index].accountHolderName}</span>}
                      </label>
                      <label>
                        <span>Account Number<span className='mandatory'> *</span></span>
                        <input
                          type="text"
                          maxLength={50}
                          value={account.accountNumber}
                          placeholder="Enter account number"
                          onKeyPress={(e) => {
                            if (!/\d/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          className={`input-field ${errors[index]?.accountNumber && "input-field-error"}`}
                          onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, accountNumber: e.target.value } : acc))} />
                        {errors[index]?.accountNumber && <span className="custom-error">{errors[index].accountNumber}</span>}
                      </label>
                    </div>
                    <div className={`d-flex w-100 gap-3 mt-4 flex-column flex-md-row ${userData?.is_acc_info_verified ? "input-box-disable" : "input-box-enable"}`}>
                      <label>
                        <span>IFSC Code<span className='mandatory'> *</span></span>
                        <input
                          type="text"
                          value={account.ifscCode}
                          maxLength={20}
                          onKeyDown={(e) => handleKeyPress(e)}
                          placeholder="Enter IFSC code"
                          onBlur={(e) => handleIFSCChange(e, index)}
                          className={`input-field ${errors[index]?.ifscCode && "input-field-error"}`}
                          onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, ifscCode: e.target.value } : acc))}
                        />
                        {errors[index]?.ifscCode && <span className="custom-error">{errors[index].ifscCode}</span>}
                      </label>
                      <label>
                        <span> Bank Name<span className='mandatory'> *</span></span>
                        <input
                          type="text"
                          maxLength={55}
                          value={account.bankName}
                          placeholder="Enter bank name"
                          onKeyDown={(e) => handleKeyPress(e)}
                          className={`input-field ${errors[index]?.bankName && "input-field-error"}`}
                          onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, bankName: e.target.value } : acc))} />
                        {errors[index]?.bankName && <span className="custom-error">{errors[index].bankName}</span>}
                      </label>
                    </div>
                    <div className='d-flex w-100 gap-3 mt-4 flex-column flex-md-row'>
                      <label className={`${userData?.is_acc_info_verified ? "input-box-disable" : "input-box-enable"}`} >
                        <span> Branch Name<span className='mandatory'> *</span></span>
                        <input
                          type="text"
                          maxLength={55}
                          value={account.branchName}
                          placeholder="Enter branch name"
                          onKeyDown={(e) => handleKeyPress(e)}
                          className={`input-field ${errors[index]?.branchName && "input-field-error"}`}
                          onChange={(e) => setAccounts(accounts.map((acc, idx) => idx === index ? { ...acc, branchName: e.target.value } : acc))}
                        />
                        {errors[index]?.branchName && <span className="custom-error">{errors[index].branchName}</span>}
                      </label>
                      <label className={`position-relative`} >
                        Please Upload Cheque Image
                        <input className={`form-control input-field`} disabled={userData?.is_acc_info_verified ? true : false} accept=".pdf,image/*" type="file" onChange={(e) => handleFileChange(e, index)} />
                        {account?.cheque_image &&
                          <>
                            {(account.cheque_image && account.cheque_image?.endsWith('.pdf')) ? <>
                              <a
                                href={account?.cheque_image}
                                className="btn eye-button"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </a>
                            </> :
                              <>
                                <button
                                  type="button"
                                  className="btn eye-button"
                                  onClick={() => handleShow(account.cheque_image)}
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                              </>
                            }
                          </>}
                      </label>
                    </div>
                  </div>
                </div>
                {!account.is_primary && (
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
              {/* <div className='add-account-text' onClick={addAnotherAccount}>
                <FontAwesomeIcon icon={faPlus} /> Add Another Account
              </div> */}
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
      <Preview show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} previewImage={previewImage} handelAWSImage={handelAWSImage} />
    </>
  );
};

export default AccountInfo;

function Preview({ show, handleClose, previewImage, handelAWSImage }) {
  const isPDF = handelAWSImage && handelAWSImage.endsWith('.pdf');
  return (
    <Modal show={show} onHide={handleClose} size="md" style={{ width: '100%', height: '670px', overflow: 'hidden' }} centered>
      <Modal.Header closeButton>
        <Modal.Title>Image/PDF Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Modal.Body>
    </Modal>
  );
}
