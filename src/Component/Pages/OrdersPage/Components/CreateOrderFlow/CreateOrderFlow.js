import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CreateOrderFlow.css'; // Import the CSS file

const CreateOrderFlow = () => {
    const navigation = useNavigate();
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    const [formData, setFormData] = useState({
        step1: '',
        step2: '',
        step3: '',
        step4: '', // New step added
    });

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
            navigation('/Orders'); // Replace '/another-page' with the desired route
        });

        console.log(
            formData.step1, formData.step2, formData.step3, formData.step4
        )
    };

    const calculateProgressBarWidth = () => {
        return `${((step - 0.9) / (totalSteps)) * 100}%`;
    };



    return (
        <div className="stepper-form-container">
            <div className='box-shadow shadow-sm p10 w-100 steps-header'>
                <div className="stepper-line mx-auto">
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
                    <div className="progress-bar" style={{ width: calculateProgressBarWidth() }}></div>
                </div>
            </div>

            <div className='box-shadow shadow-sm p10 w-100'>
                <div className='inputs-container mx-auto'>
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
    const handleChange = (e) => {
        setFormData({ ...formData, step1: e.target.value });
    };

    return (
        <div>
            {/* Step 1 content */}
            <h3 className='mb-4'>Buyer Details</h3>
            <label>
                Input 1:
                <input type="text" value={formData.step1} onChange={handleChange} />
            </label>
            <label>
                Input 2:
                <input type="text" value={formData.step1} onChange={handleChange} />
            </label>
            {/* Add three more input fields as needed */}
            <button className='btn main-button' onClick={onNext}>Next</button>
        </div>
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
