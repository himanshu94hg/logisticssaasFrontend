import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';
import { awsAccessKey } from '../../../../config';

// Reusable FormInput component
const FormInput = ({ label, type, value, onChange, options }) => (

  <div className='ticket-form-row'>
    <label>{label}</label>
    {type === 'select' ? (
      <select className='select-field' value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea className='input-field text-field' rows="4" value={value} onChange={onChange} />
    ) : type === 'file' ? (
      <input className='input-field choose-file-container' type={type} onChange={onChange} />
    ) : (
      <input className='input-field x' type={type} value={value} onChange={onChange} />
    )}
  </div>
);

const CreateTicketForm = (props) => {
  const [awbNumbers, setAwbNumbers] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [remarks, setRemarks] = useState('');
  const [attachments, setAttachments] = useState(null);
  const [allCatagery, setAllCatagery] = useState([]);
  const [allSubCatagry, setAllSubCatagry] = useState([]);
  const [fileInfo, setFileInfo] = useState(null);


  console.log(props.NewTicket, "i am props data")


  const authToken = Cookies.get("access_token")

  const categoryOptions = allCatagery.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const subcategoryOptions = allSubCatagry.map(subcategory => ({
    value: subcategory.id,
    label: subcategory.name,
  }));


  useEffect(() => {
    axios
      .get('http://65.2.38.87:8088/core-api/features/ticket-category/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        setAllCatagery(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }, []);

  useEffect(() => {
    if (category) {
      axios
        .get(`http://65.2.38.87:8088/core-api/features/ticket-sub-category/?category=${category}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(response => {
          console.log('Subcategories:', response.data);
          setAllSubCatagry(response.data);
        })
        .catch(error => {
          console.error('Error fetching subcategories:', error);
        });
    } else {
      setAllSubCatagry([]);
    }
  }, [category]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('awb_number', awbNumbers);
    formData.append('category', category);
    formData.append('sub_category', subcategory);
    formData.append('description', remarks);
    formData.append('escalate_image', attachments);
    try {
      const response = await axios.post('http://65.2.38.87:8088/core-api/features/support-tickets/', formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('API call error:', error);
    }
    setAwbNumbers('');
    setCategory('');
    setSubcategory('');
    setRemarks('');
    setAttachments(null);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setAttachments(e.target.files[0].name);
    if (file) {
      try {
        const responseData = await getFileData(e.target.files[0].name);
        const awsUrl = responseData.data.url.url

        const formData = new FormData();
        formData.append('key', responseData.data.url.fields.key);
        formData.append('file', e.target.files[0]);
        formData.append('AWSAccessKeyId', awsAccessKey);
        formData.append('policy', responseData.data.url.fields.policy);
        formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
        const additionalData = await uploadImageData(awsUrl, formData);

        if (additionalData?.status == 204) {
          const imageUrl = responseData.data.url.url + e.target.files[0].name

        }

      } catch (error) {
        console.error('Error handling file change:', error);
      }
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="AWB Numbers (Comma Separated)"
        type="text"
        value={awbNumbers}
        onChange={(e) => setAwbNumbers(e.target.value)}
      />
      <FormInput
        label="Choose a Category"
        type="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categoryOptions}
      />
      <FormInput
        label="Choose a Subcategory"
        type="select"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        options={subcategoryOptions}
      />
      <FormInput
        label="Remarks"
        type="textarea"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <FormInput
        label="Attachments (If any)"
        type="file"
        onChange={handleFileChange}
      />

      <div className='ticket-form-btn'>
        <button className='btn cancel-button' type="button" onClick={() => console.log('Cancelled')}>
          Cancel
        </button>
        <button className='btn main-button' type="submit" onClick={() => props.setNewTicket(!props.NewTicket)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateTicketForm;