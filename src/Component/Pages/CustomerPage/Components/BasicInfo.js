import "./basicInfo.css"
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Modal from "react-bootstrap/Modal";
import { BsCloudUpload } from "react-icons/bs";
import { awsAccessKey } from '../../../../config';
import { Document, Page, pdfjs } from 'react-pdf';
import React, { useState, useEffect } from 'react';
import { BASE_URL_CORE } from '../../../../axios/config';
import { numericRegex, webUrlRegx } from '../../../../regex';
import dummyLogo from '../../../../assets/image/logo/dummyLogo.png';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';
import { customErrorFunction, customErrorPincode } from '../../../../customFunction/errorHandling';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const BasicInfo = ({ activeTab }) => {
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [logoError, setLogoError] = useState("");
  const [docsError, setDocsError] = useState("");
  const hardcodedToken = Cookies.get("access_token");
  const [pdfPreview, setPdfPreview] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (name === "pincode" && value.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`);
        if (response.data && response.data.length > 0) {
          const district = response.data[0]?.PostOffice[0]?.District;
          const state = response.data[0]?.PostOffice[0]?.State;
          setFormData(prev => ({
            ...prev,
            city: district || '',
            state: state || '',
          }));
        }
      } catch (error) {
        customErrorPincode()
      }
    }
  };

  useEffect(() => {
    if (activeTab === "Basic Information") {
      axios
        .get(`${BASE_URL_CORE}/core-api/seller/basic-info/`, {
          headers: {
            'Authorization': `Bearer ${hardcodedToken}`,
          },
        })
        .then(response => {
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
          customErrorFunction(error)
        });
    }
  }, [activeTab]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((errors, key) => {
      if (!formData[key] && key !== "company_logo") {
        errors[key] = `${key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} is required !`;
      } else if (key === 'mobile' && formData[key].length !== 10) {
        errors[key] = "Mobile no should be 10 digits!.";
      } else if (key === 'pan_number' && formData[key].length !== 10) {
        errors[key] = "PAN number must consist of exactly 10 characters.";
      } else if (key === 'gst_number' && formData[key].length !== 15) {
        errors[key] = "GST number must consist of exactly 15 characters.";
      } else if (key === 'pincode' && formData[key].length !== 6) {
        errors[key] = "Pincode should be 6 digits!.";
      }
      return errors;
    }, {});
    console.log(newErrors,"newErrorsnewErrorsnewErrors")
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(`${BASE_URL_CORE}/core-api/seller/basic-info/`, formData, {
          headers: {
            'Authorization': `Bearer ${hardcodedToken}`,
          },
        });
        if (response?.status === 201) {
          toast.success("Details update successfully")
        }
      } catch (error) {
        customErrorFunction(error)
      }
    }
  };

  const uploadFile = async (e, type) => {
    const file = e.target.files[0];
    const logoFileSize = parseFloat((file?.size / (1024 * 1024)).toFixed(2));
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
          customErrorFunction(error)
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
          customErrorFunction(error)
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

  const handleRegex = (e) => {
    const { name, value } = e.target
    if (!webUrlRegx.test(value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: `follow https://www.abc.com`,
      }));
    }
  }

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
      customErrorFunction(error)
    }
  }

  const handleKeyPress = (e, field) => {
    const allowedCharacters = field === "company_name" ? /^[a-zA-Z0-9\s]*$/ : field === "pincode" ? numericRegex : /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
    if (e.key === ' ' && e.target.value.endsWith(' ')) {
      e.preventDefault();
    }
    else if (!allowedCharacters.test(e.key)) {
      e.preventDefault();
    }
  };

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
                    <input placeholder="Enter your company name"
                      type="text"
                      maxLength={80}
                      name="company_name"
                      onChange={handleChange}
                      value={formData.company_name}
                      onKeyDown={(e) => handleKeyPress(e, "company_name")}
                      className={`input-field ${errors.company_name && "input-field-error"}`}
                    />
                    {errors.company_name && <span className="custom-error">{errors.company_name}</span>}
                  </label>
                  <label>
                    <span> Website URL<span className='custom-error'>*</span></span>
                    <input
                      onKeyUp={handleRegex}
                      onChange={handleChange}
                      placeholder='Enter your website URL'
                      type="text" name="website_url" value={formData.website_url}
                      className={`input-field ${errors.website_url && "input-field-error"}`}
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
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder='XXXXXXXXXX'
                      onKeyPress={(e) => {
                        if (!/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
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
                    maxLength={50}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='i.e. abc@gmail.com'
                  />
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
                    <input
                      type="text"
                      name="street"
                      maxLength={150}
                      value={formData.street}
                      onChange={handleChange}
                      className={`input-field`}
                      onKeyDown={(e) => handleKeyPress(e, "street")}
                      placeholder="House/Floor No. Building Name or Street, Locality"
                    />
                    {errors.street && <span className="custom-error">{errors.street}</span>}
                  </label>
                  <label>
                    Landmark
                    <input
                      type="text"
                      name="landmark"
                      maxLength={80}
                      onChange={handleChange}
                      className={`input-field`}
                      value={formData.landmark}
                      onKeyDown={(e) => handleKeyPress(e, "landmark")}
                      placeholder="Any nearby post office, market, Hospital as the landmark"
                    />
                  </label>
                </div>
                <div className='d-flex gap-3 mt-3'>
                  <label>
                    <span>Pincode<span className='custom-error'> *</span></span>
                    <input
                      placeholder="Enter your Pincode"
                      maxLength={6}
                      type="text"
                      name="pincode"
                      value={formData.pincode} onChange={handleChange}
                      onKeyPress={(e) => {
                        if (!/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      className={`input-field ${errors.pincode && "input-field-error"}`}
                    />
                    {errors.pincode && <span className="custom-error">{errors.pincode}</span>}
                  </label>
                  <label>
                    <span>City<span className='custom-error'> *</span></span>
                    <input
                      value={formData.city}
                      type="text"
                      name="city"
                      maxLength={20}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      onKeyDown={(e) => handleKeyPress(e, "city")}
                      className={`input-field ${errors.city && "input-field-error"}`}
                    />
                    {errors.city && <span className="custom-error">{errors.city}</span>}
                  </label>
                  <label>
                    <span>State<span className='custom-error'> *</span></span>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      maxLength={20}
                      onChange={handleChange}
                      placeholder="Enter your state"
                      onKeyDown={(e) => handleKeyPress(e, "state")}
                      className={`input-field ${errors.state && "input-field-error"}`}
                    />
                    {errors.state && <span className="custom-error">{errors.state}</span>}
                  </label>
                  <label>
                    <span>Country<span className='custom-error'> *</span></span>
                    <input placeholder="Enter your country" maxLength={20} className={`input-field ${errors.country && "input-field-error"}`} type="text" name="state" value={formData.country} onChange={handleChange} />
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
                    <input
                      onChange={handleChange}
                      maxLength={10} type="text"
                      name="pan_number" value={formData.pan_number}
                      className={`input-field ${errors.pan_number && "input-field-error"}`}
                      onKeyDown={(e) => {
                        const allowedCharacters = /^[a-zA-Z0-9]*$/;
                        if (e.key === ' ' || !allowedCharacters.test(e.key)) {
                          e.preventDefault();
                        }
                      }}

                    />
                    {errors.pan_number && <span className="custom-error">{errors.pan_number}</span>}
                  </label>
                  <label>
                    <span>GST Number<span className='custom-error'> *</span></span>
                    <input
                      maxLength={15}
                      type="text"
                      name="gst_number"
                      value={formData.gst_number} onChange={handleChange}
                      className={`input-field ${errors.gst_number && "input-field-error"}`}
                      onKeyPress={(e) => {
                        const allowedCharacters = /^[a-zA-Z0-9]*$/;
                        if (e.key === ' ' || !allowedCharacters.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
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
    <Modal show={show} onHide={handleClose} size="md" style={{ width: '100%', height: '650px', overflow: 'hidden' }} centered>
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