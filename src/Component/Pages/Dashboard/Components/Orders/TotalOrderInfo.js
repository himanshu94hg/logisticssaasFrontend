import React, { useState } from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import iconRTO from '../../../../../assets/image/icons/RTO_icon.png';
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png';
import iconOrders from '../../../../../assets/image/icons/Orders_icon.png';
import { useSelector } from "react-redux";

function TotalOrderInfo() {
  const { orderCount } = useSelector(state => state?.dashboardOrderReducer)


  // const { today_order, cancel_order, yet_to_pick, reverse_order } = orderCount;

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
                    <h3 className="font20 title-text p-y bold-600 m0">{orderCount?.today_order}</h3>
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
                      <img src={iconDelivery} alt="iconDelivery" width={24} />

                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Cancel Order</p>
                    <h3 className="font20 title-text p-y bold-600 m0">
                      {orderCount?.cancel_order}
                    </h3>
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

        {/* Card 3 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg blue-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-10 left-text">
                    <div className="CardIconContainer icon-bg">
                      <img src={iconDelivery} alt="iconDelivery" width={24} />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Yet To Pick</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{orderCount?.yet_to_pick}</h3>
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
                      <img src={iconRTO} alt="iconRTO" width={24} />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Reverse Orders</p>
                    <h3 className="font20 title-text p-y bold-600 m0">
                      {orderCount?.reverse_order}
                    </h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingDown className="trending-icon" />
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
