import React, { useState, useEffect, useRef } from 'react';
import './ShowNotificationPanel.css'; // Custom CSS for styling

const notifications = [
    { id: 1, message: 'Your order #12345 has been shipped', time: '2 hours ago' },
    { id: 2, message: 'New comment on your post', time: '1 hour ago' },
    { id: 3, message: 'Your password was changed successfully', time: '3 days ago' },
];

const dailyUpdates = [
    { id: 1, message: 'New article: "Top 10 Interior Design Trends"', time: 'Today' },
    { id: 2, message: 'Check out the latest design inspirations!', time: 'Yesterday' },
];

const promotions = [
    { id: 1, message: '50% off on selected items!', time: 'This Week' },
    { id: 2, message: 'Special offer: Buy 1 Get 1 Free', time: 'This Month' },
];

const ShowNotificationPanel = ({ showNotification, setShowNotification }) => {
    const panelRef = useRef(null);
    const [activeTab, setActiveTab] = useState('notifications'); // State to handle tab switch

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
            return notifications.map((item) => (
                <div className="notification-item" key={item.id}>
                    <span>{item.message}</span>
                    <small>{item.time}</small>
                </div>
            ));
        } else if (activeTab === 'dailyUpdates') {
            return dailyUpdates.map((item) => (
                <div className="notification-item" key={item.id}>
                    <span>{item.message}</span>
                    <small>{item.time}</small>
                </div>
            ));
        } else if (activeTab === 'promotions') {
            return promotions.map((item) => (
                <div className="notification-item" key={item.id}>
                    <span>{item.message}</span>
                    <small>{item.time}</small>
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
                            Alerts ({notifications.length})
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'dailyUpdates' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dailyUpdates')}
                        >
                            Important Updates ({dailyUpdates.length})
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'promotions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('promotions')}
                        >
                            What's new ({promotions.length})
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
