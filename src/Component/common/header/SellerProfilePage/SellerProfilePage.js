import React, { useRef, useState } from 'react'
import './SellerProfilePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCopy } from '@fortawesome/free-solid-svg-icons'
import sellerProfileImage from '../../../../assets/image/sellerProfileImage.svg'
import { FaRegCopy } from "react-icons/fa";
import CustomTooltip from '../../CustomTooltip/CustomTooltip'

const SellerProfilePage = ({ ViewProfile, setViewProfile, userData }) => {
    const textRef = useRef(null);
    const [copyText, setcopyText] = useState("Click To Copy")

    const handleCopy = () => {
        if (textRef.current) {
            navigator.clipboard.writeText(textRef.current.innerText)
                .then(() => {
                    setcopyText("Copied")
                    setTimeout(() => {
                        setcopyText('Click to copy');
                    }, 5000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    };

    return (
        <>
            <section className={`seller-profile-section ${ViewProfile && 'open'}`}>
                <div id='sidepanel-closer' onClick={() => setViewProfile(false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div className='sp-header-sec'>
                    <div className='sp-wh-container'>
                        <div className='sp-image-container'>
                            <img src={sellerProfileImage} alt="" />
                        </div>
                        <div className='sp-seller-name'>
                            <h4 className='mb-0'>Himanshu Grover</h4>
                            <div className='d-flex gap-2 align-items-center justify-content-center'>
                                <h6 ref={textRef} className='mb-0'>SH0001</h6>
                                <CustomTooltip
                                    triggerComponent={<button className='btn copy-button' onClick={handleCopy}><FaRegCopy /></button>}
                                    tooltipComponent={copyText}
                                    addClassName='copytext-tooltip'
                                />
                            </div>
                        </div>
                        <div className='contact-email-sec mt-4'>
                            <p className='sp-phone'>Ph. {userData?.contact_number}</p>
                            <hr className='sp-middle-line' />
                            <p className='sp-email'>Email: {userData?.email || "xyz@gmail.com"}</p>
                        </div>
                    </div>
                    <div className='plan-info'>Active Plan: Pro</div>
                </div>
                <div className='sp-body-sec'>
                    <div className='sp-data-field-container'>
                        <div className='sp-data-field'>
                            <span>First Name:</span>
                            Himanshu
                        </div>
                        <div className='sp-data-field'>
                            <span>Last Name:</span>
                            Grover
                        </div>
                        <div className='sp-data-field'>
                            <span>Company GST:</span>
                            548155
                        </div>
                        <div className='sp-data-field'>
                            <span>Company Name:</span>
                            Shipease Technologies
                        </div>
                        <div className='sp-data-field'>
                            <span>Subscription Status:</span>
                            Active
                        </div>
                        <div className='sp-data-field'>
                            <span>Subscription Duration:</span>
                            NA
                        </div>
                        <div className='sp-data-field'>
                            <span>Renewal Date:</span>
                            NA
                        </div>
                        <div className='sp-data-field'>
                            <span>Tier:</span>
                            Bronze
                        </div>
                        <div className='sp-data-field'>
                            <span>Kam Name:</span>
                            Customer Support
                        </div>
                        <div className='sp-data-field'>
                            <span>Kam Email:</span>
                            ops@shipease.in
                        </div>
                        <div className='sp-data-field'>
                            <span>Kam Phone No:</span>
                            9876543210
                        </div>
                    </div>
                </div>
            </section>
            <div onClick={() => setViewProfile(false)} className={`backdrop ${!ViewProfile && 'd-none'}`}></div>
        </>
    )
}

export default SellerProfilePage