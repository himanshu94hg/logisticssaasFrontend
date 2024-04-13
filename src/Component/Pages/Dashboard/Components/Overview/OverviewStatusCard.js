import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatNumber } from '../../../../../customFunction/functionLogic'

const OverviewStatusCard = () => {

    const { codDetails, ndrDetails, rtoDetails } = useSelector(state => state?.dashboardOverviewReducer)


    console.log(codDetails, ndrDetails, rtoDetails, "this is a details data")

    return (
        <>
            <div className="box-shadow shadow-sm p10 status-card-container">
                <div className='status-container-item'>
                    <div className='status-header'>
                        <p>COD</p>
                        {/* <p className='header-polygon'></p> */}
                    </div>
                    <div className='status-item'>
                        <div className='status-counter'>
                            <p>Total</p>
                            <p>{formatNumber(codDetails?.total_cod || 0)}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Remitted</p>
                            <p>{formatNumber(codDetails?.remitted_cod || 0)}</p>
                        </div>
                        <div className='status-counter'>
                            <p> Pending</p>
                            <p>{formatNumber(codDetails?.cod_pending || 0)}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Today's Remittance</p>
                            <p>{formatNumber(codDetails?.total_cod || 0)}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Upcoming Remittance</p>
                            <p>{formatNumber(codDetails?.next_remit_amount || 0)}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Remit Date</p>
                            <p>{moment(codDetails?.next_remit_date).format("MMM Do")}</p>
                        </div>

                    </div>
                </div>
                <hr className='mx-auto' style={{ width: '80%' }} />
                <div className='status-container-item'>
                    <div className='status-header'>
                        <p>NDR</p>
                        {/* <p className='header-polygon'></p> */}
                    </div>
                    <div className='status-item'>
                        <div className='status-counter'>
                            <p>Total </p>
                            <p>{ndrDetails?.total_ndr || 0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Action Required</p>
                            <p>{ndrDetails?.action_required || 0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Action Requested</p>
                            <p>{ndrDetails?.action_requested || 0}</p>
                        </div>
                        <div className='status-counter'>
                            <p> Delivered</p>
                            <p>{ndrDetails?.ndr_delivered || 0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>RTO</p>
                            <p>{ndrDetails?.ndr_rto || 0}</p>
                        </div>
                    </div>
                </div>
                <hr className='mx-auto' style={{ width: '80%' }} />
                <div className='status-container-item'>
                    <div className='status-header'>
                        <p>RTO</p>
                        {/* <p className='header-polygon'></p> */}
                    </div>
                    <div className='status-item'>
                        <div className='status-counter'>
                            <p>Total</p>
                            <p>{rtoDetails?.rto_orders || 0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Inititated</p>
                            <p>{rtoDetails?.rto_inititated || 0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Intransit</p>
                            <p>{rtoDetails?.rto_intransit || 0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Delivered</p>
                            <p>{rtoDetails?.rto_delivered || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverviewStatusCard