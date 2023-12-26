import React, { useState, useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiUser } from "react-icons/ci";
import axios from "axios";
import Col from "react-bootstrap/Col";
import TableDashboard from "./TableDashboard";
import './totalInfoDashboard.css'
import Graph from "../../../../common/Graph/Graph";
import LineGraph from "../../../../common/Graph/LineGraph";
import DataTable from "./DataTable/DataTable";

function TotalInfoDashboard() {
  const [shipmentCounter, setShipmentCounter] = useState(null);
  const [totalCustomer, setTotalCustomer] = useState(null);
  const [dailyShipment, setDailyShipment] = useState(null);
  const [averageSelling, setAverageSelling] = useState(null);
  const [todayRevenue, setTodayRevenue] = useState(null);
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
      <div className="grid gap-3">
        {/* Card 1 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12">
                <div className="d-flex justify-content-start gap-10">
                  <div className="infoCardIconContainer bg-green">
                    {/* <CiUser /> */}
                    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6003 12.8877C16.3904 12.7943 16.1805 12.7099 15.9676 12.6316C17.4399 11.417 18.38 9.56363 18.38 7.49021C18.38 3.84364 15.4709 0.878174 11.8937 0.878174C8.31639 0.878174 5.40728 3.84364 5.40728 7.49021C5.40728 9.56664 6.35038 11.4231 7.82267 12.6346C3.26388 14.3313 0 18.7976 0 24.0263H2.16114C2.16114 18.5565 6.52776 14.1083 11.8907 14.1083C13.23 14.1083 14.5249 14.3795 15.7399 14.9129L16.6003 12.8877ZM11.8937 3.08118C14.2795 3.08118 16.2189 5.05816 16.2189 7.49021C16.2189 9.92226 14.2795 11.8992 11.8937 11.8992C9.50783 11.8992 7.56842 9.91924 7.56842 7.49021C7.56842 5.06117 9.50783 3.08118 11.8937 3.08118ZM14.8855 17.8543C14.8855 18.1617 15.0511 18.442 15.3172 18.5836L19.1014 20.6209C19.2196 20.6841 19.3497 20.7173 19.4798 20.7173C19.6099 20.7173 19.74 20.6841 19.8582 20.6209L23.6424 18.5836C23.9085 18.4389 24.0741 18.1587 24.0741 17.8543C24.0741 17.5499 23.9085 17.2666 23.6424 17.125L19.8582 15.0847C19.6217 14.9581 19.3379 14.9581 19.1014 15.0847L15.3172 17.125C15.0511 17.2666 14.8855 17.5469 14.8855 17.8543ZM19.4798 16.7513L21.5286 17.8543L19.4798 18.9573L17.431 17.8543L19.4798 16.7513Z" fill="white" />
                      <path d="M19.9179 21.4567L15.5718 19.3967L14.8149 20.6826L19.9179 23.1004L25.0001 20.6932L24.2433 19.4073L19.9179 21.4567Z" fill="white" />
                      <path d="M19.9268 24.2319L15.5731 22.1746L14.8149 23.4577L19.9268 25.8783L25.0001 23.4763L24.2419 22.1905L19.9268 24.2319Z" fill="white" />
                    </svg>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Total Customer</p>
                    <h2 className="font20 title-text p-y bold-600 m0">{parseInt(shipmentCounter?.total_customer)}</h2>
                    <p className="font12 text-green">Best customers ({shipmentCounter?.total_customer})</p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="#55B685" />
                <div className="card-footer">
                  <span className="text-red font13 pt20 bold-600 d-block text-end">
                    +{totalCustomer}%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-no-wrap">
                    this month
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
              <div className="col-10 col-lg-10 col-sm-12 col-md-12">
                <div className="d-flex justify-content-start gap-10">
                  <div className="infoCardIconContainer bg-orange">
                    <svg width="36" height="25" viewBox="0 0 36 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.47192V3.56283H21.1875V19.2447H14.6465C14.1733 17.4478 12.5298 16.1083 10.5625 16.1083C8.59522 16.1083 6.95166 17.4478 6.47852 19.2447H5.25V14.0174H3.125V21.3356H6.47852C6.95166 23.1324 8.59522 24.4719 10.5625 24.4719C12.5298 24.4719 14.1733 23.1324 14.6465 21.3356H23.4785C23.9517 23.1324 25.5952 24.4719 27.5625 24.4719C29.5298 24.4719 31.1733 23.1324 31.6465 21.3356H35V12.8086L34.9336 12.6452L32.8086 6.37249L32.5762 5.65374H23.3125V1.47192H1ZM2.0625 5.65374V7.74465H11.625V5.65374H2.0625ZM23.3125 7.74465H31.0488L32.875 13.1026V19.2447H31.6465C31.1733 17.4478 29.5298 16.1083 27.5625 16.1083C25.5952 16.1083 23.9517 17.4478 23.4785 19.2447H23.3125V7.74465ZM3.125 9.83556V11.9265H9.5V9.83556H3.125ZM10.5625 18.1992C11.7495 18.1992 12.6875 19.1221 12.6875 20.2901C12.6875 21.4581 11.7495 22.381 10.5625 22.381C9.37549 22.381 8.4375 21.4581 8.4375 20.2901C8.4375 19.1221 9.37549 18.1992 10.5625 18.1992ZM27.5625 18.1992C28.7495 18.1992 29.6875 19.1221 29.6875 20.2901C29.6875 21.4581 28.7495 22.381 27.5625 22.381C26.3755 22.381 25.4375 21.4581 25.4375 20.2901C25.4375 19.1221 26.3755 18.1992 27.5625 18.1992Z" fill="white" stroke="#E8F1FA" />
                    </svg>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Daily Shipment</p>
                    <h2 className="font20 title-text p-y bold-600 m0">{parseInt(shipmentCounter?.daily_shipment)}</h2>
                    <p className="font12 text-yellow">Pending ({shipmentCounter?.daily_shipment})</p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                {/* <img src="graph-red.png" className="inline-block" /> */}
                {/* <Graph/> */}
                <LineGraph cardColor="#F6B954" />
                <div className="card-footer">
                  <span className="text-yellow font13 pt20 bold-600 d-block text-end">
                    +{dailyShipment}%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-no-wrap">
                    this month
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
              <div className="col-10 col-lg-10 col-sm-12 col-md-12">
                <div className="d-flex justify-content-start gap-10">
                  <div className="infoCardIconContainer bg-blue">
                    <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.77778 1.15137V19.2069H23.2222V1.15137M1 19.2069H26M12.8056 24.7625C12.4221 24.7625 12.1111 25.0734 12.1111 25.4569C12.1111 25.8404 12.4221 26.1514 12.8056 26.1514C13.189 26.1514 13.5 25.8404 13.5 25.4569C13.5 25.0734 13.189 24.7625 12.8056 24.7625ZM12.8056 24.7625V19.2069M7.94444 12.2625V8.09581L13.5 12.2625L19.0556 6.70692M19.0556 6.70692H14.8889M19.0556 6.70692V10.8736M12.8056 25.4569H12.8194M1 1.15137H26" stroke="#FFFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Average Selling Price</p>
                    <h2 className="font20 title-text p-y bold-600 m0">{parseInt(shipmentCounter?.average_selling)}</h2>
                    <p className="font12 text-blue">Seller </p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="rgba(75, 192, 192, 1)" />
                <div className="card-footer">
                  <span className="text-blue font13 pt20 bold-600 d-block text-end">
                    +{averageSelling}%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-no-wrap">
                    comparative analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12">
                <div className="d-flex justify-content-start gap-10">
                  <div className="infoCardIconContainer bg-red">
                    <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.3333 20.6047V17.4802M10.3333 17.4802V14.3547M10.3333 17.4802L13 17.4805M10.3333 17.4802L7.66667 17.4797M25 14.3547V13.1047C25 11.3546 25 10.4795 24.7093 9.81102C24.4537 9.223 24.0457 8.74494 23.544 8.44535C22.9736 8.10474 22.2268 8.10474 20.7333 8.10474H1M25 14.3547V20.6047M25 14.3547H22.3333C20.8605 14.3547 19.6667 15.7538 19.6667 17.4797C19.6667 19.2057 20.8605 20.6047 22.3333 20.6047H25M1 8.10474V21.8547C1 23.6049 1 24.4801 1.29065 25.1485C1.54631 25.7365 1.95425 26.2146 2.45603 26.5141C3.02645 26.8547 3.7732 26.8547 5.26667 26.8547H20.7333C22.2268 26.8547 22.9736 26.8547 23.544 26.5141C24.0457 26.2146 24.4537 25.7365 24.7093 25.1485C25 24.4801 25 23.6049 25 21.8547V20.6047M1 8.10474V6.85474C1 5.10458 1 4.22949 1.29065 3.56102C1.54631 2.973 1.95425 2.49494 2.45603 2.19535C3.02645 1.85474 3.77319 1.85474 5.26667 1.85474H16.7333C18.2268 1.85474 18.9736 1.85474 19.544 2.19535C20.0457 2.49494 20.4537 2.973 20.7093 3.56102C21 4.22949 21 5.10458 21 6.85474V8.10474" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Today’s Revenue</p>
                    <h2 className="font20 title-text p-y bold-600 m0">{parseInt(shipmentCounter?.today_revenue)}</h2>
                    <p className="font12 text-red">Yesterday {shipmentCounter?.today_revenue} </p>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <LineGraph cardColor="rgba(255, 100, 112, 1)" />
                <div className="card-footer">

                  <span className="text-red font13 pt20 bold-600 d-block text-end">
                    +{todayRevenue}%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-no-wrap">
                    comparative analysis
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
