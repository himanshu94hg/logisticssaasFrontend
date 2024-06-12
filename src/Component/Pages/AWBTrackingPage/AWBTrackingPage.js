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
                <h4><span>AWB:</span> {orderStatus?.awb_number}</h4>
                <div className='d-flex align-items-center gap-3'>
                    {/* <p className='text-capitalize'>{orderStatus?.courier_partner}</p> */}
                    {/* <img src="" alt={orderStatus?.courier_partner} /> */}
                </div>
            </section>
            <section className='tracking-body'>
                <ul>
                    {orderStatus?.order_tracking?.map((item) => {
                        return (
                            <li className={`${item?.status === "Delivered" && 'active'}`}>
                                <div className={`track-icon ${item?.status === "Delivered" && 'active'}`}>
                                    {item?.status === "Delivered" ? <TrackingDone /> : <TrackingIcon />}
                                </div>
                                <div className='d-flex flex-column gap-1'>
                                    <h4>{item?.status}</h4>
                                    <div className='d-flex gap-3 align-items-end'>
                                        <p>{item?.status_description}</p>
                                        <p>||</p>
                                        <p>{item?.location}</p>
                                    </div>
                                    <p>{moment(item?.updated_at).format("DD MMM YYYY")} || {moment(item?.updated_at).format('hh:mm A')}</p>
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