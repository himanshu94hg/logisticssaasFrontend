import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


function PopularCustomerDashboard() {

  const endDate = moment(new Date()).format("YYYY-MM-DD"); // Current date
  const startDate = moment(new Date()).subtract(1, 'months').format("YYYY-MM-DD"); // One month ago

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);

  // Dummy data to simulate the response from the API
  const dummyData = [
    {
      b_customer_name: "John Doe",
      total_bookings: 10,
      rating_percentage: 80,
    },
    {
      b_customer_name: "Jane Smith",
      total_bookings: 15,
      rating_percentage: 90,
    },
    // Add more dummy data as needed
  ];

  const [popularCustomers, setPopularCustomers] = useState(dummyData);

  const renderStars = (percentage) => {
    const totalStars = 5;
    const filledStars = Math.ceil((percentage / 100) * totalStars);
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar className="font15 text-golden" key={i} />);
    }
    return stars;
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'DASHBOARD_OVERVIEW_MOSTPOPULAR_CUSTOMER_ACTION', payload: {
        start_date: startDate,
        end_date: endDate
      }
    })
  }, [])

  const {mostPopularCusData}=useSelector(state=>state?.dashboardOverviewReducer)

  console.log(mostPopularCusData,"this is most popular dtaa")

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Most Popular Customers</h4>
      {mostPopularCusData?.map((customer, index) => (
        <ul key={index} className="d-flex justify-content-between align-items-center p0 list-none">
          <li>
            <div className="d-flex align-items-top justify-content-center">
              <div>
                <p className="mb-0 bold-600 font13 mr-5" style={{ width: '150px' }}>{customer.b_customer_name}</p>
                <span className="font13 text-gray">
                  {customer.total_bookings} Purchases{" "}
                  <BiSolidBadgeCheck className="font15 text-sh-primary" />{" "}
                </span>
              </div>
            </div>
          </li>
          <li className="w50">
            <div className="d-flex justify-content-between">
              <p className="font12 bold-600 mb-10">{renderStars(customer.rating_percentage)}</p>
              <p className="font12 bold-600 mb-10">
                <span className="text-gray-light ">({customer.rating_percentage}%)</span>
              </p>
            </div>

            <div className="progress mb-15">
              <div
                className="progress-bar bg-sh-primary"
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
