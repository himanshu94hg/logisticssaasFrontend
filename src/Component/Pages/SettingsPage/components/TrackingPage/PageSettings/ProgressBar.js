import React, { useState } from 'react';
import './ProgressBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTruck, faClipboard, faHourglassHalf, faBoxOpen, faCheck } from '@fortawesome/free-solid-svg-icons'; // Add necessary icons

const ProgressBar = () => {
    const [currentStep, setCurrentStep] = useState(1); // Active step set to 3 for example

    const steps = [
        { name: 'Booked', icon: faClipboard },
        { name: 'Pending Pickup', icon: faHourglassHalf },
        { name: 'In Transit', icon: faTruck },
        { name: 'Out for Delivery', icon: faBoxOpen },
        { name: 'Delivered', icon: faCheck },
    ];

    return (
        <div className="progress-bar-container">
            {steps.map((step, index) => (
                <div key={index} className="step-container">
                    <div
                        className={`circle ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''
                            }`}
                    >
                        <FontAwesomeIcon icon={index < currentStep ? faCheck : step.icon} className="step-icon" />
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`line ${index < currentStep ? 'completed-line' : ''}`} />
                    )}
                    <div className="step-label">{step.name}</div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
