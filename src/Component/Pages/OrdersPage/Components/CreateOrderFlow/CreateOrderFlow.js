import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CreateOrderFlow.css'; // Import the CSS file
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { Row } from 'react-bootstrap';

const CreateOrderFlow = () => {
    const navigation = useNavigate();
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    const [formData, setFormData] = useState({
        step1: '',
        step2: '',
        step3: '',
        step4: '',
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
                        Buyer Details
                    </div>
                    <div className="step-marker">
                        <span className={`${step > 2 ? 'completed' : ''}`}>2</span>
                        Pickup Details
                    </div>
                    <div className="step-marker">
                        <span className={`${step > 3 ? 'completed' : ''}`}>3</span>
                        Order Details
                    </div>
                    <div className="step-marker">
                        <span className={`${step > 4 ? 'completed' : ''}`}>4</span>
                        Package Details
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

    const handleCheckboxChange = () => {
        setFormData({ ...formData, sameAsShipping: !formData.sameAsShipping });
    };

    return (
        <>
            <div className='box-shadow shadow-sm p10 w-100'>
                <div className='inputs-container mx-auto'>
                    {/* Step 1 content */}
                    <h3 className='mb-4'>Buyer Details</h3>

                    <Row>
                        <label className='col'>
                            Mobile Number:
                            <div className="mobile-number-input">
                                {/* Disabled Dropdown for Country Code */}
                                <select
                                    value={formData.countryCode}
                                    onChange={(e) => handleSelectChange(e, 'countryCode')}
                                    disabled
                                >
                                    <option value="+91">+91</option>
                                    <option value="+1">+1 (US)</option>
                                    {/* Add more options as needed */}
                                </select>
                                {/* Input for Mobile Number */}
                                <input
                                    type="text"
                                    value={formData.mobileNumber}
                                    onChange={(e) => handleChange(e, 'mobileNumber')}
                                />
                            </div>
                        </label>

                        <label className='col'>
                            Full Name:
                            <input type="text" value={formData.fullName} onChange={(e) => handleChange(e, 'fullName')} />
                        </label>

                        <label className='col'>
                            Email ID:
                            <input type="email" value={formData.emailId} onChange={(e) => handleChange(e, 'emailId')} />
                        </label>

                        <label className='col'>
                            Complete Address:
                            <input type="text" value={formData.completeAddress} onChange={(e) => handleChange(e, 'completeAddress')} />
                        </label>

                        <label className='col'>
                            Landmark:
                            <input type="text" value={formData.landmark} onChange={(e) => handleChange(e, 'landmark')} />
                        </label>

                        <label className='col'>
                            Pincode:
                            <input type="number" value={formData.pincode} onChange={(e) => handleChange(e, 'pincode')} />
                            {/* City, State, Country can be auto-populated based on Pincode */}
                        </label>

                        <label className='col'>
                            City:
                            <input type="text" value={formData.city} onChange={(e) => handleChange(e, 'city')} />
                        </label>

                        <label className='col'>
                            State:
                            <input type="text" value={formData.state} onChange={(e) => handleChange(e, 'state')} />
                        </label>

                        <label className='col'>
                            Country:
                            <input type="text" value={formData.country} onChange={(e) => handleChange(e, 'country')} />
                        </label>
                    </Row>
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.sameAsShipping}
                            onChange={handleCheckboxChange}
                        />
                        Billing address is same as the shipping address:
                    </label>
                    {/* Billing Address (conditionally rendered) */}
                    {!formData.sameAsShipping && (
                        <div>
                            <h3 className='mb-4'>Billing Address</h3>
                            <Row>
                                <label className='col'>
                                    Mobile Number:
                                    <div className="mobile-number-input">
                                        {/* Disabled Dropdown for Country Code */}
                                        <select
                                            value={formData.countryCode}
                                            onChange={(e) => handleSelectChange(e, 'countryCode')}
                                            disabled
                                        >
                                            <option value="+91">+91</option>
                                            <option value="+1">+1 (US)</option>
                                            {/* Add more options as needed */}
                                        </select>
                                        {/* Input for Mobile Number */}
                                        <input
                                            type="text"
                                            value={formData.mobileNumber}
                                            onChange={(e) => handleChange(e, 'mobileNumber')}
                                        />
                                    </div>
                                </label>

                                <label className='col'>
                                    Full Name:
                                    <input type="text" value={formData.fullName} onChange={(e) => handleChange(e, 'fullName')} />
                                </label>

                                <label className='col'>
                                    Email ID:
                                    <input type="email" value={formData.emailId} onChange={(e) => handleChange(e, 'emailId')} />
                                </label>

                                <label className='col'>
                                    Complete Address:
                                    <input type="text" value={formData.completeAddress} onChange={(e) => handleChange(e, 'completeAddress')} />
                                </label>

                                <label className='col'>
                                    Landmark:
                                    <input type="text" value={formData.landmark} onChange={(e) => handleChange(e, 'landmark')} />
                                </label>

                                <label className='col'>
                                    Pincode:
                                    <input type="number" value={formData.pincode} onChange={(e) => handleChange(e, 'pincode')} />
                                    {/* City, State, Country can be auto-populated based on Pincode */}
                                </label>

                                <label className='col'>
                                    City:
                                    <input type="text" value={formData.city} onChange={(e) => handleChange(e, 'city')} />
                                </label>

                                <label className='col'>
                                    State:
                                    <input type="text" value={formData.state} onChange={(e) => handleChange(e, 'state')} />
                                </label>

                                <label className='col'>
                                    Country:
                                    <input type="text" value={formData.country} onChange={(e) => handleChange(e, 'country')} />
                                </label>
                            </Row>
                        </div>
                    )}
                </div>
            </div>
            <div className='d-flex justify-content-end mt-2'>
                <button className='btn main-button' onClick={onNext}>Next</button>
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
            <h3 className='mb-4'>Pickup Details</h3>
            <label>
                Input 1:
                <input type="text" value={formData.step2} onChange={handleChange} />
            </label>
            <label>
                Input 2:
                <input type="text" value={formData.step2} onChange={handleChange} />
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
            <h3 className='mb-4'>Order Details</h3>
            <label>
                Input 1:
                <input type="text" value={formData.step3} onChange={handleChange} />
            </label>
            <label>
                Input 2:
                <input type="text" value={formData.step3} onChange={handleChange} />
            </label>
            {/* Add three more input fields as needed */}
            <button className='btn main-button' onClick={onPrev}>Previous</button>
            <button className='btn main-button' onClick={onNext}>Next</button>
        </div>
    );
};

const Step4 = ({ onPrev, onSubmit, formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, step4: e.target.value });
    };

    return (
        <div>
            {/* Step 4 content */}
            <h3 className='mb-4'>Package Details</h3>
            <label>
                Input 1:
                <input type="text" value={formData.step4} onChange={handleChange} />
            </label>
            <label>
                Input 2:
                <input type="text" value={formData.step4} onChange={handleChange} />
            </label>
            {/* Add three more input fields as needed */}
            <button className='btn main-button' onClick={onPrev}>Previous</button>
            <button className='btn main-button' onClick={onSubmit}>Submit</button>
        </div>
    );
};


export default CreateOrderFlow;
