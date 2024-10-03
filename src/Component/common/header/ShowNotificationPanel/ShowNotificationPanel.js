import moment from 'moment';
import './ShowNotificationPanel.css'; // Custom CSS for styling
import React, { useState, useEffect, useRef } from 'react';


const ShowNotificationPanel = ({ showNotification, setShowNotification, alerts, whatsNew, impUpdate }) => {
    const panelRef = useRef(null);
    const [activeTab, setActiveTab] = useState('notifications');

    const handleClose = () => setShowNotification(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                setShowNotification(false);
            }
        };

        if (showNotification) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotification]);

    const renderContent = () => {
        if (activeTab === 'notifications') {
            return alerts?.map((item) => (
                <div className="notification-item" key={item.id}>
                    <span>{item.message}</span>
                    <small>{moment(item.updated_at).fromNow()}</small>
                </div>
            ));
        } else if (activeTab === 'dailyUpdates') {
            return impUpdate?.map((item) => (
                <div className="notification-item" key={item.id}>
                    <span>{item.message}</span>
                    <small>{moment(item.updated_at).fromNow()}</small>
                </div>
            ));
        } else if (activeTab === 'promotions') {
            return whatsNew.map((item) => (
                <div className="notification-item" key={item.id}>
                    <span>{item.message}</span>
                    <small>{moment(item.updated_at).fromNow()}</small>
                </div>
            ));
        }
    };

    return (
        <>
            {showNotification && (
                <div ref={panelRef} className="notification-panel">
                    <div className="notification-header">
                        <h3>Notifications</h3>
                        <button className="btn-close p-0" onClick={handleClose}>×</button>
                    </div>
                    <div className="notification-tabs">
                        <button
                            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            Alerts ({alerts?.length})
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'dailyUpdates' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dailyUpdates')}
                        >
                            Important Updates ({impUpdate?.length})
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'promotions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('promotions')}
                        >
                            What's new ({whatsNew?.length})
                        </button>
                    </div>
                    <div className="notification-body">
                        {renderContent()}
                    </div>
                </div>
            )}
        </>
    );
};

export default ShowNotificationPanel;
