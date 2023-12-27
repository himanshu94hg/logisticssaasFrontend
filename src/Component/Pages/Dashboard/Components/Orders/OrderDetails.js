import React from "react";
import OrdersDetailsGraph from '../../../../../assets/image/OrdersDetailsGraph.png'

function OrderDetails() {

    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    {/* <h4 className="title">Cancel Orders</h4> */}
                    <img className="graph-image" src={OrdersDetailsGraph} alt="OrdersDetailsGraph"/>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
