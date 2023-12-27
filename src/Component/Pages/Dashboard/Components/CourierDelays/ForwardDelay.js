import React from 'react'
import ForwardDelayGraph from '../../../../../assets/image/ForwardDelayGraph.png'

const ForwardDelay = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Forward Delay</h4>
                <img className="graph-image" src={ForwardDelayGraph} alt="ForwardDelayGraph" />
            </div>
        </>
    )
}

export default ForwardDelay