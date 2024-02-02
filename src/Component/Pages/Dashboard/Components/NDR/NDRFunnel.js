import React from 'react'
import NDRfunnel from '../../../../../assets/image/NDRfunnel.png'

const NDRFunnel = () => {
  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <div className="row">
          <div className="col">
            <h4 className="title">NDR Funnel</h4>
            <img  className="graph-image p10" src={NDRfunnel} alt="NDRfunnel" />
          </div>
        </div>
      </div>
    </>
  )
}

export default NDRFunnel