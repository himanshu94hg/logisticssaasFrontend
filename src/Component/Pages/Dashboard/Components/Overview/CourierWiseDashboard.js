import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';
import { useSelector } from "react-redux";
import EkartLogo from '../../../../../assets/image/integration/Ekart.png'
import ShadowFax from '../../../../../assets/image/integration/ShadowFax.png'
import Delhivery from '../../../../../assets/image/integration/Delhivery.png'
import Bluedart from '../../../../../assets/image/integration/Bluedart.png'
import XpressBees from '../../../../../assets/image/integration/XpressBees.png'
import Professional from '../../../../../assets/image/integration/Professional.png'
import { dateRangeDashboard } from "../../../../../customFunction/dateRange";
import { percentage } from "../../../../../customFunction/functionLogic";


function CourierWiseDashboard() {
  const dispatch = useDispatch();

  const [cData] = useState([
    { courier_partner: "eKart", total_percentage: 0.75, image_url: EkartLogo },
    { courier_partner: "Shadowfax", total_percentage: 0.65, image_url: ShadowFax },
    { courier_partner: "Delhivery Lite", total_percentage: 0.85, image_url: Delhivery },
    { courier_partner: "BlueDart Surface", total_percentage: 0.85, image_url: Bluedart },
    { courier_partner: "XpressBees", total_percentage: 0.85, image_url: XpressBees },
    { courier_partner: "The Professional Courier", total_percentage: 0.85, image_url: Professional },
  ]);

  // useEffect(() => {
  //   dispatch({
  //     type: "DASHBOARD_OVERVIEW_COURIERWISE_ALLOCATION_ACTION", payload:dateRangeDashboard
  //   })
  // }, [])

  const {courierWiseData}=useSelector(state=>state?.dashboardOverviewReducer)
  const totalValue = courierWiseData.reduce((acc, courier) => acc + courier.value, 0);

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Courier Wise allocation</h4>
      <ul className="list-ui list-ui-point mt20">
        {courierWiseData.map((courier, index) => (
          <li key={index} className="">
            <p className="font12 bold-600 mb-10">
              <img src={courier.courier_image} className="inline-block" alt={courier.courier_name} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
              <span className="ms-2">{courier.courier_name}</span>
            </p>
            <p className="font12 bold-600 mb-10">
              <HiMiniArrowTrendingUp className=" font15 text-green" /> {courier.value}
              <span className="text-gray-light ">{percentage(courier.value,totalValue)}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourierWiseDashboard;
