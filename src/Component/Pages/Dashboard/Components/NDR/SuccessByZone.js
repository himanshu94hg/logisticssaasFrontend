import React from 'react'
import SuccessZoneGraph from '../../../../../assets/image/SuccessZoneGraph.png'

const SuccessByZone = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Success by Zone</h4>
                        <img className="graph-image" src={SuccessZoneGraph} alt="SuccessZoneGraph" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuccessByZone