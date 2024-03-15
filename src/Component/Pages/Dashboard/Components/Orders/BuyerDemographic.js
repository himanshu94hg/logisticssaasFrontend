import React from 'react'
import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { useSelector } from 'react-redux';

const BuyerDemographic = ({}) => {
const {buyerDemographicCard}=useSelector(state=>state?.dashboardOrderReducer)

    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Buyer Demographic</h4>
                        <div className='content-container p10'>
                            <div className='gender-side'>
                                <div className='gender-icon female'>
                                    <FaFemale height={30} />
                                </div>
                                <div className='d-flex flex-column gap-1'>
                                    <h5 className='font13 mb-0'>Female</h5>
                                    <h5 className='fw-bold'>{buyerDemographicCard?.female}%</h5>
                                </div>
                            </div>
                            <div className='gender-side'>
                                <div className='gender-icon male'>
                                    <FaMale />
                                </div>
                                <div className='d-flex flex-column gap-1'>
                                    <h5 className='font13 mb-0'>Male</h5>
                                    <h5 className='fw-bold'>{buyerDemographicCard?.male}%</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyerDemographic