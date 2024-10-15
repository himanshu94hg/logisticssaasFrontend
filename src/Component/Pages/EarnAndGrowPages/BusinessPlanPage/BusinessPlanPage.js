import React from 'react'
import './BusinessPlanPage.css'
import ListIcon from './ListIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const BusinessPlanPage = () => {
    return (
        <>
            <section className='business-plan-page box-shadow shadow-sm'>
                <h2 className='mt-3 text-center'>Grab The Perfect Plan for Your Needs</h2>
                <p className='text-center text-sh-primary'>Our transparent pricing makes it easy to find a plan that works within your financial constraints.</p>
                <div className='plans-container'>
                    <div className='plan-item'>
                        <h4>Standard</h4>
                        <div className='plan-price'>
                            <p>26.27/0.5</p>
                        </div>
                        <p className='mt-3'>Unlock advanced features and priority support.</p>
                        <div className='plans-features'>
                            <ul className=''>
                                <li><ListIcon /> No Minimum Signup Period</li>
                                <li><ListIcon /> 20+ Courier Partners Available</li>
                                <li><ListIcon /> International Shipping</li>
                                <li><ListIcon /> 5 Pickup Addresses</li>
                                <li><ListIcon /> Product Weight Freeze</li>
                                <li><ListIcon /> Payment Mode Change</li>
                                <li><ListIcon /> Split Shipment</li>
                                <li><ListIcon /> Merge Shipment</li>
                                <li><ListIcon /> NDR & RTO Management</li>
                                <li><ListIcon /> API Access</li>
                                <li><ListIcon /> Autosync Channel Orders</li>
                                <li><ListIcon /> Bulk Order Upload & Processing</li>
                                <li><ListIcon /> Bulk Shipping Manifests</li>
                                <li><ListIcon /> Partial Label & Invoices Creation</li>
                                <li><ListIcon /> Partial Label Customization</li>
                                <li><ListIcon /> Reporting</li>
                                <li><ListIcon /> Rate Calculator</li>
                                <li><ListIcon /> Billing Management</li>
                                <li><ListIcon /> COD Reconciliation and Settlement</li>
                                <li><ListIcon /> Early COD</li>
                                <li><ListIcon /> GSTIN Invoicing </li>
                                <li><ListIcon /> Training & Setup Assistance</li>
                                <li><ListIcon /> Weekly Webinars</li>
                                <li><ListIcon /> Ticket Support and Panel Escalations</li>
                                <li><ListIcon /> Real Time Shipment Tracking and Notifications</li>
                                <li><ListIcon /> Return Management Panel</li>
                                <li><ListIcon /> Refund Management</li>
                                <li><ListIcon /> ODA & RTO Block Pincodes</li>
                                <li><ListIcon /> Courier Priority</li>
                                <li><ListIcon /> Courier Selection</li>
                                <li><ListIcon /> WhatsApp notification on 0.99 per message</li>
                                <li><ListIcon /> WhatsApp Bots on 0.99 per message</li>
                                <li><ListIcon /> Refer and Earn</li>
                                <li><ListIcon /> Webhook</li>
                                <li><ListIcon /> 2 Sales Channel Integrations</li>
                                <li><ListIcon /> Basic Analytics Dashboard</li>
                                <li><ListIcon /> Free Shipping</li>
                            </ul>
                        </div>
                        <button className='btn main-button-outline mt-4'>Get Started</button>
                    </div>
                    <div className='plan-item'>
                        <h4>Pro</h4>
                        <div className='plan-price'>
                            <p>23.88/0.5</p>
                        </div>
                        <p className='mt-3'>Access premium tools and team colaboration options</p>
                        <div className='plans-features'>
                            <ul className=''>
                                <li><ListIcon /> All Features of Standard Plan</li>
                                <li><ListIcon /> 2-Month Minimum Signup Period</li>
                                <li><ListIcon /> 30+ Courier Partners Available</li>
                                <li><ListIcon /> Order Verification for Accuracy</li>
                                <li><ListIcon /> 10+ Pickup Address</li>
                                <li><ListIcon /> Automated Emails and SMS</li>
                                <li><ListIcon /> 5 Sales Channel Integrations</li>
                                <li><ListIcon /> Complete Label & Invoices Creation</li>
                                <li><ListIcon /> Complete Label Customization</li>
                                <li><ListIcon /> Partial Invoice & POD Customization</li>
                                <li><ListIcon /> 5 User Login & Role Management</li>
                                <li><ListIcon /> Standard Analytics Dashboard</li>
                                <li><ListIcon /> Email & Chat Support</li>
                                <li><ListIcon /> Advanced Courier Rule</li>
                                <li><ListIcon /> WhatsApp notification on 0.70 per message</li>
                                <li><ListIcon /> WhatsApp Bots on 0.70 per message</li>
                            </ul>
                        </div>
                        <button className='btn main-button-outline mt-4'>Get Started</button>
                    </div>
                    <div className='plan-item'>
                        <h4>Pro <FontAwesomeIcon icon={faPlus} /></h4>
                        <div className='plan-price'>
                            <p>20.34/0.5</p>
                        </div>

                        <p className='mt-3'>Customizable solutions for large shipping and dedicated support.</p>
                        <div className='plans-features'>
                            <ul className=''>
                                <li><ListIcon /> All Features of Standard and Pro Plan</li>
                                <li><ListIcon /> 1-Month Minimum Signup Period</li>
                                <li><ListIcon /> 30+ Courier Partners Available</li>
                                <li><ListIcon /> Order Verification for Accuracy</li>
                                <li><ListIcon /> Unlimited Pickup Address</li>
                                <li><ListIcon /> Automated Emails and SMS</li>
                                <li><ListIcon /> Unlimited Sales Channel Integrations</li>
                                <li><ListIcon /> Complete Invoice & POD Customization</li>
                                <li><ListIcon /> Unlimited User Login & Role Management</li>
                                <li><ListIcon /> Advanced Analytics Dashboard</li>
                                <li><ListIcon /> Report Scheduler</li>
                                <li><ListIcon /> Custom - COD Accounts/Invoicing</li>
                                <li><ListIcon /> Dedicated Key Account Manager for tiers</li>
                                <li><ListIcon /> 24*7 Support</li>
                                <li><ListIcon /> Email & Chat Support</li>
                                <li><ListIcon /> Multiple Email templates</li>
                                <li><ListIcon /> Custom Branding Page with NPS</li>
                                <li><ListIcon /> Advanced Courier Rule</li>
                                <li><ListIcon /> WhatsApp notification on 0.60 per message</li>
                                <li><ListIcon /> WhatsApp Bots on 0.60 per message</li>
                                <li><ListIcon /> Free Shipping</li>
                                <li><ListIcon /> Trackinng Script</li>
                                <li><ListIcon /> Business Health Dashoard</li>


                                {/* 
                                <li><ListIcon /> Intelligent Courier Allocation</li>
                                <li><ListIcon /> Unlimited Ecommerce Channel Integration</li>
                                <li><ListIcon /> Domestic Shipping</li>
                                <li><ListIcon /> Automated Channel Order Sync</li>
                                <li><ListIcon /> Ndr Calling And Ivr Response Setup</li> 
                                */}
                            </ul>
                        </div>
                        <button className='btn main-button-outline mt-4'>Get Started</button>
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

export default BusinessPlanPage