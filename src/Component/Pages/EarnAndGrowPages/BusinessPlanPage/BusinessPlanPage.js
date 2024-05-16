import React from 'react'
import './BusinessPlanPage.css'
import ListIcon from './ListIcon'

const BusinessPlanPage = () => {
    return (
        <>
            <section className='business-plan-page box-shadow shadow-sm h-100'>
                <h2 className='mt-3 text-center'>Grab The Perfect Plan for Your Needs</h2>
                <p className='text-center text-sh-primary'>Our transparent pricing makes it easy to find a plan that works within your financial constraints.</p>
                <div className='plans-container'>
                    <div className='plan-item'>
                        <h4>Standard</h4>
                        <div className='plan-price'>
                            {/* <span>₹</span> */}
                            <p>30/500</p>
                        </div>
                        <p className='mt-3'>Unlock advanced features and priority support.</p>
                        <div className='plans-features'>
                            <ul className=''>
                                <li><ListIcon /> 1 Ecommerce Channel Integration</li>
                                <li><ListIcon /> Chat, Call & Email Support</li>
                                <li><ListIcon /> Automated Channel Order Sync</li>
                                <li><ListIcon /> Domestic And International Shipping</li>
                            </ul>
                        </div>
                        <button className='btn main-button-outline mt-4'>Get Started</button>
                    </div>
                    <div className='plan-item'>
                        <h4>Advanced</h4>
                        <div className='plan-price'>
                            {/* <span>₹</span> */}
                            <p>25/500</p>
                        </div>
                        <p className='mt-3'>Access premium tools and team colaboration options</p>
                        <div className='plans-features'>
                            <ul className=''>
                                <li><ListIcon /> 5 Ecommerce Channel Integration</li>
                                <li><ListIcon /> Chat, Call & Email Support</li>
                                <li><ListIcon /> Automated Channel Order Sync</li>
                                <li><ListIcon /> Domestic And International Shipping</li>
                            </ul>
                        </div>
                        <button className='btn main-button-outline mt-4'>Get Started</button>
                    </div>
                    <div className='plan-item'>
                        <h4>Business</h4>
                        <div className='plan-price'>
                            <p>20/500</p>
                        </div>

                        <p className='mt-3'>Customizable solutions for large shipping and dedicated support.</p>
                        <div className='plans-features'>
                            <ul className=''>
                                <li><ListIcon /> Intelligent Courier Allocation</li>
                                <li><ListIcon /> Unlimited Ecommerce Channel Integration</li>
                                <li><ListIcon /> Domestic Shipping</li>
                                <li><ListIcon /> Automated Channel Order Sync</li>
                                <li><ListIcon /> Ndr Calling And Ivr Response Setup</li>
                            </ul>
                        </div>
                        <button className='btn main-button-outline mt-4'>Get Started</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BusinessPlanPage