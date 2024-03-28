import React from 'react'
import { useSelector } from 'react-redux'

const OverviewStatusCard = () => {

  const { codDetails, ndrDetails, rtoDetails } = useSelector(state => state?.dashboardOverviewReducer)


  console.log(codDetails,ndrDetails,rtoDetails,"this is a details data")

    return (
        <>
            <div className="box-shadow shadow-sm p10 status-card-container">
                <div className='status-container-item'>
                    <div className='status-header'>
                        <p>NDR Status</p>
                    </div>
                    <div className='status-item'>
                        <div className='status-counter'>
                            <p>Total NDR</p>
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
                            <p>NDR Delivered</p>
                            <p>{ndrDetails?.ndr_delivered || 0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>NDR RTO</p>
                            <p>{ndrDetails?.ndr_rto || 0}</p>
                        </div>
                    </div>
                </div>
                <div className='status-container-item'>
                    <div className='status-header'>
                        <p>COD Status</p>
                    </div>
                    <div className='status-item'>
                        <div className='status-counter'>
                            <p>Total COD</p>
                            <p>{codDetails?.total_cod ||0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Remitted COD</p>
                            <p>{codDetails?.remitted_cod ||0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>COD Pending</p>
                            <p>{codDetails?.cod_pending ||0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Next Remit Date</p>
                            <p>{codDetails?.next_remit_date||0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>Next Remit Amount</p>
                            <p>{codDetails?.next_remit_amount||0}</p>
                        </div>
                    </div>
                </div>
                <div className='status-container-item'>
                    <div className='status-header'>
                        <p>RTO Status</p>
                    </div>
                    <div className='status-item'>
                        <div className='status-counter'>
                            <p>RTO Orders</p>
                            <p>{rtoDetails?.rto_orders ||0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>RTO Inititated</p>
                            <p>{rtoDetails?.rto_inititated ||0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>RTO Intransit</p>
                            <p>{rtoDetails?.rto_intransit||0}</p>
                        </div>
                        <div className='status-counter'>
                            <p>RTO Delivered</p>
                            <p>{rtoDetails?.rto_delivered||0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverviewStatusCard