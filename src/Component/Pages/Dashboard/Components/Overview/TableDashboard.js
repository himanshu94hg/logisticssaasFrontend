import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

function TableDashboard() {
  const [stateAllocation, setStateAllocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const requestData = {
    sellerId: "16",
    page: "2",
  };

  useEffect(() => {
    axios
        .post(
            "https://www.shipease.in/api/microservices/dashboard/overview/recent-orders",
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        )
        .then((response) => {
          setStateAllocation(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
  }, []);

  return (
      <div className="box-shadow shadow-sm p10 last-orders">
          <div className="d-flex justify-content-between align-items-center">
              <h4 className="title">Last 30 Days Order</h4>

              {/* <Form.Select className="w15 font13">
                  <option>Order Date</option>
                  <option>Order ID</option>
                  <option>Amount</option>
                  <option>Status</option>
              </Form.Select> */}
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
                  {stateAllocation.data.map((order) => (
                      <tr key={order.id}>
                          <td>
                              {order.id}
                          </td>
                          <td className="ws-no-wrap">{order.customer_order_number}</td>
                          <td>{order.awb_number}</td>
                          <td>{order.courier_partner}</td>
                          <td>{order.shipping_charges}</td>
                          <td>{order.total_charges}</td>
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