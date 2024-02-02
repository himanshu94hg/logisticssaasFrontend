import React from 'react'
import NDRstatus from '../../../../../assets/image/NDRstatus.png'

const NDRStatus = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">NDR Status</h4>
                        <img className="graph-image p10" src={NDRstatus} alt="NDRstatus" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NDRStatus