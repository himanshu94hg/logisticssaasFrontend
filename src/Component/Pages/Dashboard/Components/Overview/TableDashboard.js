import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { dateRangeDashboard } from "../../../../../customFunction/dateRange";

// Custom Table component
function CustomTable({ data }) {
  return (
    <table className="custom-table w-100">
      <thead>
        <tr>
          <th>Customer Order Number</th>
          <th>Awb number</th>
          <th>Courier Partner</th>
          <th>Shipping Charges</th>
          <th>Total Charges</th>
          <th>Weight</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.slice(0,7)?.map((order,index) => (
          <tr key={index}>
            <td>{order.customer_order_number}</td>
            <td>{order.awb_number || "N/A"}</td>
            <td>{order.courier_partner || "N/A"}</td>
            <td>{order.charge_detail__shipping_charges || 0}</td>
            <td>{order.charge_detail__total_charges || 0}</td>
            <td>{order.dimension_detail__weight+"Kg" || "N/A"}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// TableDashboard component
function TableDashboard() {
  const dispatch=useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const {lastOrders}=useSelector(state=>state?.dashboardOverviewReducer)

  // useEffect(()=>{
  //   dispatch({type:"DASHBOARD_OVERVIEW_LAST_ORDERS_ACTION",payload:dateRangeDashboard})
  // },[])


  return (
    <div className="box-shadow shadow-sm p10 top-selling-page dashboard-table">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title">Last 30 Days Order</h4>
      </div>
      <div className="table-responsive">
        {!isLoading ? (
          <CustomTable data={lastOrders} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default TableDashboard;
