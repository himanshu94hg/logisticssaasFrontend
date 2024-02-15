import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'react-toggle/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronUp, faChevronDown, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const DomesticCreateOrder = () => {
    const navigation = useNavigate();
    const [step, setStep] = useState(1);
    const totalSteps = 5;

    const [formData, setFormData] = useState({
        order_details: {
            customer_order_number: '',
            invoice_amount: '',
            is_mps: true,
            warehouse_id: 1,
            seller_id: 3,
            order_tag: '',
            payment_type: '',
            order_date: '2024-01-22',
            order_type: "",
            Channel:''
        },
        shipping_details: {
            recipient_name: "",
            address: "",
            landmark: "",
            country: "India",
            state: "",
            city: "",
            pincode: "",
            mobile_number: "",
            email: "",
            company_name: "",
            contact_code: "4134"
        },
        billing_details: {
            customer_name: "",
            address: "",
            landmark: "",
            country: "India",
            state: "",
            city: "",
            pincode: "",
            mobile_number: "",
            email: "",
            company_name: "",
            contact_code: "4134"
        },
        other_details: {
            number_of_packets: 10,
            reseller_name: ""
        },
        charge_details: {
            cod_charges: '',
            shipping_charges: '',
            transaction_fee: '',
            is_gift_wrap: true
        },
        dimension_details: {
            weight: '',
            length: '',
            breadth: '',
            height: '',
            vol_weight: ''
        },
        product_details: [
            {
                product_name: "Iphone 15",
                quantity: 2,
                unit_price: 53.53,
                product_category: "Automotive",
                weight: 41.52,
                sku: "product_sku",
                hsn_code: "hsn code",
                tax_rate: 42.12,
                product_discount: 24.43,
                hts_number: "q4324",
                export_reference_number: "fadksjr"
            }
        ],
        products: [
            {
                product_name: "",
                order_type: "",
                price: "",
                product_qty: "1",
                sku: "",
                hsn_code: "",
                tax_rate: "",
                discount: ""
            }
        ],
    })

    const [progressBarWidth, setProgressBarWidth] = useState('5%');
    console.log("&&&&&&&&&&&&", formData)

    const [activeTab, setActiveTab] = useState("All Orders");


    useEffect(() => {
        const updateProgressBarWidth = () => {
            const width = step > totalSteps ? '100%' : `${((step - 1) / totalSteps) * 100}%`;
            setProgressBarWidth(width);
        };

        updateProgressBarWidth();
    }, [step, totalSteps]);

    const handleNext = () => {
        setStep(step + 1);
        console.log("################ step 1", formData.step1)
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const hardcodedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3OTkyNDk2LCJpYXQiOjE3MDczODc2OTYsImp0aSI6IjEzODE0YWE2ZjE2ZTQyNzk5NzhhNzAwZmY0MTM1YTZhIiwidXNlcl9pZCI6Mn0.neIQZnSs3vkyMxm0QrfIOpu_RTjDNz5j3vF-OPNNXTA'


    const handleFormSubmit = async () => {
        try {
            const response = await axios.post('http://65.2.38.87:8080/orders-api/orders/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': hardcodedToken
                }
            });
            console.log(response);
    
            // Check if response is not null
            if (response !== null) {
                if (response.status === 201) {
                    const responseData = response.data;
                    // Handle success response
                    console.log('API Response:', responseData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Created!',
                        text: 'You can view your Order in Orders Page.',
                        customClass: {
                            confirmButton: 'btn main-button', // Add your custom class here
                        },
                    }).then(() => {
                        // Redirect to another page after clicking OK
                        navigation('/Orders');
                    });
                } else {
                    // Handle error responses
                    const errorData = response.data;
                    console.error('API Error:', errorData);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Creating Order',
                        text: 'An error occurred while creating the order. Please try again.',
                        customClass: {
                            confirmButton: 'btn main-button', // Add your custom class here
                        },
                    });
                }
            } else {
                // Handle case where response is null
                console.error('No response received');
                Swal.fire({
                    icon: 'error',
                    title: 'Error Creating Order',
                    text: 'No response received from the server. Please try again later.',
                    customClass: {
                        confirmButton: 'btn main-button', // Add your custom class here
                    },
                });
            }
        } catch (error) {
            // Handle fetch error
            console.error('Fetch Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error Creating Order',
                text: 'An error occurred while creating the order. Please try again.',
                customClass: {
                    confirmButton: 'btn main-button', // Add your custom class here
                },
            });
        }
    };

    return (
        <div className="stepper-form-container">
            <div className='box-shadow shadow-sm p10 w-100 steps-header mb-4'>
                <div className="stepper-line mx-auto mb-3">
                    {/* Stepper line with markers for each step */}
                    <div className="step-marker">
                        <span className={`${step > 1 ? 'completed' : ''}`}>1</span>
                        Order Details
                    </div>
                    <div className="step-marker">
                        <span className={`${step > 2 ? 'completed' : ''}`}>2</span>
                        Shipping Details
                    </div>
                    <div className="step-marker">
                        <span className={`${step > 3 ? 'completed' : ''}`}>3</span>
                        Product Details
                    </div>
                    <div className="step-marker">
                        <span className={`${step > 4 ? 'completed' : ''}`}>4</span>
                        Package Details
                    </div>
                    <div className="step-marker">
                        <span className={`${step > 5 ? 'completed' : ''}`}>5</span>
                        Warehouse Details
                    </div>
                </div>
                <div className="progress-container">
                    {/* Manual Progress Bar */}
                    <div className="progress-bar" style={{ width: progressBarWidth }}></div>
                </div>
                <div className="progress-container">
                    {/* Manual Progress Bar */}
                    <div className="progress-bar" style={{ width: '5%' }}></div>
                </div>
            </div>

            <div className='w-100'>
                <div className=''>
                    {/* Steps */}
                    {step === 1 && (
                        <Step1
                            onNext={handleNext}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}
                    {step === 2 && (
                        <Step2
                            onPrev={handlePrev}
                            onNext={handleNext}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}
                    {step === 3 && (
                        <Step3
                            onPrev={handlePrev}
                            onNext={handleNext}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}
                    {step === 4 && (
                        <Step4
                            onPrev={handlePrev}
                            onNext={handleNext}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}

                    {step === 5 && (
                        <Step5
                            onPrev={handlePrev}
                            onSubmit={handleFormSubmit}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const Step1 = ({ onNext, formData, setFormData }) => {

    const [AddFields, SetAddFields] = useState(false)
    const [AddPayFields, SetAddPayFields] = useState(false)

    const handleChange = (e, field) => {
        const value = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            order_details: {
                ...prevData.order_details,
                [field]: value
            }
        }));
    };
    const handleChangeReseller = (e, field) => {
        const info = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            other_details: {
                ...prevData.other_details,
                [field]: info
            }
        }));
    };

    const handleChangeCharge = (e, field) => {
        const charge = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            charge_details: {
                ...prevData.charge_details,
                [field]: charge
            }
        }));
    };

    const handleSelectChange = (e, field) => {
        setFormData({
            ...formData,
            order_details: {
                ...formData.order_details,
                [field]: e.target.value
            }
        });
    };

    const handleToggleChange = (field) => {
        const charValue = formData[field] ? null : "1";
        setFormData({ ...formData, [field]: charValue });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, order_date: date });
    };

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const defaultDate = new Date();

    return (
        <>
            {/* Order Details Section */}
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-4'>Order Details</h3>
                    <div className='row'>
                        {/* Customer Order Number */}
                        <label className='col'>
                            Customer Order Number
                            <input
                                type="text"
                                className='input-field'
                                value={formData.order_details.customer_order_number}
                                onChange={(e) => handleChange(e, 'customer_order_number')}
                                placeholder='Enter Customer Order ID'
                            />
                        </label>
                    </div>
                    <div className='row mt-4'>

                        {/* Order Type */}
                        <label className='col'>
                            Order Type
                            <select
                                className='select-field'
                                value={formData.order_details.order_type}
                                onChange={(e) => handleSelectChange(e, 'order_type')}
                            >
                                <option >Select Order Type</option>
                                <option value="Forward">Forward</option>
                                <option value="Reverse">Reverse</option>
                            </select>
                        </label>
                        {/* Order Date with react-datepicker */}
                        <label className='col'>
                            Order Date
                            <div className="date-picker-container">
                                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                <DatePicker
                                    selected={formData.order_date || defaultDate}
                                    onChange={(date) => handleDateChange(date)}
                                    dateFormat="MM/dd/yyyy"
                                    minDate={startOfMonth}  // Set the minimum date to the start of the current month
                                    maxDate={new Date()}  // Set the maximum date to today
                                    className='input-field'
                                />
                            </div>
                        </label>

                        <label className='col'>
                            Order Channel
                            <select
                                className='select-field'
                                value={formData.order_details.Channel}
                                onChange={(e) => handleSelectChange(e, 'Channel')}
                            >
                                <option value="Custom">Custom</option>
                            </select>
                        </label>
                    </div>
                    <div className="row mt-4">
                        <p onClick={() => SetAddFields(!AddFields)} className='add-fields-text'>
                            <span>+ Add Order Tag, Reseller's </span>
                            <span className='text-gray'> (Optional)  <FontAwesomeIcon icon={AddFields ? faChevronUp : faChevronDown} /></span>
                        </p>
                    </div>

                    <div className={`row ${!AddFields ? 'd-none' : ''}`}>
                        <label className='col'>
                            Order Tag
                            <input
                                type="text"
                                className='input-field'
                                value={formData.order_details.order_tag}
                                onChange={(e) => handleChange(e, 'order_tag')}
                                placeholder='Enter Customer Order Tag'
                            />
                        </label>
                        <label className='col'>
                            Reseller Name
                            <input
                                type="text"
                                className='input-field'
                                value={formData.other_details.reseller_name}
                                onChange={(e) => handleChangeReseller(e, 'reseller_name')}
                                placeholder='Enter Reseller Name'
                            />
                        </label>
                    </div>
                    <hr />
                    <div className='row gap-2'>
                        {/* Payment Type */}
                        <label className='col'>
                            Payment Type
                            <select
                                className='select-field'
                                value={formData.order_details.payment_type}
                                onChange={(e) => handleSelectChange(e, 'payment_type')}
                            >
                                <option >Select Payment Type</option>
                                <option value="Prepaid">Prepaid</option>
                                <option value="COD">COD</option>
                            </select>
                        </label>
                        <div className='col d-flex gap-4'>
                            <label style={{ height: '54px' }}>
                                MPS
                                <div className="toggle-switch mt-1">
                                    <label className='col'>
                                        <input
                                            type="checkbox"
                                            checked={formData.shipment_type}
                                            onChange={() => handleToggleChange('shipment_type')}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </label>
                            <label style={{ width: '100%' }} className={`${formData.shipment_type === "1" ? '' : 'd-none'}`}>
                                Number of packets
                                <input
                                    type="number"
                                    className='input-field'
                                    value={formData.other_details.number_of_packets || '1'}
                                    onChange={(e) => handleChangeReseller(e, 'number_of_packets')}
                                />
                            </label>
                        </div>

                    </div>
                    <div className="row mt-4">
                        <p onClick={() => SetAddPayFields(!AddPayFields)} className='add-fields-text'>
                            <span>+ Add Shipping Charges, Gift Wrap, Transaction fee</span>
                            <span className='text-gray'> (Optional)  <FontAwesomeIcon icon={AddPayFields ? faChevronUp : faChevronDown} /></span>
                        </p>
                    </div>

                    <div className={`row ${!AddPayFields ? 'd-none' : ''}`}>
                        <label className='col'>
                            Shipping Charges
                            <input
                                type="text"
                                className='input-field'
                                value={formData.charge_details.shipping_charges}
                                onChange={(e) => handleChangeCharge(e, 'shipping_charges')}
                                placeholder='Enter Shipping Charges'
                            />
                        </label>
                        <label className='col'>
                            Gift Wrap
                            <input
                                type="text"
                                className='input-field'
                                value={formData.charge_details.gift_wrap}
                                onChange={(e) => handleChangeCharge(e, 'gift_wrap')}
                                placeholder='Yes / NO'
                            />
                        </label>
                        <label className='col'>
                            Transaction fee
                            <input
                                type="text"
                                className='input-field'
                                value={formData.charge_details.transaction_fee}
                                onChange={(e) => handleChangeCharge(e, 'transaction_fee')}
                                placeholder='Enter Transaction fee'
                            />
                        </label>
                    </div>
                    {/* <hr /> */}

                </div>
            </div>
            {/* Next Button */}
            <div className='d-flex justify-content-end my-3'>
                <button className='btn main-button' onClick={onNext}>
                    Next
                </button>
            </div>
        </>
    );
};

const Step2 = ({ onPrev, onNext, formData, setFormData }) => {
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

    const handleSelectChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const [isChecked, setIsChecked] = useState(true);
    const [BillingDetails, setBillingDetails] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (isChecked) {
            setFormData(prevData => ({
                ...prevData,
                billing_details: {
                    ...prevData.shipping_details,
                    customer_name: prevData.shipping_details.recipient_name
                }
            }));
        }
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
                                type="text" value={formData.shipping_details.pincode} onChange={(e) => handleChangeShiping(e, 'pincode')} />
                        </label>

                        {/* City */}
                        <label className='col'>
                            City
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's City"
                                type="text" value={formData.shipping_details.city} onChange={(e) => handleChangeShiping(e, 'city')} />
                        </label>
                    </div>
                    <div className='row mt-3 gap-2'>
                        {/* State */}
                        <label className='col'>
                            State
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's State"
                                type="text" value={formData.shipping_details.state} onChange={(e) => handleChangeShiping(e, 'state')} />
                        </label>

                        {/* Country */}
                        <label className='col'>
                            Country
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's State"
                                type="text" value={formData.shipping_details.country} onChange={(e) => handleChangeShiping(e, 'country')} />
                        </label>
                    </div>
                </div>

                <div className='inputs-container mx-auto mb-3'>
                    {/* Checkbox to toggle billing address visibility */}
                    <div className='d-flex gap-2'>
                        <input
                            type="checkbox"
                            checked={!isChecked}
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
                                Address
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
                                    type="text" value={formData.billing_details.pincode} onChange={(e) => handleChangeBilling(e, 'pincode')} />
                            </label>

                            {/* City */}
                            <label className='col'>
                                City
                                <input
                                    className='input-field'
                                    placeholder="Enter Recipient's City"
                                    type="text" value={formData.billing_details.city} onChange={(e) => handleChangeBilling(e, 'city')} />
                            </label>
                        </div>
                        <div className='row mt-3 gap-2'>
                            {/* State */}
                            <label className='col'>
                                State
                                <input
                                    className='input-field'
                                    placeholder="Enter Recipient's State"
                                    type="text" value={formData.billing_details.state} onChange={(e) => handleChangeBilling(e, 'state')} />
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

const Step3 = ({ onPrev, onNext, formData, setFormData }) => {
    const [addFieldsStates, setAddFieldsStates] = useState([]);

    const handleChange = (e, field, index) => {
        const updatedProducts = [...formData.products];
        updatedProducts[index][field] = e.target.value;
        setFormData({ ...formData, products: updatedProducts });
    };

    const handleAddProduct = () => {
        setFormData({
            ...formData,
            products: [
                ...(formData.products || []),
                { product_name: '', order_type: 'Forward', price: '', product_qty: '1', sku: '', hsn_code: '', tax_rate: '', discount: '' },
            ],
        });
        setAddFieldsStates([...addFieldsStates, false]);
    };

    const handleRemoveProduct = (index) => {
        if (formData.products && formData.products.length > 1) {
            const updatedProducts = [...formData.products];
            updatedProducts.splice(index, 1);
            setFormData({ ...formData, products: updatedProducts });
            const updatedAddFieldsStates = [...addFieldsStates];
            updatedAddFieldsStates.splice(index, 1);
            setAddFieldsStates(updatedAddFieldsStates);
        }
    };

    const handleToggleAddFields = (index) => {
        const updatedAddFieldsStates = [...addFieldsStates];
        updatedAddFieldsStates[index] = !updatedAddFieldsStates[index];
        setAddFieldsStates(updatedAddFieldsStates);
    };

    // Ensure at least one product is initially present
    useEffect(() => {
        if (!formData.products || formData.products.length === 0) {
            handleAddProduct();
        } else {
            // Initialize addFieldsStates if it's not defined
            setAddFieldsStates((prevAddFieldsStates) =>
                prevAddFieldsStates.length === formData.products.length ? prevAddFieldsStates : Array(formData.products.length).fill(false)
            );
        }
    }, [formData.products]);

    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-4'>Product Details</h3>
                    {formData.products?.map((product, index) => (
                        <div key={index}>
                            {formData.products.length === 1 ? '' : ''}
                            <div className='row'>
                                <label className='col'>
                                    Product Name
                                    <input
                                        className='input-field'
                                        placeholder="Enter or search your product name"
                                        type="text"
                                        value={product.product_name}
                                        onChange={(e) => handleChange(e, 'product_name', index)}
                                    />
                                </label>
                                <label className='col'>
                                    <span>Product Category <span className='text-gray'>(Optional)</span></span>
                                    <select
                                        className='select-field'
                                        value={product.order_type}
                                        onChange={(e) => handleChange(e, 'order_type', index)}
                                    >
                                        <option value="Arts, Crafts & Sewing">Arts, Crafts & Sewing</option>
                                        <option value="Automotive">Automotive</option>
                                        <option value="Baby Products">Baby Products </option>
                                        <option value="Clothing, Shoes & Jewelry">Clothing, Shoes & Jewelry </option>
                                        <option value="Collectibles & Fine Art">Collectibles & Fine Art </option>
                                        <option value="Electronics">Electronics </option>
                                        <option value="Handmade Products">Handmade Products </option>
                                        <option value="Health & Household">Health & Household</option>
                                        <option value="Home & Kitchen">Home & Kitchen</option>
                                        <option value="Industrial & Scientific">Industrial & Scientific </option>
                                        <option value="Office Products">Office Products </option>
                                        <option value="Patio, Lawn & Garden">Patio, Lawn & Garden</option>
                                        <option value="Pet Supplies">Pet Supplies</option>
                                        <option value="Sports & Outdoors">Sports & Outdoors </option>
                                        <option value="Tools & Home Improvement">Tools & Home Improvement</option>
                                        <option value="Toys & Games">Toys & Games</option>
                                    </select>
                                </label>
                            </div>
                            <div className='row mt-3'>
                                {/* SKU */}
                                <label className='col'>
                                    Unit Price
                                    <input
                                        className='input-field'
                                        placeholder="Enter Unit Price"
                                        type="text" value={product.price} onChange={(e) => handleChange(e, 'price', index)} />
                                </label>



                                {/* Quantity */}
                                <label className='col'>
                                    Quantity
                                    <input
                                        className='input-field'
                                        placeholder='Enter Product Quantity'
                                        type="text" value={product.product_qty} onChange={(e) => handleChange(e, 'product_qty', index)} />
                                </label>
                                {/* Quantity */}
                                {/* <label className='col'>
                            Product Category
                            <input
                                className='input-field'
                                placeholder='Enter Product Quantity'
                                type="number" value={formData.product_qty || '1'} onChange={(e) => handleChange(e, 'product_qty')} />
                        </label> */}



                                <label className='col-3'>
                                    SKU
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={product.sku}
                                        onChange={(e) => handleChange(e, 'sku', index)}
                                        placeholder='Enter SKU'
                                    />
                                </label>
                            </div>

                            <div className="row mt-3">

                            </div>
                            <div className='row mt-4'>
                                <p onClick={() => handleToggleAddFields(index)} className='add-fields-text'>
                                    <span>+ Add HSN Code, Tax Rate and Discount</span>
                                    <span className='text-gray'> (Optional) <FontAwesomeIcon icon={addFieldsStates[index] ? faChevronUp : faChevronDown} /></span>
                                </p>
                            </div>

                            <div className={`row optional-fields ${!addFieldsStates[index] ? 'height-0' : 'open'}`}>
                                <label className='col'>
                                    HSN Code
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={product.hsn_code}
                                        onChange={(e) => handleChange(e, 'hsn_code', index)}
                                        placeholder='Enter HSN Code'
                                    />
                                </label>

                                <label className='col'>
                                    Tax Rate
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={product.tax_rate}
                                        onChange={(e) => handleChange(e, 'tax_rate', index)}
                                        placeholder='Enter Tax Rate'
                                    />
                                </label>

                                <label className='col'>
                                    Discount
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={product.discount}
                                        onChange={(e) => handleChange(e, 'discount', index)}
                                        placeholder='Enter Product Discount'
                                    />
                                </label>
                            </div>
                            {formData.products.length === 1 ? (<hr />) :
                                (<>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button className='btn delete-btn' onClick={() => handleRemoveProduct(index)}>
                                            <FontAwesomeIcon icon={faTrashCan} title='Delete' />
                                        </button>
                                    </div>
                                    <hr className='mt-2' />
                                </>)}
                        </div>
                    ))}
                    <div className='d-flex justify-content-end'>
                        <div className='add-product-onclick' onClick={handleAddProduct}>
                            <FontAwesomeIcon icon={faPlus} /> Add Product
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end my-3'>
                {/* Add more input fields as needed */}
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onNext}>Next</button>

            </div>
        </div>
    );
};

const Step4 = ({ onPrev, onNext, formData, setFormData }) => {
    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleChangeOrder = (e, field) => {
        const value = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            order_details: {
                ...prevData.order_details,
                [field]: value
            }
        }));
    };
    const handleChangeCharge = (e, field) => {
        const charge = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            charge_details: {
                ...prevData.charge_details,
                [field]: charge
            }
        }));
    };

    const handleChangeDimension = (e, field) => {
        const charge = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            dimension_details: {
                ...prevData.dimension_details,
                [field]: charge
            }
        }));
    };

    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    {/* Step 4 content */}
                    <h3 className='mb-4'>Package Details</h3>
                    <div className='row'>
                        {/* Invoice Amount */}
                        <label className='col'>
                            Invoice Amount
                            <input
                                className='input-field'
                                type="text" value={formData.invoice_amount} onChange={(e) => handleChangeOrder(e, 'invoice_amount')} />
                        </label>

                        {/* COD Charges */}
                        <label className='col'>
                            COD Charges
                            <input
                                className='input-field'
                                type="text" value={formData.charge_details.cod_charges} onChange={(e) => handleChangeCharge(e, 'cod_charges')} />
                        </label>
                    </div>
                    <hr />
                    <div className=''>
                        <div className='fw-bold lh-base'>Dead Weight<br />
                            <input
                                className='input-field'
                                style={{ minWidth: '15    0px' }}
                                type="text" value={formData.dimension_details.weight}
                                onChange={(e) => handleChangeDimension(e, 'weight')} />
                            <br />
                            <span className="font12 fw-normal">Dead Weight is physical Weight
                            </span>
                        </div>
                        <label className='col'>

                        </label>
                    </div>
                    <div className='mt-4'>
                        <p className='fw-bold lh-base'>Volumetric Weight<br />
                            <span className="font12 fw-normal">Enter packages dimensions to calculate Volumetric Weight
                            </span>
                        </p>
                    </div>
                    <div className="row">

                        {/* Length (cm) */}
                        <label className='col'>
                            Length (cm)
                            <input
                                className='input-field'
                                type="text" value={formData.dimension_details.length}
                                onChange={(e) => handleChangeDimension(e, 'length')} />
                        </label>

                        {/* Breadth (cm) */}
                        <label className='col'>
                            Breadth (cm)
                            <input
                                className='input-field'
                                type="text" value={formData.dimension_details.breadth} onChange={(e) => handleChangeDimension(e, 'breadth')} />
                        </label>

                        {/* Height (cm) */}
                        <label className='col'>
                            Height (cm)
                            <input
                                className='input-field'
                                type="text" value={formData.dimension_details.height} onChange={(e) => handleChangeDimension(e, 'height')} />
                        </label>
                    </div>
                    <div className="volumetric-weight">
                        <p>Estimated Volumetric Weight &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {formData.dimension_details.length * formData.dimension_details.breadth * formData.dimension_details.height / 5000} Kg</p>
                    </div>

                </div>
            </div>
            <div className='d-flex justify-content-end my-3'>
                {/* Add more input fields as needed */}
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onNext}>Next</button>
            </div>
        </div>
    );
};

const Step5 = ({ onPrev, onSubmit, formData, setFormData }) => {
    const handleRadioChange = (e) => {
        setFormData({ ...formData, selectedWarehouse: e.target.value });
    };

    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    {/* Step 5 content */}
                    <h3 className='mb-4'>Warehouse Details</h3>

                    {/* Select Warehouse */}
                    Select Warehouse
                    <div className='warehouse-options mt-3'>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-4 cursor-pointer">
                                <label>
                                    <input
                                        type="radio"
                                        value="warehouse1"
                                        checked={formData.selectedWarehouse === 'warehouse1'}
                                        onChange={handleRadioChange}
                                    />
                                    <div>
                                        <div className='warehouse-heading'>WH Sarasvati Kunj</div>
                                        <p className='warehouse-description'> Plot 748,Sarasvati Kunj,Sector 53,Khatu Shyam Man ... </p>
                                        <p class="warehouse-description font13 mt-3">Mobile : 7011424112</p>
                                    </div>
                                </label>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 cursor-pointer">
                                <label>
                                    <input
                                        type="radio"
                                        value="warehouse2"
                                        checked={formData.selectedWarehouse === 'warehouse2'}
                                        onChange={handleRadioChange}
                                    />
                                    <div>
                                        <div className='warehouse-heading'>WH Sarasvati Kunj</div>
                                        <p className='warehouse-description'> Plot 748,Sarasvati Kunj,Sector 53,Khatu Shyam Man ... </p>
                                        <p class="warehouse-description font13 mt-3">Mobile : 7011424112</p>
                                    </div>
                                </label>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 cursor-pointer">
                                <label>
                                    <input
                                        type="radio"
                                        value="warehouse3"
                                        checked={formData.selectedWarehouse === 'warehouse3'}
                                        onChange={handleRadioChange}
                                    />
                                    <div>
                                        <div className='warehouse-heading'>WH Sarasvati Kunj</div>
                                        <p className='warehouse-description'> Plot 748,Sarasvati Kunj,Sector 53,Khatu Shyam Man ... </p>
                                        <p class="warehouse-description font13 mt-3">Mobile : 7011424112</p>
                                    </div>
                                </label>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 cursor-pointer">
                                <label>
                                    <input
                                        type="radio"
                                        value="warehouse4"
                                        checked={formData.selectedWarehouse === 'warehouse4'}
                                        onChange={handleRadioChange}
                                    />
                                    <div>
                                        <div className='warehouse-heading'>WH Sarasvati Kunj</div>
                                        <p className='warehouse-description'> Plot 748,Sarasvati Kunj,Sector 53,Khatu Shyam Man ... </p>
                                        <p class="warehouse-description font13 mt-3">Mobile : 7011424112</p>
                                    </div>
                                </label>
                            </div>
                            {/* Add more warehouse options as needed */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end my-3'>
                {/* Add more input fields as needed */}
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};


export default DomesticCreateOrder;
