import React from 'react'
import CancelOrders from '../../../../../assets/image/CancelOrders.png'

const DeliveryPerformance = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Delivery Performance</h4>
                <img className="graph-image" src={CancelOrders} alt="CancelOrders" />
            </div>
        </>
    )
}

export default DeliveryPerformance