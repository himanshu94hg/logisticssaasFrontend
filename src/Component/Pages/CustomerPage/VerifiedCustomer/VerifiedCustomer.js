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
import { FiDownload } from 'react-icons/fi'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const VerifiedCustomer = () => {
    const hardcodedToken = Cookies.get("access_token");
    const [fileType, setFileType] = useState("");
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        axios
            .get(`${BASE_URL_CORE}/core-api/seller/get-selller-kyc-details/`, {
                headers: {
                    'Authorization': `Bearer ${hardcodedToken}`,
                },
            })
            .then(response => {
                if (response?.data?.length > 0) {

                } else {
                    setFormData(response?.data)
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
        // const type = determineFileType(formData.gst_certificate);
        // setFileType(type);
    };


    return (
        <>
            <section className='verified-customer box-shadow shadow-sm p-3 mb-4'>
                <div className='header-section'>
                    <h2 className='text-capitalize mb-0'>{formData.company_name}</h2>
                    <div className='d-flex gap-2 align-items-center'>
                        <div className='company-logo'>
                            <img src={formData?.basic_info?.company_logo} alt="Company Logo" />
                        </div>
                        {/* <div className='shipease-logo'>
                            <img src={Logo} alt="Shipease Logo" />
                        </div> */}
                    </div>
                </div>
                <div className='details-container mb-3'>
                    <div className='detail-section row'>
                        <div className='details-title col-3'>Basic Details</div>
                        <div className='follow-details col-9'>
                            <div className='detail-label'>Company Name <span>{formData?.basic_info?.company_name}</span></div>
                            <div className='detail-label'>Mobile No <span>{formData?.basic_info?.mobile}</span></div>
                            <div className='detail-label'>Email <span>{formData?.basic_info?.email}</span></div>
                            <div className='detail-label'>Website <span>{formData?.basic_info?.website_url}</span></div>
                            <div className='detail-label'>PAN No <span>{formData?.basic_info?.pan_number}</span></div>
                            <div className='detail-label'>GST Number <span>{formData?.basic_info?.gst_number}</span></div>
                            <div className='detail-label'>Address
                                <span>
                                    {formData?.basic_info?.street},
                                    {formData?.basic_info?.landmark && `${formData?.basic_info?.landmark},`}
                                    {formData?.basic_info?.city},
                                    {formData?.basic_info?.state},
                                    {formData?.basic_info?.country},
                                    {formData?.basic_info?.pincode}
                                </span>
                            </div>
                            <div className='detail-label'>GST Certficate
                                <a href={formData?.basic_info?.gst_certificate}>
                                    <FiDownload /> Download
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='detail-section row'>
                        <div className='details-title col-3'>Account Details</div>
                        <div className='col-9 px-0'>
                            {formData?.seller_acc_info?.map((item, index) =>
                                <div className='follow-details mb-3'>
                                    <div className='detail-label'>
                                        Acount Type
                                        <span>
                                            {index === 0 ? "Primary" : "Other"}
                                        </span>
                                    </div>
                                    <div className='detail-label'>
                                        Acount Holder Name
                                        <span>{item?.account_holder_name}</span>
                                    </div>
                                    <div className='detail-label'>
                                        Account Number
                                        <span>{item?.account_number}</span>
                                    </div>
                                    <div className='detail-label'>
                                        IFSC Code
                                        <span>{item?.ifsc_code}</span>
                                    </div>
                                    <div className='detail-label'>
                                        Bank Name
                                        <span>{item?.bank_name}</span>
                                    </div>
                                    <div className='detail-label'>
                                        Branch Name
                                        <span>{item?.bank_branch}</span>
                                    </div>
                                    <div className='detail-label'>
                                        Attachment
                                        <a href={item?.cheque_image}>
                                            <FiDownload /> Download
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className='detail-section row'>
                        <div className='details-title col-3'>KYC Details</div>
                        <div className=' col-9 px-0'>
                            {formData?.kyc_info?.map((item) =>
                                <div className='follow-details mb-3'>
                                    <div className='detail-label'>
                                        Document Type
                                        <span>{item?.document_type}</span>
                                    </div>
                                    <div className='detail-label'>
                                        Document Name
                                        <span>{item?.document_name}</span>
                                    </div>
                                    <div className='detail-label'>
                                        Document Number
                                        <span>{item?.document_id}</span>
                                    </div>
                                    <div className='detail-label'>
                                        Attachment
                                        <a href={item?.document_upload}>
                                            <FiDownload /> Download
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className='detail-section row'>
                        <div className='details-title col-3'>Agreement</div>
                        <div className='follow-details col-9 px-0'>
                            <a href={formData?.agreement_info} className='mx-3'>
                                <FiDownload /> Download
                            </a>
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