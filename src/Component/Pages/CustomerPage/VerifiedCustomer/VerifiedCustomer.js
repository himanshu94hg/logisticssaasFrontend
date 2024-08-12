import React, { useEffect, useState } from 'react'
import './VerifiedCustomer.css'
import Logo from '../../../../assets/image/logo/mobileLogo.svg'
import sellerProfileImage from '../../../../assets/image/sellerProfileImage.svg'
import axios from 'axios'
import { BASE_URL_CORE } from '../../../../axios/config';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const VerifiedCustomer = () => {
    const hardcodedToken = Cookies.get("access_token");
    const [fileType, setFileType] = useState("");
    const [numPages, setNumPages] = useState(null);

    const [formData, setFormData] = useState({
        company_name: '',
        email: '',
        website_url: 'http://',
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

    useEffect(() => {
        axios
            .get(`${BASE_URL_CORE}/core-api/seller/basic-info/`, {
                headers: {
                    'Authorization': `Bearer ${hardcodedToken}`,
                },
            })
            .then(response => {
                const basicInfoData = response.data[0] || {};
                if (response?.data?.length > 0) {
                    // setIsDisabled(true)
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
                } else {
                    // setIsDisabled(false)
                }
            })
    }, []);

    const determineFileType = (url) => {
        const fileExtension = url.split(".").pop().toLowerCase();

        if (fileExtension === "pdf") {
            return "pdf";
        } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
            return "image";
        } else {
            return "unsupported";
        }
    };
    const handleClick = () => {
        const type = determineFileType(formData.gst_certificate);
        setFileType(type);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <>
            <section className='verified-customer box-shadow shadow-sm p-3 mb-4'>
                <div className='header-section'>
                    <h2 className='text-capitalize mb-0'>{formData.company_name}</h2>
                    <div className='d-flex gap-2 align-items-center'>
                        <div className='company-logo'>
                            <img src={formData.company_logo} alt="Company Logo" />
                        </div>
                        {/* <hr /> */}
                        <div className='shipease-logo'>
                            <img src={Logo} alt="Shipease Logo" />
                        </div>
                    </div>
                </div>
                <div className='details-container mb-3'>
                    <div className='detail-section row'>
                        <div className='details-title col-3'>Basic Details</div>
                        <div className='follow-details col-9'>
                            <div className='detail-label'>Mobile No. <span>{formData.mobile}</span></div>
                            <div className='detail-label'>Email <span>{formData.email}</span></div>
                            <div className='detail-label'>Website <span>{formData.website_url}</span></div>
                            <div className='detail-label'>Address
                                <span>
                                    {formData.street},
                                    {formData.landmark && `${formData.landmark},`}
                                    {formData.city},
                                    {formData.state},
                                    {formData.country},
                                    {formData.pincode}
                                </span>
                            </div>
                            <div className='detail-label'>Pan No. <span>{formData.pan_number}</span></div>
                            <div className='detail-label'>GST Number <span>{formData.gst_number}</span></div>
                            <div className='detail-label'>GST Number <span>{formData.gst_number}</span></div>
                            <div className='detail-label'>GST Certficate
                                <span onClick={handleClick}>
                                    <FontAwesomeIcon icon={faEye} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='detail-section row'>
                        <div className='details-title col-3'>Account Details</div>
                        <div className='follow-details col-9'>
                            <div className='detail-label'>
                                Acount Holder Name
                                <span>
                                    Test
                                </span>
                            </div>
                            <div className='detail-label'>
                                Account Number
                                <span>8472390472309562</span>
                            </div>
                            <div className='detail-label'>
                                IFSC Code
                                <span>jdakjsdq87398</span>
                            </div>
                            <div className='detail-label'>
                                Bank Name
                                <span>ICICI</span>
                            </div>
                            <div className='detail-label'>
                                Branch Name
                                <span>noida branch</span>
                            </div>
                            <div className='detail-label'>
                                Attachment
                                <span><FontAwesomeIcon icon={faEye} /></span>
                            </div>

                        </div>
                    </div>
                    <hr />
                    <div className='detail-section row'>
                        <div className='details-title col-3'>KYC Details</div>
                        <div className='follow-details col-9'>
                            <div className='detail-label'>
                                Document Type
                                <span>Pan Card</span>
                            </div>
                            <div className='detail-label'>
                                Document Name
                                <span>adjaskjd</span>
                            </div>
                            <div className='detail-label'>
                                Document Number
                                <span>3847293847</span>
                            </div>
                            <div className='detail-label'>
                                Attachment
                                <span><FontAwesomeIcon icon={faEye} /></span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='detail-section row'>
                        <div className='details-title col-3'>Agreement</div>
                        <div className='follow-details col-9'>
                            Download Agreement
                        </div>
                    </div>
                </div>
            </section>

            {/* {fileType === "pdf" && (
                <div>
                    <Document
                        file={formData.gst_certificate}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={1} />
                    </Document>
                </div>
            )}
            {fileType === "image" && <img src={formData.gst_certificate} alt="file" style={{ maxWidth: "100%", height: "auto" }} />}
            {fileType === "unsupported" && <p>Unsupported file type</p>} */}
        </>
    )
}

export default VerifiedCustomer