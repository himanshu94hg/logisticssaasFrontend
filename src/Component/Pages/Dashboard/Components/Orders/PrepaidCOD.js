import React from 'react'
import CancelOrders from '../../../../../assets/image/CancelOrders.png'

const PrepaidCOD = () => {
  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <div className="row">
          <div className="col">
            <h4 className="title">Prepaid V/S COD Orders</h4>
          </div>
        </div>
        <img className="graph-image" src={CancelOrders} alt="CancelOrders" />
      </div>
    </>
  )
}

export default PrepaidCOD