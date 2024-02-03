import React from 'react'
import LastMileDelayGraph from '../../../../../assets/image/LastMileDelayGraph.png'

const LastMileDelay = () => {
  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <h4 className="title">Last Mile Delay</h4>
        <img className="graph-image" src={LastMileDelayGraph} alt="LastMileDelayGraph" />
      </div>
    </>
  )
}

export default LastMileDelay