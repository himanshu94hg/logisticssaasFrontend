import React from 'react'
import ForwardReverseOrderGraph from '../../../../../assets/image/ForwardReverseOrderGraph.png'

const ForwardReverseOrder = () => {
    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    {/* <h4 className="title">Cancel Orders</h4> */}
                    <img className="graph-image p10" src={ForwardReverseOrderGraph} alt="ForwardReverseOrderGraph" />
                </div>
            </div>
        </div>
    )
}

export default ForwardReverseOrder