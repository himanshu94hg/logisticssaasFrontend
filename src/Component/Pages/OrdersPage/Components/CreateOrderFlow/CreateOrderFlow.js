import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CreateOrderFlow.css'; // Import the CSS file
import 'react-toggle/style.css';

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



    const handleFormSubmit = () => {
        // Here you can send the formData to your server or perform any necessary actions
        // For this example, we'll just show a SweetAlert
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
        console.log(
            formData.step1, formData.step2, formData.step3, formData.step4
        )
        setProgressBarWidth('100%');
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
        setFormData({ ...formData, [field]: !formData[field] });
    };

    return (
        <>
            {/* Order Details Section */}
            <div className='box-shadow shadow-sm p10 w-100'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-4'>Order Details</h3>
                    <div className='row'>
                        {/* Customer Order Number */}
                        <label className='col'>
                            Customer Order Number:
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customerOrderNumber}
                                onChange={(e) => handleChange(e, 'customerOrderNumber')}
                            />
                        </label>

                        {/* Payment Type */}
                        <label className='col'>
                            Payment Type:
                            <select
                                className='select-field'
                                value={formData.paymentType}
                                onChange={(e) => handleSelectChange(e, 'paymentType')}
                            >
                                <option value="prepaid">Prepaid</option>
                                <option value="cod">COD</option>
                            </select>
                        </label>

                        {/* Order Type */}
                        <label className='col'>
                            Order Type:
                            <select
                                className='select-field'
                                value={formData.orderType}
                                onChange={(e) => handleSelectChange(e, 'orderType')}
                            >
                                <option value="forward">Forward</option>
                                <option value="reverse">Reverse</option>
                            </select>
                        </label>

                        {/* MPS Toggle Switch */}
                        <label className='col'>
                            MPS:
                            <div className="toggle-switch">
                                <label className='col'>
                                    <input
                                        type="checkbox"
                                        checked={formData.mps}
                                        onChange={() => handleToggleChange('mps')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            {/* Next Button */}
            <div className='d-flex justify-content-end mt-2'>
                <button className='btn main-button' onClick={onNext}>
                    Next
                </button>
            </div>
        </>
    );
};



const Step2 = ({ onPrev, onNext, formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, step2: e.target.value });
    };

    return (
        <div>
            {/* Step 2 content */}
            <h3 className='mb-4'>Shipping Details</h3>
            <label className='col'>
                Input 1:
                <input
                    className='input-field'
                    type="text" value={formData.step2} onChange={handleChange} />
            </label>
            <label className='col'>
                Input 2:
                <input className='input-field'
                    type="text" value={formData.step2} onChange={handleChange} />
            </label>
            {/* Add three more input fields as needed */}
            <button className='btn main-button' onClick={onPrev}>Previous</button>
            <button className='btn main-button' onClick={onNext}>Next</button>
        </div>
    );
};

const Step3 = ({ onPrev, onNext, formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, step3: e.target.value });
    };

    return (
        <div>
            {/* Step 3 content */}
            <h3 className='mb-4'>Product Details</h3>
            <label className='col'>
                Input 1:
                <input className='input-field'
                    type="text" value={formData.step3} onChange={handleChange} />
            </label>
            <label className='col'>
                Input 2:
                <input className='input-field'
                    type="text" value={formData.step3} onChange={handleChange} />
            </label>
            {/* Add three more input fields as needed */}
            <button className='btn main-button' onClick={onPrev}>Previous</button>
            <button className='btn main-button' onClick={onNext}>Next</button>
        </div>
    );
};

const Step4 = ({ onPrev, onNext, formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, step4: e.target.value });
    };

    return (
        <div>
            {/* Step 4 content */}
            <h3 className='mb-4'>Other Details</h3>
            <label className='col'>
                Input 1:
                <input className='input-field'
                    type="text" value={formData.step4} onChange={handleChange} />
            </label>
            <label className='col'>
                Input 2:
                <input className='input-field'
                    type="text" value={formData.step4} onChange={handleChange} />
            </label>
            {/* Add three more input fields as needed */}
            <button className='btn main-button' onClick={onPrev}>Previous</button>
            <button className='btn main-button' onClick={onNext}>Next</button>
        </div>
    );
};


const Step5 = ({ onPrev, onSubmit, formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, step5: e.target.value });
    };

    return (
        <div>
            {/* Step 5 content */}
            <h3 className='mb-4'>Warehouse Details</h3>
            <label className='col'>
                Input 1:
                <input className='input-field'
                    type="text" value={formData.step5} onChange={handleChange} />
            </label>
            <label className='col'>
                Input 2:
                <input className='input-field'
                    type="text" value={formData.step5} onChange={handleChange} />
            </label>
            {/* Add three more input fields as needed */}
            <button className='btn main-button' onClick={onPrev}>Previous</button>
            <button className='btn main-button' onClick={onSubmit}>Submit</button>
        </div>
    );
};

export default CreateOrderFlow;
