import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'react-toggle/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const QuickCreateOrder = () => {
    const navigation = useNavigate();
    const [step, setStep] = useState(1);
    const totalSteps = 5;
    const [formData, setFormData] = useState({
        step1: '',
        step2: '',
        step3: '',
        step4: '',
        step5: '',
        sameAsShipping: true,// New step added
    });
    const [progressBarWidth, setProgressBarWidth] = useState('5%');

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
        console.log(formData.step1)
    };

    const handlePrev = () => {
        setStep(step - 1);
    };



    const handleFormSubmit = async () => {
        try {
            const response = await fetch('http://65.2.38.87:8088/order/v1/createorder/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                // Handle the API response as needed
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
                const errorData = await response.json();
                console.error('API Error:', errorData);

            }
        } catch (error) {
            console.error('Fetch Error:', error);
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
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSelectChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
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
                                value={formData.customer_order_number}
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
                                value={formData.order_type}
                                onChange={(e) => handleSelectChange(e, 'order_type')}
                            >
                                <option value="forward">Forward</option>
                                <option value="reverse">Reverse</option>
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
                                value={formData.o_type}
                                onChange={(e) => handleSelectChange(e, 'o_type')}
                            >
                                <option value="prepaid">Custom</option>
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
                                value={formData.customer_order_tag}
                                onChange={(e) => handleChange(e, 'customer_order_tag')}
                                placeholder='Enter Customer Order Tag'
                            />
                        </label>
                        <label className='col'>
                            Reseller Name
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_reseller_name}
                                onChange={(e) => handleChange(e, 'customer_reseller_name')}
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
                                value={formData.o_type}
                                onChange={(e) => handleSelectChange(e, 'o_type')}
                            >
                                <option value="prepaid">Prepaid</option>
                                <option value="cod">COD</option>
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
                                    value={formData.number_of_packets || '1'}
                                    onChange={(e) => handleChange(e, 'number_of_packets')}
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
                                value={formData.customer_order_tag}
                                onChange={(e) => handleChange(e, 'customer_order_tag')}
                                placeholder='Enter Customer Order Tag'
                            />
                        </label>
                        <label className='col'>
                            Gift Wrap
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_reseller_name}
                                onChange={(e) => handleChange(e, 'customer_reseller_name')}
                                placeholder='Enter Reseller Name'
                            />
                        </label>
                        <label className='col'>
                            Transaction fee
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_reseller_name}
                                onChange={(e) => handleChange(e, 'customer_reseller_name')}
                                placeholder='Enter Reseller Name'
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

    const handleSelectChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
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
                                type="text" value={formData.s_customer_name} onChange={(e) => handleChange(e, 's_customer_name')} />
                        </label>

                        {/* Mobile Number with Country Code Select */}
                        <label className='col'>
                            Mobile Number
                            <div className='d-flex mobile-number-field'>
                                <select
                                    className='input-field '
                                    value={formData.countryCode}
                                    onChange={(e) => handleSelectChange(e, 'countryCode')}
                                    disabled
                                >
                                    <option value="+91">+91</option>
                                    {/* Add more country codes as needed */}
                                </select>
                                <input
                                    className='input-field'
                                    type="text"
                                    value={formData.s_contact}
                                    onChange={(e) => handleChange(e, 's_contact')}
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
                                type="email" value={formData.s_customer_email} onChange={(e) => handleChange(e, 's_customer_mail')} />
                        </label>
                        <label className='col'>
                            <span>Company Name <span className='text-gray'>(optional)</span></span>
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's Company Name"
                                type="email" value={formData.s_customer_cname} onChange={(e) => handleChange(e, 's_customer_cname')} />
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
                                type="text" value={formData.s_address_line1} onChange={(e) => handleChange(e, 's_address_line1')} />
                        </label>
                    </div>
                    <div className='row mt-3'>
                        {/* Address 2 (Optional) */}
                        <label className='col'>
                            Landmark
                            <input
                                className='input-field'
                                placeholder="Any nearby post office, market, Hospital as the landmark"
                                type="text" value={formData.s_address_line2} onChange={(e) => handleChange(e, 's_address_line2')} />
                        </label>
                    </div>
                    <div className='row mt-3 gap-2'>
                        {/* Pincode */}
                        <label className='col'>
                            Pincode
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's Pincode"
                                type="text" value={formData.s_pincode} onChange={(e) => handleChange(e, 's_pincode')} />
                        </label>

                        {/* City */}
                        <label className='col'>
                            City
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's City"
                                type="text" value={formData.s_city} onChange={(e) => handleChange(e, 's_city')} />
                        </label>
                    </div>
                    <div className='row mt-3 gap-2'>
                        {/* State */}
                        <label className='col'>
                            State
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's State"
                                type="text" value={formData.s_state} onChange={(e) => handleChange(e, 's_state')} />
                        </label>

                        {/* Country */}
                        <label className='col'>
                            Country
                            <input
                                className='input-field'
                                placeholder="Enter Recipient's State"
                                type="text" value={formData.s_country} onChange={(e) => handleChange(e, 's_country')} />
                        </label>
                    </div>
                </div>
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

    const [AddFields, SetAddFields] = useState(false)

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    {/* Step 3 content */}
                    <h3 className='mb-4'>Product Details</h3>
                    <div className='row'>
                        {/* Product Name */}
                        <label className='col'>
                            Product Name
                            <input
                                className='input-field'
                                placeholder="Enter or search your product name"
                                type="text" value={formData.product_name} onChange={(e) => handleChange(e, 'product_name')} />
                        </label>
                    </div>
                    <div className='row mt-3'>
                        {/* SKU */}
                        <label className='col'>
                            Unit Price
                            <input
                                className='input-field'
                                placeholder="Enter Unit Price"
                                type="text" value={formData.price} onChange={(e) => handleChange(e, 'product_sku')} />
                        </label>



                        {/* Quantity */}
                        <label className='col'>
                            Quantity
                            <input
                                className='input-field'
                                placeholder='Enter Product Quantity'
                                type="number" value={formData.product_qty || '1'} onChange={(e) => handleChange(e, 'product_qty')} />
                        </label>
                        {/* Quantity */}
                        <label className='col'>
                            Product Category
                            <input
                                className='input-field'
                                placeholder='Enter Product Quantity'
                                type="number" value={formData.product_qty || '1'} onChange={(e) => handleChange(e, 'product_qty')} />
                        </label>


                    </div>

                    <div className="row mt-3">
                        {/* Weight (kg) */}
                        <label className='col'>
                            Weight (kg)
                            <input
                                className='input-field'
                                type="number"
                                value={formData.weight || '0'}
                                onChange={(e) => handleChange(e, 'weight')} />
                        </label>
                        <label className='col'>
                            SKU
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_reseller_name}
                                onChange={(e) => handleChange(e, 'customer_reseller_name')}
                                placeholder='Enter Reseller Name'
                            />
                        </label>
                    </div>
                    <div className="row mt-4">
                        <p className='add-fields-text'>
                            <span>Other Details</span>
                            <span className='text-gray'> (Optional) </span>
                        </p>
                    </div>

                    <div className={`row `}>
                        <label className='col'>
                            HSN Code
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_order_tag}
                                onChange={(e) => handleChange(e, 'customer_order_tag')}
                                placeholder='Enter Customer Order Tag'
                            />
                        </label>

                        <label className='col'>
                            Tax Rate
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_reseller_name}
                                onChange={(e) => handleChange(e, 'customer_reseller_name')}
                                placeholder='Enter Reseller Name'
                            />
                        </label>

                        <label className='col'>
                            Product Discount
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_reseller_name}
                                onChange={(e) => handleChange(e, 'customer_reseller_name')}
                                placeholder='Enter Reseller Name'
                            />
                        </label>
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
                                type="number" value={formData.invoice_amount} onChange={(e) => handleChange(e, 'invoice_amount')} />
                        </label>

                        {/* COD Charges */}
                        <label className='col'>
                            COD Charges
                            <input
                                className='input-field'
                                type="number" value={formData.cod_charges} onChange={(e) => handleChange(e, 'cod_charges')} />
                        </label>
                    </div>
                    <hr />
                    <div className=''>
                        <div className='fw-bold lh-base'>Dead Weight<br />
                            <input
                                className='input-field'
                                style={{ minWidth: '15    0px' }}
                                type="number" value={formData.length || '0'}
                                onChange={(e) => handleChange(e, 'length')} />
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
                                type="number" value={formData.length || '0'}
                                onChange={(e) => handleChange(e, 'length')} />
                        </label>

                        {/* Breadth (cm) */}
                        <label className='col'>
                            Breadth (cm)
                            <input
                                className='input-field'
                                type="number" value={formData.breadth || '0'} onChange={(e) => handleChange(e, 'breadth')} />
                        </label>

                        {/* Height (cm) */}
                        <label className='col'>
                            Height (cm)
                            <input
                                className='input-field'
                                type="number" value={formData.height || '0'} onChange={(e) => handleChange(e, 'height')} />
                        </label>
                    </div>
                    <div className="volumetric-weight">
                        <p>Estimated Volumetric Weight &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 21.00 Kg</p>
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
                            <div className="col-lg-3 col-md-6 mb-4 cursor-pointer">
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
                                        <p className="warehouse-description font13 mt-3">Mobile : 7011424112</p>
                                    </div>
                                </label>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4 cursor-pointer">
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
                                        <p className="warehouse-description font13 mt-3">Mobile : 7011424112</p>
                                    </div>
                                </label>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4 cursor-pointer">
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
                                        <p className="warehouse-description font13 mt-3">Mobile : 7011424112</p>
                                    </div>
                                </label>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4 cursor-pointer">
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
                                        <p className="warehouse-description font13 mt-3">Mobile : 7011424112</p>
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
        </div >
    );
};


export default QuickCreateOrder;
