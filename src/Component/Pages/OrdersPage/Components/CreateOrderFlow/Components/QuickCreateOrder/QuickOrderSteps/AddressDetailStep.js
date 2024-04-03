import axios from 'axios';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

const AddressDetailStep = ({ onPrev, onNext, formData, setFormData ,errors,setErrors,isChecked,setIsChecked }) => {
    //const [isChecked, setIsChecked] = useState(true);
    const [BillingDetails, setBillingDetails] = useState(true);

   // const [errors, setErrors] = useState({});



    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleChangeShiping = (e, field) => {
        if (isChecked) {
            setFormData(prevData => ({
                ...prevData,
                shipping_details: {
                    ...prevData.shipping_details,
                    [field]: e.target.value,
                    landmark:e.target.value
                },
                billing_details: {
                    ...prevData.billing_details,
                    [field === "recipient_name" ? "customer_name" : field]: e.target.value,
                    landmark:e.target.value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                shipping_details: {
                    ...prevData.shipping_details,
                    [field]: e.target.value,
                    landmark:e.target.value
                }
            }));
        }
    };

    const handleChangeBilling = (e, field) => {
        setFormData(prevData => ({
            ...prevData,
            billing_details: {
                ...prevData.billing_details,
                [field]: e.target.value,
                landmark:e.target.value
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

    const handleCheckboxChange = () => {
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
                                country: postOffice.Country,
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
                                className={`input-field ${errors.address && 'input-field-error'}`}
                                placeholder="House/Floor No. Building Name or Street, Locality"
                                type="text" value={formData.shipping_details.address} onChange={(e) => handleChangeShiping(e, 'address')} />
                            {errors.address && <div className="custom-error">{errors.address}</div>}
                        </label>
                        {/* Pincode */}
                        <label className='col'>
                            <span>Pincode <span className='mandatory'>*</span></span>
                            <input
                                type="text"
                                ref={pincodeRef}
                                className={`input-field ${errors.pincode && 'input-field-error'}`}
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
                                Recipient Name
                                <input
                                    className={`input-field ${errors.billing_customer_name && 'input-field-error'}`}
                                    placeholder='Enter Recipient Name'
                                    type="text" value={formData.billing_details.customer_name ?? formData.shipping_details.recipient_name} onChange={(e) => handleChangeBilling(e, 'customer_name')} />
                            </label>
                            {errors.billing_customer_name && <div className="custom-error">{errors.billing_customer_name}</div>}

                            {/* Mobile Number with Country Code Select */}
                            <label className='col'>
                                Mobile Number
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
                                Address
                                <input
                                    className={`input-field ${errors.billing_address && 'input-field-error'}`}
                                    placeholder="House/Floor No. Building Name or Street, Locality"
                                    type="text" value={formData.billing_details.address} onChange={(e) => handleChangeBilling(e, 'address')} />
                                {errors.billing_address && <div className="custom-error">{errors.billing_address}</div>}
                            </label>
                            {/* Pincode */}
                            <label className='col'>
                                Pincode
                                <input
                                    type="text"
                                    ref={pincodeRef1}
                                    className={`input-field ${errors.billing_pincode && 'input-field-error'}`}
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