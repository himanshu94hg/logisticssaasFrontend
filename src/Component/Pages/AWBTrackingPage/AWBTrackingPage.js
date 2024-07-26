import axios from 'axios'
import moment from 'moment'
import Cookies from 'js-cookie';
import './AWBTrackingPage.css'
import TrackingIcon from './TrackingIcon'
import TrackingDone from './TrackingDone'
import React, { useEffect, useState } from 'react'
import { BASE_URL_CORE } from '../../../axios/config'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { customErrorFunction } from '../../../customFunction/errorHandling'



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
        const fetchOrderStatus = async () => {
            if (awbNo !== "" && orderTracking) {
                try {
                    const response = await axios.get(`${BASE_URL_CORE}/core-api/shipping/track-order/${awbNo}`, {
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
                <h4><span>AWB:</span> {orderStatus?.awb_number}</h4>
                <div className={`d-flex align-items-center gap-3 ${screenWidthData < 473 && 'flex-row-reverse'}`}>
                    <p className='text-capitalize'>
                        {orderStatus?.courier_partner && partnerList[orderStatus?.courier_partner]["title"]}
                    </p>
                    {orderStatus?.courier_partner && <img src={partnerList[orderStatus.courier_partner]["image"]} alt={orderStatus?.courier_partner} />}
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