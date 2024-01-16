import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CreateOrderFlow.css'; // Import the CSS file
import 'react-toggle/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateOrderFlow = () => {
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
    console.log("&&&&&&&&&&&&", formData)


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
            const response = await fetch('http://35.154.133.143/order/v1/createorder/', {
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

                Swal.fire({
                    icon: 'error',
                    title: 'Error Creating Order',
                    text: 'An error occurred while creating the order. Please try again.',
                    customClass: {
                        confirmButton: 'btn main-button', // Add your custom class here
                    },
                });
            }
        } catch (error) {
            console.error('Fetch Error:', error);

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
                        Other Details
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
                            />
                        </label>

                        {/* Order Date with react-datepicker */}
                        <label className='col'>
                            Order Date
                            <DatePicker
                                selected={formData.order_date}
                                onChange={(date) => handleDateChange(date)}
                                dateFormat="MM/dd/yyyy"
                                minDate={startOfMonth}  // Set the minimum date to the start of the current month
                                maxDate={new Date()}  // Set the maximum date to today
                                className='input-field'
                            />
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
                    <hr />
                    <div className='row mt-3'>
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
                    </div>
                    <div className='row mt-2'>
                        {/* MPS Toggle Switch */}
                        <div className='col d-flex gap-3'>
                            <label>
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
                            <label className={`${formData.shipment_type === "1" ? '' : 'd-none'}`}>
                                Number of packets
                                <input
                                disabled
                                    type="text"
                                    className='input-field'
                                    value={formData.number_of_packets}
                                    onChange={(e) => handleChange(e, 'number_of_packets')}
                                />
                            </label>
                        </div>
                    </div>
                    <hr />

                </div>
            </div>
            {/* Next Button */}
            <div className='d-flex justify-content-end mt-3'>
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
                            Customer Name
                            <input
                                className='input-field'
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
                    <div className='row mt-4'>
                        {/* Address */}
                        <label className='col'>
                            Address
                            <input
                                className='input-field'
                                type="text" value={formData.s_address_line1} onChange={(e) => handleChange(e, 's_address_line1')} />
                        </label>

                        {/* Address 2 (Optional) */}
                        <label className='col'>
                            Address 2 (Optional)
                            <input
                                className='input-field'
                                type="text" value={formData.s_address_line2} onChange={(e) => handleChange(e, 's_address_line2')} />
                        </label>
                    </div>
                    <div className='row mt-4'>
                        {/* Pincode */}
                        <label className='col'>
                            Pincode
                            <input
                                className='input-field'
                                type="text" value={formData.s_pincode} onChange={(e) => handleChange(e, 's_pincode')} />
                        </label>

                        {/* Country */}
                        <label className='col'>
                            Country
                            <input
                                className='input-field'
                                type="text" value={formData.s_country} onChange={(e) => handleChange(e, 's_country')} />
                        </label>

                        {/* State */}
                        <label className='col'>
                            State
                            <input
                                className='input-field'
                                type="text" value={formData.s_state} onChange={(e) => handleChange(e, 's_state')} />
                        </label>

                        {/* City */}
                        <label className='col'>
                            City
                            <input
                                className='input-field'
                                type="text" value={formData.s_city} onChange={(e) => handleChange(e, 's_city')} />
                        </label>

                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end mt-3'>
                {/* Add three more input fields as needed */}
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onNext}>Next</button>
            </div>
        </div>
    );
};



const Step3 = ({ onPrev, onNext, formData, setFormData }) => {
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
                        {/* SKU */}
                        <label className='col'>
                            SKU
                            <input
                                className='input-field'
                                type="text" value={formData.product_sku} onChange={(e) => handleChange(e, 'product_sku')} />
                        </label>

                        {/* Product Name */}
                        <label className='col'>
                            Product Name
                            <input
                                className='input-field'
                                type="text" value={formData.product_name} onChange={(e) => handleChange(e, 'product_name')} />
                        </label>

                        {/* Quantity */}
                        <label className='col'>
                            Quantity
                            <input
                                className='input-field'
                                type="number" value={formData.product_qty} onChange={(e) => handleChange(e, 'product_qty')} />
                        </label>

                        {/* Weight (kg) */}
                        <label className='col'>
                            Weight (kg)
                            <input
                                className='input-field'
                                type="number" value={formData.weight} onChange={(e) => handleChange(e, 'weight')} />
                        </label>
                    </div>
                    <div className='row mt-4'>
                        {/* Length (cm) */}
                        <label className='col'>
                            Length (cm)
                            <input
                                className='input-field'
                                type="number" value={formData.length} onChange={(e) => handleChange(e, 'length')} />
                        </label>

                        {/* Breadth (cm) */}
                        <label className='col'>
                            Breadth (cm)
                            <input
                                className='input-field'
                                type="number" value={formData.breadth} onChange={(e) => handleChange(e, 'breadth')} />
                        </label>

                        {/* Height (cm) */}
                        <label className='col'>
                            Height (cm)
                            <input
                                className='input-field'
                                type="number" value={formData.height} onChange={(e) => handleChange(e, 'height')} />
                        </label>

                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end mt-3'>
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
                    <h3 className='mb-4'>Other Details</h3>
                    <div className='row'>
                        {/* Invoice Amount */}
                        <label className='col'>
                            Invoice Amount
                            <input
                                className='input-field'
                                type="number" value={formData.invoice_amount} onChange={(e) => handleChange(e, 'invoice_amount')} />
                        </label>

                        {/* Shipping Charges */}
                        <label className='col'>
                            Shipping Charges
                            <input
                                className='input-field'
                                type="number" value={formData.shipping_charges} onChange={(e) => handleChange(e, 'shipping_charges')} />
                        </label>

                        {/* COD Charges */}
                        <label className='col'>
                            COD Charges
                            <input
                                className='input-field'
                                type="number" value={formData.cod_charges} onChange={(e) => handleChange(e, 'cod_charges')} />
                        </label>

                        {/* Discount */}
                        <label className='col'>
                            Discount
                            <input
                                className='input-field'
                                type="number" value={formData.discount} onChange={(e) => handleChange(e, 'discount')} />
                        </label>
                    </div>
                    <div className='row mt-4'>
                        {/* Reseller Name */}
                        <label className='col'>
                            Reseller Name
                            <input
                                className='input-field'
                                type="text" value={formData.reseller_name} onChange={(e) => handleChange(e, 'reseller_name')} />
                        </label>

                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end mt-3'>
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
                            <div className="col">
                                <label>
                                    <input
                                        type="radio"
                                        value="warehouse1"
                                        checked={formData.selectedWarehouse === 'warehouse2'}
                                        onChange={handleRadioChange}
                                    />
                                    <div>
                                        <h4>Warehouse 1 Address</h4>
                                        <p>Description</p>
                                    </div>
                                </label>
                            </div>
                            <div className="col">
                                <label>
                                    <input
                                        type="radio"
                                        value="warehouse2"
                                        checked={formData.selectedWarehouse === 'warehouse2'}
                                        onChange={handleRadioChange}
                                    />
                                    <div>
                                        <h4>Warehouse 2 Address</h4>
                                        <p>Description</p>
                                    </div>
                                </label>
                            </div>
                            {/* Add more warehouse options as needed */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end mt-3'>
                {/* Add more input fields as needed */}
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onSubmit}>Submit</button>
            </div>
        </div >
    );
};


export default CreateOrderFlow;
