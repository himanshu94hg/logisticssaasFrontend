import { faChevronRight, faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import './AWBTrackingPage.css'
import TrackingIcon from './TrackingIcon'
import TrackingDone from './TrackingDone'
import Cookies from 'js-cookie';
import { customErrorFunction } from '../../../customFunction/errorHandling'
import axios from 'axios'
import { BASE_URL_CORE } from '../../../axios/config'
import moment from 'moment'

const AWBTrackingPage = ({ orderTracking, setOrderTracking, awbNo }) => {
    let authToken = Cookies.get("access_token")
    const [orderStatus, setOrderStatus] = useState([])

    const CloseSidePanel = () => {
        setOrderTracking(false)
    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL_CORE}/core-api/shipping/track-order/${awbNo}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                setOrderStatus(response.data);
            } catch (error) {
                customErrorFunction(error)
            }
        };

        if (orderTracking && authToken) {
            fetchData();
        }

    }, [orderTracking]);

    return (
        <>
            <div id='sidepanel-closer' onClick={CloseSidePanel}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <section className='tracking-header'>
                <h4><span>AWB No:</span> {orderStatus?.awb_number}</h4>
            </section>
            <section className='tracking-body'>
                <ul>
                    {orderStatus?.order_tracking?.map((item) => {
                        return (
                            <li className={`${item?.status === "Delivered" ? "active" : ""}`}>
                                <div className='track-icon'>
                                    {item?.status === "Delivered" ? <TrackingDone /> : <TrackingIcon />}
                                </div>
                                <div>
                                    <h4>{item?.status_description}</h4>
                                    <p>Status: {item?.status}</p>
                                    <p>{item?.location}</p>
                                    <p>{moment(item?.courier_action_date).format("DD MMM YYYY")} || {moment(item?.courier_action_date).format('hh:mm A')}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}

export default AWBTrackingPage