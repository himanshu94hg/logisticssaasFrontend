import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTruck, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './ProgressBar.css';

const shipmentData = [
    {
        label: 'Booked',
        date: '08 Sept, 2024',
        time: '10:30 AM',
        status: 'completed',
        icon: faCheck
    },
    {
        label: 'Pending Pickup',
        date: '08 Sept, 2024',
        time: '03:00 PM',
        status: 'completed',
        icon: faCheck
    },
    {
        label: 'In Transit',
        date: '09 Sept, 2024',
        time: '02:00 PM',
        status: 'active',
        icon: faTruck
    },
    {
        label: 'Out for Delivery',
        date: '10 Sept, 2024',
        time: '07:50 AM',
        status: '',
        icon: faBoxOpen
    },
    {
        label: 'Delivered',
        date: '10 Sept, 2024',
        time: '01:30 PM',
        status: '',
        icon: faCheck
    }
];

const ProgressBar = () => {
    return (
        <div className="progress-bar-container">
            {shipmentData.map((item, index) => (
                <div key={index} className="step-container">
                    <div className={`circle ${item.status}`}>
                        <FontAwesomeIcon icon={item.icon} className="step-icon" />
                    </div>
                    {index !== shipmentData.length - 1 && (
                        <div className={`line ${item.status === 'completed' ? 'completed-line' : ''}`}></div>
                    )}
                    <div className="step-label">{item.label}</div>
                    <div className="timestamp">{item.date} || {item.time}</div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
