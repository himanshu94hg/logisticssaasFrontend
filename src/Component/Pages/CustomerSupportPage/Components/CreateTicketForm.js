import axios from 'axios';
import './createTicket.css'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { awsAccessKey } from '../../../../config';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';
import { useLocation, useNavigate } from 'react-router-dom';

// Reusable FormInput component
const FormInput = ({ label, placeholder, mandatory, type, value, onChange, onBlur, options, name, fileInput, customClass, selectFile, clearFile }) => (
  <div className='ticket-form-row'>
    <label>{label} <span className='text-danger'>{mandatory}</span></label>
    {type === 'select' ? (
      <select className={`select-field ${customClass}`} name={name} value={value} onChange={onChange}>
        <option value="" >Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea placeholder={placeholder} className={`input-field text-field ${customClass}`} rows="4" value={value} name={name} onChange={onChange} onBlur={onBlur} />
    ) : type === 'file' ? (
      <div className="file-input-container">
        <input placeholder={placeholder} className='input-field choose-file-container' type={type} onChange={onChange} onBlur={onBlur} name={name} id={fileInput} />
        {selectFile && (
          <span style={{ position: "relative", right: "-95%", top: "-30px", cursor: "pointer" }}>
            <FontAwesomeIcon icon={faTimesCircle} className="clear-file-icon" onClick={clearFile} size="lg" /> {/* Using size="2x" for extra-large */}
          </span>
        )}
      </div>
    ) : (
      <input placeholder={placeholder} className={`input-field x ${customClass}`} type={type} value={value} onChange={onChange} onBlur={onBlur} name={name} />
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
  const [categoryStatus, setCategoryStatus] = useState(false)
  const [awbStatus, setAwbStatus] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const escalateAwbNumber = searchParams.get('awb_number');

  useEffect(() => {
    if (escalateAwbNumber !== null) {
      props.setNewTicket(true)
    }
    else {
      props.setNewTicket(false)
    }
  }, [escalateAwbNumber]);

  console.log(awbStatus, "Escalate Awb number ...................")

  const [ticketData, setTicketData] = useState({
    category: null,
    sub_category: null,
    awb_number: escalateAwbNumber || "",
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
      .get('https://dev.shipease.in/core-api/features/ticket-category/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        setAllCatagery(response.data);
        setCategoryStatus(false)
      })
      .catch(error => {
        toast.error('Error :', error)
      });
  }, [categoryStatus]);

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
              category: null,
              sub_category: null,
              awb_number: "",
              description: "",
              escalate_image: ""
            })
            setSelectFile(false);
            setFileObj(null)
            setAllCatagery([])
            setCategoryStatus(true)
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

  // const handleCreateTicket = (e) => {
  //   const { name, value } = e.target;
  //   setTicketData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  const handleCreateTicket = (e) => {
    const { name, value } = e.target;
    setTicketData(prev => ({
      ...prev,
      [name]: name === 'awb_number' && escalateAwbNumber ? escalateAwbNumber : value
    }));
  };


  const handleBlurAWB = (e) => {
    const { name, value } = e.target;
    if (name === 'awb_number') {
      const awbNumbers = value.split(',').map(number => number.trim());
      validateAWBNumbers(awbNumbers);
    }
  };

  const validateAWBNumbers = (awbNumbers) => {
    const authToken = Cookies.get("access_token");

    return axios.post(
      'https://dev.shipease.in/core-api/shipping/validate-awb-number/',
      {
        awb_numbers: awbNumbers
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      console.warn(response, "Response")
      setAwbStatus(false);
    }).catch(error => {
      toast.error("One of these AWB numbers is invalid.");
      setAwbStatus(true);
    });
  };


  const clearFile = () => {
    setSelectFile(false);
    setFileError("");
    setFileObj(null)
    document.getElementById("fileInput").value = "";
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

  console.log(fileObj, "this is file obj data")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!ticketData.description.trim()) {
      validationErrors.description = "Remarks is required!";
    }
    if (typeof ticketData?.category !== 'string' || !ticketData.category.trim()) {
      validationErrors.category = "Category is required!";
    }
    if (typeof ticketData?.sub_category !== 'string' || !ticketData.sub_category.trim()) {
      validationErrors.sub_category = "Sub category is required!";
    }
    if (awbStatus === true) {
      validationErrors.awb_number = "One of these AWB numbers is invalid.";
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
          await uploadImageData(awsUrl, formData);
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
          const response = await axios.post('https://dev.shipease.in/core-api/features/support-tickets/', ticketData, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 201) {
            toast.success("Ticket created successfully")
            setTicketData({
              category: null,
              sub_category: null,
              awb_number: "",
              description: "",
              escalate_image: ""
            })

            props?.setStatus(!props.status)
            props.setNewTicket(false)
            setAllCatagery([])
            setCategoryStatus(true)
          }

        } catch (error) {
          toast.error(error?.response?.data?.detail)
        }
      }
    }

  };
  const handleEscalateTicket = () => {
    navigate('/customer-support');
  }
  const handleCancel = () => {
    console.log("hit")
    setTicketData({
      category: null,
      sub_category: null,
      awb_number: "",
      description: "",
      escalate_image: ""

    })
    props.setNewTicket(false)
    setSelectFile(false);
    setFileObj(null)
    setAllCatagery([]);
    categoryStatus ? setCategoryStatus(false) : setCategoryStatus(true)
    document.getElementById("fileInput").value = "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='slider-scroll-body'>
        {escalateAwbNumber ? (
          <FormInput
            label="AWB Numbers (Comma Separated)"
            type="text"
            name={"awb_number"}
            value={escalateAwbNumber}
            onChange={(e) => handleCreateTicket(e)}
            placeholder='Enter AWB number(s)'
          />
        ) : (
          <FormInput
            label="AWB Numbers (Comma Separated)"
            type="text"
            name={"awb_number"}
            value={ticketData.awb_number}
            onChange={(e) => handleCreateTicket(e)}
            onBlur={(e) => handleBlurAWB(e)}
            placeholder='Enter AWB number(s)'
          />
        )}
        {errors.awb_number && <span className='error-text'>{errors.awb_number}</span>}
        <FormInput
          type="select"
          mandatory={"*"}
          name={"category"}
          label="Choose a Category"
          options={categoryOptions}
          onChange={(e) => handleCreateTicket(e)}
          customClass={`${errors.category && "custom-input"}`}
        />
        {errors.category && <span className='error-text'>{errors.category}</span>}
        <FormInput
          type="select"
          mandatory={"*"}
          name={"sub_category"}
          label="Choose a Subcategory"
          options={subcategoryOptions}
          onChange={(e) => handleCreateTicket(e)}
          customClass={`${errors.sub_category && "custom-input"}`}
        />
        {errors.sub_category && <span className='error-text'>{errors.sub_category}</span>}
        <FormInput
          label="Remarks"
          type="textarea"
          mandatory={"*"}
          name={"description"}
          value={ticketData.description}
          onChange={(e) => handleCreateTicket(e)}
          customClass={`${errors.description && "custom-input"}`}
          placeholder='Enter your remarks'
        />
        {errors.description && <span className='error-text'>{errors.description}</span>}
        <FormInput
          type="file"
          fileInput="fileInput"
          name="escalate_image"
          clearFile={clearFile}
          selectFile={selectFile}
          label="Attachments (If any)"
          onChange={handleFileChange}
          accept=".pdf, image/*"
        />
        {fileError != '' && <span className='error-text'>{fileError}</span>}
      </div>
      <div className='ticket-form-btn'>
        <button className='btn cancel-button' type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button className='btn main-button' type="submit" onClick={handleEscalateTicket} disabled={isLoading} >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateTicketForm;
