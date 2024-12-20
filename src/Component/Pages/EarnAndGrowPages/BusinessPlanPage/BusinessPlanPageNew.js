import axios from 'axios'
import Cookies from "js-cookie";
import ListIcon from './ListIcon'
import './BusinessPlanPageNew.css'
import ListCrossIcon from './ListCrossIcon'
import React, { useEffect, useState } from 'react'
import { BASE_URL_CORE } from '../../../../axios/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { customErrorFunction } from '../../../../customFunction/errorHandling'

const BusinessPlanPageNew = () => {
    const token = Cookies.get('access_token');
    const [ActiveHeading, setActiveHeading] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/subscriptions/`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setData(response?.data)
                    }
                } catch (error) {
                    customErrorFunction(error)
                }
            };
            fetchData();
        }
    }, [token]);

    const handleActiveHeading = (num) => {
        if (ActiveHeading === num) {
            setActiveHeading(null)
        } else {
            setActiveHeading(num)
        }
    }
    return (
        <>
            <section className='business-plan-page-new'>
                <h2 className='mt-3 text-center'>Grab The Perfect Plan for Your Needs</h2>
                <p className='text-center text-sh-primary'>Our transparent pricing makes it easy to find a plan that works within your financial constraints.</p>
                <div className='plans-container'>
                    <div className='plan-item'>
                        <div className='plan-item-heading'>
                            <h4>{data[0]?.title}</h4>
                            <div className='plan-price-container'>
                                <p className='plan-price'>{data[0]?.price}<span> per month</span></p>
                                <p className='plan-tag-line'>{data[0]?.description}.</p>
                            </div>
                        </div>
                        <div className='plans-features'>
                            <button className={`btn change-plan downgrade ${data[0]?.is_active ? "active" : ""}`}>Downgrade</button>
                            <ul className='active my-3'>
                                <li><span>₹{data[0]?.rates || 0}  Per/kg</span> Shipping Rates</li>
                                <li><span>{data[0]?.period} month</span> Minimum Signup Period</li>
                                <li><span>{data[0]?.partners}+</span> Courier Partners</li>
                            </ul>
                            <hr />
                            {data[0]?.categories?.map((item, index) => (
                                <div>
                                    <p onClick={() => handleActiveHeading(index)} className={`list-heading ${ActiveHeading === index && 'active'}`}>{item?.name} <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                                    <ul className={`${ActiveHeading === index && 'active'}`}>
                                        {item?.features?.map((item) => (
                                            <>
                                                {item?.status ? <li><ListIcon /> International Shipping</li> : <li className='non-active'><ListCrossIcon /> Order Verification</li>}
                                            </>
                                        ))}
                                        {/*  <li><span className='me-2'>5</span> Multiple Pickup Address</li> */}
                                    </ul>
                                </div>
                            ))}
                            <hr />
                            <ul className='active mt-5'>
                                <li><ListIcon /> WhatsApp notification</li>
                                <li><ListIcon /> WhatsApp Bots</li>
                                <li><ListIcon /> Free Shipping</li>
                                <li><ListIcon /> Refer and Earn</li>
                                <li className='non-active'><ListCrossIcon /> Trackinng Script</li>
                                <li><ListIcon /> Webhook</li>
                                <li className='non-active'><ListCrossIcon /> Business Health Dashoard</li>
                            </ul>
                        </div>
                    </div>
                    <div className='plan-item'>
                        <div className='plan-item-heading'>
                            <h4>{data[1]?.title}</h4>
                            <div className='plan-price-container'>
                                <p className='plan-price'>{data[1]?.price}<span> per month</span></p>
                                <p className='plan-tag-line'>{data[1]?.description}</p>
                            </div>
                        </div>
                        <div className='plans-features'>
                            <button className={`btn change-plan  ${data[1]?.is_active ? "active" : ""}`}>Current Plan</button>
                            <ul className='active my-3'>
                                <li><span>₹{data[1]?.rates} Per kg</span> Shipping Rates</li>
                                <li><span>{data[1]?.period} months</span> Minimum Signup Period</li>
                                <li><span>{data[1]?.partners}+</span> Courier Partners</li>
                            </ul>
                            <hr />
                            {data[1]?.categories?.map((item, index) => (
                                <div>
                                    <p onClick={() => handleActiveHeading(index)} className={`list-heading ${ActiveHeading === index && 'active'}`}>{item?.name} <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                                    <ul className={`${ActiveHeading === index && 'active'}`}>
                                        {item?.features?.map((item) => (
                                            <>
                                                {item?.status ? <li><ListIcon /> International Shipping</li> : <li className='non-active'><ListCrossIcon /> Order Verification</li>}
                                            </>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            <hr />
                            <ul className='active mt-5'>
                                <li><ListIcon /> WhatsApp notification</li>
                                <li><ListIcon /> WhatsApp Bots</li>
                                <li className='non-active'><ListCrossIcon /> Free Shipping</li>
                                <li><ListIcon /> Refer and Earn</li>
                                <li className='non-active'><ListCrossIcon /> Trackinng Script</li>
                                <li><ListIcon /> Webhook</li>
                                <li className='non-active'><ListCrossIcon /> Business Health Dashoard</li>
                            </ul>
                        </div>
                    </div>
                    <div className='plan-item'>
                        <div className='plan-item-heading'>
                            <h4>{data[2]?.title}</h4>
                            <div className='plan-price-container'>
                                <p className='plan-price'>{data[2]?.price}<span> per month</span></p>
                                <p className='plan-tag-line'>{data[2]?.description}.</p>
                            </div>
                        </div>
                        <div className='plans-features'>
                            <button className={`btn change-plan downgrade ${data[2]?.is_active ? "active" : ""}`}>Upgrade</button>
                            <ul className='active my-3'>
                                <li><span>₹{data[2]?.rates} kg</span> Shipping Rates</li>
                                <li><span>{data[2]?.period} month</span> Minimum Signup Period</li>
                                <li><span>{data[2]?.partners}+</span> Courier Partners</li>
                            </ul>
                            <hr />
                            {data[2]?.categories?.map((item, index) => (
                                <div>
                                    <p onClick={() => handleActiveHeading(index)} className={`list-heading ${ActiveHeading === index && 'active'}`}>{item?.name} <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                                    <ul className={`${ActiveHeading === index && 'active'}`}>
                                        {item?.features?.map((item) => (
                                            <>
                                                {item?.status ? <li><ListIcon /> International Shipping</li> : <li className='non-active'><ListCrossIcon /> Order Verification</li>}
                                            </>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <hr />
                            <ul className='active mt-5'>
                                <li><ListIcon /> WhatsApp notification</li>
                                <li><ListIcon /> WhatsApp Bots</li>
                                <li><ListIcon /> Free Shipping</li>
                                <li><ListIcon /> Refer and Earn</li>
                                <li><ListIcon /> Trackinng Script</li>
                                <li><ListIcon /> Webhook</li>
                                <li><ListIcon /> Business Health Dashoard</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='book-demo-sec'>
                    <p className='mb-0'>Grab It Fast to Get Special Price!</p>
                    <button className='btn'>Book Demo Now!</button>
                </div>
            </section>
        </>
    )
}

export default BusinessPlanPageNew