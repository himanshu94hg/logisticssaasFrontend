import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

function RevenueDashboard() {
  const [selectedInterval, setSelectedInterval] = useState("1W");
  const { revenueCard } = useSelector(state => state?.dashboardOverviewReducer)

  const fetchRevenueData = (interval) => {
    const endpointMap = {
      "1D": "one-day-revenue",
      "1W": "one-week-revenue",
      "1M": "one-month-revenue",
      "3M": "three-month-revenue",
      "6M": "six-month-revenue",
      "1Y": "one-year-revenue",
    };
  };

  useEffect(() => {
    fetchRevenueData(selectedInterval);
  }, [selectedInterval]);


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
        <li className={`bg-sh-primary-light text-sh-primary d-flex justify-content-between`}>
          <p>Prepaid Revenue</p>
          <p className="cardvalue">{revenueCard?.prepaid_revenue || "NA"}</p>
        </li>
        <li className={`bg-sh-primary-light text-sh-primary d-flex justify-content-between`}>
          <p>COD Revenue</p>
          <p className="cardvalue">{revenueCard?.cod_revenue || "NA"}</p>
        </li>
        <li className={`bg-sh-primary-light text-sh-primary d-flex justify-content-between`}>
          <p>Total Revenue</p>
          <p className="cardvalue">{parseFloat(revenueCard?.prepaid_revenue + revenueCard?.cod_revenue).toFixed(2) || "NA"}</p>
        </li>
      </ul>
    </div>
  );
}

export default RevenueDashboard;
