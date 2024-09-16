import "./courierwiseCard.css"
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';
import { percentage } from "../../../../../customFunction/functionLogic";

function CourierWiseDashboard() {
  const partnerList = JSON.parse(localStorage.getItem('partnerList'));
  const { courierWiseData } = useSelector(state => state?.dashboardOverviewReducer);


  const totalValue = courierWiseData?.reduce((acc, courier) => acc + courier.value, 0);

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Courier Wise allocation</h4>
      <ul className="list-ui list-ui-point mt20 ">
        {courierWiseData?.map((courier, index) => (
          <li key={index} className="d-flex justify-content-between">
            <p className="font12 bold-600 mb-10">
              {courier?.courier_name &&
                <img src={partnerList[courier?.courier_name]["image"]} className="inline-block" alt={courier?.courier_name} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
              }
              <span className="ms-3 text-capitalize">{courier?.courier_name && partnerList[courier?.courier_name]["title"] || "NA"} </span>


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
