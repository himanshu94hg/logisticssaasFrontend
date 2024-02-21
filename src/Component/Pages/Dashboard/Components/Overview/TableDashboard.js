import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

function TableDashboard() {
  const [lastThirtyDayaData, setLastThirtyDayaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://65.2.38.87:8088/api/v1/lastthirtydata/')
      .then(response => {
        console.log('Data:', response.data);
        setLastThirtyDayaData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="box-shadow shadow-sm p10 last-orders">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="title">Last 30 Days Order</h4>
      </div>
      <div className="table-responsive">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table hover className="table-ui mt20">
            <thead>
              <tr className="text-nowrap">
                <th>Order Id</th>
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
              {lastThirtyDayaData.map((order) => (
                <tr key={order.order_number}>
                  <td>{order.order_number}</td>
                  <td className="ws-nowrap">{order.customer_order_number}</td>
                  <td>{order.awb_number || 'N/A'}</td>
                  <td>{order.courier_partner || 'N/A'}</td>
                  <td>{order.shipping_charges || 0.0}</td>
                  <td>{order.total_charges || 'N/A'}</td>
                  <td>{order.weight}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default TableDashboard;
