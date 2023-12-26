import React from 'react'
import RTOStatusGraph from '../../../../../assets/image/RTOStatusGraph.png'

const RTOStatus = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">RTO Status</h4>
                <img className="graph-image p10" src={RTOStatusGraph} alt="RTOStatusGraph" />
            </div>
        </>
    )
}

export default RTOStatus