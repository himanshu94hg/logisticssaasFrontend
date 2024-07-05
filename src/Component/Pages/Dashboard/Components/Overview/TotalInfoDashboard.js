import React, { useState, useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiUser } from "react-icons/ci";
import Col from "react-bootstrap/Col";
import TableDashboard from "./TableDashboard";
import './totalInfoDashboard.css'
import Graph from "../../../../common/Graph/Graph";
import LineGraph from "../../../../common/Graph/LineGraph";
import DataTable from "./DataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { dateRangeDashboard } from "../../../../../customFunction/dateRange";
import TotalCustomersIcon from "../../../../common/Icons/InfoCardsIcons/TotalCustomersIcon";
import OrangeShipmentIcon from "../../../../common/Icons/InfoCardsIcons/OrangeShipmentIcon";
import AverageSellingPriceIcon from "../../../../common/Icons/InfoCardsIcons/AverageSellingPriceIcon";
import TodayRevenueIcon from "../../../../common/Icons/InfoCardsIcons/TodayRevenueIcon";

function TotalInfoDashboard() {
  const dispatch = useDispatch()
  const [todayRevenue, setTodayRevenue] = useState(null);
  const [dailyShipment, setDailyShipment] = useState(null);
  const [totalCustomer, setTotalCustomer] = useState(null);
  const [avarageSelling, setAverageSelling] = useState(null);
  const { counterCard } = useSelector(state => state?.dashboardOverviewReducer)


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
                      <TotalCustomersIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Total Customer</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterCard?.total_customers || 0}
                    </h2>
                    <p className="font12 text-green ws-nowrap">Active customers</p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="#3BB54B" />
                <div className="card-footer">
                  <span className="text-green font13 pt20 bold-600 d-block text-end">
                    {totalCustomer?.percentage_increase_last_30_days_vs_last_60_days | 0} %
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
                      <OrangeShipmentIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Daily Shipment</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterCard?.daily_shipment}
                    </h2>
                    <p className="font12 text-yellow">Booked
                      {dailyShipment?.total_pending_data}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="#F6B954" />
                <div className="card-footer">
                  <span className="text-yellow font13 pt20 bold-600 d-block text-end">
                    {dailyShipment ? `+${dailyShipment.average_shipment_per_day}%` : '+0%'}
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
                      <AverageSellingPriceIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Average Selling Price</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterCard?.avg_selling_price || 0}
                    </h2>
                    <p className="font12 text-blue invisible">Seller </p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="#1975C9" />
                <div className="card-footer">
                  <span className="text-blue font13 pt20 bold-600 d-block text-end">
                    +{avarageSelling?.percentage_change || 0}%
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
                      <TodayRevenueIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Today’s Revenue</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterCard?.today_revenue || 0}
                    </h2>
                    <p className="font12 text-red invisible">Yesterday
                      {todayRevenue?.yesterday_revenue}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="rgba(255, 100, 112, 1)" />
                <div className="card-footer">

                  <span className="text-red font13 pt20 bold-600 d-block text-end">
                    {todayRevenue ? `+${todayRevenue.percentage_change}%` : '+0%'}

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
      {/* <TableDashboard /> */}
      {/* <div className="mt-3 datatable-container">
      <h4 className="title">Last 30 Days Order</h4>
      <DataTable/>
      </div> */}
    </>
  );
}

export default TotalInfoDashboard;
