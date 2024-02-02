import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const KYCInfo = () => {
  const [formData, setFormData] = useState({
    companyType: '',
    documentType: '',
    uploadDocument: null,
    documentName: '',
    documentNumber: '',
  });
  const [formList, setFormList] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const updatedValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);

    // Display SweetAlert on successful form submission
    Swal.fire({
      icon: 'success',
      title: 'Document Added Successfully!',
      showConfirmButton: false,
      timer: 1500,
    });

    // Add form data to the list
    setFormList([...formList, formData]);

    // Clear form data after submission
    setFormData({
      companyType: '',
      documentType: '',
      uploadDocument: null,
      documentName: '',
      documentNumber: '',
    });
  };

  const handleDelete = (index) => {
    // Remove the item at the specified index from the list
    const updatedList = [...formList];
    updatedList.splice(index, 1);
    setFormList(updatedList);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='customer-details-container'>
          <div className='customer-details-form'>
            <div className='details-form-row row'>
              <h5 className='col-3'></h5>
              <div className='col-9'>
                <label>
                  Company Type:
                  <select className='select-field' name="companyType" value={formData.companyType} onChange={handleChange}>
                    <option value="">Select Document Type</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Private" selected="">Private</option>
                    <option value="Partnership Firm">Partnership Firm</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>
            </div>
            <hr />
            <div className='details-form-row row'>
              <h5 className='col-3'>KYC Documents</h5>
              <div className='col-9'>

                <div className='d-flex gap-3 mt-3'>
                  <label>
                    Document Type:
                    <select className='select-field' name="documentType" value={formData.documentType} onChange={handleChange}>
                      <option value="">Select Document Type</option>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="Pan Card" selected="">Pan Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Voter ID Card">Voter ID Card</option>
                      {/* Add more options as needed */}
                    </select>
                  </label>

                  <label>
                    Upload Document:
                    <input className='input-field' type="file" name="uploadDocument" onChange={handleChange} />
                  </label>
                </div>
                <div className='d-flex gap-3 mt-3'>
                  <label>
                    Document Name:
                    <input
                      className='input-field'
                      type="text"
                      name="documentName"
                      value={formData.documentName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Document Number:
                    <input
                      className='input-field'
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
            <div className='details-form-row row'>
              <h5 className='col-3'>Uploaded Documents</h5>
              <ul className="col-9 upload-doc-list">
                {formList.map((item, index) => (
                  <li key={index} className='row'>
                    <p className='col-11'>
                      <span className='me-4'>Document Type: {item.documentType}</span>|
                      <span className='mx-4'>Document Name: {item.documentName}</span>|
                      <span className='mx-4'>Document Number: {item.documentNumber}</span>
                    </p>
                    <div className='col-1 d-flex gap-2'>
                      <button className=''>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className='btn delete-btn' onClick={() => handleDelete(index)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
          </div>

          <div className='d-flex justify-content-end mt-4'>
            <button className='btn main-button' type="submit">Save</button>
          </div>
        </div>
      </form>

    </>
  );
};

export default KYCInfo;
