import React from 'react'
import ZoneImage from '../../../../../assets/image/ZoneImage.png'

const ZoneWiseData = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Zone Wise Data</h4>
                        <img className="graph-image" src={ZoneImage} alt="ZoneImage" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ZoneWiseData