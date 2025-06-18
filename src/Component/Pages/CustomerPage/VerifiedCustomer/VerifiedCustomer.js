import axios from 'axios'
import './VerifiedCustomer.css'
import Cookies from 'js-cookie';
import { FiDownload } from 'react-icons/fi'
import React, { useEffect, useRef, useState } from 'react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { BASE_URL_CORE } from '../../../../axios/config';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import AgreementData from './AgreementData';

const VerifiedCustomer = ({ accountType }) => {
    const componentRef = useRef();
    const hardcodedToken = Cookies.get("access_token");
    const [formData, setFormData] = useState([]);
    const logoImg = "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png";

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

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Merchant Agreement - Shipease",

    });


    return (
        <>
            <section className='verified-customer box-shadow shadow-sm p-3 mb-4'>
                <div className='header-section'>
                    <h2 className='text-capitalize mb-0'>{formData.company_name}</h2>
                    <div className='d-flex gap-2 align-items-center'>
                        <div className='company-logo'>
                            <img src={formData?.basic_info?.company_logo ? formData?.basic_info?.company_logo : logoImg} alt="Company Logo" />
                        </div>
                    </div>
                </div>
                <div className='details-container mb-3'>
                    <div className='detail-section row justify-content-between mx-0 px-0'>
                        <div className='details-title col-4 col-lg-2'>Basic Details</div>
                        <div className='follow-details col-8 col-lg-10'>
                            <div className='detail-label'>Company Name <span className='text-capitalize'>{formData?.basic_info?.company_name}</span></div>
                            <div className='detail-label'>Mobile No <span>{formData?.basic_info?.mobile}</span></div>
                            <div className='detail-label'>Email <span>{formData?.basic_info?.email}</span></div>
                            <div className='detail-label'>Website <span>{formData?.basic_info?.website_url}</span></div>
                            <div className='detail-label'>PAN No <span className='text-uppercase'>{formData?.basic_info?.pan_number}</span></div>
                            <div className='detail-label'>GST Number <span className='text-uppercase'>{formData?.basic_info?.gst_number}</span></div>
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
                    <div className='detail-section row justify-content-between mx-0 px-0'>
                        <div className='details-title col-4 col-lg-2'>Account Details</div>
                        <div className='col-8 col-lg-10 px-0'>
                            {
                                formData?.seller_acc_info?.length > 0 ?
                                    <>
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
                                    </>
                                    : <p className='follow-details'>
                                        Data Not Avaliable
                                    </p>
                            }
                        </div>
                    </div>
                    <hr />
                    <div className='detail-section row justify-content-between mx-0 px-0'>
                        <div className='details-title col-4 col-lg-2'>KYC Details</div>
                        <div className='col-8 col-lg-10 px-0'>
                            {formData?.seller_acc_info?.length > 0 ?
                                <>
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
                                </> :
                                <p className='follow-details'>
                                    Data Not Avaliable
                                </p>
                            }
                        </div>
                    </div>
                    <hr />
                    <div className='detail-section row justify-content-between mx-0 px-0'>
                        <div className='details-title col-4 col-lg-2'>Agreement</div>
                        <div className='follow-details col-8 col-lg-10'>

                            <div className='detail-label'>
                                Name
                                <span>{formData?.agreement_info?.name}</span>
                            </div>
                            <div className='detail-label'>
                                Place
                                <span>{formData?.agreement_info?.place}</span>
                            </div>
                            <div className='detail-label'>
                                Signed On
                                <span>{moment(formData?.agreement_info?.date).format("DD MMM YYYY")}</span>
                            </div>

                            <div className='detail-label'>
                                Attachment
                                <button onClick={() => handlePrint()} className='agreement-btn'>
                                    <FiDownload /> Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            <div style={{ display: 'none', background: '#fff' }}>
                {/* <div> */}
                <div style={{ backgroundColor: '#fff' }} ref={componentRef}>
                    <AgreementData
                        Company={formData?.basic_info?.company_name}
                        Name={formData?.agreement_info?.name}
                        Gst={formData?.basic_info?.gst_number}
                        Place={formData?.agreement_info?.place}
                        Date={formData?.agreement_info?.date}
                    />
                </div>
            </div>


        </>
    )
}

export default VerifiedCustomer