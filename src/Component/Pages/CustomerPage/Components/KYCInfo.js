import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';

const KYCInfo = () => {
  const [hardcodedToken] = useState(Cookies.get('access_token'));
  const [formData, setFormData] = useState({
    companyType: '',
    documentType: '',
    uploadDocument: null,
    documentName: '',
    documentNumber: '',
  });
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    fetchKYCData();
  }, []);

  const fetchKYCData = async () => {
    try {
      const response = await axios.get('http://65.2.38.87:8081/core-api/seller/kyc-info/', {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`
        }
      });
      const [firstItem] = response.data;
      setFormData({
        companyType: firstItem?.company_type || '',
        documentType: firstItem?.document_type || '',
        uploadDocument: null,
        documentName: firstItem?.document_name || '',
        documentNumber: firstItem?.document_id || '',
      });
      setFormList(response.data.map(item => ({
        documentType: item.document_type,
        documentName: item.document_name,
        documentNumber: item.document_id
      })));
    } catch (error) {
      console.error('Error fetching KYC data:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const updatedValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  console.log(formData, "Form Data")
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObject = new FormData();
      formDataObject.append('document_upload', formData.uploadDocument);
      formDataObject.append('company_type', formData.companyType);
      formDataObject.append('document_type', formData.documentType);
      formDataObject.append('document_id', formData.documentNumber);
      formDataObject.append('document_name', formData.documentName);

      formList.forEach((item, index) => {
        formDataObject.append(`documents[${index}].additionalProp1`, item.additionalProp1 || '');
        formDataObject.append(`documents[${index}].additionalProp2`, item.additionalProp2 || '');
        formDataObject.append(`documents[${index}].additionalProp3`, item.additionalProp3 || '');
      });

      const response = await axios.post(
          'http://65.2.38.87:8081/core-api/seller/kyc-info/',
          formDataObject,
          {
            headers: {
              Authorization: `Bearer ${hardcodedToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
      );

      Swal.fire({
        icon: 'success',
        title: 'Document Added Successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      setFormList([...formList, formData]);

      setFormData({
        companyType: '',
        documentType: '',
        uploadDocument: null,
        documentName: '',
        documentNumber: '',
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add document. Please try again.',
      });
    }
  };

  const handleDelete = (index) => {
    const updatedList = [...formList];
    updatedList.splice(index, 1);
    setFormList(updatedList);
  };

  return (
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="customer-details-container">
          <div className="customer-details-form">
            <div className="details-form-row row">
              <h5 className="col-3"></h5>
              <div className="col-9">
                <label style={{ width: '49%' }}>
                  Company Type:
                  <select
                      className="select-field"
                      name="companyType"
                      value={formData.companyType}
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
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                    >
                      <option value="">Select Document Type</option>
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
                        name="uploadDocument"
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
                        name="documentName"
                        value={formData.documentName}
                        onChange={handleChange}
                    />
                  </label>
                  <label>
                    Document Number:
                    <input
                        className="input-field"
                        type="text"
                        name="documentNumber"
                        value={formData.documentNumber}
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
                        <button type="button" className="btn preview-btn">
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
  );
};

export default KYCInfo;
