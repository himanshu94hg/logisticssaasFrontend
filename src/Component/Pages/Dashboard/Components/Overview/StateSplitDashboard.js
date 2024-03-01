import React, { useState, useEffect } from "react";
import IndiaMapp from "../../../../common/Graph/IndiaMapp";

function StateSplitDashboard() {

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
