import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import '../Overview/totalInfoDashboard.css'
import DataTable from "../Overview/DataTable/DataTable";
import TableDashboard from '../Overview/TableDashboard'
import './NDRTotalInfo.css'
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import iconRTO from '../../../../../assets/image/icons/RTO_icon.png'
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png'
import NDRicon from '../../../../../assets/image/icons/NDRicon.png'
import NDRdelivered from '../../../../../assets/image/icons/NDRdelivered.png'

function NDRTotalInfo() {
  const [shipmentCounter, setShipmentCounter] = useState("345");
  const [totalCustomer, setTotalCustomer] = useState("200");
  const [dailyShipment, setDailyShipment] = useState("367");
  const [averageSelling, setAverageSelling] = useState("456");
  const [todayRevenue, setTodayRevenue] = useState("987");
  const requestData = {
    sellerId: "16",
    start: "2023-10-01 00:00:00",
    end: "2023-10-30 00:00:00",
  };

  useEffect(() => {
    axios
      .post(
        "https://www.shipease.in/api/microservices/dashboard/overview/get-summary-counter",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setShipmentCounter(response.data.data);
        if (response.data.data) {
          const newTotalRevenue = response.data.data;
          const toBePickedPercentage = newTotalRevenue?.total_customer + newTotalRevenue?.daily_shipment + newTotalRevenue?.average_selling + newTotalRevenue?.today_revenue;
          const total = newTotalRevenue?.total_customer * 100 / toBePickedPercentage;
          setTotalCustomer(total.toFixed(2));
          const daily = newTotalRevenue?.daily_shipment * 100 / toBePickedPercentage;
          setDailyShipment(daily.toFixed(2));
          const average = newTotalRevenue?.average_selling * 100 / toBePickedPercentage;
          setAverageSelling(average.toFixed(2));
          const today = newTotalRevenue?.today_revenue * 100 / toBePickedPercentage;
          setTodayRevenue(today.toFixed(2));
        }
      })
      .catch((error) => {
        console.error(error);
        setShipmentCounter(null);
      });
  }, []);

  return (
    <>
      <div className="row">
        {/* Card 1 */}
        <div className="col-3">
          <div className="box-shadow shadow-sm p10 card-height wave-bg green-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                    <img src={NDRicon} alt="iconOrders" width={24} />
                  </div>
                  <p className="font14 text-gray m-0 ws-no-wrap">Total NDR</p>
                  <h3 className="font20 title-text p-y bold-600 m0">{parseInt(shipmentCounter?.average_selling)}</h3>
                </div>
                  <div className="col-2">
                  <HiTrendingUp className="trending-icon" />
                  </div>
              </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-3">
          <div className="box-shadow shadow-sm p10 card-height wave-bg yellow-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                  <img src={iconDelivery} alt="iconDelivery" width={24}/>

                  </div>
                  <p className="font14 text-gray m-0 ws-no-wrap">Action Required</p>
                  <h3 className="font20 title-text p-y bold-600 m0">{parseInt(shipmentCounter?.average_selling)}</h3>
                </div>
                  <div className="col-2">
                  <HiTrendingUp className="trending-icon"/>
                  </div>
              </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-3">
          <div className="box-shadow shadow-sm p10 card-height wave-bg blue-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                    <img src={iconDelivery} alt="iconDelivery" width={24}/>
                  </div>
                  <p className="font14 text-gray m-0 ws-no-wrap">Action Requested</p>
                  <h3 className="font20 title-text p-y bold-600 m0">{parseInt(shipmentCounter?.average_selling)}</h3>
                </div>
                  <div className="col-2">
                  <HiTrendingUp className="trending-icon" />
                  </div>
              </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-3">
          <div className="box-shadow shadow-sm p10 card-height wave-bg red-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                <div className="col-10 left-text">
                  <div className="CardIconContainer icon-bg">
                    <img src={NDRdelivered} alt="iconRTO" width={24}/>
                  </div>
                  <p className="font14 text-gray m-0 ws-no-wrap">NDR Delivered</p>
                  <h3 className="font20 title-text p-y bold-600 m0">{parseInt(shipmentCounter?.average_selling)}</h3>
                </div>
                  <div className="col-2">
                  <HiTrendingDown className="trending-icon"/>
                  </div>
              </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <TableDashboard /> */}
      {/* <div className="mt-3 datatable-container">
        <h4 className="title">Last 30 Days Order</h4>
        <DataTable />
      </div> */}
    </>
  );
}

export default NDRTotalInfo;
