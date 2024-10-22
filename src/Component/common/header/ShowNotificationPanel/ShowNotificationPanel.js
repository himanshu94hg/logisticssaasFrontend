import axios from 'axios';
import moment from 'moment';
import Cookies from "js-cookie";
import './ShowNotificationPanel.css';
import { BASE_URL_CORE } from '../../../../axios/config';
import React, { useState, useEffect, useRef } from 'react';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from '../../../../customFunction/errorHandling';


const ShowNotificationPanel = ({ showNotification, setShowNotification, alerts, whatsNew, impUpdate, setRefresh, setImpRefresh, viewAll, setViewAll }) => {
    const panelRef = useRef(null);
    let authToken = Cookies.get("access_token")
    const [activeTab, setActiveTab] = useState('notifications');

    const handleClose = async () => {
        try {
            const response = await axios.get(`${BASE_URL_CORE}/core-api/features/notifications/all-read/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                setRefresh(new Date())
            }
        } catch (error) {
            customErrorFunction(error);
        }
        setShowNotification(false)
    };

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

    const handleMarkRead = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL_CORE}/core-api/features/notifications/read/?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                setRefresh(new Date())
            }
        } catch (error) {
            customErrorFunction(error);
        }
    }

    const handleRead = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL_CORE}/core-api/features/whats-new/read/?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                setImpRefresh(new Date())
            }
        } catch (error) {
            customErrorFunction(error);
        }
    }

    const renderContent = () => {
        if (activeTab === 'notifications') {
            return alerts?.map((item) => (
                <>
                    <div className={`notification-item ${item?.read_at ? "" : "unread-notification"}`} key={item.id}>
                        <div className='d-flex gap-2 justify-content-between w-100'>
                            <span>{item.message}</span>
                            <span className='status-icon' onClick={() => handleMarkRead(item.id)}>
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
                        <small className='mt-2'>{moment(item?.created_at).fromNow()}</small>
                    </div>
                </>
            ));
        } else if (activeTab === 'dailyUpdates') {
            return impUpdate?.map((item) => (
                <div className="notification-item whats-new" key={item.id}>
                    <img src={item?.image} alt="" />
                    <h4>{item?.title}</h4>
                    <div className='d-flex align-items-end pb-2'>
                        <span>{item.message}</span>
                    </div>
                    <small>{moment(item.created_at).fromNow()}</small>
                    <div className='d-flex justify-content-between gap-4'>
                        <button className='btn main-button'>Check it Out!</button>
                        <button className='btn main-button' onClick={() => handleRead(item?.id)}>{item?.read_at ? "Unread" : "Read"}</button>
                    </div>
                </div>
            ));
        } else if (activeTab === 'promotions') {
            return whatsNew.map((item) => (
                <div className="notification-item whats-new" key={item.id}>
                    <img src={item?.image} alt="" />
                    <h4>{item?.title}</h4>
                    <div className='d-flex align-items-end pb-2'>
                        <span>{item.message}</span>
                    </div>
                    <small>{moment(item.created_at).fromNow()}</small>
                    <div className='d-flex justify-content-between gap-4'>
                        <button className='btn main-button'>Check it Out!</button>
                        <button className='btn main-button' onClick={() => handleRead(item?.id)}>{item?.read_at ? "Unread" : "Read"}</button>
                    </div>
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
                        <button className='btn view-all-btn' onClick={() => setViewAll(!viewAll)} >{viewAll ? "View Less" : "View ALL"}</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShowNotificationPanel;
