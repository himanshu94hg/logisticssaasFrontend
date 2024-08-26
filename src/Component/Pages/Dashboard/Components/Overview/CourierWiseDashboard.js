import "./courierwiseCard.css"
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';
import { percentage } from "../../../../../customFunction/functionLogic";

function CourierWiseDashboard() {
  const partnerList = JSON.parse(localStorage.getItem('partnerList'));
  const { courierWiseData } = useSelector(state => state?.dashboardOverviewReducer);
  const sortedCourierWiseData = [...courierWiseData].sort((a, b) => {
    if (a.courier_name < b.courier_name) return -1;
    if (a.courier_name > b.courier_name) return 1;
    return 0;
  });

  const totalValue = sortedCourierWiseData.reduce((acc, courier) => acc + courier.value, 0);

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Courier Wise allocation</h4>
      <ul className="list-ui list-ui-point mt20 ">
        {sortedCourierWiseData.map((courier, index) => (
          <li key={index} className="d-flex justify-content-between">
            <p className="font12 bold-600 mb-10">
              <img src={courier.courier_image} className="inline-block" alt={courier.courier_name} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
              <span className="ms-3 text-capitalize">{courier.courier_name}</span>
            </p>
            <p className="font12 bold-600 mb-10 hover-effect">
              <HiMiniArrowTrendingUp className="font15 text-green me-2" />{courier.value}
              <span className="text-gray-light ms-2">{percentage(courier.value, totalValue)}</span>
              <div className="hover-box">
                <p>NDR: 0</p>
                <p>RTO: 0</p>
                <p>COD: 0</p>
              </div>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourierWiseDashboard;
