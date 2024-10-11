import React from 'react';
import './ShipmentProgress.css';

const shipmentData = [
    {
        date: '10 Sept, 2024 || 01:30 PM',
        status: 'SHIPMENT DELIVERED',
        details: 'Shipment successfully delivered by ROHINI ETAIL DELIVERIES (RED).',
    },
    {
        date: '10 Sept, 2024 || 07:50 AM',
        status: 'SHIPMENT OUT FOR DELIVERY',
        details: 'ROHINI ETAIL DELIVERIES (RED) (SHIPMENT OUT FOR DELIVERY).',
    },
    {
        date: '09 Sept, 2024 || 08:00 PM',
        status: 'ARRIVED AT HUB',
        details: 'Shipment arrived at the regional processing hub.',
    },
    {
        date: '09 Sept, 2024 || 02:00 PM',
        status: 'IN TRANSIT',
        details: 'Shipment is in transit to the destination hub.',
    },
    {
        date: '09 Sept, 2024 || 09:00 AM',
        status: 'SHIPMENT PICKED UP',
        details: 'Shipment picked up from the sender\'s location by ROHINI ETAIL DELIVERIES (RED).',
    },
    {
        date: '08 Sept, 2024 || 03:00 PM',
        status: 'PENDING PICKUP',
        details: 'Shipment is pending pickup from the sender\'s location.',
    },
    {
        date: '08 Sept, 2024 || 10:30 AM',
        status: 'SHIPMENT BOOKED',
        details: 'Shipment booking completed by ROHINI ETAIL DELIVERIES (RED).',
    },
];

const ShipmentProgress = () => {
    return (
        <div className="shipment-progress">
            <h3>Shipment Progress</h3>
            <div className="progress-container">
                {shipmentData.map((item, index) => (
                    <div key={index} className="progress-item">
                        <div className="progress-circle"></div>
                        {index < shipmentData.length - 1 && <div className="progress-line"></div>}
                        <div className="progress-content">
                            <p className="date-time">{item.date}</p>
                            <h4 className="status">{item.status}</h4>
                            <p className="details">{item.details}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShipmentProgress;
