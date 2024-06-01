import { faChevronRight, faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './AWBTrackingPage.css'
import TrackingIcon from './TrackingIcon'
import TrackingDone from './TrackingDone'

const AWBTrackingPage = ({ setOrderTracking }) => {

    const CloseSidePanel = () => {
        setOrderTracking(false)
    }

    return (
        <>
            <div id='sidepanel-closer' onClick={CloseSidePanel}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <section className='tracking-header'>
                <h4><span>AWB No.</span> TPC10000198</h4>
            </section>
            <section className='tracking-body'>
                <ul>
                    <li className='active'>
                        <div className='track-icon'>
                            <TrackingIcon />
                        </div>
                        <div>
                            <h4>Order Delivered</h4>
                            <p>Status: Pending</p>
                            <p>1 June 2024 || 12:00 PM</p>
                        </div>
                    </li>
                    <li>
                        <div className='track-icon'>
                            <TrackingDone />
                        </div>
                        <div>
                            <h4>Order Received at Delivery Center</h4>
                            <p>Status: Done</p>
                            <p>1 June 2024 || 12:00 PM</p>
                        </div>
                    </li>
                    <li>
                        <div className='track-icon'>
                            <TrackingDone />
                        </div>
                        <div>
                            <h4>Order In Transit</h4>
                            <p>Status: Done</p>
                            <p>1 June 2024 || 12:00 PM</p>
                        </div>
                    </li>
                    <li>
                        <div className='track-icon'>
                            <TrackingDone />
                        </div>
                        <div>
                            <h4>Order Picked up</h4>
                            <p>Status: Done</p>
                            <p>1 June 2024 || 12:00 PM</p>
                        </div>
                    </li>
                    <li>
                        <div className='track-icon'>
                            <TrackingDone />
                        </div>
                        <div>
                            <h4>Pickup Requested</h4>
                            <p>Status: Done</p>
                            <p>1 June 2024 || 12:00 PM</p>
                        </div>
                    </li>
                    <li>
                        <div className='track-icon'>
                            <TrackingDone />
                        </div>
                        <div>
                            <h4>Order Booked</h4>
                            <p>Status: Done</p>
                            <p>1 June 2024 || 12:00 PM</p>
                        </div>
                    </li>
                    <li>
                        <div className='track-icon'>
                            <TrackingDone />
                        </div>
                        <div>
                            <h4>Order Created</h4>
                            <p>Status: Done</p>
                            <p>1 June 2024 || 12:00 PM</p>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default AWBTrackingPage