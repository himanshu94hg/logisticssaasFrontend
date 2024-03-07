import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { awsAccessKey } from '../../../../config';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const KYCInfo = ({ activeTab }) => {
  const [hardcodedToken] = useState(Cookies.get('access_token'));
  const [formData, setFormData] = useState({
    company_type: "",
    document_type: "",
    document_id: "",
    document_name: "",
    document_upload: "",
  });

  const [formList, setFormList] = useState([]);
  const [errors, setErrors] = useState([]);
  const [resData, setResData] = useState("");

  useEffect(() => {
    if (activeTab === "KYC Information")
      fetchKYCData();
  }, [activeTab]);

  const fetchKYCData = async () => {
    try {
      const response = await axios.get('https://dev.shipease.in/core-api/seller/kyc-info/', {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`
        }
      });
      setResData(response?.data[0]?.company_type)
      setFormData((prev) => ({
        ...prev,
        company_type: response?.data[0]?.company_type
      }))
      setFormList(response.data.map(item => ({
        documentType: item.document_type,
        documentName: item.document_name,
        documentNumber: item.document_id,
        companyType: item.company_type,
        previewImg: item.document_upload
      })));
    } catch (error) {
      toast.error('Error fetching KYC data:', error);
    }
  };

  const handleChange = async (e) => {
    
    console.log(e,"select type dfata")

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
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Error handling file change:', error);
        toast.error('Error uploading file');
        return;
      }
    } else {
      updatedValue = value;
    }
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  console.log(formData, "this is dummay data")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://dev.shipease.in/core-api/seller/kyc-info/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${hardcodedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status == 201) {
        fetchKYCData()
        toast.success("KYC Details updated successfully")
      }
      setFormList([...formList, formData]);
      setFormData({
        companyType: 'aaa',
        documentType: '',
        uploadDocument: null,
        documentName: '',
        documentNumber: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = (index) => {

  };

  const [previewImage, setPreviewImage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (image) => {
    setShow(true);
    setPreviewImage(image)
  }


  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="customer-details-container">
          <div className="customer-details-form">
            <div className="details-form-row row">
              <h5 className="col-3"></h5>
              <div className="col-9">
                <label style={{ width: '49%' }}>
                  Company Type:
                  <select
                    // isEnabled
                    disabled={resData === undefined || resData.length === 0 ? false : true}
                    className="select-field"
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
                </label>
              </div>
            </div>
            <hr />
            <div className="details-form-row row">
              <h5 className="col-3">KYC Documents</h5>
              <div className="col-9">
                <div className="d-flex gap-3 mt-3">
                  <label>
                    Document Type:
                    <select
                      className="select-field"
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
                  </label>
                  <label>
                    Upload Document:
                    <input
                      className="input-field"
                      type="file"
                      name="document_upload"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <label>
                    Document Name:
                    <input
                      className="input-field"
                      type="text"
                      name="document_name"
                      value={formData.document_name}
                      onChange={handleChange}
                    />
                    {errors[0] == "" && <span className="error-text">{errors[0]}</span>}
                  </label>
                  <label>
                    Document Number:
                    <input
                      className="input-field"
                      type="text"
                      name="document_id"
                      value={formData.document_id}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className="details-form-row row">
              <h5 className="col-3">Uploaded Documents</h5>
              <ul className="col-9 upload-doc-list">
                {formList.map((item, index) => (
                  <li key={index} className="row">
                    <p className="col-11">
                      <span className="me-4">
                        Document Type: <strong>{item.documentType}</strong>
                      </span>
                      |
                      <span className="mx-4">
                        Document Name: <strong>{item.documentName}</strong>
                      </span>
                      |
                      <span className="mx-4">
                        Document Number: <strong>{item.documentNumber}</strong>
                      </span>
                    </p>
                    <div className="col-1 d-flex gap-2 align-items-center">
                      <button type="button" className="btn preview-btn" onClick={() => handleShow(item?.previewImg)}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        type="button"
                        className="btn delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </li>
                ))}
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

  console.log(previewImage, "this is aimage url data")

  return (
    <>
      <Modal show={show} onHide={handleClose}>
      
        <Modal.Body className='p-1'>
          {previewImage ?
            <img src={previewImage} width={"100%"} height={"400px"} alt="" />
            : <h2 className='p-4'>No image or document avalibale!</h2>
          }
        </Modal.Body>
      </Modal>
    </>
  );
}
