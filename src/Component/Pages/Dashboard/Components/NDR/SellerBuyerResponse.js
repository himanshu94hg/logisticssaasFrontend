import React from 'react'
import SellerBuyer from '../../../../../assets/image/SellerBuyer.png'

const SellerBuyerResponse = () => {
  return (
    <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Seller/Buyer Response</h4>
                        <img className="graph-image" src={SellerBuyer} alt="SellerBuyer"/>
                    </div>
                </div>
            </div>
        </>
  )
}

export default SellerBuyerResponse