import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

function TopSellingDashboard() {
  const [popularProduct, setPopularProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://65.2.38.87:8088/api/v1/topproduct/')
      .then(response => {
        console.log('Data:', response.data);
        setPopularProduct(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="box-shadow shadow-sm p10 top-selling-page">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title">Top Selling Products</h4>
      </div>
      <div className="table-responsive">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
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
                  <td title={product?.product_name}>{product?.product_name}</td>
                  <td>34,647</td>
                  <td>
                    <span className="text-green">
                      35%
                    </span>
                  </td>
                  {/* <td>{product?.order_count}</td> */}
                  <td>5%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default TopSellingDashboard;
