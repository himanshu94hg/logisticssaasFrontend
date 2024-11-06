import React, { useState } from 'react'
import './BusinessPlanPageNew.css'
import ListIcon from './ListIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import ListCrossIcon from './ListCrossIcon'

const BusinessPlanPageNew = () => {
    const [ActiveHeading, setActiveHeading] = useState(null)

    const handleActiveHeading = (num) => {
        if (ActiveHeading === num) {
            setActiveHeading(null)
        } else {
            setActiveHeading(num)
        }
    }
    return (
        <>
            <section className='business-plan-page'>
                <h2 className='mt-3 text-center'>Grab The Perfect Plan for Your Needs</h2>
                <p className='text-center text-sh-primary'>Our transparent pricing makes it easy to find a plan that works within your financial constraints.</p>
                <div className='plans-container'>
                    <div className='plan-item'>
                        <div className='plan-item-heading'>
                            <h4>Standard</h4>
                            <div className='plan-price-container'>
                                <p className='plan-price'>200<span> per month</span></p>
                                <p className='plan-tag-line'>Unlock advanced features and receive priority support.</p>
                            </div>
                        </div>
                        <div className='plans-features'>
                            <button className='btn change-plan downgrade'>Downgrade</button>
                            <ul className='active my-3'>
                                <li><span>₹26.27/0.5 kg</span> Shipping Rates</li>
                                <li><span>0 month</span> Minimum Signup Period</li>
                                <li><span>20+</span> Courier Partners</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(0)} className={`list-heading ${ActiveHeading === 0 && 'active'}`}>Order & Order Management <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 0 && 'active'}`}>
                                <li className='non-active'><ListCrossIcon /> Order Verification</li>
                                <li><ListIcon /> International Shipping</li>
                                <li><ListIcon /> Courier Partners</li>
                                <li><span className='me-2'>5</span> Multiple Pickup Address</li>
                                <li><ListIcon /> Product Weight Freeze</li>
                                <li><ListIcon /> Payment Mode Change</li>
                                <li><ListIcon /> Split Shipment</li>
                                <li><ListIcon /> Merge Shipment</li>
                                <li><ListIcon /> NDR & RTO Management</li>
                                <li className='non-active'><ListCrossIcon /> Automated Emails and SMS</li>
                                <li><ListIcon /> API Access</li>
                                <li><span className='me-2'>2</span> Sales Channel Integration</li>
                                <li><ListIcon /> Autosync Channel Orders</li>
                                <li><ListIcon /> Bulk Order Upload & Processing</li>
                                <li><ListIcon /> Bulk Shipping Manifests</li>
                                <li><ListIcon /> Label & Invoices Creation</li>
                                <li><ListIcon /> Label</li>
                                <li className='non-active'><ListCrossIcon /> Invoice & POD Customization</li>
                                <li className='non-active'><ListCrossIcon /> Multiple User Login & Role Management</li>
                                <li className='non-active'><ListCrossIcon /> Postpaid</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(1)} className={`list-heading ${ActiveHeading === 1 && 'active'}`}>Tools & Reporting <FontAwesomeIcon className={`${ActiveHeading === 1 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 1 && 'active'}`}>
                                <li><ListIcon /> Reporting</li>
                                <li><ListIcon /> Rate Calculator</li>
                                <li><span>Standard</span> Analytics dashboard</li>
                                <li className='non-active'><ListCrossIcon /> Report Scheduler</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(2)} className={`list-heading ${ActiveHeading === 2 && 'active'}`}>Payment <FontAwesomeIcon className={`${ActiveHeading === 2 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 2 && 'active'}`}>
                                <li><ListIcon /> Billing Management</li>
                                <li><ListIcon /> COD Reconciliation and Settlement</li>
                                <li><ListIcon /> Early COD</li>
                                <li><ListIcon /> GSTIN Invoicing</li>
                                <li className='non-active'><ListCrossIcon /> Custom - COD Accounts/Invoicing</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(3)} className={`list-heading ${ActiveHeading === 3 && 'active'}`}>Support <FontAwesomeIcon className={`${ActiveHeading === 3 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 3 && 'active'}`}>
                                <li><ListIcon /> Training & Setup Assistance</li>
                                <li className='non-active'><ListCrossIcon /> Dedicated Key Account Manager for tiers</li>
                                <li><ListIcon /> Weekly Webinars</li>
                                <li><ListIcon /> Ticket Support and Panel Escalations</li>
                                <li className='non-active'><ListCrossIcon /> 24*7 Support</li>
                                <li className='non-active'><ListCrossIcon /> Email & Chat Support</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(4)} className={`list-heading ${ActiveHeading === 4 && 'active'}`}>Tracking & Notification <FontAwesomeIcon className={`${ActiveHeading === 4 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 4 && 'active'}`}>
                                <li><ListIcon /> Real Time Shipment Tracking and Notifications</li>
                                <li className='non-active'><ListCrossIcon /> Multiple Email templates</li>
                                <li className='non-active'><ListCrossIcon /> Custom Branding Page with NPS</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(5)} className={`list-heading ${ActiveHeading === 5 && 'active'}`}>Returns <FontAwesomeIcon className={`${ActiveHeading === 5 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 5 && 'active'}`}>
                                <li><ListIcon /> Return Management Panel</li>
                                <li><ListIcon /> Refund Management</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(6)} className={`list-heading ${ActiveHeading === 6 && 'active'}`}>Couriers <FontAwesomeIcon className={`${ActiveHeading === 6 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 6 && 'active'}`}>
                                <li><ListIcon /> ODA & RTO Block Pincodes</li>
                                <li><ListIcon /> Courier Priority</li>
                                <li className='non-active'><ListCrossIcon /> Advanced Courier Rule</li>
                                <li><ListIcon /> Courier Selection</li>
                            </ul>
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
                            <h4>Pro <span>Most Popular</span></h4>
                            <div className='plan-price-container'>
                                <p className='plan-price'>400<span> per month</span></p>
                                <p className='plan-tag-line'>Access premium tools and team colaboration options</p>
                            </div>
                        </div>
                        <div className='plans-features'>
                            <button className='btn change-plan active'>Current Plan</button>
                            <ul className='active my-3'>
                                <li><span>₹23.88/0.5 kg</span> Shipping Rates</li>
                                <li><span>2 months</span> Minimum Signup Period</li>
                                <li><span>30+</span> Courier Partners</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(0)} className={`list-heading ${ActiveHeading === 0 && 'active'}`}>Order & Order Management <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 0 && 'active'}`}>
                                <li><ListIcon /> Order Verification</li>
                                <li><ListIcon /> International Shipping</li>
                                <li><ListIcon /> Courier Partners</li>
                                <li><span className='me-2'>10</span> Multiple Pickup Address</li>
                                <li><ListIcon /> Product Weight Freeze</li>
                                <li><ListIcon /> Payment Mode Change</li>
                                <li><ListIcon /> Split Shipment</li>
                                <li><ListIcon /> Merge Shipment</li>
                                <li><ListIcon /> NDR & RTO Management</li>
                                <li><ListIcon /> Automated Emails and SMS</li>
                                <li><ListIcon /> API Access</li>
                                <li><span className='me-2'>5</span> Sales Channel Integration</li>
                                <li><ListIcon /> Autosync Channel Orders</li>
                                <li><ListIcon /> Bulk Order Upload & Processing</li>
                                <li><ListIcon /> Bulk Shipping Manifests</li>
                                <li><ListIcon /> Label & Invoices Creation</li>
                                <li><ListIcon /> Label</li>
                                <li><span>Partial</span> Invoice & POD Customization</li>
                                <li><span className='me-2'>5</span> Multiple User Login & Role Management</li>
                                <li className='non-active'><ListCrossIcon /> Postpaid</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(1)} className={`list-heading ${ActiveHeading === 1 && 'active'}`}>Tools & Reporting <FontAwesomeIcon className={`${ActiveHeading === 1 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 1 && 'active'}`}>
                                <li><ListIcon /> Reporting</li>
                                <li><ListIcon /> Rate Calculator</li>
                                <li><span className='me-2'>Pro</span> Analytics dashboard</li>
                                <li className='non-active'><ListCrossIcon /> Report Scheduler</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(2)} className={`list-heading ${ActiveHeading === 2 && 'active'}`}>Payment <FontAwesomeIcon className={`${ActiveHeading === 2 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 2 && 'active'}`}>
                                <li><ListIcon /> Billing Management</li>
                                <li><ListIcon /> COD Reconciliation and Settlement</li>
                                <li><ListIcon /> Early COD</li>
                                <li><ListIcon /> GSTIN Invoicing</li>
                                <li className='non-active'><ListCrossIcon /> Custom - COD Accounts/Invoicing</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(3)} className={`list-heading ${ActiveHeading === 3 && 'active'}`}>Support <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 3 && 'active'}`}>
                                <li><ListIcon /> Training & Setup Assistance</li>
                                <li className='non-active'><ListCrossIcon /> Dedicated Key Account Manager for tiers</li>
                                <li><ListIcon /> Weekly Webinars</li>
                                <li><ListIcon /> Ticket Support and Panel Escalations</li>
                                <li className='non-active'><ListCrossIcon /> 24*7 Support</li>
                                <li><ListIcon /> Email & Chat Support</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(4)} className={`list-heading ${ActiveHeading === 4 && 'active'}`}>Tracking & Notification <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 4 && 'active'}`}>
                                <li><ListIcon /> Real Time Shipment Tracking and Notifications</li>
                                <li className='non-active'><ListCrossIcon /> Multiple Email templates</li>
                                <li className='non-active'><ListCrossIcon /> Custom Branding Page with NPS</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(5)} className={`list-heading ${ActiveHeading === 5 && 'active'}`}>Returns <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 5 && 'active'}`}>
                                <li><ListIcon /> Return Management Panel</li>
                                <li><ListIcon /> Refund Management</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(6)} className={`list-heading ${ActiveHeading === 6 && 'active'}`}>Couriers <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 6 && 'active'}`}>
                                <li><ListIcon /> ODA & RTO Block Pincodes</li>
                                <li><ListIcon /> Courier Priority</li>
                                <li><ListIcon /> Advanced Courier Rule</li>
                                <li><ListIcon /> Courier Selection</li>
                            </ul>
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
                            <h4>Pro Plus</h4>
                            <div className='plan-price-container'>
                                <p className='plan-price'>600<span> per month</span></p>
                                <p className='plan-tag-line'>Customizable solutions for large shipping and dedicated support.</p>
                            </div>
                        </div>
                        <div className='plans-features'>
                            <button className='btn change-plan'>Upgrade</button>
                            <ul className='active my-3'>
                                <li><span>₹20.34/0.5 kg</span> Shipping Rates</li>
                                <li><span>1 month</span> Minimum Signup Period</li>
                                <li><span>30+</span> Courier Partners</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(0)} className={`list-heading ${ActiveHeading === 0 && 'active'}`}>Order & Order Management <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 0 && 'active'}`}>
                                <li><ListIcon /> Order Verification</li>
                                <li><ListIcon /> International Shipping</li>
                                <li><ListIcon /> Courier Partners</li>
                                <li><span>Unlimited</span> Multiple Pickup Address</li>
                                <li><ListIcon /> Product Weight Freeze</li>
                                <li><ListIcon /> Payment Mode Change</li>
                                <li><ListIcon /> Split Shipment</li>
                                <li><ListIcon /> Merge Shipment</li>
                                <li><ListIcon /> NDR & RTO Management</li>
                                <li><ListIcon /> Automated Emails and SMS</li>
                                <li><ListIcon /> API Access</li>
                                <li><span>Unlimited</span> Sales Channel Integration</li>
                                <li><ListIcon /> Autosync Channel Orders</li>
                                <li><ListIcon /> Bulk Order Upload & Processing</li>
                                <li><ListIcon /> Bulk Shipping Manifests</li>
                                <li><ListIcon /> Label & Invoices Creation</li>
                                <li><ListIcon /> Label</li>
                                <li><ListIcon /> Invoice & POD Customization</li>
                                <li><ListIcon /> Multiple User Login & Role Management</li>
                                <li><ListIcon /> Postpaid</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(1)} className={`list-heading ${ActiveHeading === 1 && 'active'}`}>Tools & Reporting <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 1 && 'active'}`}>
                                <li><ListIcon /> Reporting</li>
                                <li><ListIcon /> Rate Calculator</li>
                                <li><span>Pro Plus</span> Analytics dashboard</li>
                                <li><ListIcon /> Report Scheduler</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(2)} className={`list-heading ${ActiveHeading === 2 && 'active'}`}>Payment <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 2 && 'active'}`}>
                                <li><ListIcon /> Billing Management</li>
                                <li><ListIcon /> COD Reconciliation and Settlement</li>
                                <li><ListIcon /> Early COD</li>
                                <li><ListIcon /> GSTIN Invoicing</li>
                                <li><ListIcon /> Custom - COD Accounts/Invoicing</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(3)} className={`list-heading ${ActiveHeading === 3 && 'active'}`}>Support <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 3 && 'active'}`}>
                                <li><ListIcon /> Training & Setup Assistance</li>
                                <li><ListIcon /> Dedicated Key Account Manager for tiers</li>
                                <li><ListIcon /> Weekly Webinars</li>
                                <li><ListIcon /> Ticket Support and Panel Escalations</li>
                                <li><ListIcon /> 24*7 Support</li>
                                <li><ListIcon /> Email & Chat Support</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(4)} className={`list-heading ${ActiveHeading === 4 && 'active'}`}>Tracking & Notification <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 4 && 'active'}`}>
                                <li><ListIcon /> Real Time Shipment Tracking and Notifications</li>
                                <li><ListIcon /> Multiple Email templates</li>
                                <li><ListIcon /> Custom Branding Page with NPS</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(5)} className={`list-heading ${ActiveHeading === 5 && 'active'}`}>Returns <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 5 && 'active'}`}>
                                <li><ListIcon /> Return Management Panel</li>
                                <li><ListIcon /> Refund Management</li>
                            </ul>
                            <hr />
                            <p onClick={() => handleActiveHeading(6)} className={`list-heading ${ActiveHeading === 6 && 'active'}`}>Couriers <FontAwesomeIcon className={`${ActiveHeading === 0 && 'active'}`} icon={faChevronDown} /></p>
                            <ul className={`${ActiveHeading === 6 && 'active'}`}>
                                <li><ListIcon /> ODA & RTO Block Pincodes</li>
                                <li><ListIcon /> Courier Priority</li>
                                <li><ListIcon /> Advanced Courier Rule</li>
                                <li><ListIcon /> Courier Selection</li>
                            </ul>
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