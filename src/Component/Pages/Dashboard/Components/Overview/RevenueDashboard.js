import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import axios from "axios";
import Col from "react-bootstrap/Col";

function RevenueDashboard() {
  const [selectedInterval, setSelectedInterval] = useState("1W");
  const [revenueData, setRevenueData] = useState({ today_revenue: 0, yesterday_revenue: 0 });
  const [totalSumOrder, setTotalSumOrder] = useState(0);

  const fetchRevenueData = (interval) => {
    const endpointMap = {
      "1D": "one-day-revenue",
      "1W": "one-week-revenue",
      "1M": "one-month-revenue",
      "3M": "three-month-revenue",
      "6M": "six-month-revenue",
      "1Y": "one-year-revenue",
    };

    const endpoint = endpointMap[interval];
    axios
      .get(`http://35.154.133.143/api/v1/${endpoint}/`)
      .then(response => {
        console.log('Data:', response.data);
        setRevenueData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchRevenueData(selectedInterval);
  }, [selectedInterval]);
 console.log("@@@@@@@@@@@@@@@",revenueData)
  return (
    <div className="box-shadow shadow-sm p10">
      <div className="row">
        <div className="col">
          <h4 className="title">Revenue Analytics</h4>
          <div className="btn-group d-flex" role="group" aria-label="Basic example">
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "1W" ? "active" : ""}`} onClick={() => setSelectedInterval("1W")}>1W</button>
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "1M" ? "active" : ""}`} onClick={() => setSelectedInterval("1M")}>1M</button>
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "3M" ? "active" : ""}`} onClick={() => setSelectedInterval("3M")}>3M</button>
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "6M" ? "active" : ""}`} onClick={() => setSelectedInterval("6M")}>6M</button>
            <button type="button" className={`btn btn-primary tab-btn-ui ${selectedInterval === "1Y" ? "active" : ""}`} onClick={() => setSelectedInterval("1Y")}>1Y</button>
          </div>
        </div>
      </div>

      <ul className="list-ui mt20">
        <li className={`bg-red-light text-red`}>
          <p>Today's Revenue</p>
          <p className="text-red">
            <AiOutlineArrowUp className=" font15" /> {revenueData.data_count}%
          </p>
          <p className="text-red">{revenueData.data_count}</p>
        </li>

        <li className={`bg-green-light text-green`}>
          <p>Yesterday's Revenue</p>
          <p>
            <AiOutlineArrowUp className=" font15" /> {revenueData.data_count}%
          </p>
          <p>{revenueData.data_count}</p>
        </li>

        {/* Add other items based on your API response structure */}
        
        <li>
          <p></p>
          <p><AiOutlineArrowUp className="text-white font30" /></p>
          <p>{totalSumOrder !== null ? totalSumOrder.toFixed(2) : 'N/A'}</p>
        </li>
      </ul>
    </div>
  );
}

export default RevenueDashboard;
