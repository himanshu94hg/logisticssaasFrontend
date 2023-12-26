import React from 'react'
import NDRresponse from '../../../../../assets/image/NDRresponse.png'

const NDRResponse = () => {
  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <div className="row">
          <div className="col">
            <h4 className="title">NDR Response</h4>
            <img className="graph-image p10" src={NDRresponse} alt="NDRresponse" />
          </div>
        </div>
      </div>
    </>
  )
}

export default NDRResponse