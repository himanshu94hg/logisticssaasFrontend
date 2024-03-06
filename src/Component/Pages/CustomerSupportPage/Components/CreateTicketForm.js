import axios from 'axios';
import './createTicket.css'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { awsAccessKey } from '../../../../config';
import React, { useState, useEffect } from 'react';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


// Reusable FormInput component
const FormInput = ({ label, mandatory, type, value, onChange, options, name, fileInput, customClass, selectFile, clearFile }) => (

  <div className='ticket-form-row'>
    {console.log(selectFile, "this is selecyed file")}
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
      <div className="file-input-container">
        <input className='input-field choose-file-container' type={type} onChange={onChange} name={name} id={fileInput} />
        {selectFile && (
          <span style={{ position: "relative", right: "-89%", top: "-24px", cursor: "pointer" }}>
            <FontAwesomeIcon icon={faTimesCircle} className="clear-file-icon text-danger" onClick={clearFile} size="lg" /> {/* Using size="2x" for extra-large */}
          </span>
        )}
      </div>
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
  const [selectFile, setSelectFile] = useState(false)
  const [fileObj, setFileObj] = useState(null)

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


  const clearFile = () => {
    setSelectFile(false);
    setFileError("");
    document.getElementById("fileInput").value = ""; // Reset the file input
  };

  useEffect(() => {
    axios
      .get('https://dev.shipease.in/core-api/features/ticket-category/', {
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
        .get(`https://dev.shipease.in/core-api/features/ticket-sub-category/?category=${ticketData.category}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(response => {
          setAllSubCatagry(response.data);
          if (response.data.length > 0) {
            setTicketData(prevData => ({
              ...prevData,
              sub_category: response.data[0].id
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

  useEffect(() => {
    if (ticketData.escalate_image !== "" && fileObj) {
      const postTicketData = async () => {
        try {
          const response = await axios.post('https://dev.shipease.in/core-api/features/support-tickets/', ticketData, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
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
            setSelectFile(false);
            setFileObj(null)
            props?.setStatus(!props.status)
            props.setNewTicket(false)
            document.getElementById("fileInput").value = "";
          }
        } catch (error) {
          toast.error(error?.response?.data?.detail)
        }
      };
      postTicketData(); 
    }
  }, [ticketData.escalate_image, fileObj]);
  
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
      if (fileObj) {
        try {
          const responseData = await getFileData(fileObj?.name.replace(/\s/g, ""))
          const awsUrl = responseData.data.url.url
          const formData = new FormData();
          formData.append('key', responseData.data.url.fields.key);
          formData.append('file', fileObj);
          formData.append('AWSAccessKeyId', awsAccessKey);
          formData.append('policy', responseData.data.url.fields.policy);
          formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
          await uploadImageData(awsUrl, formData); // No need to check additionalData.status
          const imageUrl = responseData?.data?.url?.url + fileObj?.name.replace(/\s/g, "")
          setTicketData(prev => ({
            ...prev,
            escalate_image: imageUrl
          }));
        }
        catch (error) {
          toast.error(error?.response?.data?.detail)
        }
      }
      else {
        try {
        const response=  await axios.post('https://dev.shipease.in/core-api/features/support-tickets/', ticketData, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
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
          }

        } catch (error) {
          toast.error(error?.response?.data?.detail)
        }
      }
    }
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileSizeInMB = parseFloat((file?.size / (1024 * 1024)).toFixed(2));
    if (file != undefined) {
      setSelectFile(true);
      setFileObj(file)
    }
    if (fileSizeInMB > 2) {
      setFileError("File should be less than 3 mb")
    }
    else {
      setFileError("")
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
          selectFile={selectFile}
          onChange={handleFileChange}
          clearFile={clearFile}
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
