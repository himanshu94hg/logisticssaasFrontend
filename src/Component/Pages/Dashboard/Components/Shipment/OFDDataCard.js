import React from 'react'
import OfdData from '../../../../../assets/image/OfdData.png'

const OFDDataCard = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">OFD Data</h4>
                        <img className="graph-image" src={OfdData} alt="OfdData" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OFDDataCard