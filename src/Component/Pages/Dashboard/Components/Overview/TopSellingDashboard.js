import React, { useState } from "react";
import Table from "react-bootstrap/Table";

function TopSellingDashboard() {
  // Dummy data
  const dummyData = [
    { product_name: "Product A", revenue: 50000, deliveredPercentage: 70, rtoPercentage: 5 },
    { product_name: "Product B", revenue: 35000, deliveredPercentage: 65, rtoPercentage: 8 },
    { product_name: "Product C", revenue: 45000, deliveredPercentage: 75, rtoPercentage: 3 },
    // Add more dummy data as needed
  ];

  const [popularProduct] = useState(dummyData);

  return (
    <div className="box-shadow shadow-sm p10 top-selling-page">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title">Top Selling Products</h4>
      </div>
      <div className="table-responsive">
        <Table hover className="table-ui">
          <thead>
            <tr>
              <th scope="col" style={{ width: '7%' }}>S.No</th>
              <th scope="col">Product Name</th>
              <th scope="col" style={{ width: '15%' }}>Revenue</th>
              <th scope="col" style={{ width: '10%' }}>Delivered %</th>
              <th scope="col" style={{ width: '8%' }}>RTO %</th>
            </tr>
          </thead>
          <tbody>
            {popularProduct.map((product, index) => (
              <tr key={index} className="text-nowrap">
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
        </Table>
      </div>
    </div>
  );
}

export default TopSellingDashboard;
