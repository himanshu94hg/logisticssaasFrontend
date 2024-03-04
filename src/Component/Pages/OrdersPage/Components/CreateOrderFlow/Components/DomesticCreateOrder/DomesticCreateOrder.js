import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'react-toggle/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronUp, faChevronDown, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import moment from 'moment';
import { toast } from 'react-toastify';

const DomesticCreateOrder = () => {
    const totalSteps = 5;
    const navigation = useNavigate();
    const [step, setStep] = useState(1);
    const authToken = Cookies.get("access_token")
    const currentDate = moment().format("YYYY-MM-DD");
    const [activeTab, setActiveTab] = useState("All Orders");
    const [progressBarWidth, setProgressBarWidth] = useState('5%');

    const [formData, setFormData] = useState({
        order_details: {
            customer_order_number: '',
            invoice_amount: '',
            is_mps: false,
            warehouse_id: '',
            order_tag: '',
            payment_type: '',
            order_date: currentDate,
            order_type: "",
            channel: "custom",
            channel_id: null
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
            contact_code: "91"
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
            contact_code: "91"
        },
        other_details: {
            number_of_packets: 0,
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
                product_name: "",
                quantity: 1,
                unit_price: 0,
                product_category: "",
                weight: 0,
                sku: "",
                hsn_code: "hsn code",
                tax_rate: 0,
                product_discount: 0,
                hts_number: "",
                export_reference_number: ""
            }
        ],
    })

    console.log(formData, "this is billing address data")
    useEffect(() => {
        const updateProgressBarWidth = () => {
            const width = step > totalSteps ? '100%' : `${((step - 1) / totalSteps) * 100}%`;
            setProgressBarWidth(width);
        };
        updateProgressBarWidth();
    }, [step, totalSteps]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleFormSubmit = async () => {
        try {
            const response = await axios.post('http://dev.shipease.in:8083/orders-api/orders/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (response !== null) {
                if (response.status === 201) {
                    const responseData = response.data;
                    toast.success("Order Created successfully!")
                    navigation('/Orders');
                } else {
                    const errorData = response.data;
                    toast.error("Something went wrong!",errorData)
                }
            }
        } catch (error) {
            toast.error("Something went wrong!",error)
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

    const handleDateChange = (date, field) => {
        setFormData({
            ...formData,
            order_details: {
                ...formData.order_details,
                [field]: moment(date).format("YYYY-MM-DDTHH:mm:ssZ")
            }
        });
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
                                    onChange={(date) => { handleDateChange(date, "order_date") }}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={startOfMonth}
                                    maxDate={new Date()}
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
        setFormData(prevData => ({
            ...prevData,
            billing_details: {
                ...prevData.shipping_details,
                [field]: e.target.value
            }

        }));
    };

    // const handleChangeBilling = (e, field) => {
    //     setFormData(prevData => ({
    //         ...prevData,
    //         billing_details: {
    //             ...prevData.billing_details,
    //             [field]: e.target.value
    //         }

    //     }));
    // };
    const handleChangeBilling = (e, field) => {
        setFormData(prevData => ({
            ...prevData,
            billing_details: {
                ...prevData.billing_details,
                [field]: e.target.value,
                customer_name: e.target.name === 'customer_name' ? e.target.value : prevData.billing_details.customer_name
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
        const updatedProducts = [...formData.product_details];
        updatedProducts[index][field] = e.target.value;
        setFormData({ ...formData, product_details: updatedProducts });
    };

    const handleAddProduct = () => {
        setFormData({
            ...formData,
            product_details: [
                ...(formData.product_details || []),
                { product_name: '', order_type: 'Forward', price: '', product_qty: '1', sku: '', hsn_code: '', tax_rate: '', discount: '' },
            ],
        });
        setAddFieldsStates([...addFieldsStates, false]);
    };

    const handleRemoveProduct = (index) => {
        if (formData.product_details && formData.product_details.length > 1) {
            const updatedProducts = [...formData.products];
            updatedProducts.splice(index, 1);
            setFormData({ ...formData, product_details: updatedProducts });
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
        if (!formData.product_details || formData.product_details.length === 0) {
            handleAddProduct();
        } else {
            // Initialize addFieldsStates if it's not defined
            setAddFieldsStates((prevAddFieldsStates) =>
                prevAddFieldsStates.length === formData.product_details.length ? prevAddFieldsStates : Array(formData.product_details.length).fill(false)
            );
        }
    }, [formData.product_details]);

    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-4'>Product Details</h3>
                    {formData.product_details?.map((product, index) => (
                        <div key={index}>
                            {formData.product_details.length === 1 ? '' : ''}
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
                            {formData.product_details.length === 1 ? (<hr />) :
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

    const [finalWeight, setFinalWeight] = useState()

    const vol_data = formData.dimension_details.length * formData.dimension_details.breadth * formData.dimension_details.height / 5000;
    const chargedWeight = formData?.dimension_details.weight;

    useEffect(() => {
        if (vol_data && chargedWeight) {
            if (vol_data >= chargedWeight) {
                setFinalWeight(vol_data);
            } else {
                setFinalWeight(chargedWeight);
            }
        } else if (vol_data) {
            setFinalWeight(vol_data);
        } else if (chargedWeight) {
            setFinalWeight(chargedWeight);
        }
    }, [vol_data, chargedWeight]);


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
                                type="text" value={formData.order_details.invoice_amount} onChange={(e) => handleChangeOrder(e, 'invoice_amount')} />
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
                        <p>Charged Weight:&nbsp; {finalWeight} Kg</p>
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
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);

    const authToken = Cookies.get("access_token");
    const sellerData = Cookies.get("user_id");

    useEffect(() => {
        const fetchWarehouses = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://dev.shipease.in:8081/core-api/features/warehouse/?seller_id=${sellerData}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setWarehouses(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch warehouses. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        };

        fetchWarehouses();
    }, []);

    const handleRadioChange = (e) => {
        const selectedWarehouseId = parseInt(e.target.value);
        setFormData(prevFormData => ({
            ...prevFormData,
            order_details: {
                ...prevFormData.order_details,
                warehouse_id: selectedWarehouseId
            }
        }));
    };

    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-4'>Warehouse Details</h3>
                    <div className='warehouse-options mt-3'>
                        <div className="row">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                warehouses.map(warehouse => (
                                    <div key={warehouse.id} className="col-lg-4 col-md-6 mb-4 cursor-pointer">
                                        <label>
                                            <input
                                                type="radio"
                                                name="warehouse"
                                                value={warehouse.id}
                                                checked={formData.order_details.warehouse_id === warehouse.id}
                                                onChange={handleRadioChange}
                                            />
                                            <div className='d-flex h-100 flex-column justify-content-between'>
                                                <div>
                                                    <p className='warehouse-heading'>{warehouse.warehouse_name}</p>
                                                    <p className='warehouse-description'>{warehouse.address_line1}, near {warehouse.address_line2}, {warehouse.city}, {warehouse.state}, {warehouse.pincode}, {warehouse.country}</p>
                                                </div>
                                                <p className="warehouse-description font13 mt-3">Mobile: {warehouse.contact_number}</p>
                                            </div>
                                        </label>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end my-3'>
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default DomesticCreateOrder;