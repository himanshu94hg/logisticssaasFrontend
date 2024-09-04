import React from "react";
import { useSelector } from "react-redux";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { percentage } from "../../../../../customFunction/functionLogic";
import RatingStars from "../../../../common/RatingStars/RatingStars";

function PopularCustomerDashboard() {
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
                <p className="mb-0 bold-600 font13 mr-5 text-truncate" style={{ maxWidth: '150px' }}>{customer.recipient_name}</p>
                <span className="font13 text-gray">
                  {customer.count} Purchases{" "}
                  <BiSolidBadgeCheck className="font15 text-sh-primary" />
                </span>
              </div>
            </div>
          </li>
          <li className="w50">
            <div className="d-flex justify-content-between">
              <p className="font12 bold-600 mb-10"><RatingStars rating={4.5} /></p>
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
