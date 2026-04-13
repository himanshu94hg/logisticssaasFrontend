import React, { useState, useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiUser } from "react-icons/ci";
import Col from "react-bootstrap/Col";
import TableDashboard from "./TableDashboard";
import './totalInfoDashboard.css'
import LineGraph from "../../../../common/Graph/LineGraph";
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

  const { screenWidthData } = useSelector(state => state?.authDataReducer)

  return (
    <>
      <div className="grid gap-3">
        {/* Card 1 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height total-customer-kpi-card">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className={`d-flex justify-content-start ${screenWidthData > 376 && 'gap-10'}`}>
                  <div className="">
                    <div className="infoCardIconContainer total-customer-icon-bg">
                      <TotalCustomersIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 m-0 total-customer-kpi-title">Total Customer</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterCard?.total_customers || 0}
                    </h2>
                    <p className="font12 ws-nowrap total-customer-active-label">Active customers</p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="#16A34A" />
                <div className="card-footer">
                  <span className="total-customer-trend-text font13 pt20 bold-600 d-block text-end">
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
          <div className="box-shadow shadow-sm p10 card-height daily-shipment-kpi-card">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className={`d-flex justify-content-start ${screenWidthData > 376 ? 'gap-10' : 'ws-nowrap'}`}>
                  <div className="">
                    <div className="infoCardIconContainer daily-shipment-icon-bg">
                      <OrangeShipmentIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 m-0 daily-shipment-kpi-title">Daily Shipment</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterCard?.daily_shipment}
                    </h2>
                    <p className="font12 daily-shipment-booked-label">Booked
                      {dailyShipment?.total_pending_data}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="#F97316" />
                <div className="card-footer">
                  <span className="daily-shipment-trend-text font13 pt20 bold-600 d-block text-end">
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
          <div className="box-shadow shadow-sm p10 card-height avg-selling-price-kpi-card">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className={`d-flex justify-content-start ${screenWidthData > 376 && 'gap-10'}`}>
                  <div className="">
                    <div className="infoCardIconContainer avg-selling-price-icon-bg">
                      <AverageSellingPriceIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 m-0 avg-selling-price-kpi-title">Average Selling Price</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterCard?.avg_selling_price || 0}
                    </h2>
                    <p className="font12 text-gray invisible">Seller </p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="#3B82F6" />
                <div className="card-footer">
                  <span className="avg-selling-price-trend-text font13 pt20 bold-600 d-block text-end">
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
          <div className="box-shadow shadow-sm p10 card-height today-revenue-kpi-card">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className={`d-flex justify-content-start ${screenWidthData > 376 && 'gap-10'}`}>
                  <div className="">
                    <div className="infoCardIconContainer today-revenue-icon-bg">
                      <TodayRevenueIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 m-0 today-revenue-kpi-title">Today’s Revenue</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterCard?.today_revenue || 0}
                    </h2>
                    <p className="font12 text-gray invisible">Yesterday
                      {todayRevenue?.yesterday_revenue}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="#8B5CF6" />
                <div className="card-footer">

                  <span className="today-revenue-trend-text font13 pt20 bold-600 d-block text-end">
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
     
    </>
  );
}

export default TotalInfoDashboard;
