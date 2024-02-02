import React from 'react'
import InTransitDelayGraph from '../../../../../assets/image/InTransitDelayGraph.png'

const InTransitDelay = () => {
  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <h4 className="title">In-Transit Delay</h4>
        <img className="graph-image" src={InTransitDelayGraph} alt="InTransitDelayGraph" />
      </div>
    </>
  )
}

export default InTransitDelay