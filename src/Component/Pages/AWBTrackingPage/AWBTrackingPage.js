import axios from 'axios'
import moment from 'moment'
import Cookies from 'js-cookie';
import './AWBTrackingPage.css'
import { useSelector } from 'react-redux'
import TrackingIcon from './TrackingIcon'
import TrackingDone from './TrackingDone'
import React, { useEffect, useState } from 'react'
import { BASE_URL_CORE } from '../../../axios/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { customErrorFunction } from '../../../customFunction/errorHandling'
import { Skeleton } from 'antd';  // Importing Skeleto

const AWBTrackingPage = ({ orderTracking, setOrderTracking, awbNo, setAwbNo }) => {
    let authToken = Cookies.get("access_token")
    const [orderStatus, setOrderStatus] = useState([])
    const partnerList = JSON.parse(localStorage.getItem('partnerList'));
    const { screenWidthData } = useSelector(state => state?.authDataReducer)

    const CloseSidePanel = () => {
        setOrderTracking(false)
        setAwbNo("")
    }


    useEffect(() => {
        setOrderStatus([])
        const fetchOrderStatus = async () => {
            if (awbNo !== "" && orderTracking) {
                try {
                    const response = await axios.get(`${BASE_URL_CORE}/core-api/shipping/track-order/${awbNo}/`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    setOrderStatus(response.data);
                } catch (error) {
                    customErrorFunction(error);
                }
            }
        };
        fetchOrderStatus();
    }, [awbNo, orderTracking, authToken]);




    return (
        <>
            <div id='sidepanel-closer' onClick={CloseSidePanel}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <section className='tracking-header'>
                <div className='d-flex flex-column gap-3'>
                    <h4><span>AWB:</span> {awbNo}</h4>
                    {orderStatus?.other_details?.expected_delivery_date &&
                        <p className='font13'>EDD: <strong>{moment(orderStatus?.other_details?.expected_delivery_date).format("DD MMM YYYY")}</strong></p>
                    }
                </div>
                <div className={`d-flex align-items-center gap-3 ${screenWidthData < 473 && 'flex-row-reverse'}`}>
                    <p className='text-capitalize'>
                        {orderStatus?.courier_partner && partnerList[orderStatus?.courier_partner]["title"]}
                    </p>
                    {orderStatus?.courier_partner && <img src={partnerList[orderStatus.courier_partner]["image"]} alt={orderStatus?.courier_partner} />}
                </div>
            </section>
            <section className='tracking-body'>
                {
                    orderStatus?.order_tracking ? (
                        <ul>
                            {orderStatus?.order_tracking?.map((item) => {
                                return (
                                    <li className={`${item?.status?.toLowerCase().includes("delivered") && 'active'}`}>
                                        <div className={`track-icon ${item?.shipease_status?.toLowerCase() === 'delivered' && 'active'}`}>
                                            {item?.shipease_status?.toLowerCase() === 'delivered' ? <TrackingDone /> : <TrackingIcon />}
                                        </div>
                                        <div className='tracking-status'>
                                            <h4 className={item?.status?.toLowerCase().includes("delivered") ? 'text-capitalize' : ''}>{item?.status_description}</h4>
                                            <p className='text-capitalize'>Status: {item?.status}</p>
                                            <p>{item?.location}</p>
                                            <p>{moment(item?.courier_action_date).format("DD MMM YYYY")} || {moment(item?.courier_action_date).format('hh:mm A')}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton active>
                                <div className={`track-icon`}>
                                </div>
                                <div className='tracking-status'>
                                    <h4></h4>
                                    <p className='text-capitalize'></p>
                                    <p></p>
                                    <p></p>
                                </div>
                            </Skeleton>
                        ))
                    )
                }


            </section >
        </>
    )
}

export default AWBTrackingPage