import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { percentage } from "../../../../../customFunction/functionLogic";
import { dateRangeDashboard } from "../../../../../customFunction/dateRange";


function PopularCustomerDashboard() {
  const dispatch = useDispatch()

  const renderStars = (percentage) => {
    const totalStars = 5;
    const filledStars = Math.ceil((percentage / 100) * totalStars);
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar className="font15 text-golden" key={i} />);
    }
    return stars;
  };

  useEffect(() => {
    dispatch({
      type: 'DASHBOARD_OVERVIEW_MOSTPOPULAR_CUSTOMER_ACTION', payload: dateRangeDashboard
    })
  }, [])

  const { mostPopularCusData } = useSelector(state => state?.dashboardOverviewReducer)
  const total = mostPopularCusData.reduce((acc, data) => acc + data.count, 0)


  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Most Popular Customers</h4>
      {mostPopularCusData?.map((customer, index) => (
        <ul key={index} className="d-flex justify-content-between align-items-center p0 list-none">
          <li>
            <div className="d-flex align-items-top justify-content-center">
              <div>
                <p className="mb-0 bold-600 font13 mr-5" style={{ width: '150px' }}>{customer.recipient_name}</p>
                <span className="font13 text-gray">
                  {customer.count} Purchases{" "}
                  <BiSolidBadgeCheck className="font15 text-sh-primary" />
                </span>
              </div>
            </div>
          </li>
          <li className="w50">
            <div className="d-flex justify-content-between">
              <p className="font12 bold-600 mb-10">{renderStars(90)}</p>
              <p className="font12 bold-600 mb-10">
                <span className="text-gray-light ">{percentage(customer.count, total)}</span>
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
