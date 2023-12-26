import React from 'react'
import PickupDelayGraph from '../../../../../assets/image/PickupDelayGraph.png'

const ForwardDelay = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Forward Delay</h4>
                <img className="graph-image" src={PickupDelayGraph} alt="PickupDelayGraph" />
            </div>
        </>)
}

export default ForwardDelay