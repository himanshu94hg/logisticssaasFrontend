import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidBadgeCheck } from "react-icons/bi";

function PopularCustomerDashboard() {
  const [popularCustomers, setPopularCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://65.2.38.87:8088/api/v1/top-customer-count/') // Corrected API endpoint
      .then(response => {
        console.log('Data:', response.data);
        setPopularCustomers(response.data.top_customers); // Corrected state variable
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Most Popular Customers</h4>
      {popularCustomers.map((customer, index) => (
        <ul key={index} className="d-flex justify-content-between align-items-center p0 list-none">
          <li>
            <div className="d-flex align-items-top justify-content-center">
              {/*<div className="me-2">
                <span className="avatar">
                   Assuming the image source is available in the API response 
                  <img src={customer.b_customer_image} className="inline-block" alt={customer.b_customer_name} />
                </span>
              </div>*/}
              <div>
                <p className="mb-0 bold-600 font13 mr-5" style={{ width: '150px' }}>{customer.b_customer_name}</p>
                <span className="font13 text-gray">
                  {customer.total_bookings} Purchases{" "}
                  <BiSolidBadgeCheck className="font15 text-purple" />{" "}
                </span>
              </div>
            </div>
          </li>
          <li className="w50">
            <div className="d-flex justify-content-between">
              <p className="font12 bold-600 mb-10">5 Star</p>
              <p className="font12 bold-600 mb-10">
                <span className="text-gray-light ">({customer.rating_percentage}%)</span>
              </p>
            </div>

            <div className="progress mb-15">
              <div
                className="progress-bar bg-blue"
                role="progressbar"
                style={{ width: `${customer.rating_percentage}%` }}
                aria-valuenow={customer.rating_percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default PopularCustomerDashboard;
