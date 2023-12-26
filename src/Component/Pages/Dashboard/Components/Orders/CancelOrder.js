import React from "react";
import CancelOrders from '../../../../../assets/image/CancelOrders.png'

function CancelOrder() {

    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h4 className="title">Cancel Orders</h4>
                    <img className="graph-image" src={CancelOrders} alt="CancelOrders"/>
                </div>
            </div>
        </div>
    );
}

export default CancelOrder;
