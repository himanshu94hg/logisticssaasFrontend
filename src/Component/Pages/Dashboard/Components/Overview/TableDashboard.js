import React from "react";
import { useSelector } from "react-redux";

function CustomTable({ data }) {
  const partnerList = JSON.parse(localStorage.getItem('partnerList'));

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
        {data?.map((order, index) => (
          <tr key={index}>
            <td style={{ maxWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order?.customer_order_number}</td>
            <td style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order?.awb_number || "N/A"}</td>
            <td style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order?.courier_partner && partnerList[order?.courier_partner]["title"] || "NA"} </td>
            <td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order?.charge_detail__shipping_charges || 0}</td>
            <td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order?.charge_detail__total_charges || 0}</td>
            <td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order?.dimension_detail__weight / 1000 + "Kg" || "N/A"}</td>
            <td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order?.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TableDashboard() {
  const { lastOrders } = useSelector(state => state?.dashboardOverviewReducer)
  return (
    <div className="box-shadow shadow-sm p10 top-selling-page dashboard-table">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title">Last 30 Days Order</h4>
      </div>
      <div className="table-responsive last-thirty-table">
        <CustomTable data={lastOrders} />
      </div>
    </div>
  );
}

export default TableDashboard;
