import axios from 'axios';
import Cookies from 'js-cookie';
import { awsAccessKey } from '../../../../config';
import React, { useState, useEffect } from 'react';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';

// Reusable FormInput component
const FormInput = ({ label, type, value, onChange, options, name,fileInput }) => (
  <div className='ticket-form-row'>
    <label>{label}</label>
    {type === 'select' ? (
      <select className='select-field' name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea className='input-field text-field' rows="4" value={value} name={name} onChange={onChange} />
    ) : type === 'file' ? (
      <input className='input-field choose-file-container' type={type} onChange={onChange} name={name} id={fileInput}/>
    ) : (
      <input className='input-field x' type={type} value={value} onChange={onChange} name={name} />
    )}
  </div>
);

const CreateTicketForm = (props) => {
  const [allCatagery, setAllCatagery] = useState([]);
  const [allSubCatagry, setAllSubCatagry] = useState([]);
  const [ticketData, setTicketData] = useState({
    category: 1,
    sub_category: null,
    awb_number: "",
    description: "",
    issue: "",
    // escalate_image: "",
  })


  console.log(ticketData,"ticketDataticketData")

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
    if (ticketData.category !== "") {
      axios
        .get(`http://65.2.38.87:8088/core-api/features/ticket-sub-category/?category=${ticketData.category}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(response => {
          setAllSubCatagry(response.data);
          // Select the first subcategory by default
          if (response.data.length > 0) {
            setTicketData(prevData => ({
              ...prevData,
              sub_category: response.data[0].id // Assuming 'id' is the property for subcategory id
            }));
          }
        })
        .catch(error => {
          console.error('Error fetching subcategories:', error);
        });
    } else {
      setAllSubCatagry([]);
    }
  }, [ticketData.category]);

  const handleCreateTicket = (e) => {
    setTicketData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://65.2.38.87:8088/core-api/features/support-tickets/', ticketData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setTicketData({
          category: 1,
          sub_category: null,
          awb_number: "",
          description: "",
          issue: "",
          // escalate_image:""
        })
        document.getElementById("fileInput").value = "";
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('API call error:', error);
    }

  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
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
          const imageUrl = responseData?.data?.url?.url + e.target.files[0]?.name
          setTicketData(prev => ({
            ...prev,
            [e.target.name]: imageUrl
          }));
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
        name={"awb_number"}
        value={ticketData.awb_number}
        onChange={(e) => handleCreateTicket(e)}
      />
      <FormInput
        label="Choose a Category"
        type="select"
        name={"category"}
        onChange={(e) => handleCreateTicket(e)}
        options={categoryOptions}
      />
      <FormInput
        label="Choose a Subcategory"
        type="select"
        name={"sub_category"}
        onChange={(e) => handleCreateTicket(e)}
        options={subcategoryOptions}
      />
      <FormInput
        label="Remarks"
        type="textarea"
        name={"description"}
        value={ticketData.description}
        onChange={(e) => handleCreateTicket(e)}
      />
      <FormInput
        label="Attachments (If any)"
        type="file"
        name="issue"
        fileInput="fileInput"
        // name="escalate_image"
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
