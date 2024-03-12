import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
            <td>{order.shipping_charges || 0.0}</td>
            <td>{order.total_charges || "N/A"}</td>
            <td>{order.weight || "N/A"}</td>
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

  useEffect(()=>{
    dispatch({type:"DASHBOARD_OVERVIEW_LAST_ORDERS_ACTION"})
  },[])

  // Dummy data array
  const dummyData = [
    {
      order_number: 1,
      customer_order_number: "CUS123",
      awb_number: "AWB123",
      courier_partner: "Courier A",
      shipping_charges: 5.99,
      total_charges: 25.99,
      weight: "1 kg",
      status: "Delivered"
    },
    {
      order_number: 2,
      customer_order_number: "CUS456",
      awb_number: "AWB456",
      courier_partner: "Courier B",
      shipping_charges: 7.99,
      total_charges: 30.99,
      weight: "2 kg",
      status: "Pending"
    },
    {
      order_number: 3,
      customer_order_number: "CUS789",
      awb_number: "AWB789",
      courier_partner: "Courier C",
      shipping_charges: 9.99,
      total_charges: 35.99,
      weight: "3 kg",
      status: "Shipped"
    },
    {
      order_number: 4,
      customer_order_number: "CUS789",
      awb_number: "AWB789",
      courier_partner: "Courier C",
      shipping_charges: 9.99,
      total_charges: 35.99,
      weight: "3 kg",
      status: "Shipped"
    },
    {
      order_number: 5,
      customer_order_number: "CUS789",
      awb_number: "AWB789",
      courier_partner: "Courier C",
      shipping_charges: 9.99,
      total_charges: 35.99,
      weight: "3 kg",
      status: "Shipped"
    },
    {
      order_number: 6,
      customer_order_number: "CUS789",
      awb_number: "AWB789",
      courier_partner: "Courier C",
      shipping_charges: 9.99,
      total_charges: 35.99,
      weight: "3 kg",
      status: "Shipped"
    }
    // Add more dummy data as needed
  ];

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
