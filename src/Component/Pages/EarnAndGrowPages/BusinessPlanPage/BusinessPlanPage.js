import React from 'react'
import './BusinessPlanPage.css'

const BusinessPlanPage = () => {
    return (
        <>
            <section className='business-plan-page box-shadow shadow-sm h-100'>
                <h2 className='mt-3 text-center'>Grab The Perfect Plan for Your Needs</h2>
                <p className='text-center text-sh-primary'>Our transparent pricing makes it easy to find a plan that works within your financial constraints.</p>
                <div className='mt-3 plans-container'>
                    <div className='plan-item shadow-sm'>
                        <h4>Standard</h4>
                        <div className='plan-price'>
                            {/* <span>₹</span> */}
                            <p>30/500 gms</p>
                        </div>
                        <p className='mt-3'>Unlock advanced features and priority support.</p>
                    </div>
                    <div className='plan-item shadow-sm'>
                        <h4>Advanced</h4>
                        <div className='plan-price'>
                            {/* <span>₹</span> */}
                            <p>25/500 gms</p>
                        </div>
                        <p className='mt-3'>Access premium tools and team colaboration options</p>
                    </div>
                    <div className='plan-item shadow-sm'>
                        <h4>Business</h4>
                        <div className='plan-price'>
                            {/* <span>₹</span> */}
                            <p>20/500 gms</p>
                        </div>
                        <p className='mt-3'>Customizable solutions for large shipping and dedicated support.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BusinessPlanPage