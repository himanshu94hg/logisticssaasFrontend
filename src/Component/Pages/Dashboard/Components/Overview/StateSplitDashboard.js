import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import IndiaMapp from "../../../../common/Graph/IndiaMapp";

function StateSplitDashboard() {
  const dispatch = useDispatch();
  const [stateMapData, setStateMapData] = useState({})
  const [totalSales, setTotalSales] = useState(0);
  const mydata = useSelector(state => state?.dashboardOverviewReducer?.stateWiseData)

console.log(stateMapData,"stateMapData??????")

  useEffect(() => {
    if (mydata) {
      const mappedData = Object.keys(mydata).reduce((acc, key) => {
        if (key !== "null") {
          acc[key] = { sales: mydata[key], value: key };
        }
        return acc;
      }, {});
      const total = Object.values(mydata).reduce((acc, currentValue) => acc + currentValue, 0);
      setTotalSales(total);
      setStateMapData(mappedData)
    }
  }, [mydata])

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
        <h5 className="total-count">{totalSales}<span className="font12 text-gray">Sales</span></h5>
        <p className="font12 text-gray">Compared To Last Month</p>
      </div>
      <IndiaMapp stateMapData={stateMapData} />
    </div>
  );
}


export default StateSplitDashboard;
