import React from 'react';
import './ShipmentProgress.css';

const shipmentData = [
    {
        date: '10 Sept, 2024',
        time: ' 07:50 AM',
        status: 'SHIPMENT DELIVERED',
        details: 'ROHINI ETAIL DELIVERIES (RED) (SHIPMENT DELIVERED)'
    },
    {
        date: '10 Sept, 2024',
        time: ' 07:50 AM',
        status: 'SHIPMENT OUT FOR DELIVERY',
        details: 'ROHINI ETAIL DELIVERIES (RED) (SHIPMENT OUT FOR DELIVERY)'
    },
    {
        date: '10 Sept, 2024',
        time: ' 07:50 AM',
        status: 'SHIPMENT ARRIVED',
        details: 'ROHINI ETAIL DELIVERIES (RED) (SHIPMENT ARRIVED)'
    }
];

const ShipmentProgress = () => {
    return (
        <div className="shipment-progress">
            <h3>Shipment Progress</h3>
            <div className="progress-container">
                {shipmentData.map((item, index) => (
                    <div key={index} className="progress-item">
                        <div>
                            <div className="progress-circle"></div>
                            <div className="progress-line"></div>
                        </div>
                        <div className="progress-content">
                            <p className="date-time">{item.date} || {item.time}</p>
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
