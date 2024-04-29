import axios from 'axios';
import 'react-toggle/style.css';
import { toast } from 'react-toastify';
import React, { useRef, useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom/dist';
import { useSelector } from 'react-redux';


export const AddressDetailStep = ({ onPrev, onNext, formData, setFormData, editErrors, seteditErrors }) => {
    const location = useLocation()
    const [isChecked, setIsChecked] = useState(() => {
        const savedCheckboxState = localStorage.getItem('isChecked');
        return savedCheckboxState ? JSON.parse(savedCheckboxState) : true;
    });
    const [BillingDetails, setBillingDetails] = useState(true);
    const { pathName } = useSelector(state => state?.authDataReducer)

    console.log(location, "this is a dummy data", pathName)

    const [errors, setErrors] = useState({});

    useEffect(() => {
        localStorage.setItem('isChecked', JSON.stringify(isChecked));
    }, [isChecked]);

    const validateFormData = () => {
        const newErrors = {};
        if (!formData.shipping_details.recipient_name) {
            newErrors.recipient_name = 'Recipient Name is required!';
        }
        if (!formData.shipping_details.mobile_number) {
            newErrors.mobile_number = 'Mobile Number is required!';
        } else if (!/^[0-9]{10}$/.test(formData.shipping_details.mobile_number)) {
            newErrors.mobile_number = 'Mobile Number should be 10 digits!';
        }
        if (!formData.shipping_details.address) {
            newErrors.address = 'Address is required!';
        }
        if (!formData.shipping_details.landmark) {
            newErrors.landmark = 'Landmark is required!';
        }
        if (!formData.shipping_details.pincode) {
            newErrors.pincode = 'Pincode is required!';
        } else if (!/^[0-9]{6}$/.test(formData.shipping_details.pincode)) {
            newErrors.pincode = 'Pincode should be 6 digits!';
        }
        if (!formData.shipping_details.city) {
            newErrors.city = 'City is required!';
        }
        if (!formData.shipping_details.state) {
            newErrors.state = 'State is required!';
        }
        if (!formData.shipping_details.country) {
            newErrors.country = 'Country is required!';
        }
        if (!isChecked) {
            if (!formData.billing_details.customer_name) {
                newErrors.billing_customer_name = 'Customer Name is required!';
            }
            if (!formData.billing_details.mobile_number) {
                newErrors.billing_mobile_number = 'Mobile Number is required!';
            } else if (!/^[0-9]{10}$/.test(formData.billing_details.mobile_number)) {
                newErrors.billing_mobile_number = 'Mobile Number should be 10 digits!';
            }
            if (!formData.billing_details.address) {
                newErrors.billing_address = 'Address is required!';
            }
            if (!formData.billing_details.landmark) {
                newErrors.billing_landmark = 'Landmark is required!';
            }
            if (!formData.billing_details.pincode) {
                newErrors.billing_pincode = 'Pincode is required!';
            } else if (!/^[0-9]{6}$/.test(formData.billing_details.pincode)) {
                newErrors.billing_pincode = 'Pincode should be 6 digits!';
            }
            if (!formData.billing_details.city) {
                newErrors.billing_city = 'City is required!';
            }
            if (!formData.billing_details.state) {
                newErrors.billing_state = 'State is required!';
            }
            if (!formData.billing_details.country) {
                newErrors.billing_country = 'Country is required!';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onNextClicked = () => {
        if (validateFormData()) {
            onNext();
        }
    };



    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleChangeShiping = (e, field) => {
        if (isChecked) {
            setFormData(prevData => ({
                ...prevData,
                shipping_details: {
                    ...prevData.shipping_details,
                    [field]: e.target.value
                },
                billing_details: {
                    ...prevData.billing_details,
                    [field === "recipient_name" ? "customer_name" : field]: e.target.value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                shipping_details: {
                    ...prevData.shipping_details,
                    [field]: e.target.value
                },
                billing_details: {
                    ...prevData.billing_details,
                    [field]: e.target.value
                }
            }));
        }
    };
    
    const handleChangeBilling = (e, field) => {
        setFormData(prevData => ({
            ...prevData,
            billing_details: {
                ...prevData.billing_details,
                [field]: e.target.value
            }
        }));
    };
    
    const handleSelectShiping = (e, field) => {
        setFormData(prevData => ({
            ...prevData,
            shipping_details: {
                ...prevData.shipping_details,
                [field]: e.target.value
            }
        }));
    };

    const handleSelectBilling = (e, field) => {
        setFormData(prevData => ({
            ...prevData,
            billing_details: {
                ...prevData.billing_details,
                [field]: e.target.value
            }

        }));
    };

    /*const handleCheckboxChange = () => {
        const updatedIsChecked = !isChecked;
        setIsChecked(updatedIsChecked);
        if (updatedIsChecked) {
            setFormData(prevData => ({
                ...prevData,
                billing_details: {
                    ...prevData.billing_details,
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                billing_details: {
                    customer_name: '',
                    contact_code: '',
                    mobile_number: '',
                    email: '',
                    company_name: '',
                    address: '',
                    landmark: '',
                    pincode: '',
                    city: '',
                    state: '',
                    country: ''
                }
            }));
        }
    };*/
    const handleCheckboxChange = () => {
        const updatedIsChecked = !isChecked;
        setIsChecked(updatedIsChecked);
        if (updatedIsChecked) {
            setFormData(prevData => ({
                ...prevData,
                billing_details: {
                    customer_name: formData.shipping_details.recipient_name,
                    contact_code: formData.shipping_details.contact_code,
                    mobile_number: formData.shipping_details.mobile_number,
                    email: formData.shipping_details.email,
                    company_name: formData.shipping_details.company_name,
                    address: formData.shipping_details.address,
                    landmark: formData.shipping_details.landmark,
                    pincode: formData.shipping_details.pincode,
                    city: formData.shipping_details.city,
                    state: formData.shipping_details.state,
                    country: formData.shipping_details.country
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                billing_details: {
                    customer_name: '',
                    contact_code: '',
                    mobile_number: '',
                    email: '',
                    company_name: '',
                    address: '',
                    landmark: '',
                    pincode: '',
                    city: '',
                    state: '',
                    country: ''
                }
            }));
        }
    };
     
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const countryRef = useRef(null);

    const handlePincodeChange = () => {
        const pincode = pincodeRef.current.value;
        if (pincode.length < 6) {
            toast.error("Please enter a valid 6-digit pincode.")
            return;
        }

        axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => {
                if (response?.data[0]?.Message === "No records found") {
                    toast.error("Please enter valid pincode!")
                }
                if (response.data && response.data.length > 0) {
                    const data = response.data[0];
                    const postOffice = data.PostOffice[0];
                    setFormData(prevState => ({
                        ...prevState,
                        shipping_details: {
                            ...prevState.shipping_details,
                            city: postOffice.District,
                            state: postOffice.State,
                            country: postOffice.Country
                        }
                    }));
                    if (isChecked) {
                        setFormData(prevState => ({
                            ...prevState,
                            billing_details: {
                                ...prevState.billing_details,
                                city: postOffice.District,
                                state: postOffice.State,
                                country: postOffice.Country
                            }
                        }));
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const pincodeRef1 = useRef(null);
    const cityRef1 = useRef(null);
    const stateRef1 = useRef(null);

    const handlePincodeChange1 = () => {
        const pincode = pincodeRef1.current.value;

        if (pincode.length < 6) {
            toast.error("Please enter a valid 6-digit pincode.")
            return;
        }

        axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => {
                if (response?.data[0]?.Message === "No records found") {
                    toast.error("Please enter valid pincode!")
                }
                if (response.data && response.data.length > 0) {
                    const data = response.data[0];
                    const postOffice = data.PostOffice[0];
                    if (!isChecked) {
                        setFormData(prevState => ({
                            ...prevState,
                            billing_details: {
                                ...prevState.billing_details,
                                city: postOffice.District,
                                state: postOffice.State,
                                country: postOffice.Country
                            }
                        }));
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    const handleMobileNumberValidation = () => {
        const { mobile_number } = formData.shipping_details;
        if (mobile_number.length !== 10) {
            setErrors(prevErrors => ({
                ...prevErrors,
                mobile_number: "Mobile number must be 10 digits long"
            }));
        }
    };


    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    {/* Step 2 content */}
                    <h3 className='mb-4'>{pathName === "Reverse Order" ? "Pickup Details" : "Shipping Details"} </h3>
                    <div className='row gap-2'>
                        {/* Customer Name */}
                        <label className='col'>
                            <span>Recipient Name <span className='mandatory'>*</span></span>
                            <input
                                className={`input-field ${errors.recipient_name || editErrors?.recipient_name ? 'input-field-error' : ''}`}
                                placeholder='Enter Recipient Name'
                                maxLength={100}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
                                    if (
                                        e.key === ' ' &&
                                        e.target.value.endsWith(' ')
                                    ) {
                                        e.preventDefault();
                                    } else if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                type="text" value={formData.shipping_details.recipient_name}
                                onChange={(e) => handleChangeShiping(e, 'recipient_name')} />
                            {(errors.recipient_name || editErrors?.recipient_name) && <div className="custom-error">{errors.recipient_name || editErrors?.recipient_name}</div>}
                        </label>

                        {/* Mobile Number with Country Code Select */}
                        <label className='col'>
                            <span>Mobile Number <span className='mandatory'>*</span></span>
                            <div className='d-flex mobile-number-field'>
                                <select
                                    className='input-field'
                                    value={formData.shipping_details.contact_code}
                                    onChange={(e) => handleSelectShiping(e, 'contact_code')}
                                    disabled
                                >
                                    <option value="+91">+91</option>
                                    {/* Add more country codes as needed */}
                                </select>
                                <input
                                    className={`input-field ${errors.mobile_number || editErrors?.mobile_number ? 'input-field-error' : ''}`}
                                    type="text"
                                    value={formData.shipping_details.mobile_number}
                                    onChange={(e) => handleChangeShiping(e, 'mobile_number')}
                                    onBlur={handleMobileNumberValidation}
                                    placeholder='X X X X X X X X X X'
                                    maxLength={10}
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                            {(errors.mobile_number || editErrors?.mobile_number) && <div className="custom-error">{errors.mobile_number || editErrors?.mobile_number}</div>}
                        </label>
                    </div>
                    <div className='row mt-3 gap-2'>
                        <label className='col'>
                            <span>Email <span className='text-gray'>(optional)</span></span>
                            <input
                                className='input-field'
                                placeholder='i.e. abc@gmail.com'
                                type="email" value={formData.shipping_details.email} onChange={(e) => handleChangeShiping(e, 'email')} />
                        </label>
                        <label className='col'>
                            <span>Company Name <span className='text-gray'>(optional)</span></span>
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's Company Name"
                                maxLength={100}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
                                    if (
                                        e.key === ' ' &&
                                        e.target.value.endsWith(' ')
                                    ) {
                                        e.preventDefault();
                                    } else if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                type="text"
                                value={formData.shipping_details.company_name}
                                onChange={(e) => handleChangeShiping(e, 'company_name')} />
                        </label>
                    </div>

                    <hr />
                    <div className='row'>
                        {/* Address */}
                        <label className='col'>
                            <span>Address <span className='mandatory'>*</span></span>
                            <input
                                className={`input-field ${errors.address || editErrors?.address ? 'input-field-error' : ''}`}
                                placeholder="House/Floor No. Building Name or Street, Locality"
                                type="text" value={formData.shipping_details.address}
                                onChange={(e) => handleChangeShiping(e, 'address')}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
                                    if (
                                        e.key === ' ' &&
                                        e.target.value.endsWith(' ')
                                    ) {
                                        e.preventDefault();
                                    } else if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {(errors.address || editErrors?.address) && <div className="custom-error">{errors.address || editErrors?.address}</div>}
                        </label>
                    </div>
                    <div className='row mt-3'>
                        {/* Address 2 (Optional) */}
                        <label className='col'>
                            <span>Landmark <span className='mandatory'>*</span></span>
                            <input
                                className={`input-field ${errors.landmark || editErrors?.landmark ? 'input-field-error' : ''}`}
                                placeholder="Any nearby post office, market, Hospital as the landmark"
                                type="text"
                                value={formData.shipping_details.landmark}
                                onChange={(e) => handleChangeShiping(e, 'landmark')}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
                                    if (
                                        e.key === ' ' &&
                                        e.target.value.endsWith(' ')
                                    ) {
                                        e.preventDefault();
                                    } else if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {(errors.landmark || editErrors?.landmark) && <div className="custom-error">{errors.landmark || editErrors?.landmark}</div>}
                        </label>
                    </div>
                    <div className='row mt-3 gap-2'>
                        {/* Pincode */}
                        <label className='col'>
                            <span>Pincode <span className='mandatory'>*</span></span>
                            <input
                                type="text"
                                ref={pincodeRef}
                                className={`input-field ${errors.pincode || editErrors?.pincode ? 'input-field-error' : ''}`}
                                placeholder="Enter Recipient's Pincode"
                                onBlur={handlePincodeChange}
                                value={formData.shipping_details.pincode}
                                onChange={(e) => handleChangeShiping(e, 'pincode')}
                                maxLength={6}
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {(errors.pincode || editErrors?.pincode) && <div className="custom-error">{errors.pincode || editErrors?.pincode}</div>}
                        </label>

                        {/* City */}
                        <label className='col'>
                            <span>City  <span className='mandatory'>*</span></span>
                            <input
                                type="text"
                                ref={cityRef}
                                className={`input-field ${errors.city || editErrors?.city ? 'input-field-error' : ''}`}
                                placeholder="Enter Recipient's City"
                                value={formData.shipping_details.city}
                                onChange={(e) => handleChangeShiping(e, 'city')}
                            />
                            {(errors.city || editErrors?.city) && <div className="custom-error">{errors.city || editErrors?.city}</div>}
                        </label>
                    </div>
                    <div className='row mt-3 gap-2'>
                        {/* State */}
                        <label className='col'>
                            <span>State <span className='mandatory'>*</span></span>
                            <input
                                type="text"
                                ref={stateRef}
                                className={`input-field ${errors.state || editErrors?.state ? 'input-field-error' : ''}`}
                                placeholder="Enter Recipient's State"
                                value={formData.shipping_details.state}
                                onChange={(e) => handleChangeShiping(e, 'state')}
                            />
                            {(errors.state || editErrors?.state) && <div className="custom-error">{errors.state || editErrors?.state}</div>}
                        </label>

                        {/* Country */}
                        <label className='col'>
                            <span>Country  <span className='mandatory'>*</span></span>
                            <input
                                type="text"
                                ref={countryRef}
                                className={`input-field ${errors.country || editErrors?.country ? 'input-field-error' : ''}`}
                                placeholder="Enter Recipient's State"
                                value={formData.shipping_details.country}
                                onChange={(e) => handleChangeShiping(e, 'country')}
                            />
                            {(errors.country || editErrors?.country) && <div className="custom-error">{errors.country || editErrors?.country}</div>}
                        </label>
                    </div>
                </div>

                <div className='inputs-container mx-auto mb-3'>
                    {/* Checkbox to toggle billing address visibility */}
                    <div className='d-flex gap-2'>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={pathName === "Reverse Order" ? true : false}
                            onChange={handleCheckboxChange}
                            bydefaultChecked={true}
                        />
                        <label>Billing Address is the same as Shipping address</label>
                    </div>
                </div>
                {!isChecked && (
                    <div className={`inputs-container mx-auto mb-3 ${BillingDetails ? '' : 'd-none'}`}>
                        {/* Step 2 content */}
                        <h3 className='mb-4'>Billing Details</h3>
                        <div className='row gap-2'>
                            {/* Customer Name */}
                            <label className='col'>
                                <span> Recipient Name <span className='mandatory'>*</span></span>
                                <input
                                    placeholder='Enter Recipient Name'
                                    onChange={(e) => handleChangeBilling(e, 'customer_name')}
                                    className={`input-field ${errors.billing_customer_name || editErrors?.billing_customer_name ? 'input-field-error' : ''}`}
                                    type="text" value={formData.billing_details.customer_name ?? formData.shipping_details.recipient_name}
                                    onKeyPress={(e) => {
                                        const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
                                        if (
                                            e.key === ' ' &&
                                            e.target.value.endsWith(' ')
                                        ) {
                                            e.preventDefault();
                                        } else if (!allowedCharacters.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </label>
                            {(errors.billing_customer_name || editErrors?.billing_customer_name) && <div className="custom-error">{errors.billing_customer_name || editErrors?.billing_customer_name}</div>}

                            {/* Mobile Number with Country Code Select */}
                            <label className='col'>
                                <span>  Mobile Number<span className='mandatory'>*</span></span>
                                <div className='d-flex mobile-number-field'>
                                    <select
                                        className='input-field '
                                        value={formData.billing_details.contact_code}
                                        onChange={(e) => handleSelectBilling(e, 'contact_code')}
                                        disabled
                                    >
                                        <option value="+91">+91</option>
                                        {/* Add more country codes as needed */}
                                    </select>
                                    <input
                                        className={`input-field ${errors.billing_mobile_number || editErrors?.billing_mobile_number ? 'input-field-error' : ''}`}
                                        type="text"
                                        value={formData.billing_details.mobile_number}
                                        onChange={(e) => handleChangeBilling(e, 'mobile_number')}
                                        onBlur={handleMobileNumberValidation}
                                        placeholder='X X X X X X X X X X'
                                        maxLength={10}
                                        onKeyPress={(e) => {
                                            if (!/\d/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                                {(errors.billing_mobile_number || editErrors?.billing_mobile_number) && <div className="custom-error">{errors.billing_mobile_number || editErrors?.billing_mobile_number}</div>}
                            </label>
                        </div>
                        <div className='row mt-3'>
                            <label className='col'>
                                <span>Email <span className='text-gray'>(optional)</span></span>
                                <input
                                    className='input-field'
                                    placeholder='i.e. abc@gmail.com'
                                    type="email" value={formData.billing_details.email} onChange={(e) => handleChangeBilling(e, 'email')} />
                            </label>
                            <label className='col'>
                                <span>Company Name <span className='text-gray'>(optional)</span></span>
                                <input
                                    className='input-field'
                                    placeholder="Enter Recipient's Company Name"
                                    type="email" value={formData.billing_details.company_name}
                                    onChange={(e) => handleChangeBilling(e, 'company_name')}
                                    onKeyPress={(e) => {
                                        const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
                                        if (
                                            e.key === ' ' &&
                                            e.target.value.endsWith(' ')
                                        ) {
                                            e.preventDefault();
                                        } else if (!allowedCharacters.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </label>
                        </div>

                        <hr />
                        <div className='row'>
                            {/* Address */}
                            <label className='col'>
                                <span> Address<span className='mandatory'>*</span></span>
                                <input
                                    className={`input-field ${errors.billing_address || editErrors?.billing_address ? 'input-field-error' : ''}`}
                                    placeholder="House/Floor No. Building Name or Street, Locality"
                                    type="text" value={formData.billing_details.address}
                                    onChange={(e) => handleChangeBilling(e, 'address')}
                                    onKeyPress={(e) => {
                                        const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
                                        if (
                                            e.key === ' ' &&
                                            e.target.value.endsWith(' ')
                                        ) {
                                            e.preventDefault();
                                        } else if (!allowedCharacters.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {(errors.billing_address || editErrors?.billing_address) && <div className="custom-error">{errors.billing_address || editErrors?.billing_address}</div>}
                            </label>
                        </div>
                        <div className='row mt-3'>
                            {/* Address 2 (Optional) */}
                            <label className='col'>
                                <span> Landmark<span className='mandatory'>*</span></span>
                                <input
                                    className={`input-field ${errors.billing_landmark || editErrors?.billing_landmark ? 'input-field-error' : ''}`}
                                    placeholder="Any nearby post office, market, Hospital as the landmark"
                                    type="text" value={formData.billing_details.landmark}
                                    onChange={(e) => handleChangeBilling(e, 'landmark')}
                                    onKeyPress={(e) => {
                                        const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
                                        if (
                                            e.key === ' ' &&
                                            e.target.value.endsWith(' ')
                                        ) {
                                            e.preventDefault();
                                        } else if (!allowedCharacters.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {(errors.billing_landmark || editErrors?.billing_landmark) && <div className="custom-error">{errors.billing_landmark || editErrors?.billing_landmark}</div>}
                            </label>
                        </div>
                        <div className='row mt-3 gap-2'>
                            {/* Pincode */}
                            <label className='col'>
                                <span> Pincode<span className='mandatory'>*</span></span>
                                <input
                                    type="text"
                                    ref={pincodeRef1}
                                    className={`input-field ${errors.billing_pincode || editErrors?.billing_pincode ? 'input-field-error' : ''}`}
                                    placeholder="Enter Recipient's Pincode"
                                    onBlur={handlePincodeChange1}
                                    value={formData.billing_details.pincode}
                                    onChange={(e) => handleChangeBilling(e, 'pincode')}
                                    maxLength={6}
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {(errors.billing_pincode || editErrors?.billing_pincode) && <div className="custom-error">{errors.billing_pincode || editErrors?.billing_pincode}</div>}
                            </label>

                            {/* City */}
                            <label className='col'>
                                <span> City<span className='mandatory'>*</span></span>
                                <input
                                    type="text"
                                    ref={cityRef1}
                                    className={`input-field ${errors.billing_city || editErrors?.billing_city ? 'input-field-error' : ''}`}
                                    placeholder="Enter Recipient's City"
                                    value={formData.billing_details.city}
                                    onChange={(e) => handleChangeBilling(e, 'city')}
                                />
                                {(errors.billing_city || editErrors?.billing_city) && <div className="custom-error">{errors.billing_city || editErrors?.billing_city}</div>}
                            </label>
                        </div>
                        <div className='row mt-3 gap-2'>
                            {/* State */}
                            <label className='col'>
                                <span> State<span className='mandatory'>*</span></span>
                                <input
                                    type="text"
                                    ref={stateRef1}
                                    className={`input-field ${errors.billing_state || editErrors?.billing_state ? 'input-field-error' : ''}`}
                                    placeholder="Enter Recipient's State"
                                    value={formData.billing_details.state}
                                    onChange={(e) => handleChangeBilling(e, 'state')}

                                />
                                {(errors.billing_state || editErrors?.billing_state) && <div className="custom-error">{errors.billing_state || editErrors?.billing_state}</div>}
                            </label>

                            {/* Country */}
                            <label className='col'>
                                <span> Country<span className='mandatory'>*</span></span>
                                <input
                                    type="text"
                                    className={`input-field ${errors.billing_country || editErrors?.billing_country ? 'input-field-error' : ''}`}
                                    placeholder="Enter Recipient's Country"
                                    value={formData.billing_details.country}
                                    onChange={(e) => handleChangeBilling(e, 'country')}
                                />
                                {(errors.billing_country || editErrors?.billing_country) && <div className="custom-error">{errors.billing_country || editErrors?.billing_country}</div>}
                            </label>
                        </div>
                    </div>
                )}
            </div>
            <div className='d-flex justify-content-end my-3 cof-btn-container'>
                {/* Add three more input fields as needed */}
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onNextClicked}>Next</button>
            </div>
        </div>
    );
};
