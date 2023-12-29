import React, { useState, useEffect } from "react";
import axios from "axios";
import IndiaMap from '../../../../../assets/image/IndiaMap.png'

function StateSplitDashboard() {
  const [stateAllocation, setStateAllocation] = useState([]);
  const [totalSumOrder, setTotalSumOrder] = useState(0);
  useEffect(() => {
    axios
      .get('http://35.154.133.143/api/v1/statewiseproduct/')
      .then(response => {
        console.log('Data:', response.data);
        setStateAllocation(response.data.top_product_data);
        setTotalSumOrder(response.data.total_sum_order);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="box-shadow shadow-sm p10 state-wise-card">
      <div className="card-heading">
        <h4 className="title">State Wise Split</h4>
        <p className="export-report">Export Report</p>
      </div>
      <div className="card-count">
        <h5 className="total-count">{totalSumOrder} <span className="font12 text-gray">Sales</span></h5>
        <p className="font12 text-gray">Compared To Last Month</p>
      </div>
      <div className="d-flex justify-content-end">
        <ul className="list-ui">
          {stateAllocation.map((state) => (
            <li key={state.b_state} className="">
              <p className="font12 bold-600 mb-10">
                {state.b_state}&nbsp;&nbsp;&nbsp;&nbsp;
                {state.order_count}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StateSplitDashboard;
