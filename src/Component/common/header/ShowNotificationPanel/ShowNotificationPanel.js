import moment from 'moment';
import './ShowNotificationPanel.css'; // Custom CSS for styling
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';


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

    const handleMarkRead = (item) => {

    }

    const renderContent = () => {
        if (activeTab === 'notifications') {
            return alerts?.map((item) => (
                <>
                    <div className={`notification-item ${item?.read_at ? "" : "unread-notification"}`} key={item.id}>
                        <div className='d-flex gap-2 justify-content-between w-100'>
                            <span>{item.message}</span>
                            <span className='status-icon' onClick={handleMarkRead(item.id)}>
                                <CustomTooltip
                                    triggerComponent={
                                        item?.read_at ?
                                            <FontAwesomeIcon icon={faEnvelopeOpen} />
                                            :
                                            <FontAwesomeIcon icon={faEnvelope} />
                                    }
                                    tooltipComponent={item?.read_at ? "Mark as Unread" : "Mark as Read"}
                                    addClassName='mail-icon-tooltip'
                                />
                            </span>
                        </div>
                        <small className='mt-2'>{moment(item?.updated_at).fromNow()}</small>
                    </div>
                </>
            ));
        } else if (activeTab === 'dailyUpdates') {
            return impUpdate?.map((item) => (
                <div className="notification-item whats-new" key={item.id}>
                    <img src="https://placehold.co/350x200?text=Promotional" alt="" />
                    <h4>Notification Title</h4>
                    <div className='d-flex align-items-end pb-2'>
                        <span>{item.message}</span>
                    </div>
                    <small>{moment(item.updated_at).fromNow()}</small>
                    <button className='btn main-button'>Check it Out!</button>
                </div>
            ));
        } else if (activeTab === 'promotions') {
            return whatsNew.map((item) => (
                <div className="notification-item whats-new" key={item.id}>
                    <img src="https://placehold.co/350x200?text=Promotional" alt="" />
                    <h4>Notification Title</h4>
                    <div className='d-flex align-items-end pb-2'>
                        <span>{item.message}</span>
                        <small>{moment(item.updated_at).fromNow()}</small>
                    </div>
                    <button className='btn main-button'>Check it Out!</button>
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
                        <p className="btn-close" onClick={handleClose}>Mark all as read</p>
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
                    <div className='d-flex align-items-center justify-content-center'>
                        <button className='btn view-all-btn'>View ALL</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShowNotificationPanel;
