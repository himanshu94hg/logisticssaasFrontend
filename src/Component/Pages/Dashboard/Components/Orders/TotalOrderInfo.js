import React, { useState } from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import iconRTO from '../../../../../assets/image/icons/RTO_icon.png';
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png';
import iconOrders from '../../../../../assets/image/icons/Orders_icon.png';
import { useSelector } from "react-redux";
import './TotalOrderInfo.css'
import AllOrdersIcons from "../../../../common/Icons/InfoCardsIcons/AllOrdersIcons";
import CancelledOrdersIcon from "../../../../common/Icons/InfoCardsIcons/CancelledOrdersIcon";
import YetToPickIcon from "../../../../common/Icons/InfoCardsIcons/YetToPickIcon";
import ReverseOrdersIcon from "../../../../common/Icons/InfoCardsIcons/ReverseOrdersIcon";

function TotalOrderInfo() {
  const { orderCount } = useSelector(state => state?.dashboardOrderReducer)


  // const { today_order, cancel_order, yet_to_pick, reverse_order } = orderCount;

  return (
    <>
      <div className="grid gap-3">
        {/* Card 1 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className="d-flex justify-content-start gap-10">
                  <div className="">
                    <div className="infoCardIconContainer bg-green-light">
                      <AllOrdersIcons />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Total Orders</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {orderCount?.today_order}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <div className="card-footer">
                  <span className="text-green font13 pt20 bold-600 d-block text-end">
                    0 %
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-nowrap">
                    Comparative analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className="d-flex justify-content-start gap-10">
                  <div className="">
                    <div className="infoCardIconContainer bg-orange-light">
                      <CancelledOrdersIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Cancelled Orders</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {orderCount?.cancel_order}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <div className="card-footer">
                  <span className="text-yellow font13 pt20 bold-600 d-block text-end">
                    +0%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-nowrap">
                    Comparative analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Card 3 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className="d-flex justify-content-start gap-10">
                  <div className="">
                    <div className="infoCardIconContainer bg-blue-light">
                      <YetToPickIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Yet To Pick</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {orderCount?.yet_to_pick || 0}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <div className="card-footer">
                  <span className="text-blue font13 pt20 bold-600 d-block text-end">
                    +0%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-nowrap">
                    Comparative analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className="d-flex justify-content-start gap-10">
                  <div className="">
                    <div className="infoCardIconContainer bg-red-light">
                      <ReverseOrdersIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Reverse Orders</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {orderCount?.reverse_order || 0}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <div className="card-footer">
                  <span className="text-red font13 pt20 bold-600 d-block text-end">
                    + 0%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-nowrap">
                    Comparative analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default TotalOrderInfo;
