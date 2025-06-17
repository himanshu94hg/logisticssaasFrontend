import axios from 'axios'
import './VerifiedCustomer.css'
import Cookies from 'js-cookie';
import { FiDownload } from 'react-icons/fi'
import React, { useEffect, useRef, useState } from 'react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { BASE_URL_CORE } from '../../../../axios/config';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';

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
                        <div className='details-title col-2'>Basic Details</div>
                        <div className='follow-details col-10'>
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
                        <div className='details-title col-2'>Account Details</div>
                        <div className='col-10 px-0'>
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
                        <div className='details-title col-2'>KYC Details</div>
                        <div className=' col-10 px-0'>
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
                        <div className='details-title col-2'>Agreement</div>
                        <div className='follow-details col-10 px-0'>
                            <buttn onClick={() => handlePrint()} className='btn agreement-btn mx-3'>
                                <FiDownload /> Download
                            </buttn>
                        </div>
                    </div>
                </div>
            </section>




            <div style={{ display: 'none', background: '#fff' }}>
                {/* <div> */}
                <div style={{ backgroundColor: '#fff' }} ref={componentRef}>
                    <div className='verified-agreement-section'>
                        <div>
                            <h5 className='text-center'>MERCHANT AGREEMENT</h5>
                            <h5 className='text-center mb-4'>SHIPEASE TECHNOLOGIES PRIVATE LIMITED</h5>


                            <p>This Merchant Agreement <strong>(“Agreement”)</strong> is between your company <strong className='text-capitalize'>{formData?.basic_info?.company_name}</strong> (company/individual/firm/partnership/body corporate), together with any company or other business entity you are representing, if any (hereinafter collectively referred as “<strong>Merchant</strong>” or “<strong>you</strong>” or “<strong>User</strong>”); and <strong>SHIPEASE TECHNOLOGIES PRIVATE LIMITED</strong>, a company registered under the Companies Act, 1956, having its registered office at 476B, Sector 39, Gurugram, Haryana. Pin-122022, offering ‘Logistics Management Services’, under the name ‘<strong>SHIPEASE</strong>’ (hereinafter referred to as “<strong>SHIPEASE</strong>” or “<strong>we</strong>” or “<strong>Company</strong>”, and together with the User referred jointly as the “<strong>Parties</strong>” and individually as a “<strong>Party</strong>”).</p>


                            <h5 className='mt-5 mb-3'>BACKGROUND</h5>
                            <p>This Agreement comes into effect when you register to use the Services (as defined below), or click on “<strong>Continue</strong>” box, and accept the terms and conditions provided herein.</p>

                            <p>By registering or clicking on the ‘Continue’ box, you signify your absolute, irrevocable and unconditional consent to all the provisions of this Agreement in its entirety. This Agreement constitutes a legally binding agreement between you and SHIPEASE. This Agreement defines the terms and conditions under which you’re allowed to use the SHIPEASE’s website (“<strong>Website</strong>”), and how SHIPEASE will treat your account while you are a member. If you have any questions about our terms, feel free to contact us at Ops@SHIPEASE.in.</p>

                            <p>You are advised to read this Agreement carefully. You expressly represent and warrant that you will not avail the Services if you do not understand, agree to become a party to, and abide by all of the terms and conditions specified below. Any violation of this Agreement may result in legal liability upon you.
                            </p>

                            <p>The Website/ Mobile App and the online/ offline services of SHIPEASE or its affiliates, provides access to a platform that facilitates more comfortable form of e-commerce where you can use the logistics services according to your requirements within India and in countries designated by SHIPEASE from time to time (“<strong>Service(s)</strong>”).</p>

                            <p>This Agreement, among other things, provides the terms and conditions for use of the Services, primarily through a web-based practice management software hosted and managed remotely through the Website.</p>

                            <p>This Agreement is an electronic record in terms of Information Technology Act, 2000 and generated by a computer system, and does not require any physical or digital signatures. This Agreement is published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing of the rules and regulations, privacy policy and terms of usage for access or usage of the website/ service.
                            </p>

                            <p><strong>SHIPEASE</strong> reserves the right to modify the terms of this Agreement, at any time, without giving you any prior notice. Your use of the Service following any such modification constitutes your agreement to follow and be bound by the terms of the Agreement, as modified.
                            </p>

                            <p>Any additional terms and conditions, standard operating procedures (<strong>SOPs</strong>), service-level agreements (<strong>SLAs</strong>), terms of use, disclaimers and other policies applicable to general and specific areas of this Agreement, Website and/or Service shall be construed to form an integral part of this Agreement and any breach thereof will be construed as a breach of this Agreement.
                            </p>

                            <p>Your access to use the Services will be solely at the discretion of SHIPEASE.</p>
                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>1.</span>
                                <span>USER ACCOUNT USAGE</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.1</span><span>This Agreement is a master agreement which governs the relationship between the Parties in relation to one or more business (B2B) services that are offered by SHIPEASE to the User, which shall inter-alia be subject to the terms and conditions specified in <strong>Annexure-A</strong> (SHIPEASE Service Specifications). SHIPEASE hereby authorizes the User to view and access the content available on the Website/Mobile App solely for ordering, receiving, delivering and communicating as per this Agreement. The contents of the Services, information, text, graphics, images, logos, button icons, software code, design, and the collection, arrangement and assembly of content on the Website and Mobile App (collectively, "<strong>SHIPEASE Content</strong>"), are the property of SHIPEASE and are protected under copyright, trademark and other laws. User shall not modify the SHIPEASE Content or reproduce, display, publicly perform, distribute, or otherwise use the SHIPEASE Content in any manner, without the consent of SHIPEASE.</span>
                            </p>
                            <p className='d-flex align-items-start gap-3'>
                                <span>1.2</span> <span>User shall not transfer or share (including by way of sublicense, lease, assignment or other transfer, including by operation of law) their log-in or right to use the Service to any third party. The User shall be solely responsible for the way anyone you have authorized to use the Services and for ensuring that all of such users comply with all of the terms and conditions of this Agreement. Any violation of the terms and/or conditions of this Agreement by any such user shall be deemed to be a violation thereof by you, towards which SHIPEASE shall have no liability or responsibility.</span>
                            </p>
                            <p className='d-flex align-items-tart gap-3'>
                                <span>1.3</span>
                                <span>Multiple users are not permitted to share the same/single log-in. You agree and understand that you are responsible for maintaining the confidentiality of passwords associated with any log-in you use to access the Services.</span>
                            </p>

                            <p className='d-flex align-items-tart gap-3'>
                                <span>1.4</span>
                                <span>You agree that any information you give to SHIPEASE will always be true, accurate, correct, complete and up to date, to the best of your knowledge. Any phone number used to register with the Service be registered in your name and you might be asked to provide supporting documents to prove the same.</span>
                            </p>
                            <p className='d-flex align-items-tart gap-3'>
                                <span>1.5</span>
                                <span>You agree that you will not use the Services provided by SHIPEASE for any unauthorized and unlawful purpose. You will not impersonate another person to any of the aforesaid.</span>
                            </p>

                            <p className='d-flex align-items-tart gap-3'>
                                <span>1.6</span>
                                <span>You agree to use the Services only for purposes that are permitted by: (a) the terms of usage as outlined in this Agreement; and (b) any applicable law, regulation and generally accepted practices or guidelines in the relevant jurisdictions (including any laws regarding the export of goods, data or software to and from India or other relevant countries).</span>
                            </p>

                            <p className='d-flex align-items-tart gap-3'>
                                <span>1.7</span>
                                <span>You agree not to access (or attempt to access) any of the Services by any means other than through the interface that is provided by SHIPEASE, unless you have been specifically allowed to do so in a separate agreement with SHIPEASE.
                                </span>
                            </p>

                            <p className='d-flex align-items-tart gap-3'>
                                <span>1.8</span>
                                <span>You agree that you will not engage in any activity that interferes with or disrupts the Services (or the servers and networks which are connected to the Services).</span>
                            </p>

                            <p className='d-flex align-items-tart gap-3'>
                                <span>1.9</span>
                                <span>
                                    You agree that you are solely responsible for (and that SHIPEASE has no responsibility to you or to any third party for) any breach of your obligations under this Agreement and for the consequences (including any loss or damage which SHIPEASE may suffer) of any such breach.
                                </span>
                            </p>

                            <p className='d-flex align-items-tart gap-2'>
                                <span>1.10</span>
                                <span>You expressly acknowledge and agree that your use of the Services is at your sole risk and that the Services are provided “as is” and “as available”, and SHIPEASE at its discretion, will provide any customization or modification.</span>
                            </p>

                            <p className='d-flex align-items-tart gap-2'>
                                <span>1.11</span>
                                <span>You agree that this Agreement and the Services of SHIPEASE form a part of subject to any modification or be removed by SHIPEASE with change in government regulations, policies and local laws as applicable.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>2.</span>
                                <span>FEES AND PAYMENT</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.1</span><span>Subject to the provisions of this Agreement, the User will pay SHIPEASE the fees and other amounts set forth in this Agreement, or as otherwise agreed by the Parties.</span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.2</span>
                                <span>
                                    SHIPEASE may add new services for additional fees and charges or may proactively amend fees and charges for existing services, at any time in its sole discretion. Fees stated prior to the services being provided, as amended at SHIPEASE’s sole discretion from time to time, shall apply.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.3</span>
                                <span>
                                    If you purchase any subscription based paid service, you authorize SHIPEASE to charge you applicable fees at the beginning of every subscription period or at such intervals as applicable to the said service, and you authorize SHIPEASE make such modification to the fee structure as required and also agree to abide by such modified fee structure.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.4</span>
                                <span>
                                    You agree that the billing credentials provided by you for any purchases from SHIPEASE will be accurate and you shall not use billing credentials that are not lawfully owned by you.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.5</span>
                                <span>
                                    The User agrees to pay service fees and other fees applicable to User’s use of Services or any other services which are beyond the scope of the Services and/or this Agreement, and the User shall not (directly or indirectly) circumvent the fee structure.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.6</span>
                                <span>
                                    The User is solely responsible for payment of all taxes, legal compliances, and statutory registrations and reporting under applicable law. SHIPEASE is in no way responsible for any of the User’s taxes or legal or statutory compliances.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.7</span>
                                <span>
                                    Unless otherwise specified, all fees shall be exclusive of taxes, and Goods and Service tax and other statutory taxes, as applicable, shall be levied on every purchase/Service.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.8</span>
                                <span>
                                    The payment process would be considered to be complete only on receipt of full fees and all other charges (as payable) into SHIPEASE’s designated bank account.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.9</span>
                                <span>
                                    If applicable, SHIPEASE shall raise an invoice for the Services and the freight amount (if payable) once in a calendar month (preferably end of the month). The invoice shall be available on the billing / payments section of the User’s dashboard on SHIPEASE platform.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.10</span>
                                <span>
                                    The User shall be required to clear the invoice within 7 (seven) days from the date of the invoice. Terms of payment for the pre-paid accounts have been specified in Clause 4 of <strong>Annexure-A</strong>.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.11</span>
                                <span>
                                    If the User fails to pay the full invoice amount in accordance with the time period mentioned above or any other amounts/charges payable under this Agreement by the due date, then SHIPEASE will have the right to: (i) retain (and subsequently adjust the outstanding amounts/charges within 30 days of retention from) the amounts received from the end customer of the User through the cash on delivery method (“<strong>COD Amount</strong>”), and/or (ii) retain the custody of (and subsequently dispose within 30 days of retention) the shipments of the User which are in the possession of SHIPEASE logistics vendor(s), and/or (iii) levy an interest of 18% per annum from the due date of payment, till such time that the User makes entire payment towards the invoice, and/or (iv) forfeit the security deposit amount of the User (if any) lying with SHIPEASE. Without being prejudice to the above, the User hereby agrees that it shall become liable to pay the freight charges (both forward and RTO charges) as soon as a shipment is picked up or is RTO initiated by the SHIPEASE courier vendor, and that SHIPEASE shall have a right to recover such freight charges from the User (for all the shipments which have been picked-up/shipped/RTO however which have not been invoiced) as per the various modes agreed under this Agreement, including but not limited to retaining/adjusting the COD Amounts for the shipments of the User.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.12</span>
                                <span>
                                    In the event the User closes its account with SHIPEASE, or this Agreement expires or is terminated, SHIPEASE will deduct the Fees and the freight amounts due to it from the User, from the COD Amount. SHIPEASE shall, thereafter, remit the remaining COD Amount after such deduction, within 10 (ten) days from the date of such closure/expiration/termination, subject to reconciliation and completion of all the shipments and transactions pertaining to the User/his account. In the event, the COD Amount falls short of the outstanding amount payable by the User, the User shall within 5 (five) days from the date of such closure/expiration/termination pay the outstanding amount to SHIPEASE, and until the payment of the entire outstanding amount, SHIPEASE shall retain the custody of (and subsequently dispose within 30 days of retention) the shipments of the User which are in the possession of SHIPEASE logistics vendor(s). In the event of any delay in payment of outstanding amount by the User (as required under this clause), SHIPEASE shall have a right to levy an interest of 18% per annum on the outstanding amount from the due date of payment till the date of actual payment and/or to forfeit the security deposit amount of the User (if any) lying with SHIPEASE.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.13</span>
                                <span>
                                    Save as otherwise stated in this Agreement, for any claims by the User regarding non- connectivity of the shipment (i.e. where the User is claiming that the shipment has been picked up but not connected) - the signed copy of the manifest sheet of the pick up against the disputed shipment has to be submitted along with the claim request by the User within 3 (three) days from the pickup date. Without the signed manifest any such request shall not be considered valid. The User agrees that in case of shipments booked under Cash on Delivery (“<strong>COD</strong>”), SHIPEASE logistics vendor shall deliver the shipment and collect cash from the customer, as per the details mentioned on the shipping label and remit/reimburse the amount to SHIPEASE which then would be remitted/reimbursed to the User as per Clause 3.7 of <strong>Annexure-A</strong>. In relation to the same, it is hereby clarified that: (i) the User engages SHIPEASE as an agent of the User for the purpose of collection of the COD amount; (ii) SHIPEASE may receive certain consideration (as mutually agreed) in lieu of such services as an agent; and (iii) SHIPEASE shall not have any title to the goods for which the COD amount will be collected. In this regard, the User agrees that SHIPEASE shall have the right to deduct the freight charges from the COD Amounts received by SHIPEASE, and then remit/reimburse the balance amount to the User. A reconciliation statement shall be uploaded via SHIPEASE detailing deliveries, COD amounts collected, and remittances. Any discrepancies must be raised within seven days of receipt of the statement.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.14</span>
                                <span>
                                    SHIPEASE may, from time to time, in its sole discretion, provide/allocate a credit limit to the User for the Services, which can be used by the User within a specified time period.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.15</span>
                                <span>
                                    SHIPEASE reserves the right to modify the fee structure by providing a notice, either on your dashboard or through email to the authorized User, which shall be considered as valid and agreed communication. Upon the User not communicating any negative response/objection to SHIPEASE to such notice, SHIPEASE shall apply the modified Fee structure.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.16</span>
                                <span>
                                    In order to process the fee payments, SHIPEASE might require details of User’s bank account, credit card number and other such financial information. Users shall be responsible to maintain the confidentiality of such information provided by Users.
                                </span>
                            </p>


                            <h5 className='d-flex align-items-start gap-3 mt-5 mb-3'>
                                <span>3.</span>
                                <span>LIABILITY</span>
                            </h5>
                            <p className='d-flex align-items-start gap-2'>
                                <span>3.1</span>
                                <span>
                                    SHIPEASE shall not be responsible or liable in any manner to the Users for any losses, damage, injuries or expenses incurred by the Users as a result of any action taken by SHIPEASE, where the User has consented for the same.
                                </span>
                            </p>
                            <p className='d-flex align-items-start gap-2'>
                                <span>3.2</span>
                                <span>
                                    SHIPEASE does not provide or make any representation, warranty or guaranty, express or implied about the Services. SHIPEASE does not verify any content or information provided by Users and to the fullest extent permitted by law disclaims all liability arising out of the User’s use or reliance upon the Services.
                                </span>
                            </p>
                            <p className='d-flex align-items-start gap-2'>
                                <span>3.3</span>
                                <span>
                                    Notwithstanding anything contrary provided in this Agreement, in no event, including but not limited to negligence, shall SHIPEASE, or any of its directors, officers, employees, agents or content or service providers (collectively, the “<strong>Protected Entities</strong>”) be liable for any direct, indirect, special, incidental, consequential, exemplary or punitive damages arising from, or directly or indirectly related to, the use of, or the inability to use, the Services or the content, materials and functions related thereto, User’s provision of information via the Services, lost business or lost sales, even if such Protected Entity has been advised of the possibility of such damages. In no event shall the total aggregate liability of the Protected Entities to a User for all damages, losses, and causes of action (whether in contract or tort, including, but not limited to, negligence or otherwise) arising from the terms and conditions of this Agreement or a User’s use of the Services shall exceed the amount as specified in Clause 8 of <strong>Annexure- A</strong>.
                                </span>
                            </p>
                            <p className='d-flex align-items-start gap-2'>
                                <span>3.4</span>
                                <span>
                                    In no event shall the Protected Entities be liable for failure on the part of the Users to provide agreed Services. In no event shall the Protected Entities be liable for any activity in relation to the Services provided to a User.
                                </span>
                            </p>
                            <p className='d-flex align-items-start gap-2'>
                                <span>3.5</span>
                                <span>
                                    The Protected Entities shall not be liable for any act or omission of any other person/ entity furnishing a portion of the Service, or from any act or omission of a third party, including those vendors participating in the Services, or for any unauthorized interception of your communications or other breaches of privacy attributable in part to the acts or omissions of the User or third parties, or for damages associated with the Service, or equipment that it does not furnish, or for damages that result from the operation of the User provided systems, equipment, facilities or services that are interconnected with the Service.
                                </span>
                            </p>
                            <p className='d-flex align-items-start gap-2'>
                                <span>3.6</span>
                                <span>
                                    SHIPEASE shall not be responsible for any loss (including loss of COD amounts) in case of forcible snatching by the buyer/customer of the User. Such incidents/cases shall be the sole responsibility of the User and the User is liable to initiate actions to resolve such incidents, if any, on its own, including but not limited to legal processes as well as to reimburse the losses (if any) to the concerned logistic vendor/its personnel.
                                </span>
                            </p>
                            <p className='d-flex align-items-start gap-2'>
                                <span>3.7</span>
                                <span>
                                    The User undertakes to resolve the disputes raised, if any, by the buyer(s) within a period of
                                    24 hours from the raising of such dispute(s). Failure to do so shall enable/authorise SHIPEASE to hold the COD remittance, till the time such dispute(s) is rectified by the User.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-3 mt-5 mb-3'>
                                <span>4.</span>
                                <span>GENERAL REPRESENTATIONS AND WARRANTIES</span>
                            </h5>

                            <div className='d-flex align-items-start gap-3'>
                                <span className='invisible'>4.1</span>
                                <div>Each Party represents and warrants to the other Party that:</div>
                            </div>

                            <div className='d-flex align-items-start gap-3'>
                                <span className='invisible'>4.2</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(a)</span>
                                    <span>
                                        it has all necessary rights, powers and authority to enter into and perform this Agreement; and
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-3'>
                                <span className='invisible'>4.2</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(b)</span>
                                    <span>
                                        the entrance and performance of this Agreement by it shall not violate any applicable law and shall not breach any agreement, covenant, court order, judgment or decree to which such Party or by which it is bound.
                                    </span>
                                </div>
                            </div>

                            <h5 className='d-flex align-items-start gap-3 mt-5 mb-3'>
                                <span>5.</span>
                                <span>INDEMNITY</span>
                            </h5>
                            <p className='d-flex align-items-start gap-2'>
                                <span>5.1</span>
                                <span>The User (“<strong>Indemnifying Party</strong>”) hereby agrees to indemnify, defend and hold SHIPEASE, its affiliates, officers, directors, employees, contractors, sub-contractors, consultants, licensors, other third party service providers, agents and representatives (“<strong>Indemnified Party</strong>”) harmless from and against claims, demands, actions, liabilities, costs, interest, damages and expenses of any nature whatsoever (including all legal and other costs, charges and expenses) incurred or suffered (directly or indirectly) by the Indemnified Party, on account of: (a) Indemnifying Party’s access to or use of Services; (b) violation of this Agreement or any terms of use of the Services by the Indemnifying Party (and/or its officers, directors and employees); (c) violation of applicable law by the Indemnifying Party (and/or its officers, directors and employees); (d) wrongful or negligent act or omission of the Indemnifying Party (and/or its officers, directors and employees); (e) any third party action or claim made against the Indemnified Party, by reason of any actions undertaken by the Indemnifying Party (and/or its officers, directors and employees); and (f) any duties, taxes, octroi, cess, clearance charges and any other charge/levy by whatsoever name called, levied on the shipments.</span>
                            </p>
                            <p className='d-flex align-items-start gap-2'>
                                <span>5.2</span>
                                <span>
                                    SHIPEASE will notify the User promptly of any such claim, loss, liability, or demand, and in addition to the User foregoing obligations, the User agrees to provide SHIPEASE with all reasonable assistance, at the User’s expense, in defending any such claim, loss, liability, damage, or cost.
                                </span>
                            </p>



                            <h5 className='d-flex align-items-start gap-3 mt-5 mb-3'>
                                <span>6.</span>
                                <span>COMPLIANCE WITH LAWS</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>6.1</span>
                                <span>
                                    Each Party shall at all times and at its/his/her own expense: (a) strictly comply with all applicable laws (including state, central and custom/international laws/statutes), now or hereafter in effect, relating to its/his/her performance of this Agreement; (b) pay all fees and other charges required by such applicable law; and (c) maintain in full force and effect all licenses, permits, authorizations, registrations and qualification from any authority to the extent necessary to perform its obligations hereunder.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-3 mt-5 mb-3'>
                                <span>7.</span>
                                <span>USE OF CONFIDENTIAL INFORMATION</span>
                            </h5>
                            <p className='d-flex align-items-start gap-2'>
                                <span>7.1</span>
                                <span>Each Party may be given access to Confidential Information from the other Party in order to perform its obligations under this Agreement. The Party that receives Confidential Information   shall be known as “<strong>Receiving Party</strong>”. The Party that discloses Confidential Information shall be known as “<strong>Disclosing Party</strong>”.</span>
                            </p>
                            <p className='d-flex align-items-start gap-2'>
                                <span>7.2</span>
                                <span>The Receiving Party acknowledges that the Confidential Information is received on a confidential basis, and that the Disclosing Party shall remain the exclusive owner of its Confidential Information and of Intellectual Property rights contained therein. No license or conveyance of any such rights to the Receiving Party is granted or implied under this Agreement.
                                </span>
                            </p>

                            <div className='d-flex align-items-start gap-2'>
                                <span>7.3</span>
                                <span>
                                    The Receiving Party shall:
                                </span>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>7.3</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(a)</span>
                                    <span>use the Confidential Information of the Disclosing Party only for purposes of complying with its obligations under this Agreement and, without limiting the generality of the foregoing, shall not, directly or indirectly, deal with, use, exploit or disclose such Confidential Information or any part thereof to any person or entity or for any purpose whatsoever (or in any manner which would benefit any competitor of the Disclosing Party) except as expressly permitted hereunder or unless and until expressly authorized to do so by the Disclosing Party;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>7.3</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(b)</span>
                                    <span>use reasonable efforts to treat, and to cause all its officers, agents, servants, employees, professional advisors and contractors and prospective contractors to treat, as strictly confidential all Confidential Information. In no event shall such efforts be less than the degree of care and discretion as the Receiving Party exercises in protecting its own valuable confidential information. Any contractors engaged by or prospective contractors to be engaged by the Receiving Party in connection with the performance of the Services shall be required to assume obligations of secrecy equal to or greater than the obligations that the Receiving Party has assumed in this Agreement with respect to the Confidential Information;</span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>7.3</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(c)</span>
                                    <span>not, without the prior consent of the Disclosing Party, disclose or otherwise make available the Disclosing Party’s Confidential Information or any part thereof to any party other than those of its directors, officers, agents, servants, employees, professional advisors, contractors or prospective contractors who need to know the Confidential Information for the purposes set forth herein;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>7.3</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(d)</span>
                                    <span>not copy or reproduce in any manner whatsoever the Confidential Information of the Disclosing Party or any part thereof without the prior written consent of the Disclosing Party, except where required for its own internal use in accordance with this Agreement; and
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>7.3</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(e)</span>
                                    <span>promptly, upon termination or expiration of this Agreement, to the extent possible, return and confirm the return of all originals, copies, reproductions and summaries of Confidential Information or, or at the option of the Disclosing Party, destroy and confirm the destruction of the Confidential Information (this sub-clause being applicable only on the User).</span>
                                </div>
                            </div>

                            <p className='d-flex align-items-start gap-2'>
                                <span>7.4</span>
                                <span>Provided, however that nothing herein shall restrict in any manner the ability of either Party to use or disclose Confidential Information owned by it in any manner whatsoever, and the obligations of confidentiality herein shall apply to each Party only to the extent that the Confidential Information or portion thereof is not owned by that particular Party.</span>
                            </p>

                            <h5 className='d-flex align-items-start gap-3 mt-5 mb-3'>
                                <span>8.</span>
                                <span>INTELLECTUAL PROPERTY RIGHTS</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span>8.1</span>
                                <span>
                                    The User acknowledges that the Intellectual Property rights in all the materials that have been developed by SHIPEASE and provided to the User, shall vest with SHIPEASE.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>8.2</span>
                                <span>
                                    The User hereby agrees and acknowledges that the Intellectual Property rights in all the material created and developed by the User, including any material created and developed by the User for the performance of Services under the terms of this Agreement, shall vest with SHIPEASE.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>8.3</span>
                                <span>
                                    All the Intellectual Property already developed and/or owned by each Party shall continue to vest with the concerned Party.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>8.4</span>
                                <span>
                                    The Parties recognize that all third-party Intellectual Property rights are the exclusive property of their respective owners.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-3 mt-5 mb-3'>
                                <span>9.</span>
                                <span>NON-SOLICITATION</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>9.1</span>
                                <span>The User agrees and undertakes that, during the term of this Agreement, and for a period of 36 (thirty-six) months thereafter, it shall not directly or indirectly attempt in any manner to solicit, any client/customer, or to persuade any person, firm or entity which is a client/customer/supplier/vendor/partner of SHIPEASE, to cease doing business or to reduce the amount of business which any such client/customer/supplier/vendor/partner has customarily done or might propose doing with SHIPEASE.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>10.</span>
                                <span>TERM AND TERMINATION</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span>10.1</span>
                                <span>This Agreement shall come into force on and from the date from which the User started procuring Services in any form or capacity, and shall remain in existence while the User is a user of any of the Services in any form or capacity, until terminated by either Party in accordance with the provisions of this Agreement.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>10.2</span>
                                <span>The User can request for termination of the Agreement at any time with a 30 (thirty) day prior written notice subject to the provisions in the annexure for the Services undertaken. During this notice period, SHIPEASE will investigate and ascertain the fulfilment of any ongoing Services and pending dues related to fees or any other amount payable by the User. The User shall be obligated to clear any dues with SHIPEASE for any of its Services which the User has availed in accordance with this Agreement. SHIPEASE shall not be liable to the User or any third party for any termination of User’s access to the Services.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>10.3</span>
                                <span>
                                    SHIPEASE reserves the right to immediately terminate this Agreement in cases where:
                                </span>
                            </p>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>10.3</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(a)</span>
                                    <span>
                                        the User breaches any terms and conditions of this Agreement;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>10.3</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(b)</span>
                                    <span>
                                        SHIPEASE believes in its sole discretion that the User’s actions may cause legal liability for such User or for SHIPEASE or are contrary to the terms of use of the Services, or terms of this Agreement; and
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>10.3</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(c)</span>
                                    <span>
                                        SHIPEASE deems fit for its own convenience, without providing any reason.
                                    </span>
                                </div>
                            </div>

                            <p className='d-flex align-items-start gap-2'>
                                <span>10.4</span>
                                <span>Once temporarily suspended, indefinitely suspended or terminated, the User shall not continue to use the Services under the same account, a different account or re-register under a new account, unless explicitly permitted by SHIPEASE.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>11.</span>
                                <span>MISUSE OF THE SERVICES</span>
                            </h5>
                            <p className='d-flex align-items-start gap-2'>
                                <span className="invisible">11.1</span>
                                <span>SHIPEASE may restrict, suspend or terminate the account of any User who abuses or misuses the Services. Misuse includes creating multiple or false profiles, infringing any Intellectual Property rights, violating any of the terms and conditions of this Agreement, or any other behaviour that SHIPEASE, in its sole discretion, deems contrary to its purpose. In addition, and without limiting the foregoing, SHIPEASE has adopted a policy of terminating accounts of Users who, in SHIPEASE’s sole discretion, are deemed to be repeat infringers of any terms of use even after being warned by it. In addition, SHIPEASE may also restrict, deactivate, suspend or terminate the account of any User upon the request/instructions of SHIPEASE courier vendor.</span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>12.</span>
                                <span>GOVERNING LAW AND DISPUTE RESOLUTION</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span>12.1</span>
                                <span>This Agreement shall be governed by the laws of India and subject to the Clause below, the courts of New Delhi shall have exclusive jurisdiction to determine any disputes arising out of, under, or in relation, to the provisions of this Agreement.</span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>12.2</span>
                                <span>Any dispute arising under this Agreement shall be settled by arbitration to be held in New Delhi in accordance with the (Indian) Arbitration and Conciliation Act, 1996, in the English language, and shall be heard and determined by a sole arbitrator appointed by SHIPEASE. The decision of the sole arbitrator shall be final, conclusive and binding on the Parties. Notwithstanding the foregoing, nothing contained herein shall be deemed to prevent either Party from seeking and obtaining injunctive and/or equitable relief from any court of competent jurisdiction</span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>13.</span>
                                <span>SEVERABILITY</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span className="invisible">13.1</span>
                                <span>The invalidity or unenforceability of any provision in this Agreement shall in no way affect the validity or enforceability of any other provision herein. In the event of the invalidity or unenforceability of any provision of this Agreement, the Parties will immediately negotiate in good faith to replace such a provision with another, which is not prohibited or unenforceable and has, as far as possible, the same legal and commercial effect as that which it replaces.</span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>14.</span>
                                <span>FORCE MAJEURE</span>
                            </h5>



                            <p className='d-flex align-items-start gap-2'>
                                <span>14.1</span>
                                <span>Neither Party shall be liable for any failure or delay in performance of any obligation, under this Agreement to the extent that such failure or delay is due to a Force Majeure Event. The Party having any such cause shall promptly notify the other Party about the nature of such cause and the expected delay.
                                </span>
                            </p>
                            <p className='d-flex align-items-start gap-2'>
                                <span>14.1</span>
                                <span>If, however, it is not feasible for a Party to prevent the occurrence of the Force Majeure Event as a result of which that Party is prevented from performing its obligation for more than 30 (thirty) days due to such Force Majeure Event (“Aggrieved Party”), the other Party may decide to release the Aggrieved Party from performing its obligation hereunder or may modify the relevant provisions of this Agreement affected by the Force Majeure Event so long as the Force Majeure Event continues, in order to enable the Aggrieved Party to perform its other obligations hereunder as so modified. However, in the event, Force Majeure Event continues for a period of more than 60 (sixty) days, the Aggrieved Party may terminate this Agreement with a notice to the other Party.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>15.</span>
                                <span>ENTIRE AGREEMENT, ASSIGNMENT AND SURVIVAL</span>
                            </h5>


                            <p className='d-flex align-items-start gap-2'>
                                <span>15.1</span>
                                <span>This Agreement, the annexures and any other documents entered into or delivered as contemplated in this Agreement herein sets out the entire agreement and understanding between the Parties with respect to the subject matter hereof. Unless otherwise decided by SHIPEASE, the annexures containing specific terms of use supersedes all general terms of the Agreement, previous letters of intent, heads of terms, prior discussions and correspondence exchanged between the Parties in connection with the Agreement referred to herein. Similarly, unless otherwise decided by SHIPEASE, the SOPs/SLAs issued in furtherance to this Agreement, shall supersedes the provisions of this Agreement and of the annexures.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>15.2</span>
                                <span>This Agreement and the rights and obligations herein shall not be assigned by the User, without the consent of SHIPEASE.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>15.3</span>
                                <span>The provisions which are by their nature, intended to survive the termination of this Agreement, shall survive the termination of this Agreement.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>16.</span>
                                <span>NO PARTNERSHIP OR AGENCY</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>16.1</span>
                                <span>Nothing in this Agreement (or any of the arrangements contemplated herein) shall be deemed to constitute a partnership between the Parties hereto, nor, except as may be expressly provided herein, constitute any Party as the agent of another Party for any purpose, or entitle any Party to commit or bind another Party in any manner.</span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>17.</span>
                                <span>WAIVERS AND REMEDIES</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>17.1</span>
                                <span>No failure or delay by the Parties in exercising any right or remedy provided by law under or pursuant to this Agreement shall impair such right or remedy or operate or be construed as a waiver or variation of it or preclude its exercise at any subsequent time and no single or partial exercise of any such right or remedy shall preclude any other or further exercise of it or the exercise of any other right or remedy. The rights and remedies of the Parties under or pursuant to this Agreement are cumulative, may be exercised as often as such Party considers appropriate and are in addition to its rights and remedies under the general laws of India.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>18.</span>
                                <span>SPECIFIC PERFORMANCE</span>
                            </h5>


                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>18.1</span>
                                <span>The Parties shall be entitled to seek and enforce specific performance of this Agreement, in addition to any other legal rights and remedies, without the necessity of demonstrating the inadequacy of monetary damages.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>19.</span>
                                <span>INDIRECT AND CONSEQUENTIAL LOSSES</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>19.1</span>
                                <span>Save as expressly provided otherwise in this Agreement, neither Party shall be liable under or in connection with this Agreement for any loss of income, loss of profits or loss of contracts, or for any indirect or consequential loss or damage of any kind, in each case howsoever arising and whether caused by tort (including negligence), breach of contract or otherwise.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>20.</span>
                                <span>CONTACT INFORMATION</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span>20.1</span>
                                <span>If any User has any question, issue, complaint regarding any of our Services, please contact our customer service at OPS@SHIPEASE.in
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>20.2</span>
                                <span>The User hereby agrees and provides his consent to receive communications, correspondences, updates, notifications, etc. from SHIPEASE through email, SMS, Whats-app and any other mode as agreed by the Parties from time to time. The Parties agree that the said communications, correspondences, updates, notifications, etc. will be legally binding on them.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>20.3</span>
                                <span>
                                    Notwithstanding anything provided contrary in this Agreement, the User hereby: (i) agrees that the User has voluntarily submitted the various KYC information and documents (including but not limited to Aadhaar card/OTP, PAN card, voter id, passport, driving license, GST certificate, income tax returns, entity details, etc.) and requisite information as required by SHIPEASE from time to time; (ii) provides his consent for verification of the information and documents submitted to SHIPEASE in order to establish its genuineness in the manner permitted by applicable laws; and (iii) provides his consent and further authorizes SHIPEASE to share his relevant details and documents (including but not limited to business/registered name(s), phone number(s), address(es), email-id(s), PAN card, bank account details, KYC documents, etc.) with the concerned entity for processing of insurance claims and with the concerned judicial authority, court, police, complainant, etc. (as the case may be) in the event of a complaint been filed against the User or dispute been raised in relation to the shipment(s) made by the User.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>21.</span>
                                <span>DEFINITIONS AND INTERPRETATION</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span>21.1</span>
                                <span><u>Definitions:</u> In this Agreement, including in the recitals hereof, the following words, expressions and abbreviations shall have the following meanings, unless the context otherwise requires:
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.1</span>
                                <span>“<strong>Confidential Information</strong>” means, with respect to each Party, any information or trade secrets, schedules, business plans including, without limitation, commercial information, financial projections, client information, administrative and/or organizational matters of a confidential/secret nature in whatever form which is acquired by, or disclosed to, the other Party pursuant to this Agreement, and includes any tangible or intangible non-public information that is marked or otherwise designated as ‘confidential’, ‘proprietary’, ‘restricted’, or with a similar designation by the disclosing Party at the time of its disclosure to the other Party, or is otherwise reasonably understood to be confidential by the circumstances surrounding its disclosure, but excludes information which: (i) is required to be disclosed in a judicial or administrative proceeding, or is otherwise requested or required to be disclosed pursuant to applicable law or regulation, and (ii) which at the time it is so acquired or disclosed, is already in the public domain or becomes so other than by reason of any breach or non-performance by the other Party of any of the provisions of this Agreement;
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.1</span>
                                <span>“<strong>Force Majeure Event</strong>” includes act of God, war, civil disturbance, strike, lockout, act of terrorism, flood, fire, explosion, epidemic/pandemic or legislation or restriction by any government or other authority, or any other similar circumstance beyond the control of any Party, which has the effect of wholly or partially suspending the obligations hereunder of the Party concerned; and
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.1</span>
                                <span>“<strong>Intellectual Property</strong>” means any patent, copyright, trademark, trade name, service mark, service name, brand mark, brand name, logo, corporate name, domain name, industrial design, any registrations and pending applications thereof, any other intellectual property right (including without limitation any know-how, trade secret, trade right, formula, computer program, software, database and data right) and any goodwill associated with the business.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>21.2</span>
                                <span><u>Interpretation:</u> Unless the context of this Agreement otherwise requires:
                                </span>
                            </p>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.2</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(a)</span>
                                    <span>heading and bold typeface are only for convenience and shall be ignored for the purpose of interpretation;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.2</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(b)</span>
                                    <span>other terms may be defined elsewhere in the text of this Agreement and, unless otherwise indicated, shall have such meaning throughout this Agreement;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.2</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(c)</span>
                                    <span>
                                        references to this Agreement shall be deemed to include any amendments or modifications to this Agreement, as the case may be;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.2</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(d)</span>
                                    <span>
                                        the terms “hereof", “herein”, “hereby”, “hereto” and derivative or similar words refer to this entire Agreement or specified Clauses of this Agreement, as the case may be;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.2</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(e)</span>
                                    <span>
                                        references to a particular section, clause, paragraph, sub-paragraph or schedule, exhibit or annexure shall be a reference to that section, clause, paragraph, sub- paragraph or schedule, exhibit or annexure in or to this Agreement;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.2</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(f)</span>
                                    <span>
                                        reference to any legislation or law or to any provision thereof shall include references to any such law as it may, after the date hereof, from time to time, be amended, supplemented or re-enacted, and any reference to statutory provision shall include any subordinate legislation made from time to time under that provision;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.2</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(g)</span>
                                    <span>
                                        a provision of this Agreement must not be interpreted against any Party solely on the ground that the Party was responsible for the preparation of this Agreement or that provision, and the doctrine of contra proferentem does not apply vis-à-vis this Agreement;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.2</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(h)</span>
                                    <span>
                                        references in the singular shall include references in the plural and vice versa; and
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>21.2</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(i)</span>
                                    <span>
                                        references to the word “include” shall be construed without limitation.
                                    </span>
                                </div>
                            </div>


                            <h5 className='text-center mt-5'>ANNEXURE-A</h5>
                            <h5 className='text-center mb-4'>SHIPEASE Service Specifications</h5>

                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>1.</span>
                                <span>Scope of Services</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.1</span>
                                <span>SHIPEASE is the author and owner of its logistics software and platform (being SHIPEASE platform), providing its Users an automated shipping panel services integrated with the courier vendors. The User agrees that SHIPEASE provides logistic services (for both domestic and international (cross national border) shipments) and it is the subcontracted logistic vendors of SHIPEASE who perform the actual pick-up and delivery of the shipments.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.2</span>
                                <span>The User agrees that the shipments shall be picked up by SHIPEASE’s logistics vendor from the Users’ locations as communicated to SHIPEASE at the time of your sign up.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.3</span>
                                <span>The tracking number and logistics vendor would be assigned by an automated process based on the pickup and delivery pin code and type of shipment.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.4</span>
                                <span>
                                    Users shall provide/display prominently on package the shipping label having full details of the order number, consignee details, product details, return address i.e. the shipping address and the gross value and collectable value (net value) to be collected in case of COD (Cash on Delivery) shipments. The SHIPEASE backend panel platform from SHIPEASE shall
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.5</span>
                                <span>
                                    User shall agree that the shipment to be handed over to the logistic vendor on the behalf of SHIPEASE is in a tamper proof packing of their brand.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.6</span>
                                <span>
                                    The User will be solely responsible to comply with all statutory requirements (State and Central Laws/Statutes) applicable in relation to booking and sale of the shipments carried and delivered by the logistics vendors of SHIPEASE in pursuance of this Agreement.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.7</span>
                                <span>
                                    It is expressly understood by the Parties that SHIPEASE is a mere service provider to the User and not in any other capacity whatsoever it may be called. It is further agreed to by the Parties that SHIPEASE is not performing any activity or job or providing service on behalf of the User which is tantamount to seller or retailer and or stockiest/distributor. The complete activity performed by SHIPEASE under this Agreement is based on specific instructions given by the User as part of the scope defined and from time to time.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.8</span>
                                <span>
                                    SHIPEASE reserves the right to provide web based (online) tracking solutions for all shipments through its logistics vendors.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>1.9</span>
                                <span>
                                    You agree that SHIPEASE’s logistics vendor, at the time of receiving the shipments from User, will use ‘Air Waybill’ provided to them by SHIPEASE through its logistics management software SHIPEASE. It is agreed between the Parties hereto that at all times for SHIPEASE and its logistics vendor, the ‘Consignor/ Shipper’ in the ‘Air Waybill’ shall be the User who is shipping the goods. It is clearly understood that SHIPEASE’s liability, if any, and to the extent agreed herein, shall extend only to User. The User shall be fully liable to its customers and neither SHIPEASE nor any of their logistics vendor, shall have any direct or indirect connection/ relationship or responsibility/obligation to User’s customers, in any manner whatsoever.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>1.10</span>
                                <span>
                                    User confirms that the User is fully aware of the items prohibited on SHIPEASE or SHIPEASE’s logistics vendor network for carriage and undertakes that no such prohibited items of shipment shall be handed over to SHIPEASE’s logistics vendors for carriage by its customers.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>1.11</span>
                                <span>
                                    User hereby agrees that it shall:
                                </span>
                            </p>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>1.11</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(a)</span>
                                    <span>not (directly or indirectly) use SHIPEASE Services/SHIPEASE platform while being in the capacity of a reseller, OTC (over the counter) or franchise of any courier/logistics company, including that of Blue Dart;</span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>1.11</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(b)</span>
                                    <span>use the Blue Dart account/services through SHIPEASE platform only for ecommerce sales related transactions; and
                                    </span>
                                </div>
                            </div>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>1.11</span>
                                <div className='d-flex align-items-start gap-2'>
                                    <span>(c)</span>
                                    <span>not already hold a Blue Dart account, since you understand that SHIPEASE is not authorized to offer Blue Dart services to sellers who already hold Blue Dart account.</span>
                                </div>
                            </p>

                            <div className='d-flex align-items-start gap-2'>
                                <span className='invisible'>1.12</span>
                                <span>
                                    In the event SHIPEASE believes that you have breached any of the above provision, then SHIPEASE would inter-alia have the right to deactivate the SHIPEASE account, retain the custody of (and subsequently dispose within 30 days of retention) your shipments and to levy damages/charges (along with the applicable GST amount and freight charges) of Rs. 1,00,000/- (Rupees One Lac only) per incident/shipment or of such other amount as decided by SHIPEASE in its sole discretion.
                                </span>
                            </div>

                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>2.</span>
                                <span>Obligation of the User</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.1</span>
                                <span>
                                    In the event SHIPEASE believes that you have breached any of the above provision, then SHIPEASE would inter-alia have the right to deactivate the SHIPEASE account, retain the custody of (and subsequently dispose within 30 days of retention) your shipments and to levy damages/charges (along with the applicable GST amount and freight charges) of Rs. 1,00,000/- (Rupees One Lac only) per incident/shipment or of such other amount as decided by SHIPEASE in its sole discretion.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.2</span>
                                <span>
                                    You agree that you shall use good quality tapes, duly engraved with your trademark/name, etc. and not generic tapes (i.e., brown/plain/transparent tape) for the packaging/sealing of the goods/shipments. In case generic tapes are used in the packaging/sealing of the goods/shipments, SHIPEASE shall have no responsibility of any kind, in case of pilferage/damaged/alteration/tapering/leakage etc. of the goods/shipments. In such a scenario, the entire responsibility shall be of the User.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.3</span>
                                <span>
                                    User shall be ready with the packed order when the courier person comes to receive the shipment, all pick-ups should be logged before the cut off time as directed by the customer support team of SHIPEASE, and no pick up beyond the cut-off time of the logistics vendor shall be possible. User agrees that they shall contact the Courier Company personnel for the pickup arrangements.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.4</span>
                                <span>
                                    User shall collect receipt(s) of the signed copy of the shipping manifest; it is the proof of handover of shipment to the courier companies.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.5</span>
                                <span>
                                    User shall strictly only use the automated system for generating the pickup and move the shipment only on the Airway Bill number generated from the SHIPEASE administration panel provided during signup by the User for shipping services. If the User moves the shipment through the physical shipping docket or physical airway bill number – then damages of Rs. 1000/- (Indian Rupees One Thousand) only shall be charged per airway bill number issued.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span className='invisible'>2.5</span>
                                <span>
                                    In addition, User shall not book/ship two or more shipments against a single AWB number or send multi packet shipments, and any breach of this condition by the User (whether intentional breach or not) shall give right to SHIPEASE to claim the concerned expenses (including the freight amount of all the shipments) and liquidated damages of upto Rs. 10,000/- per incident/shipment (and applicable GST amount) from the User. However, this restriction shall not be applicable if the User has activated MPS (multi packet shipments) services with SHIPEASE.

                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.6</span>
                                <span>
                                    User should insert the invoice in the package/shipment before handing over the shipment to the logistic vendor. The said invoice shall be in compliance with all the applicable laws (including GST related rules and regulations).
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.7</span>
                                <span>
                                    User shall agree that the Service is only for locations already registered on User’s user panel i.e. the orders will be picked by the courier companies from only such locations which have been registered by the User.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.8</span>
                                <span>
                                    User shall agree that in case of a reverse pick up of orders (only national orders), it shall be your responsibility, in case a reverse pick-up is requested by the User the same shall be charged the applicable fixed fee, additional to the reverse freight charges which are equal to the delivery freight charges as mentioned in the proposal.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>2.9</span>
                                <span>
                                    Not Used.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.10</span>
                                <span>
                                    User hereby agrees that it will not book / handover any good/shipment which is banned, restricted, illegal, prohibited, stolen or infringing of any third party rights, or which contains any cash, jewellery (excluding artificial jewellery), gold, silver, diamond, platinum, precious metals, precious stones, currency, bullion, financial and security instruments, or any reactive, hazardous or dangerous items/goods which are in breach of any applicable law or of any packaging/transportation guidelines of the concerned courier vendor; in which cases SHIPEASE shall not be liable for the delivery of any such products. Without prejudice to the generality of the aforesaid, an indicative list of the dangerous and restrictive goods is given at <strong>Annexure-B</strong>.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.11</span>
                                <span>
                                    In the event User hands over or provides the aforesaid goods/shipments to SHIPEASE/its courier vendor, then SHIPEASE/its courier vendor shall not be responsible and liable for any loss, damage, theft or misappropriation of such products even if service provider or delivery personnel has the knowledge of the same and even if such loss, damage, theft or misappropriation is caused due to any reason attributable to service provider or delivery personnel. The User undertakes that in the event any article/good/shipment booked/handed over by it falls within the category of the banned/illegal items or those described above (including reactive, hazardous and dangerous goods which are in breach of any applicable law or of any packaging/transportation guidelines of the concerned courier vendor), then the User agrees to indemnify SHIPEASE and its courier vendor for any and all issues, losses and damages arising pursuant thereto. In addition, SHIPEASE would inter-alia have the right to retain the custody of such shipments (including opening, inspecting and subsequently disposing of shipments within 30 days of retention) and to levy damages/charges (along with the applicable GST amount and freight charges) of Rs. 1,00,000/- (Rupees One Lac only) per incident/shipment or of such other amount as decided by SHIPEASE in its sole discretion.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span className='invisible'>2.11</span>
                                <span>
                                    In addition, you shall not handover counterfeit or fraud products/shipments to SHIPEASE/its courier vendor, failure of which will attract the consequences mentioned in <strong>Annexure-B</strong>. Further, the consequences of shipping non-essential items in Government prohibited areas and disputed shipments/cases have been specified in <strong>Annexure-B</strong>.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.12</span>
                                <span>
                                    Shipping of Documents: The User hereby agrees that if the User wishes to use the SHIPEASE platform for shipping documents/letters/likewise items, then the User shall use the said services only pursuant to agreeing with SHIPEASE the terms and conditions related to shipping of documents. In absence of the above-stated agreed terms, the said orders/shipments will be processed as per the then prevailing terms and conditions of SHIPEASE relating to shipping of documents.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.13</span>
                                <span>
                                    User understands, agrees and acknowledges that SHIPEASE through its logistics vendors is a mere bailee of the goods/products, cash and is not an insurer of the same. User hereby expressly and specifically waives all its rights and claims against SHIPEASE and its logistics vendors arising out of or in relation to the principles of insurance.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.14</span>
                                <span>
                                    In case of damaged/pilferaged/tempered/pressed/leaked shipment, receiver shall mention negative remarks on POD copy to get claim for the shipment. In the absence of any negative remarks on POD copy clearly stating such damage/pilferage/tampering/pressing/leakage, no claim shall be entertained by SHIPEASE at any point of time.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.15</span>
                                <span>
                                    Claims for any kind of damage/pilferage/tampering/leakage of the booked articles/goods/shipment shall be entertained only if the outer packaging done by the shipper is damaged/altered/tampered. However, if the outer packaging done by the shipper is intact and not tampered with, in such a case, no claim(s) for any damage/pilferage/tampering/leakage shall be entertained by SHIPEASE.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.16</span>
                                <span>
                                    SHIPEASE shall not entertain any dispute(s) regarding damage/pilferage/tampering/leakage/non- receipt of delivery/fake delivery shall be entertained by SHIPEASE, after a period of 48 hours from the receipt/delivery of the said article/goods/shipment. Further, SHIPEASE shall not entertain any request for providing the POD of a shipment, after a period of 72 hours from the delivery/RTO of the shipment.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.17</span>
                                <span>
                                    The User shall ensure that the correct and complete description of the destination/address as well as all the relevant information/details and documents (including but not limited to the e- way bill number and valid GST invoice) are mentioned/provided by the User while booking/handing over a shipment. In case any incomplete/incorrect information or documents are provided by the User, the shipment may be returned from origin and the shipping charges (both forward and RTO charges) shall be levied, in addition to any damages/taxes imposed by the statutory authorities, if any, in the transit of such shipment. Such charges shall be irreversible and no claim for the return of such charges shall be entertained by SHIPEASE. Further, in case of breach of this clause by creating multiple/duplicate accounts on the SHIPEASE platform, violating any of the terms and conditions of this Agreement, or any other behavior that SHIPEASE in its sole discretion deems suspicious, SHIPEASE would inter-alia have the right to levy damages/charges (along with the applicable GST amount) on the User of Rs. 1,00,000/- (Rupees One Lac only) per shipment or of such other amount as decided by SHIPEASE in its sole discretion.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>2.18</span>
                                <span>
                                    The User hereby agrees that, if the value of the good(s)/shipment(s) is greater than or equal to Rs. 50,000/- and where the requirement of e-way bill is mandatory, the User shall provide a valid e-way bill ( both for forward and/or RTO shipment) to SHIPEASE, within 7 days from the date of the good(s)/shipment(s) being shipped or marked as 'RTO Initiated' on User’s dashboard. In case the User fails to provide said e-way bill within the stipulated time period, then the concerned good(s)/shipment(s) may be marked as 'Disposed', and SHIPEASE and/or it’s courier vendor(s) shall not be held liable for any liability in relation thereto.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>3.</span>
                                <span>Fees</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span>3.1</span>
                                <span>The User hereby agrees that the applicable shipping rate will be charged as per the current prevailing rate mentioned on the live calculator link in Users admin panel.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>3.2</span>
                                <span>SHIPEASE reserves the right to apply other applicable charges over and above the shipping base rates and SHIPEASE service charge like COD charges and other fees are as on the live calculator link in Users admin panel.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>3.3</span>
                                <span>SHIPEASE has the right to make any changes in the rate mentioned on the live calculator link in Users admin panel and prevailing.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>3.4</span>
                                <span>Goods and Service tax and other taxes are applicable as per taxation law.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>3.5</span>
                                <span>Volumetric weight is calculated LxBxH/5000 for all courier companies. Other charges like address correction charges if applicable shall be charged extra. Dead/Dry weight or volumetric weight whichever is higher should be taken while calculating the rates.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>3.6</span>
                                <span>In case the declared weight differs and is less than the actual weight, then shipping charges will be revised to actual weight. You will be notified regarding such discrepancy in the weight (on the dashboard) and will be given 7 (seven) working days’ notice to either accept or reject the updated weight. In the event, you accept the updated weight the same will get billed and if you reject the updated weight the same will not get billed until the matter is rectified/resolved. Further, in case you do not accept or reject the updated weight, the same will be auto accepted in 7 (seven) working days’ time period. ‘Working Days’ in this clause shall mean days on which SHIPEASE is open for business, other than Saturday, Sunday and days declared by SHIPEASE as holidays.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span className='invisible'>3.6</span>
                                <span>In the event SHIPEASE believes that you are shipping (or have shipped) goods/shipments wherein the declared weight differs and is less than the actual weight, then SHIPEASE would inter-alia have the right to: (i) re-route the concerned shipment to a place determined by SHIPEASE; (ii) retain the custody of (and subsequently dispose within 30 days of retention) such shipments; and
                                    (iii) levy an penalty and collect the freight charges for the entire journey oftheshipment (including RTO charges for re-routing the shipment to the concerned placeandforward freight charges for shipping the shipment to the User/ User’s customer).
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span className='invisible'>3.6</span>
                                <span>In addition, in the event SHIPEASE believes that you are shipping (or have shipped) goods/shipments wherein the declared weight differs and is less than the actual weight by creating multiple/duplicate accounts on SHIPEASE platform, violating any of the terms and conditions of this Agreement, or any other behavior that SHIPEASE in its sole discretion deems suspicious, then SHIPEASE would inter-alia have the right to levy damages/charges (along with the applicable GST amount) on you of Rs. 1,00,000/- (Rupees One Lac only) per shipment or of such other amount as decided by SHIPEASE in its sole discretion.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>3.7</span>
                                <span>Save as otherwise agreed by the Parties, remittance of the COD amounts to the User shall be done within 8 (eight) days from the delivery date of the concerned shipment, subject to the remittance cycle being followed by SHIPEASE, which at-present is remittance on three days (Monday, Wednesday & Friday) in a week.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>3.8</span>
                                <span>The COD amount will not be paid or will have to be refunded by the User (if already paid) for the shipments which were originally booked on COD, however which were subsequently modified.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>3.9</span>
                                <span>In case the COD amount which is already remitted to the User due to wrong status (delivered) updated by courier vendor, the same amount shall be deducted from future COD payments. Further, in the event SHIPEASE is not able to remit the COD amount to the User within a period of 365 days from the due date, due to any reason which is not attributable to SHIPEASE (including incorrect bank details provided by the User), then the User hereby agrees to waive all its rights and claims against SHIPEASE and its logistics vendors arising out of or in relation to non- payment of the COD amount and SHIPEASE shall have an unconditional right to forfeit such unclaimed COD amount after the expiry of said 365 days.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span className='invisible'>3.9</span>
                                <span>Any queries in relation to COD remittance should be raised as a ticket on OPS@SHIPEASE.in.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>3.10</span>
                                <span>For any claims by the User the signed copy of the manifest sheet of the pick up against which the courier company has received the shipment has to be submitted along with the claim request. Without the signed manifest the request shall not be considered valid
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>4.</span>
                                <span>Terms of Payment for Prepaid Accounts</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span>4.1</span>
                                <span>User shall agree to deposit an amount in their respective account to use our Services as per the prepaid model. This Clause 4 shall be applicable only in case of pre-paid accounts.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>4.2</span>
                                <span>SHIPEASE reserves the right to activate your account, once the shipping credit has been made by the User.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>4.3</span>
                                <span>
                                    User shall agree that with the shipment weight, it will automatically get deducted from your credit weight. As per the norms of SHIPEASE logistics, you will be charged a minimum of 0.5 kgs (or in multiples) for your air shipping. Please note that the weight charges applied by the courier companies may differ but however such charges shall be adjusted in/from your SHIPEASE wallet limit on your SHIPEASE account after pick up of the shipment.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>4.4</span>
                                <span>
                                    SHIPEASE shall issue an invoice which will get auto adjusted (if applicable) against the credit in your account as the following conditions:
                                    <br />
                                    <br />
                                    (I) If the invoice amount is more than the credit in your account
                                    <br />
                                    <br />
                                    User shall agree that in case where the invoice amount is more than the credit in your account, the freight invoice will be marked as unpaid and it will constantly get reflected in you panel and invoice history. If you fail to pay the invoice amount, then the shipping will be suspended. To continue using SHIPEASE Services, you need to recharge your account for the unpaid invoice as well the new shipping limit.
                                    <br />
                                    <br />
                                    (II) If the invoice amount is less than the credit in your account.
                                    <br />
                                    <br />
                                    User shall agree that in case where the invoice amount raised is less than the credit in your account, the freight invoice amount will be automatically adjusted from your credit (if not already adjusted) and shall be marked as paid. The User shall then continue using SHIPEASE Services from the remaining credit amount. If as on the date of issuance of the invoice, freight invoice amount has already been the adjusted from the credit in your account, the invoice shall be generated with marked as paid.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>4.5</span>
                                <span>
                                    User shall agree that it will be your responsibility to verify the invoices and inform the SHIPEASE within 5 (five) working days in case of any disputes regarding the contents of the invoice.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>4.6</span>
                                <span>
                                    For any claims by the User like wrong freight being applied, Cash on Delivery missing, pilferage, in transit damage - the signed copy of the manifest sheet of the pick up against which the courier company has received the shipment has to be submitted along with the claim request. Without the signed manifest the request shall not be considered valid.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>4.7</span>
                                <span>
                                    If due to any reason (including but not limited to the reason of weight discrepancy), the balance amount of the User in the SHIPEASE wallet becomes negative, then SHIPEASE shall inter-alia have the right to hold/retain/adjust the COD Amounts for the shipments of the User.

                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>4.8</span>
                                <span>
                                    The credit balance in the SHIPEASE wallet shall be available for booking shipments only for a period of 3 years from the last shipment date. In case, the User does not book any shipment for a continuous period of 3 years, then SHIPEASE shall have an unconditional right to forfeit such credit balance in the SHIPEASE wallet after the expiry of 3 years from the last shipment date.

                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>4.9</span>
                                <span>
                                    The User can request SHIPEASE to refund the credit balance of the wallet. Any such refund request shall be subject to refund being made to the original source/mode of payment, standard time taken to process such refund and mandatorily providing of necessary KYC documents by the User to process the refund. Further, SHIPEASE reserves a right to: (i) deny any request to refund the credit balance to a source being different from the original source/mode of payment; (ii) levy a surcharge (as per its sole discretion) to refund the credit balance to a source being different from the original source/mode of payment; and/or (iii) levy appropriate damages/charges (as per its sole discretion) in case SHIPEASE is of the opinion that the wallet is being/has been used by the User for any unscrupulous/illegal activities or for purposes other than for payment to SHIPEASE.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-2 mt-5 mb-3'>
                                <span>4A.</span>
                                <span>Terms of Payment for Secured Postpaid Accounts with Rolling Credit</span>
                            </h5>

                            <p className='d-flex align-items-start gap-2'>
                                <span>4A.1</span>
                                <span>This Clause shall be applicable only in case of secured postpaid accounts with rolling credit, and not for normal prepaid accounts.</span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>4A.2</span>
                                <span>
                                    User agrees to recharge their account by clicking on “Buy Shipping Credit” and choose the amount according to your business needs and you can use this amount to ship through air and surface both.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>4A.3</span>
                                <span>SHIPEASE reserves the right to activate your account, once the shipping credit has been made by the User. Thereafter, SHIPEASE reserves the right to grant a rolling credit limit to the User on the basis of shipment shipped by User. If required, the User may increase its credit limit (over and above the limit granted by SHIPEASE) by recharging its account/wallet.</span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>4A.4</span>
                                <span>SHIPEASE reserves the right to adjust the used credit limit amount from the upcoming remittance of the User.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>4A.5</span>
                                <span>User shall agree that with the shipment weight, it will automatically get deducted from your credit weight. As per the norms of SHIPEASE logistics, you will be charged a minimum of 0.5 kgs (or in multiples) for your air shipping. Please note that the weight charges applied by the courier companies may differ but however such charges shall be adjusted in/from your SHIPEASE wallet limit on your SHIPEASE account after pick up of the shipment.</span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>4A.6</span>
                                <span> SHIPEASE shall issue an invoice which will get auto adjusted (if applicable) against the credit in your account as the following conditions:
                                    <br />
                                    <br />
                                    (I) If the invoice amount is more than the credit in your account
                                    <br />
                                    <br />
                                    User shall agree that in case where the invoice amount is more than the credit in your account, the freight invoice will be marked as unpaid and it will constantly get reflected in your panel and invoice history. If you fail to pay the invoice amount, then the shipping will be suspended. To continue using SHIPEASE Services, you need to recharge your account for the unpaid invoice as well the new shipping limit.
                                    <br />
                                    <br />
                                    (II) If the invoice amount is less than the credit in your account.
                                    <br />
                                    <br />
                                    User shall agree that in case where the invoice amount raised is less than the credit in your account, the freight invoice amount will be automatically adjusted from your credit (if not already adjusted) and shall be marked as paid. The User shall then continue using SHIPEASE Services from the remaining credit amount. If as on the date of issuance of the invoice, freight invoice amount has already been adjusted from the credit in your account, the invoice shall be generated with marked as paid.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>4A.7</span>
                                <span>User shall agree that it will be your responsibility to verify the invoices and inform the SHIPEASE within 5 (five) working days in case of any disputes regarding the contents of the invoice.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>4A.8</span>
                                <span>For any claims by the User like wrong freight being applied, Cash on Delivery missing, pilferage, in transit damage - the signed copy of the manifest sheet of the pick up against which the courier company has received the shipment has to be submitted along with the claim request. Without the signed manifest the request shall not be considered valid.</span>
                            </p>

                            <p className='d-flex align-items-start gap-2'>
                                <span>4A.9</span>
                                <span>If due to any reason (including but not limited to the reason of weight discrepancy), the balance amount of the User in the SHIPEASE wallet becomes negative, then SHIPEASE shall inter-alia have the right to hold/retain/adjust the COD Amounts for the shipments of the User.</span>
                            </p>

                            <p className='d-flex align-items-start gap-1'>
                                <span>4A.10</span>
                                <span>The credit balance in the SHIPEASE wallet shall be available for booking shipments only for a period of 3 years from the last shipment date. In case, the User does not book any shipment for a continuous period of 3 years, then SHIPEASE shall have an unconditional right to forfeit such credit balance in the SHIPEASE wallet after the expiry of 3 years from the last shipment date.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>5.</span>
                                <span>Returns/RTO of the Products</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span>5.1</span>
                                <span>SHIPEASE reserves the right to return to the User, the products/shipments which are not accepted by the customer for any reason whatsoever.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>5.2</span>
                                <span>SHIPEASE reserves the right to apply the RTO (return to origin) charges as per the prevailing rate mentioned on the live calculator link in User admin panel.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>5.3</span>
                                <span>You will ensure that such products are accepted at the location(s) specified by you and share the Airway bill number against which the shipment returned to the User</span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>5.4</span>
                                <span>In case of non-acceptance of the RTO shipment by the User or in case the User is not reachable for RTO shipment, SHIPEASE reserves the right to levy suitable demurrage/incidental charges for extended storage of such products for any period exceeding 7 (seven) business days from initiation of the returns and up to 45 (forty five) days from such date. In case of non-acceptance of the products beyond 10 (ten) days from the first RTO undelivered date/first RTO delivery attempt date, SHIPEASE has the right to dispose such products and the User will forfeit all claims in this regard towards the SHIPEASE also User will be required to pay charges for disposing the product, along with all other charges (including demurrage/incidental charges). Further in such a case, SHIPEASE shall inter- alia have the right to: (a) retain (and subsequently adjust the outstanding amounts/charges within 30 days of retention from) the COD Amounts of the defaulting User; and/or (b) retain the custody of (and subsequently dispose within 30 days of retention) the shipments of the defaulting User which are in the possession of SHIPEASE logistics vendor(s); and/or (c) forfeit the security deposit amount of the defaulting User (if any) lying with SHIPEASE.</span>
                            </p>

                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>6.</span>
                                <span>Reverse Pickups</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span>6.1</span>
                                <span>“Reverse Pickup” means collection of the products by SHIPEASE from the customer’s address as specified by the User and the delivery of such products at a location mutually agreed between the Parties.</span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>6.2</span>
                                <span>User shall agree that in case of a reverse pick up of orders, it shall be your responsibility, in case a reverse pick up is requested by the User, the same shall be charged additionally as per the then prevailing rates.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>6.3</span>
                                <span>SHIPEASE and SHIPEASE’s logistics vendors shall not be responsible for verifying the contents of the products handed over by the customer to it delivery personnel (i.e. (i) RTO shipment (viz. shipment which is returned in the same condition as originally dispatched by the User) and;
                                    (ii) closed box reverse pickup shipment (viz. shipment which is opened and subsequently packed by the Customer)) handed over by the Customer, except in case of open box reverse pickup shipments. The packaging of such products shall also be the sole responsibility of the customer. The packaging should be good enough to ensure no damage in transit. The sole responsibility of the contents of the packed consignment shall lie with the end customer. SHIPEASE and SHIPEASE’s logistics vendors shall be, in no way, responsible for any shortage or damage of such consignments unless the same is caused solely due to the
                                    gross negligence of SHIPEASE.
                                </span>
                            </p>

                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>7.</span>
                                <span>Cap on Shipment related Liability & other Claims</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span>7.1</span>
                                <span>Notwithstanding anything contrary contained in this Agreement, the maximum liability of SHIPEASE per shipment will be as follows: (i) Rs. 2,500/- (Indian Rupees Two Thousand Five Hundred Only) or the order value, whichever is lower, if the shipment was damage, lost & theft during forward journey; or (ii) Rs. 2,000/- (Indian Rupees Two Thousand Only) or 50% of the order value, whichever is lower, in case the shipment was damage, lost & theft during RVP (Reverse Pick up) journey; or (iii) Rs. 2,500/- (Indian Rupees Two Thousand Five Hundred Only) or 40% of the order value, whichever is lower, in case the shipment was damage, lost & theft during RTO journey, towards the User under this Agreement, provided that such claim is raised by the User within the timelines specified under this Agreement and, in any event, not later than thirty (30) days from the shipment pick up date - failing which the User forfeits and waves its rights for such claim. Any claims by the User should be submitted within the specified time period along with the copy of the signed shipping manifest.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span className='invisible'>7.1</span>
                                <span>In relation to the above, it is clarified that:
                                </span>
                            </p>

                            <div className='d-flex align-items-start gap-3'>
                                <span className='invisible'>7.1</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(a)</span>
                                    <span>in case of a claim under this Agreement by the User (due to any reason including damage, lost, theft, etc.), SHIPEASE shall only be liable to pay in accordance with (i), (ii) and
                                        (iii) above, except in cases where SHIPEASE has received a request from the User (within 7 days of the lost/damage declared date) for procuring certificate of facts (COF) from the concerned courier company. In such a case, SHIPEASE shall only be required to arrange the COF from the concerned courier company, and will not be liable to pay any compensation to the User;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-3'>
                                <span className='invisible'>7.1</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(b)</span>
                                    <span>the User may secure its shipments having a value of more than Rs. 2,500/- (Indian Rupee Two Thousand Five Hundred Only), by paying certain additional risk cover charges to SHIPEASE;
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-3'>
                                <span className='invisible'>7.1</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(c)</span>
                                    <span>in relation to claims for damage shipments, it is hereby clarified that the amount of compensation shall depend upon the quantum/percentage of damage as against the full product value of the shipment; and
                                    </span>
                                </div>
                            </div>

                            <div className='d-flex align-items-start gap-3'>
                                <span className='invisible'>7.1</span>
                                <div className='d-flex align-items-start gap-3'>
                                    <span>(d)</span>
                                    <span>the claim amount already credited to the User on account of incorrect status or shipment shall be refunded by the User (by way of deduction from User’s wallet, future COD amounts or otherwise) in case the concerned shipment has been traced and delivered/RTO delivered to the User.

                                    </span>
                                </div>
                            </div>

                            <p className='d-flex align-items-start gap-3'>
                                <span>7.2</span>
                                <span>
                                    The User agrees that all claims relating to: (i) damage/pilferage/tampering/leakage/fake delivery of the shipment must be notified to SHIPEASE in writing within forty-eight (48) hours of the delivery of shipment; and (ii) loss/theft of the shipment must be notified to SHIPEASE in writing within thirty (30) days of the shipment pickup date.
                                </span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span>7.3</span>
                                <span>
                                    It is hereby informed and agreed that SHIPEASE and/or its courier vendor(s) shall not be responsible for any damage to the shipments which include liquid or fragile items/products (including but not limited to liquid cosmetic, beauty products, perishable and glass items).

                                </span>
                            </p>



                            <h5 className='d-flex align-items-start gap-4 mt-5 mb-3'>
                                <span>8.</span>
                                <span>Termination</span>
                            </h5>

                            <p className='d-flex align-items-start gap-3'>
                                <span className='invisible'>8.1</span>
                                <span>SHIPEASE services stay active till 10 (ten) days from the date of the last unpaid invoice, the User shall be charged for the period for which the invoice has been raised. The User must request termination before the next billing cycle starts and/or the next invoice is generated, or the cancellation request does not count. There is no pro-rated refund of the remaining service period in the current billing cycle.</span>
                            </p>

                            <p className='d-flex align-items-start gap-3'>
                                <span className='invisible'>8.1</span>
                                <span>The customer can request for termination by an email to ops@SHIPEASE.in with the following information and request of termination:</span>
                            </p>
                            <div className='d-flex align-items-start gap-3'>
                                <span className='invisible'>8.1</span>
                                <div>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        <li>name of the User;</li>
                                        <li>name of the store & Company ID; and</li>
                                        <li>reason for termination.</li>
                                    </ul>
                                </div>
                            </div>

                            <h5 className='text-center mt-5'>ANNEXURE-B</h5>
                            <h5 className='text-center mb-4'>Indicative List</h5>

                            <p>Dangerous Goods</p>
                            <ol className='agreement-ol' type="a">
                                <li>Oil-based paint and thinners (flammable liquids)</li>
                                <li>Industrial solvents</li>
                                <li>Insecticides, garden chemicals (fertilizers, poisons)</li>
                                <li>Lithium batteries</li>
                                <li>Magnetized materials</li>
                                <li>Machinery (chain saws, outboard engines containing fuel or that have contained fuel)</li>
                                <li>Fuel for camp stoves, lanterns, torches or heating elements</li>
                                <li>Automobile batteries</li>
                                <li>Infectious substances</li>
                                <li>Any compound, liquid or gas that has toxic and/or infectious characteristics</li>
                                <li>Bleach</li>
                                <li>Flammable adhesives</li>
                                <li>Arms, ammunitions or any weapon with blade (including but not limited to air guns, flares, gunpowder, firework, knives, swords and antique weaponry)</li>
                                <li>Dry ice (Carbon Dioxide, Solid)</li>
                                <li>Any Aerosols, liquids and/or powders or any other flammable substances classified as Dangerous Goods for transport by Air</li>
                                <li>Alcohol</li>
                                <li>Tobacco and tobacco related products</li>
                                <li>Electronic cigarettes</li>
                                <li>Ketamine</li>
                            </ol>

                            <p className="mt-4">Restricted Items:</p>
                            <ol className='agreement-ol' type="a">
                                <li>Precious stones, gems and jewellery (including but not limited to antiques bullion (of any precious metal), diamonds, gold, silver, platinum, trophies related to animal hunting, semi-precious stones in any form (including bricks))</li>
                                <li>Uncrossed (bearer) drafts / cheque, currency and coins</li>
                                <li>Poison</li>
                                <li>Firearms, explosives and military equipment</li>
                                <li>Hazardous and radioactive material</li>
                                <li>Foodstuff and liquor</li>
                                <li>Any pornographic material</li>
                                <li>Any Hazardous chemical items (including but not limited to radioactive material, special chemicals, material, equipments and technologies (SCOMET) items, hazardous/chemical waste, corrosive items (acids), machines parts containing oil, grease, toner)</li>
                                <li>Any Plants and its related products (including but not limited to oxidizing substances, sand/soils/ores, sandalwood, wood, wood pulp, edible oils, de-oiled groundnut, endangered species of plants and its parts, asbestos)</li>
                                <li>Any Drugs and Medicines (including but not limited to cocaine, cannabis, LSD, morphine, opium, psychotropic substances, and such other drugs, poisonous goods, contraband (such as illegal/illicit and counterfeit drugs)</li>
                                <li>Any Animals and Human Body related items/product (including but not limited to live stock, cremated or disinterred human being’s remains, human being and any animal embryos, human being and any animal remains, human being and any animals corpses, organs/body parts of human being and any animals)</li>
                            </ol>


                            <h5 className='mt-5 mb-4'>Counterfeit or Fraud Products/Shipments:</h5>

                            <p>It is the policy of SHIPEASE to conduct all business activities in compliance with the rules and regulations applicable to the industry and laws of India, with the highest ethical standards. In this regard, SHIPEASE has a zero tolerance policy with respect to counterfeit or fraud products/shipments (including products/shipments which are misrepresented in their origin or quality, or which are fake, cloned, duplicate or likewise products/shipments).
                            </p>

                            <p>Accordingly, in the event SHIPEASE believes that you or any of your customer are shipping/selling (or have shipped) counterfeit or fraud product/shipment (including any counterfeit electronic product, not limited to mobile phones, smart watches and likewise products), SHIPEASE would inter-alia have the right:
                            </p>

                            <ol className='agreement-ol' type="i">
                                <li>to seize such product/shipment,</li>
                                <li>to report the incident to the appropriate government authority/police station,</li>
                                <li>to blacklist you/your customer from trading/doing business with SHIPEASE,</li>
                                <li>to levy liquidated damages of upto Rs. 10,000 per counterfeit/fraud shipment (amount and counterfeit/fraud shipment to be decided by SHIPEASE at its sole discretion) and applicable GST amount on said damages, on account of estimated legal expenses which will be spent by SHIPEASE or actual expenses in case the actual amount exceeds the above threshold of Rs.10,000/-,</li>
                                <li>to levy liquidated damages of upto Rs. 1,00,000 (and applicable GST amount on said damages) on you/your customer (amount to be decided by SHIPEASE at its sole discretion) on account of causing reputational and goodwill loss to SHIPEASE,</li>
                                <li>to levy/charge a “security deposit” of an appropriate amount (amount to be decided by SHIPEASE at its sole discretion) from you so as to cover any future losses which SHIPEASE may incur on account of counterfeit/fraud shipment made by you,</li>
                                <li>to block/retain/adjust the entire COD amount of yours/your customer lying with SHIPEASE/its courier vendor,</li>
                                <li>to seize all the products of yours/your customer lying with SHIPEASE/its courier vendor and also to dispose such products (without any intimation to you) after a period of 30 (thirty) days from the date of seizure; and/or</li>
                                <li>to forfeit the entire security deposit amount lying with SHIPEASE.</li>
                            </ol>

                            <h5 className='mt-5 mb-4'>Disputed Shipments/Cases:</h5>

                            <p>SHIPEASE, in its sole discretion, shall have the right to levy damages/charges (along with the applicable GST amount) on you in relation to shipments/cases which have been disputed by the courier companies, your customers or by any third party (including any governmental authority/department). The amount of said damages/charges shall be decided by SHIPEASE in its sole discretion and may vary from case to case.</p>


                            <h5 className='mt-5 mb-4'>Shipping Non-Essential Items in Government Prohibited Areas</h5>


                            <p>In the event SHIPEASE believes that you are shipping (or have shipped) non-essential items/products in the restricted/prohibited area (such as red and containment zone/area, as declared by the Central or the relevant State Governments of India), then SHIPEASE would inter-alia have the right to levy penalty or liquidated damages on you of Rs. 10,000 per shipment (along with applicable GST amount) on account of estimated legal expenses which will be spent by SHIPEASE and for causing of reputational and goodwill loss to SHIPEASE, or the actual damages/losses/expenses in case the actual amount exceeds the above minimum threshold of Rs.10,000/-, as may be determined at the sole discretion of SHIPEASE.</p>



                            <div className='agreement-sign-section mt-5'>
                                <div>
                                    <p>Authorised Signatory/Person: <span>{formData?.agreement_info?.name}</span></p>
                                    <p>Company Name: <span>{formData?.basic_info?.company_name}</span></p>
                                    <p>Company GST: <span>{formData?.basic_info?.gst_number}</span></p>
                                </div>
                                <div>
                                    <p>Place: <span>{formData?.agreement_info?.place}</span></p>
                                    <p>Date: <span>{moment(formData?.agreement_info?.date).format("YYYY-MM-DD")}</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="agreement-disclaimer">
                            <p>
                                Disclaimer: This is a system-generated document and does not require any physical attestation. The content of this agreement is electronically recorded and maintained by SHIPEASE TECHNOLOGIES PRIVATE LIMITED.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default VerifiedCustomer