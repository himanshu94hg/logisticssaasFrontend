import React, { useState } from "react";

function CustomTable({ data }) {
  return (
    <table className="custom-table w-100">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Product Name</th>
          <th>Revenue</th>
          <th>Delivered %</th>
          <th>RTO %</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td title={product.product_name}>{product.product_name}</td>
            <td>{product.revenue}</td>
            <td>
              <span className="text-green">
                {product.deliveredPercentage}%
              </span>
            </td>
            <td>{product.rtoPercentage}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TopSellingDashboard() {
  // Dummy data
  const dummyData = [
    { product_name: "Product A", revenue: 50000, deliveredPercentage: 70, rtoPercentage: 5 },
    { product_name: "Product B", revenue: 35000, deliveredPercentage: 65, rtoPercentage: 8 },
    { product_name: "Product C", revenue: 45000, deliveredPercentage: 75, rtoPercentage: 3 },
    { product_name: "Product D", revenue: 45000, deliveredPercentage: 75, rtoPercentage: 3 },
    { product_name: "Product E", revenue: 45000, deliveredPercentage: 75, rtoPercentage: 3 },
    { product_name: "Product F", revenue: 45000, deliveredPercentage: 75, rtoPercentage: 3 },
    { product_name: "Product g", revenue: 45000, deliveredPercentage: 75, rtoPercentage: 3 },
    // Add more dummy data as needed
  ];

  return (
    <div className="box-shadow shadow-sm p10 top-selling-page dashboard-table">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title">Top Selling Products</h4>
      </div>
      <div className="table-responsive">
        <CustomTable data={dummyData} />
      </div>
    </div>
  );
}

export default TopSellingDashboard;
