import moment from "moment";
import React, { useEffect, } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { percentage } from "../../../../../customFunction/functionLogic";

function CustomTable({ data }) {
  const total = data.reduce((acc, data) => acc + data.total, 0)
  return (
    <table className="custom-table w-100">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Product Name</th>
          <th>Shipments</th>
          <th>Delivered %</th>
          <th>RTO %</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td title={product.product_name}>{product.product_name}</td>
            <td>{product.total}</td>
            <td>
              <span className="text-green">
                {((product.delivered / product.total) * 100).toFixed(2)}
              </span>
            </td>
            <td>{((product.rto_count / product.total) * 100).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TopSellingDashboard() {
  const { topSellCard } = useSelector(state => state?.dashboardOverviewReducer)
  return (
    <div className="box-shadow shadow-sm p10 top-selling-page dashboard-table">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title">Top Selling Products</h4>
      </div>
      <div className="table-responsive">
        <CustomTable data={topSellCard} />
      </div>
    </div>
  );
}

export default TopSellingDashboard;
