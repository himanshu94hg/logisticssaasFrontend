import axios from 'axios';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

const AddressDetailStep = ({ formData, setFormData, errors, setErrors, isChecked, setIsChecked }) => {
    const [BillingDetails, setBillingDetails] = useState(true);

    const handleChangeShiping = (e, field) => {
        const value = e.target.value;
        setFormData(prevData => {
            const newFormData = {
                ...prevData,
                shipping_details: {
                    ...prevData.shipping_details,
                    [field]: value,

                }
            };
            if (isChecked) {
                newFormData.billing_details = {
                    ...prevData.billing_details,
                    [field === "recipient_name" ? "customer_name" : field]: value,

                };
            }
            return newFormData;
        });

        if (field === 'mobile_number') {
            if (value.length === 10) {
                setErrors(prevErrors => {
                    const { mobile_number, ...restErrors } = prevErrors;
                    return restErrors;
                });
            } else if (value.length > 0 && value.length !== 10) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    mobile_number: "Mobile Number should be 10 digits!"
                }));
            }
        }

        if (field === "pincode") {
            if (value.length === 6) {
                setErrors(prevErrors => {
                    const { pincode, ...restErrors } = prevErrors;
                    return restErrors;
                });
                axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`)
                    .then(response => {
                        if (response?.data[0]?.Message === "No records found") {
                            setErrors(prevErrors => ({
                                ...prevErrors,
                                pincode: "Please enter valid pincode!"
                            }));
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
                                    country: postOffice.Country,
                                    landmark: postOffice.District
                                }
                            }));
                            if (isChecked) {
                                setFormData(prevState => ({
                                    ...prevState,
                                    billing_details: {
                                        ...prevState.billing_details,
                                        city: postOffice.District,
                                        state: postOffice.State,
                                        country: postOffice.Country,
                                        landmark: postOffice.District
                                    }
                                }));
                            }
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
                    });

            } else if (value.length > 0 && value.length !== 6) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    pincode: "Pincode should be 6 digits!"
                }));
            }
        }
    };

    const handleChangeBilling = (e, field) => {
        const value = e.target.value;
        setFormData(prevData => ({
            ...prevData,
            billing_details: {
                ...prevData.billing_details,
                [field]: e.target.value,
            }
        })
        );
        if (field === 'mobile_number') {
            if (value.length === 10) {
                setErrors(prevErrors => {
                    const { billing_mobile_number, ...restErrors } = prevErrors;
                    return restErrors;
                });
            } else if (value.length > 0 && value.length !== 10) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    billing_mobile_number: "Mobile Number should be 10 digits!"
                }));
            }
        }

        if (field === "pincode") {
            if (e.target.value.length === 6) {
                setErrors(prevErrors => {
                    const { billing_pincode, ...restErrors } = prevErrors;
                    return restErrors;
                });

                axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`)
                    .then(response => {
                        if (response?.data[0]?.Message === "No records found") {
                            setErrors(prevErrors => ({
                                ...prevErrors,
                                billing_pincode: "Please enter valid pincode!"
                            }));
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
                        
                    });

            } else if (e.target.value.length > 0 && e.target.value.length !== 6) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    billing_pincode: "Pincode should be 6 digits!"
                }));
            }


        }
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

    return (
        <div>
            <div className='box-shadow p10 w-100'>
                <div className='inputs-container mx-auto mb-3'>
                    {/* Step 2 content */}
                    {/* <h3 className='mb-4'>Shipping Details</h3> */}
                    <div className='row gap-2'>
                        {/* Customer Name */}
                        <label className='col'>
                            <span>Recipient Name <span className='mandatory'>*</span></span>
                            <input
                                className={`input-field ${errors.recipient_name && 'input-field-error'}`}
                                placeholder='Enter Recipient Name'
                                maxLength={100}
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
                                type="text" value={formData.shipping_details.recipient_name} onChange={(e) => handleChangeShiping(e, 'recipient_name')} />
                            {errors.recipient_name && <div className="custom-error">{errors.recipient_name}</div>}
                        </label>

                        {/* Mobile Number with Country Code Select */}
                        <label className='col'>
                            <span>Mobile Number <span className='mandatory'>*</span></span>
                            <div className='d-flex mobile-number-field'>
                                <select
                                    className='input-field '
                                    value={formData.shipping_details.contact_code}
                                    onChange={(e) => handleSelectShiping(e, 'contact_code')}
                                    disabled
                                >
                                    <option value="+91">+91</option>
                                    {/* Add more country codes as needed */}
                                </select>
                                <input
                                    className={`input-field ${errors.mobile_number && 'input-field-error'}`}
                                    type="text"
                                    value={formData.shipping_details.mobile_number}
                                    onChange={(e) => handleChangeShiping(e, 'mobile_number')}
                                    placeholder='X X X X X X X X X X'
                                    maxLength={10}
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                            {errors.mobile_number && <div className="custom-error">{errors.mobile_number}</div>}
                        </label>
                    </div>
                    <div className='row mt-3'>
                        {/* Address */}
                        <label className='col'>
                            <span>Address <span className='mandatory'>*</span></span>
                            <input
                                maxLength={100}
                                onChange={(e) => handleChangeShiping(e, 'address')}
                                type="text" value={formData.shipping_details.address}
                                className={`input-field ${errors.address && 'input-field-error'}`}
                                placeholder="House/Floor No. Building Name or Street, Locality"
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
                            {errors.address && <div className="custom-error">{errors.address}</div>}
                        </label>
                        {/* Pincode */}
                        <label className='col'>
                            <span>Pincode <span className='mandatory'>*</span></span>
                            <input
                                type="text"
                                className={`input-field ${errors.pincode && 'input-field-error'}`}
                                placeholder="Enter Recipient's Pincode"
                                value={formData.shipping_details.pincode}
                                onChange={(e) => handleChangeShiping(e, 'pincode')}
                                maxLength={6}
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {errors.pincode && <div className="custom-error">{errors.pincode}</div>}
                        </label>
                    </div>
                </div>

                <div className='inputs-container mx-auto mb-3'>
                    {/* Checkbox to toggle billing address visibility */}
                    <div className='d-flex gap-2'>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
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
                                <span>Recipient Name <span className='mandatory'>*</span></span>
                                <input
                                    className={`input-field ${errors.billing_customer_name && 'input-field-error'}`}
                                    placeholder='Enter Recipient Name'
                                    type="text" value={formData.billing_details.customer_name ?? formData.shipping_details.recipient_name} onChange={(e) => handleChangeBilling(e, 'customer_name')} />
                                {errors.billing_customer_name && <div className="custom-error">{errors.billing_customer_name}</div>}
                            </label>

                            {/* Mobile Number with Country Code Select */}
                            <label className='col'>
                                <span> Mobile Number <span className='mandatory'>*</span></span>
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
                                        className={`input-field ${errors.billing_mobile_number && 'input-field-error'}`}
                                        type="text"
                                        value={formData.billing_details.mobile_number}
                                        onChange={(e) => handleChangeBilling(e, 'mobile_number')}
                                        placeholder='X X X X X X X X X X'
                                        maxLength={10}
                                        onKeyPress={(e) => {
                                            if (!/\d/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                                {errors.billing_mobile_number && <div className="custom-error">{errors.billing_mobile_number}</div>}
                            </label>
                        </div>
                        <div className='row mt-3'>
                            {/* Address */}
                            <label className='col'>
                                <span>Address <span className='mandatory'>*</span></span>
                                <input
                                    className={`input-field ${errors.billing_address && 'input-field-error'}`}
                                    placeholder="House/Floor No. Building Name or Street, Locality"
                                    type="text" value={formData.billing_details.address} onChange={(e) => handleChangeBilling(e, 'address')} />
                                {errors.billing_address && <div className="custom-error">{errors.billing_address}</div>}
                            </label>
                            {/* Pincode */}
                            <label className='col'>
                                <span>Pincode <span className='mandatory'>*</span></span>
                                <input
                                    type="text"
                                    className={`input-field ${errors.billing_pincode && 'input-field-error'}`}
                                    placeholder="Enter Recipient's Pincode"
                                    value={formData.billing_details.pincode}
                                    onChange={(e) => handleChangeBilling(e, 'pincode')}
                                    maxLength={6}
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {errors.billing_pincode && <div className="custom-error">{errors.billing_pincode}</div>}
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default AddressDetailStep