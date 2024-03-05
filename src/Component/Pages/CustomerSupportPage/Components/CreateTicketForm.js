import axios from 'axios';
import './createTicket.css'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { awsAccessKey } from '../../../../config';
import React, { useState, useEffect } from 'react';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';


// Reusable FormInput component
const FormInput = ({ label, mandatory, type, value, onChange, options, name, fileInput, customClass }) => (

  <div className='ticket-form-row'>
    <label>{label} <span className='text-danger'>{mandatory}</span></label>
    {type === 'select' ? (
      <select className='select-field' name={name} value={value} onChange={onChange}>
        <option value="" >Select {label}</option> {/* Placeholder option */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea className={`input-field text-field ${customClass}`} rows="4" value={value} name={name} onChange={onChange} />
    ) : type === 'file' ? (
      <input className='input-field choose-file-container' type={type} onChange={onChange} name={name} id={fileInput} />
    ) : (
      <input className={`input-field x ${customClass}`} type={type} value={value} onChange={onChange} name={name} />
    )}
  </div>
);


const CreateTicketForm = (props) => {
  const [errors, setErrors] = useState({})
  const authToken = Cookies.get("access_token")
  const [fileError, setFileError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [allCatagery, setAllCatagery] = useState([])
  const [allSubCatagry, setAllSubCatagry] = useState([])

  const [ticketData, setTicketData] = useState({
    category: null,
    sub_category: null,
    awb_number: "",
    description: "",
    escalate_image: "",
  })

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
      .get('http://dev.shipease.in:8081/core-api/features/ticket-category/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        setAllCatagery(response.data);
      })
      .catch(error => {
        toast.error('Error :', error)
      });
  }, []);

  useEffect(() => {
    if (ticketData.category) {
      axios
        .get(`http://dev.shipease.in:8081/core-api/features/ticket-sub-category/?category=${ticketData.category}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(response => {
          setAllSubCatagry(response.data);
          if (response.data.length > 0) {
            setTicketData(prevData => ({
              ...prevData,
              sub_category: response.data[0].id // Assuming 'id' is the property for subcategory id
            }));
          }
        })
        .catch(error => {
          toast.error('Error fetching subcategories:', error)
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
    const validationErrors = {};
    if (!ticketData.awb_number.trim()) {
      validationErrors.awb_number = "AWB is required!";
    }
    if (!ticketData.description.trim()) {
      validationErrors.description = "Remarks is required!";
    }
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://dev.shipease.in:8081/core-api/features/support-tickets/', ticketData, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
   
        if (response.status === 201) {
          toast.success("Ticket created successfully")
          setTicketData({
            category: 1,
            sub_category: null,
            awb_number: "",
            description: "",
            escalate_image: ""
          })
          props?.setStatus(!props.status)
          props.setNewTicket(false)
          document.getElementById("fileInput").value = "";
        } else {
          toast.error("Something went wrong!")
        }
      } catch (error) {
        toast.error(error?.response?.data?.detail)
      }
    }

  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileSizeInMB = parseFloat((file?.size / (1024 * 1024)).toFixed(2));
    if (fileSizeInMB > 2) {
      setFileError("File should be less than 3 mb")
    }
    else {
      setFileError("")
      try {
        const responseData = await getFileData(e.target.files[0].name.replace(/\s/g, ""));
        responseData.status === 200 && setIsLoading(true);
        const awsUrl = responseData.data.url.url
        const formData = new FormData();
        formData.append('key', responseData.data.url.fields.key);
        formData.append('file', e.target.files[0]);
        formData.append('AWSAccessKeyId', awsAccessKey);
        formData.append('policy', responseData.data.url.fields.policy);
        formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
        const additionalData = await uploadImageData(awsUrl, formData);
        if (additionalData?.status == 204) {
          setIsLoading(false);
          const imageUrl = responseData?.data?.url?.url + e.target.files[0]?.name.replace(/\s/g, "")
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
      <div className='slider-scroll-body'>
        <FormInput
          label="AWB Numbers (Comma Separated)"
          type="text"
          mandatory={"*"}
          customClass={`${errors.awb_number && "custom-input"}`}
          name={"awb_number"}
          value={ticketData.awb_number}
          onChange={(e) => handleCreateTicket(e)}
        />
        {errors.awb_number && <span className='error-text'>{errors.awb_number}</span>}

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
          customClass={`${errors.awb_number && "custom-input"}`}
          onChange={(e) => handleCreateTicket(e)}
        />
        {errors.description && <span className='error-text'>{errors.description}</span>}
        <FormInput
          label="Attachments (If any)"
          type="file"
          fileInput="fileInput"
          name="escalate_image"
          onChange={handleFileChange}
        />
        {fileError != '' && <span className='error-text'>{fileError}</span>}
      </div>
      <div className='ticket-form-btn'>
        <button className='btn cancel-button' type="button" onClick={() => props.setNewTicket(false)}>
          Cancel
        </button>
        <button className='btn main-button' type="submit" disabled={isLoading} >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateTicketForm;
