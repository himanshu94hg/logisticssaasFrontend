import axios from "axios";
import Cookies from 'js-cookie';
import React, { useRef, useState } from 'react'
import './SellerProfilePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCopy } from '@fortawesome/free-solid-svg-icons'
import sellerProfileImage from '../../../../assets/image/sellerProfileImage.svg'
import { FaRegCopy } from "react-icons/fa";
import CustomTooltip from '../../CustomTooltip/CustomTooltip'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux'
import { awsAccessKey } from '../../../../config';
import { getFileData, uploadImageData } from '../../../../awsUploadFile';
import { customErrorFunction, customErrorPincode } from '../../../../customFunction/errorHandling';
import { BASE_URL_CORE } from "../../../../axios/config";

const SellerProfilePage = ({ ViewProfile, setViewProfile, userData, setlogoRefresh }) => {
    const textRef = useRef(null);
    const [copyText, setcopyText] = useState("Click to copy")
    const { planStatusData } = useSelector(state => state?.authDataReducer);
    const [logoError, setLogoError] = useState("");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        company_logo: "",
    });

    let authToken = Cookies.get("access_token")

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

    const [image, setImage] = useState(sellerProfileImage);


    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const validateFileSize = (file, maxSizeInMB) => {
        const fileSizeInMB = parseFloat((file?.size / (1024 * 1024)).toFixed(2));
        return fileSizeInMB <= maxSizeInMB;
    };

    const [logoUrl, setLogoUrl] = useState(""); // Initial value can be an empty string or null


    const handleImageUpload = async (e) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        const { name, value, type, files } = e.target;

        if (type === "file") {
            const fileInput = e.target;
            const newFile = files[0];

            const invalidFiles = [newFile].filter((file) => !allowedTypes.includes(file.type));
            if (invalidFiles.length > 0) {
                setError("JPG/JPEG/PNG files are allowed.");
                fileInput.value = "";
                return;
            }

            setError("");

            try {
                // Step 1: Get presigned URL from backend
                const responseData = await getFileData(`companyLogo/${newFile.name.replace(/\s/g, "")}`);
                const awsUrl = responseData.data.url.url;

                // Step 2: Upload the file to S3
                const formData = new FormData();
                formData.append('key', responseData.data.url.fields.key);
                formData.append('file', newFile);
                formData.append('AWSAccessKeyId', awsAccessKey);
                formData.append('policy', responseData.data.url.fields.policy);
                formData.append('signature', responseData.data.url.fields["x-amz-signature"]);

                const uploadResponse = await uploadImageData(awsUrl, formData);

                // Step 3: If upload successful, construct the image URL
                if (uploadResponse?.status === 204) {
                    const imageUrl = `${responseData?.data?.url?.url}companyLogo/${newFile?.name.replace(/\s/g, "")}`;
                    const tempData = {
                        company_logo: imageUrl
                    }

                    // Step 4: Update the backend with the uploaded image URL
                    const logoResponse = await axios.post(`${BASE_URL_CORE}/core-api/seller/update-seller-company-logo/`, tempData, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });
                    setlogoRefresh(new Date())

                    const result = await logoResponse.json();
                    if (logoResponse.ok) {
                        setLogoUrl(imageUrl); // Store the URL in your state or use it
                    } else {
                        console.error('Error updating logo:', result);
                    }
                }
            } catch (error) {
                console.error('Upload or API call failed:', error);
                setError("Error uploading file");
            }
        }
    };



    const storeImageUrlInAPI = async (imageUrl) => {
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/seller/update-seller-company-logo/`, imageUrl, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                console.log('Image URL stored successfully!');
            } else {
                console.error('Failed to store image URL.');
            }
        } catch (error) {
            console.error('Error storing image URL:', error);
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
                            <img src={userData?.company_logo} alt="" />
                            <button onClick={handleButtonClick}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={(e) => handleImageUpload(e, "file")}
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
                        {/* <div className='sp-data-field'>
                            <span>Company GST:</span>
                            22***AHGB***
                        </div> */}
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
                            {planStatusData?.dedicated_key_account_manager_for_tiers ? "Customer Support" : "XXXXXXXXXXX"}
                        </div>
                        <div className='sp-data-field'>
                            <span>Kam Email:</span>
                            {planStatusData?.dedicated_key_account_manager_for_tiers ? "ops@shipease.in " : "XXXXXXXXXXX"}
                        </div>
                        <div className='sp-data-field'>
                            <span>Kam Phone No:</span>
                            {planStatusData?.dedicated_key_account_manager_for_tiers ? "9599204236 " : "XXXXXXXXX"}
                        </div>
                    </div>
                </div>
            </section>
            <div onClick={() => setViewProfile(false)} className={`backdrop ${!ViewProfile && 'd-none'}`}></div>
        </>
    )
}

export default SellerProfilePage