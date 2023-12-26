import React from 'react'
import SuccessCourierGraph from '../../../../../assets/image/SuccessCourierGraph.png'

const SuccessbyCourier = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Success by Courier</h4>
                        <img className="graph-image" src={SuccessCourierGraph} alt="SuccessCourierGraph" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuccessbyCourier