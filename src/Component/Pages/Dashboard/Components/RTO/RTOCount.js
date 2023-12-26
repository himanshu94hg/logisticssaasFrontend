import React from 'react'
import CancelOrders from '../../../../../assets/image/CancelOrders.png'

const RTOCount = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">RTO Status</h4>
                <img className="graph-image" src={CancelOrders} alt="CancelOrders" />
            </div>
        </>
    )
}

export default RTOCount