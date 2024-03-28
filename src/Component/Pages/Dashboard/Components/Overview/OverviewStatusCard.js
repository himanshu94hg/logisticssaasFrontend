import React from 'react'

const OverviewStatusCard = () => {
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
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>Action Required</p>
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>Action Requested</p>
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>NDR Delivered</p>
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>NDR RTO</p>
                            <p>100</p>
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
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>Remitted COD</p>
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>COD Pending</p>
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>Next Remit Date</p>
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>Next Remit Amount</p>
                            <p>100</p>
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
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>RTO Inititated</p>
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>RTO Intransit</p>
                            <p>100</p>
                        </div>
                        <div className='status-counter'>
                            <p>RTO Delivered</p>
                            <p>100</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverviewStatusCard