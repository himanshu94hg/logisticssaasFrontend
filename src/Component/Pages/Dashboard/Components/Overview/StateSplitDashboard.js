import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import IndiaMapp from "../../../../common/Graph/IndiaMapp";
import { useSelector } from "react-redux";

function StateSplitDashboard() {

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch({
      type: "DASHBOARD_OVERVIEW_STATEWISE_SPLIT_ACTION", payload: {
        start_date: "2023-11-01",
        end_date: "2024-03-12",
      }
    })
  }, [])

  return (
    <div className="box-shadow shadow-sm p10 state-wise-card">
      <div className="card-heading">
        <h4 className="title">State Wise Split</h4>
        <p className="export-report">Export Report</p>
      </div>
      <div className="card-count">
        <h5 className="total-count">0 <span className="font12 text-gray">Sales</span></h5>
        <p className="font12 text-gray">Compared To Last Month</p>
      </div>
      <IndiaMapp />
    </div>
  );
}


export default StateSplitDashboard;
