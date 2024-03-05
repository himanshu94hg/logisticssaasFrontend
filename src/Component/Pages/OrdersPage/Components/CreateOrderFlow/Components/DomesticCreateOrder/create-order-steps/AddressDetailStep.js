import axios from 'axios';
import Swal from 'sweetalert2';
import 'react-toggle/style.css';
import React, {  useRef,useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';


export const AddressStep = ({ onPrev, onNext, formData, setFormData }) => {
    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleChangeShiping = (e, field) => {
        setFormData(prevData => ({
            ...prevData,
            shipping_details: {
                ...prevData.shipping_details,
                [field]: e.target.value
            }

        }));
        setFormData(prevData => ({
            ...prevData,
            billing_details: {
                ...prevData.shipping_details,
                [field]: e.target.value
            }

        }));
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
    // const handleChangeBilling = (e, field) => {
    //     setFormData(prevData => ({
    //         ...prevData,
    //         billing_details: {
    //             ...prevData.billing_details,
    //             [field]: e.target.value,
    //             customer_name: e.target.name === 'customer_name' ? e.target.value : prevData.billing_details.customer_name
    //         }
    //     }));
    // };
    
    

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

    const handleSelectChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const [isChecked, setIsChecked] = useState(true);
    const [BillingDetails, setBillingDetails] = useState(true);

    const handleCheckboxChange = () => {
        const updatedIsChecked = !isChecked;
        setIsChecked(updatedIsChecked);

        if (updatedIsChecked) {
            setFormData(prevData => ({
                ...prevData,
                billing_details: {
                    ...prevData.shipping_details,
                    customer_name: prevData.shipping_details.recipient_name
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                billing_details: {
                    ...prevData.billing_details,
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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid 6-digit pincode.',
                confirmButtonText: 'OK'
            });
            return;
        }

        axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => {
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
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No data found for the given pincode.',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const pincodeRef1 = useRef(null);
    const cityRef1 = useRef(null);
    const stateRef1 = useRef(null);
    const countryRef1 = useRef(null);

    const handlePincodeChange1 = () => {
        const pincode = pincodeRef1.current.value;

        if (pincode.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid 6-digit pincode.',
                confirmButtonText: 'OK'
            });
            return;
        }

        axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => {
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
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No data found for the given pincode.',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };


    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    {/* Step 2 content */}
                    <h3 className='mb-4'>Shipping Details</h3>
                    <div className='row'>
                        {/* Customer Name */}
                        <label className='col'>
                            Recipient Name
                            <input
                                className='input-field'
                                placeholder='Enter Recipient Name'
                                type="text" value={formData.shipping_details.recipient_name} onChange={(e) => handleChangeShiping(e, 'recipient_name')} />
                        </label>

                        {/* Mobile Number with Country Code Select */}
                        <label className='col'>
                            Mobile Number
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
                                    className='input-field'
                                    type="text"
                                    value={formData.shipping_details.mobile_number}
                                    onChange={(e) => handleChangeShiping(e, 'mobile_number')}
                                    placeholder='X X X X X X X X X X'
                                />
                            </div>
                        </label>
                    </div>
                    <div className='row mt-3'>
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
                                type="email" value={formData.shipping_details.company_name} onChange={(e) => handleChangeShiping(e, 'company_name')} />
                        </label>
                    </div>

                    <hr />
                    <div className='row'>
                        {/* Address */}
                        <label className='col'>
                            Address
                            <input
                                className='input-field'
                                placeholder="House/Floor No. Building Name or Street, Locality"
                                type="text" value={formData.shipping_details.address} onChange={(e) => handleChangeShiping(e, 'address')} />
                        </label>
                    </div>
                    <div className='row mt-3'>
                        {/* Address 2 (Optional) */}
                        <label className='col'>
                            Landmark
                            <input
                                className='input-field'
                                placeholder="Any nearby post office, market, Hospital as the landmark"
                                type="text" value={formData.shipping_details.landmark} onChange={(e) => handleChangeShiping(e, 'landmark')} />
                        </label>
                    </div>
                    <div className='row mt-3 gap-2'>
                        {/* Pincode */}
                        <label className='col'>
                            Pincode
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's Pincode"
                                type="text"
                                ref={pincodeRef}
                                value={formData.shipping_details.pincode}
                                onChange={(e) => handleChangeShiping(e, 'pincode')}
                                onBlur={handlePincodeChange}
                            />
                        </label>

                        {/* City */}
                        <label className='col'>
                            City
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's City"
                                type="text"
                                ref={cityRef}
                                value={formData.shipping_details.city}
                                onChange={(e) => handleChangeShiping(e, 'city')}
                            />
                        </label>
                    </div>
                    <div className='row mt-3 gap-2'>
                        {/* State */}
                        <label className='col'>
                            State
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's State"
                                type="text"
                                ref={stateRef}
                                value={formData.shipping_details.state}
                                onChange={(e) => handleChangeShiping(e, 'state')}
                            />
                        </label>

                        {/* Country */}
                        <label className='col'>
                            Country
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's State"
                                type="text"
                                ref={countryRef}
                                value={formData.shipping_details.country}
                                onChange={(e) => handleChangeShiping(e, 'country')}
                            />
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
                        <div className='row'>
                            {/* Customer Name */}
                            <label className='col'>
                                Recipient Name
                                <input
                                    className='input-field'
                                    placeholder='Enter Recipient Name'
                                    type="text" value={formData.billing_details.customer_name ?? formData.shipping_details.recipient_name} onChange={(e) => handleChangeBilling(e, 'customer_name')} />
                            </label>

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
                                        className='input-field'
                                        type="text"
                                        value={formData.billing_details.mobile_number}
                                        onChange={(e) => handleChangeBilling(e, 'mobile_number')}
                                        placeholder='X X X X X X X X X X'
                                    />
                                </div>
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
                                    type="email" value={formData.billing_details.company_name} onChange={(e) => handleChangeBilling(e, 'company_name')} />
                            </label>
                        </div>

                        <hr />
                        <div className='row'>
                            {/* Address */}
                            <label className='col'>
                                Addressss
                                <input
                                    className='input-field'
                                    placeholder="House/Floor No. Building Name or Street, Locality"
                                    type="text" value={formData.billing_details.address} onChange={(e) => handleChangeBilling(e, 'address')} />
                            </label>
                        </div>
                        <div className='row mt-3'>
                            {/* Address 2 (Optional) */}
                            <label className='col'>
                                Landmark
                                <input
                                    className='input-field'
                                    placeholder="Any nearby post office, market, Hospital as the landmark"
                                    type="text" value={formData.billing_details.landmark} onChange={(e) => handleChangeBilling(e, 'landmark')} />
                            </label>
                        </div>
                        <div className='row mt-3 gap-2'>
                            {/* Pincode */}
                            <label className='col'>
                                Pincode
                                <input
                                    className='input-field'
                                    placeholder="Enter Recipient's Pincode"
                                    type="text" value={formData.billing_details.pincode} onChange={(e) => handleChangeBilling(e, 'pincode')} ref={pincodeRef1} onBlur={handlePincodeChange1} />
                            </label>

                            {/* City */}
                            <label className='col'>
                                City
                                <input
                                    className='input-field'
                                    placeholder="Enter Recipient's City"
                                    type="text" value={formData.billing_details.city} onChange={(e) => handleChangeBilling(e, 'city')} ref={cityRef1} disabled />
                            </label>
                        </div>
                        <div className='row mt-3 gap-2'>
                            {/* State */}
                            <label className='col'>
                                State
                                <input
                                    className='input-field'
                                    placeholder="Enter Recipient's State"
                                    type="text" value={formData.billing_details.state} onChange={(e) => handleChangeBilling(e, 'state')} ref={stateRef1} disabled />
                            </label>

                            {/* Country */}
                            <label className='col'>
                                Country
                                <input
                                    className='input-field'
                                    placeholder="Enter Recipient's State"
                                    type="text" value={formData.billing_details.country} onChange={(e) => handleChangeBilling(e, 'country')} />
                            </label>
                        </div>
                    </div>
                )}
            </div>
            <div className='d-flex justify-content-end my-3'>
                {/* Add three more input fields as needed */}
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onNext}>Next</button>
            </div>
        </div>
    );
};
