import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";

function RevenueDashboard() {
  const dispatch = useDispatch()
  const [selectedInterval, setSelectedInterval] = useState("1W");
  const [revenueData, setRevenueData] = useState({ prepade_revenue_data: 0, cod_revenue_data: 0 });
  const [totalSumOrder, setTotalSumOrder] = useState(0);
  const endDate = moment(new Date()).format("YYYY-MM-DD")
  const startDate = moment(new Date()).subtract(1, 'months').format("YYYY-MM-DD"); 

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
  };

  const { revenueCard } = useSelector(state => state?.dashboardOverviewReducer)

  useEffect(() => {
    fetchRevenueData(selectedInterval);
  }, [selectedInterval]);

  useEffect(() => {
    dispatch({type:"DASHBOARD_OVERVIEW_REVENUE_CARD_ACTION",payload:{
      start_date:startDate,
      end_date:endDate
    }})
  }, []);


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
        <li className={`bg-sh-primary-light text-sh-primary`}>
          <p>Prepaid Revenue</p>
          <p className="">
            <AiOutlineArrowUp className=" font15" />
            {/* {revenueData.prepade_revenue_data}% */}
          </p>
          <p className="">{revenueCard?.prepaid_revenue || "NA"}</p>
        </li>

        <li className={`bg-sh-primary-light text-sh-primary`}>
          <p>COD Revenue</p>
          <p>
            <AiOutlineArrowUp className=" font15" />
            {/* {revenueData.cod_revenue_data}% */}
          </p>
          <p className="">{revenueCard?.cod_revenue || "NA"}</p>
        </li>

        {/* Add other items based on your API response structure */}

        <li className={`bg-sh-primary-light text-sh-primary`}>
          <p>Total Delivered Orders</p>
          <AiOutlineArrowUp className=" font15" />
          <p className="">{revenueCard?.total_delivered_orders}</p>
        </li>
      </ul>
    </div>
  );
}

export default RevenueDashboard;
