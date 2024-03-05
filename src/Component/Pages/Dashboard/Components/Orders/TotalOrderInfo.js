import React, { useState } from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import iconRTO from '../../../../../assets/image/icons/RTO_icon.png';
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png';
import iconOrders from '../../../../../assets/image/icons/Orders_icon.png';

function TotalOrderInfo() {
  // Dummy data
  const dummyData = {
    total_orders_count: 1000,
    total_cancel_order_count: 50,
    total_Delivered_order_count: 900,
    total_return_to_origin_order_count: 20
  };

  // Destructure dummy data
  const {
    total_orders_count,
    total_cancel_order_count,
    total_Delivered_order_count,
    total_return_to_origin_order_count
  } = dummyData;

  return (
    <>
      <div className="grid gap-3">
        {/* Card 1 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg green-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-10 left-text">
                    <div className="CardIconContainer icon-bg">
                      <img src={iconOrders} alt="iconOrders" width={24} />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Total Orders</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{total_orders_count}</h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingUp className="trending-icon" />
                  </div>
                </div>
              </div>
              <div className="col-12">
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg yellow-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                  <img src={iconDelivery} alt="iconDelivery" width={24}/>

                  </div>
                  <p className="font14 text-gray m-0 ws-nowrap">Cancel Order</p>
                  <h3 className="font20 title-text p-y bold-600 m0">
                    {total_cancel_order_count} 
                    </h3>
                </div>
                  <div className="col-2">
                  <HiTrendingUp className="trending-icon"/>
                  </div>
              </div>
              </div>
              <div className="col-12">
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg blue-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                    <img src={iconDelivery} alt="iconDelivery" width={24}/>
                  </div>
                  <p className="font14 text-gray m-0 ws-nowrap">Yet To Pick</p>
                  <h3 className="font20 title-text p-y bold-600 m0">{total_Delivered_order_count}</h3>
                </div>
                  <div className="col-2">
                  <HiTrendingUp className="trending-icon" />
                  </div>
              </div>
              </div>
              <div className="col-12">
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg red-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                    <img src={iconRTO} alt="iconRTO" width={24}/>
                  </div>
                  <p className="font14 text-gray m-0 ws-nowrap">Reverse Orders</p>
                  <h3 className="font20 title-text p-y bold-600 m0">
                    {total_return_to_origin_order_count}
                    </h3>
                </div>
                  <div className="col-2">
                  <HiTrendingDown className="trending-icon"/>
                  </div>
              </div>
              </div>
              <div className="col-12">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TotalOrderInfo;
