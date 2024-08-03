import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { awsAccessKey } from '../../../../config';
import React, { useState, useEffect } from 'react';
import { BASE_URL_CORE } from '../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';
import { customErrorFunction } from '../../../../customFunction/errorHandling';

const KYCInfo = ({ activeTab }) => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const [resData, setResData] = useState("");
  const [formList, setFormList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [hardcodedToken] = useState(Cookies.get('access_token'));
  const [formData, setFormData] = useState({
    company_type: "",
    document_type: "",
    document_id: "",
    document_name: "",
    document_upload: "",
  });

  useEffect(() => {
    if (activeTab === "KYC Information") {
      fetchKYCData();
      setErrors({})
    }
  }, [activeTab])

  useEffect(() => {
    if (formList?.length < 1) {
      setResData("")
      setFormData({
        company_type: "",
        document_type: "",
        document_id: "",
        document_name: "",
        document_upload: "",
      })
      if (formList?.length < 1 && activeTab) {
        setResData("")
        setFormData({
          company_type: "",
          document_type: "",
          document_id: "",
          document_name: "",
          document_upload: "",
        })
      }
    }
  }, [formList, activeTab])

  const handleClose = () => setShow(false);

  const fetchKYCData = async () => {
    try {
      const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/kyc-info/`, {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`
        }
      });
      setResData(response?.data[0]?.company_type)
      setFormData((prev) => ({
        ...prev,
        company_type: response?.data[0]?.company_type
      }))
      if (response?.data?.length > 0) {
        setFormList(response.data.map(item => ({
          id: item?.id,
          documentType: item.document_type,
          documentName: item.document_name,
          documentNumber: item.document_id,
          companyType: item.company_type,
          previewImg: item.document_upload
        })));
      } else {
        setFormData({
          company_type: "",
          document_type: "",
          document_id: "",
          document_name: "",
          document_upload: "",
        })
      }
    } catch (error) {
      customErrorFunction(error)
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    let updatedValue;
    if (type === 'file') {
      try {
        const responseData = await getFileData(`customerData/${files[0].name.replace(/\s/g, "")}`);
        const awsUrl = responseData.data.url.url;
        const formData = new FormData();
        formData.append('key', responseData.data.url.fields.key);
        formData.append('file', files[0]);
        formData.append('AWSAccessKeyId', awsAccessKey);
        formData.append('policy', responseData.data.url.fields.policy);
        formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
        const additionalData = await uploadImageData(awsUrl, formData);
        if (additionalData?.status === 204) {
          updatedValue = responseData.data.url.url + "customerData/" + files[0].name.replace(/\s/g, "");
        } else {
          toast.error('Error uploading file');
        }
      } catch (error) {
        customErrorFunction(error)
      }
    } else {
      updatedValue = value;
    }
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((errors, key) => {
      if (key !== 'document_upload' && !formData[key]) errors[key] = `${key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} is required !`;
      else if (key === 'document_name' && /\d/.test(formData[key])) errors[key] = "Document name should not contain numbers.";
      else if (key === 'document_type' && !formData[key]) errors[key] = "Please select your document.";
      else if (key !== 'company_type' && !formData[key]) errors[key] = "Please select your document.";
      return errors;
    }, {});
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL_CORE}/core-api/seller/kyc-info/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${hardcodedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        fetchKYCData();
        toast.success("KYC Details updated successfully");
        setFormData({
          company_type: '',
          document_type: '',
          document_id: '',
          document_name: '',
          document_upload: '',
        });
        e.target.reset();
      }
    } catch (error) {
      customErrorFunction(error)
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL_CORE}/core-api/seller/kyc-info-detail/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        toast.success('Document deleted successfully.');
        setResData("")
        setFormList(prevFormList => prevFormList.filter(item => item.id !== id));
      }
    } catch (error) {
      customErrorFunction(error)
    }
  };

  const handleShow = (image) => {
    setShow(true);
    setPreviewImage(image)
  }

  const handleKeyPress = (e, field) => {
    const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),-_.?":{}|<>]*$/;
    if (e.key === ' ' && e.target.value.endsWith(' ')) {
      e.preventDefault();
    }
    else if (!allowedCharacters.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="customer-details-container">
          <div className="customer-details-form">
            <div className="details-form-row row">
              <h5 className="col-4 col-md-3"></h5>
              <div className="col-8 col-md-9">
                <label style={{ maxWidth: '360px' }}>
                  Company Type:
                  <select
                    disabled={resData === undefined || resData.length === 0 ? false : true}
                    className={`select-field ${errors.company_type && 'input-field-error'}`}
                    name="company_type"
                    value={resData != "" ? resData : formData.company_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Company Type</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Private">Private</option>
                    <option value="Partnership Firm">Partnership Firm</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.company_type && <span className="custom-error">{errors.company_type}</span>}
                </label>
              </div>
            </div>
            <hr />
            <div className="details-form-row row">
              <h5 className="col-4 col-md-3">KYC Documents</h5>
              <div className="col-8 col-md-9">
                <div className="d-flex gap-3 mt-3 flex-column flex-md-row">
                  <label>
                    <span>Document Type: <span className='mandatory'>*</span></span>
                    <select
                      className={`input-field ${errors.document_type && "input-field-error"}`}
                      name="document_type"
                      value={formData.document_type}
                      onChange={handleChange}
                    >
                      <option value="" disabled >Select Document Type</option>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="Pan Card">Pan Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Voter ID Card">Voter ID Card</option>
                    </select>
                    {errors.document_type && <span className="custom-error">{errors.document_type}</span>}
                  </label>
                  <label>
                    <span>Upload Document: <span className='mandatory'>*</span></span>
                    <input
                      className={`form-control input-field ${errors?.document_upload && "input-field-error"}`}
                      type="file"
                      fileinput="fileinput"
                      name="document_upload"
                      onChange={handleChange}
                    />
                    {errors?.document_upload && <span className="custom-error">{errors?.document_upload}</span>}
                  </label>
                </div>
                <div className="d-flex gap-3 mt-3 flex-column flex-md-row">
                  <label>
                    <span>Document Name: <span className='mandatory'>*</span></span>
                    <input
                      className={`input-field ${errors.document_name && "input-field-error"}`}
                      type="text"
                      name="document_name"
                      value={formData.document_name}
                      onChange={handleChange}
                      maxLength={55}
                      onKeyDown={(e) => handleKeyPress(e)}
                      placeholder='Enter document name'
                    />
                    {errors.document_name && <span className="custom-error">{errors.document_name}</span>}
                  </label>
                  <label>
                    <span>Document Number: <span className='mandatory'>*</span></span>
                    <input
                      className={`input-field ${errors.document_id && "input-field-error"}`}
                      type="text"
                      name="document_id"
                      maxLength={55}
                      value={formData.document_id}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyPress(e)}
                      placeholder='Enter document number'
                    />
                    {errors.document_id && <span className="custom-error">{errors.document_id}</span>}
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className="details-form-row row">
              <h5 className="col-4 col-md-3">Uploaded Documents</h5>
              <ul className="col-8 col-md-9 upload-doc-list">
                {formList.map((item, index) =>
                  (item.documentType === "Pan Card" ||
                    item.documentType === "Aadhar Card" ||
                    item.documentType === "Driving License" ||
                    item.documentType === "Voter ID Card") && (
                    <li key={index} className="row flex-column flex-md-row">
                      <p className="col-10 d-flex gap-3 flex-wrap">
                        <span className="">Document Type: <strong>{item.documentType}</strong></span>
                        <span className="">Document Name: <strong>{item.documentName}</strong></span>
                        <span className="">Document Number: <strong>{item.documentNumber}</strong></span>
                      </p>
                      <div className="col-2 d-flex gap-2 align-items-center">
                        <button type="button" className="btn preview-btn" onClick={() => handleShow(item?.previewImg)}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button
                          type="button"
                          className="btn delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
            <hr />
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button className="btn main-button" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
      <Preview show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} previewImage={previewImage} />

    </>


  );
};

export default KYCInfo;



function Preview({ show, setShow, handleClose, handleShow, previewImage }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-1'>
          {previewImage ? (
            <img src={previewImage} width={"100%"} height={"400px"} alt="" />
          ) : (
            <h2 className='p-4'>No image or document available!</h2>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

