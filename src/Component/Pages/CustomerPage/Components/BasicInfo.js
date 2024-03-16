import axios from 'axios';
import Cookies from 'js-cookie';
import { BsCloudUpload } from "react-icons/bs";
import React, { useState, useEffect } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dummyLogo from '../../../../assets/image/logo/dummyLogo.png';
import { alphaNum, alphabetic, emailRegx, gstRegx, panRegex, webUrlRegx } from '../../../../regex';
import "./basicInfo.css"
import { getFileData, uploadImageData } from '../../../../awsUploadFile';
import { awsAccessKey } from '../../../../config';
import { toast } from 'react-toastify';
import { Document, Page, pdfjs } from 'react-pdf';
import Modal from "react-bootstrap/Modal";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const BasicInfo = ({ activeTab }) => {
  const [errors, setErrors] = useState({});
  const [logoError, setLogoError] = useState("");
  const [docsError, setDocsError] = useState("");
  const hardcodedToken = Cookies.get("access_token");
  const [pdfPreview, setPdfPreview] = useState(null);
  const [basicInfoList, setBasicInfoList] = useState([]);
  const [logoPreview, setLogoPreview] = useState(dummyLogo);
  const [viewAttachmentContent, setViewAttachmentContent] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    website_url: '',
    mobile: '',
    gst_number: '',
    gst_certificate: "",
    pan_number: '',
    street: '',
    pincode: '',
    city: '',
    country: 'India',
    state: '',
    company_logo: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let error = '';
    switch (name) {
      case 'company_name':
        if (alphaNum.test(value)) {
          setFormData(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break;
      case 'email':
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
        break;
      case 'street':
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
        break;
      case 'website_url':
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
        break;
      case 'mobile':
        const mobilePattern = /^\d{0,10}$/;
        if (mobilePattern.test(value)) {
          setFormData(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break;
      case 'pincode':
        const pincodePattern = /^[0-9]{0,6}$/;
        if (pincodePattern.test(value)) {
          setFormData(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break;
      case 'city':
        const al = /^[0-9]{0,6}$/;
        if (alphabetic.test(value)) {
          setFormData(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break;
      case 'state':
        if (alphabetic.test(value)) {
          setFormData(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break;
      case 'pan_number':
        const panPattern = /^[a-zA-Z0-9]{0,10}$/;
        //if (panRegex.test(value)) {
        if (panPattern.test(value)) {
          setFormData(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break;
      case 'gst_number':
        if (gstRegx.test(value)) {
          setFormData(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break;
      default:
        break;
    }

    if (name === "pincode" && value.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`);
        console.log(response, "this is response")
        if (response.data && response.data.length > 0) {

          const district = response.data[0]?.PostOffice[0]?.District;
          const state = response.data[0]?.PostOffice[0]?.State;

          setFormData(prev => ({
            ...prev,
            city: district || '',
            state: state || '',
          }));
        } else {
          throw new Error('No data found for the given pincode.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    }
  };

  console.log(formData,"this is formData")

  useEffect(() => {
    if (activeTab === "Basic Information") {
      axios
          .get('https://dev.shipease.in/core-api/seller/basic-info/', {
            headers: {
              'Authorization': `Bearer ${hardcodedToken}`,
            },
          })
          .then(response => {
            setBasicInfoList(response.data);
            const basicInfoData = response.data[0] || {};
            setFormData(prevState => ({
              ...prevState,
              company_name: basicInfoData.company_name || '',
              email: basicInfoData.email || '',
              pan_number: basicInfoData.pan_number || '',
              gst_number: basicInfoData.gst_number || '',
              street: basicInfoData.street || '',
              pincode: basicInfoData.pincode || '',
              city: basicInfoData.city || '',
              country: 'India',
              state: basicInfoData.state || '',
              website_url: basicInfoData.website_url || '',
              mobile: basicInfoData.mobile || '',
              gst_certificate: basicInfoData.gst_certificate || '',
              company_logo: basicInfoData.company_logo || '',
            }));
          })
          .catch(error => {
            console.error('Error fetching basic info:', error);
          });
    }
  }, [activeTab]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((errors, key) => {
      if (!formData[key]) {
        errors[key] = `${key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} is required !`;
      } else if (key === 'pan_number' && formData[key].length !== 10) {
        errors[key] = "PAN number must consist of exactly 10 characters.";
      } else if (key === 'gst_number' && formData[key].length !== 15) {
        errors[key] = "GST number must consist of exactly 15 characters.";
      } else if (key === 'pincode' && formData[key].length !== 6) {
        errors[key] = "Pincode must consist of exactly 6 characters.";
      }
      return errors;
    }, {});
    setErrors(newErrors);
    console.log("Error Data",Object.keys(newErrors).length)

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('https://dev.shipease.in/core-api/seller/basic-info/', formData, {
          headers: {
            'Authorization': `Bearer ${hardcodedToken}`,
          },
        });

        console.log(response,"response")
        if(response?.status===201){
          toast.success("Details update successfully")
        }
         // Handle successful form submission
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    }
  };


  console.log(errors,"this is errors data")


  const uploadFile = async (e, type) => {
    const file = e.target.files[0];
    const logoFileSize = parseFloat((file?.size / (1024 * 1024)).toFixed(2));

    console.log(logoFileSize,"logoFileSize")
    if (type === "company_logo") {
      if (logoFileSize > 2) {
        setLogoError("File shouldn't be greater than 2 mb")
      } else {
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
            setFormData(prev => ({
              ...prev,
              company_logo: imageUrl
            }));
          }
        } catch (error) {
          console.error('Error handling file change:', error);
        }
      }
    }

    if (type === "gstCertificate") {
      if (logoFileSize > 3) {
        setDocsError("File shouldn't be greater than 3 mb")
      }
      else {
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
            setFormData(prev => ({
              ...prev,
              gst_certificate: imageUrl
            }));
          }
        } catch (error) {
          console.error('Error handling file change:', error);
        }
      }
    }

    const previewURL = URL.createObjectURL(file);
    if (type === 'gstCertificate') {
      setPdfPreview(previewURL);
    } else {
      setLogoPreview(previewURL);
    }
  };

  const handlePreview = () => {
    if (pdfPreview === null) {
      setViewAttachmentContent(false);
    } else {
      setViewAttachmentContent(!viewAttachmentContent);
    }
  };

  const handleRegex = (e) => {
    const { name, value } = e.target
    if (!webUrlRegx.test(value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: `follow https://www.abc.com`,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    }
    if (!emailRegx.test(value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ``,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  }

  const [previewImage, setPreviewImage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (pdfUrl) => {
    try {
      const response = await axios.get(pdfUrl, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);
      setShow(true);
      setPreviewImage(objectUrl);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  }

  console.log("Basic Info Data",formData)

  return (
      <>
        <form onSubmit={handleSubmit}>
          <div className='customer-details-container mb-2'>
            <div className='customer-details-form'>
              <div className='details-form-row row'>
                <h5 className='col-3'>Primary Details</h5>
                <div className='col-9'>
                  <label className='logo-file-upload'>
                    <input className="input-field" type="file" onChange={(e) => uploadFile(e, 'company_logo')} />
                    <div className='upload-logo-input'>
                      <div className='d-flex flex-column align-items-center'>
                        <div className='logo-img-cont'>
                          <img src={formData.company_logo ? formData.company_logo : logoPreview} alt="Logo Preview" height={50} />
                        </div>
                        <span className='font20 fw-bold'><BsCloudUpload className='font30' /> Upload your Company Logo</span>
                      </div>
                    </div>
                  </label>
                  {logoError && <span className="custom-error">{logoError}</span>}
                  <div className='d-flex w-100 gap-3 mt-4'>
                    <label>
                      <span>Company Name <span className='custom-error'>*</span></span>
                      <input placeholder="Enter your company name" className={`input-field ${errors.company_name && "input-field-error"}`} type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
                      {errors.company_name && <span className="custom-error">{errors.company_name}</span>}
                    </label>
                    <label>
                      <span> Website URL<span className='custom-error'>*</span></span>
                      <input
                          placeholder='Enter your website URL'
                          className={`input-field ${errors.website_url && "input-field-error"}`}
                          type="text" name="website_url" value={formData.website_url}
                          onChange={handleChange}
                          onKeyUp={handleRegex}
                      />
                      {errors.website_url && <span className="custom-error">{errors.website_url}</span>}
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className='details-form-row row'>
                <h5 className='col-3'>Contact Details</h5>
                <div className='col-9 d-flex gap-3'>
                  <label>
                    <span>Mobile Number <span className='custom-error'> *</span></span>
                    <div className='d-flex mobile-number-field'>
                      <select
                          className='input-field '
                          disabled
                      >
                        <option value="+91">+91</option>
                      </select>
                      <input
                          className={`input-field ${errors.mobile && "input-field-error"}`}
                          type="text"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder='XXXXXXXXXX'
                      />
                    </div>
                    {errors.mobile && <span className="custom-error">{errors.mobile}</span>}
                  </label>
                  <label>
                    <span>Email<span className='custom-error'> *</span></span>
                    <input
                        className={`input-field ${errors.email && "input-field-error"}`}
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onKeyUp={handleRegex}
                        placeholder='i.e. abc@gmail.com' />
                    {errors.email && <span className="custom-error">{errors.email}</span>}
                  </label>
                </div>
              </div>
              <hr />
              <div className='details-form-row row'>
                <h5 className='col-3'>Address Details</h5>
                <div className='col-9'>
                  <div className='d-flex gap-3'>
                    <label>
                      <span>Address<span className='custom-error'>*</span></span>
                      <input placeholder="House/Floor No. Building Name or Street, Locality" className={`input-field`} type="text" name="street" value={formData.street} onChange={handleChange}  />
                      {errors.street && <span className="custom-error">{errors.street}</span>}
                    </label>
                    <label>
                      Landmark
                      <input placeholder="Any nearby post office, market, Hospital as the landmark" className={`input-field`} type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
                    </label>
                  </div>
                  <div className='d-flex gap-3 mt-3'>
                    <label>
                      <span>Pincode<span className='custom-error'> *</span></span>
                      <input placeholder="Enter your Pincode" className={`input-field ${errors.pincode && "input-field-error"}`} type="text" name="pincode" value={formData.pincode} onChange={handleChange}  />
                      {errors.pincode && <span className="custom-error">{errors.pincode}</span>}
                    </label>
                    <label>
                      <span>City<span className='custom-error'> *</span></span>
                      <input placeholder="Enter your city" className={`input-field ${errors.city && "input-field-error"}`} type="text" name="city" value={formData.city} onChange={handleChange} />
                      {errors.city && <span className="custom-error">{errors.city}</span>}
                    </label>
                    <label>
                      <span>State<span className='custom-error'> *</span></span>
                      <input placeholder="Enter your state" className={`input-field ${errors.state && "input-field-error"}`} type="text" name="state" value={formData.state} onChange={handleChange}  />
                      {errors.state && <span className="custom-error">{errors.state}</span>}
                    </label>
                    <label>
                      <span>Country<span className='custom-error'> *</span></span>
                      <input placeholder="Enter your country" className={`input-field ${errors.country && "input-field-error"}`} type="text" name="state" value={formData.country} onChange={handleChange}  />
                      {errors.country && <span className="custom-error">{errors.country}</span>}
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="details-form-row row">
                <h5 className='col-3'>Taxation Details</h5>
                <div className='col-9'>
                  <div className='d-flex gap-3 mt-3'>
                    <label>
                      <span>PAN Number<span className='custom-error'> *</span></span>
                      <input className={`input-field ${errors.pan_number && "input-field-error"}`} type="text" name="pan_number" value={formData.pan_number} onChange={handleChange}  />
                      {errors.pan_number && <span className="custom-error">{errors.pan_number}</span>}
                    </label>
                    <label>
                      <span>GST Number<span className='custom-error'> *</span></span>
                      <input className={`input-field ${errors.gst_number && "input-field-error"}`} type="text" name="gst_number" value={formData.gst_number} onChange={handleChange} />
                      {errors.gst_number && <span className="custom-error">{errors.gst_number}</span>}
                    </label>
                    <label className='position-relative'>
                      <span>GST Certificate<span className='custom-error'> *</span></span>
                      <input className="input-field" type="file" accept=".pdf" onChange={(e) => uploadFile(e, 'gstCertificate')} />
                      {docsError && <span className="custom-error">{docsError}</span>}
                    </label>
                  </div>
                </div>
              </div>
              {formData.gst_certificate && (
                  <button
                      type="button"
                      style={{ float: 'right' }}
                      className="btn preview-btn"
                      onClick={() => handleShow(formData.gst_certificate)}
                  >
                    View File
                  </button>
              )}
              {/* Add other form sections here */}
            </div>
            <div className='d-flex justify-content-end mt-4'>
              <button className='btn main-button' type="submit">Save</button>
            </div>
          </div>
        </form>
        <section className={`pdf-preview-section ${viewAttachmentContent ? 'd-block' : 'd-none'}`}>
          {pdfPreview && (
              <embed src={pdfPreview} type="application/pdf" width="100%" height="100%" />
          )}
        </section>
        <div
            onClick={() => setViewAttachmentContent(!viewAttachmentContent)}
            className={`backdrop ${viewAttachmentContent ? 'd-block' : 'd-none'}`}></div>

        <Preview show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} previewImage={previewImage} />
      </>
  );
};

export default BasicInfo;

function Preview({ show, handleClose, previewImage }) {
  return (
      <Modal show={show} onHide={handleClose} size="md" style={{ width: '100%', height: '650px',overflow: 'hidden' }} centered>
        <Modal.Header closeButton>
          <Modal.Title>PDF Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewImage && (
              <Document file={previewImage}>
                <Page pageNumber={1} width={400} height={300} />
              </Document>
          )}
        </Modal.Body>
      </Modal>
  );
}