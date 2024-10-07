import React, { useRef, useState } from 'react'
import './SellerProfilePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCopy } from '@fortawesome/free-solid-svg-icons'
import sellerProfileImage from '../../../../assets/image/sellerProfileImage.svg'
import { FaRegCopy } from "react-icons/fa";
import CustomTooltip from '../../CustomTooltip/CustomTooltip'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

const SellerProfilePage = ({ ViewProfile, setViewProfile, userData }) => {
    const textRef = useRef(null);
    const [copyText, setcopyText] = useState("Click to copy")

    const handleCopy = () => {
        if (textRef.current) {
            navigator.clipboard.writeText(textRef.current.innerText)
                .then(() => {
                    setcopyText("Copied")
                    setTimeout(() => {
                        setcopyText('Click to copy');
                    }, 3000);
                })
                .catch(err => {
                });
        }
    };

    const [image, setImage] = useState(sellerProfileImage); // State for the image URL


    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Programmatically click the file input
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result); // Update the image state with the uploaded image URL
            };

            reader.readAsDataURL(file); // Convert the file to a base64 URL
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
                            <img src={image} alt="" />
                            <button onClick={handleButtonClick}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className='sp-seller-name'>
                            <h4 className='mb-0'>{userData?.first_name} {userData?.last_name}</h4>
                            <div className='d-flex gap-2 align-items-center justify-content-center'>
                                <h6 ref={textRef} className='mb-0'>{userData?.code}</h6>
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
                            {userData?.first_name}
                        </div>
                        <div className='sp-data-field'>
                            <span>Last Name:</span>
                            {userData?.last_name}
                        </div>
                        <div className='sp-data-field'>
                            <span>Company GST:</span>
                            22***AHGB***
                        </div>
                        <div className='sp-data-field'>
                            <span>Company Name:</span>
                            {userData?.company_name}
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
                            NA
                        </div>
                    </div>
                </div>
            </section>
            <div onClick={() => setViewProfile(false)} className={`backdrop ${!ViewProfile && 'd-none'}`}></div>
        </>
    )
}

export default SellerProfilePage