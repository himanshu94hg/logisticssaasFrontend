import React, { useEffect, useState } from "react";
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';
import EkartLogo from '../../../../../assets/image/integration/Ekart.png'
import ShadowFax from '../../../../../assets/image/integration/ShadowFax.png'
import Delhivery from '../../../../../assets/image/integration/Delhivery.png'
import Bluedart from '../../../../../assets/image/integration/Bluedart.png'
import XpressBees from '../../../../../assets/image/integration/XpressBees.png'
import Professional from '../../../../../assets/image/integration/Professional.png'
import { useDispatch } from "react-redux";

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

  useEffect(() => {
    dispatch({
      type: "DASHBOARD_OVERVIEW_COURIERWISE_ALLOCATION_ACTION", payload: {
        start_date: "2024-02-11",
        end_date: "2024-03-11"
      }
    })
  }, [])

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Courier Wise allocation</h4>
      <ul className="list-ui list-ui-point mt20">
        {cData.map((courier, index) => (
          <li key={index} className="">
            <p className="font12 bold-600 mb-10">
              <img src={courier.image_url} className="inline-block" alt={courier.courier_partner.title} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
              <span className="ms-2">{courier.courier_partner}</span>
            </p>
            <p className="font12 bold-600 mb-10">
              <HiMiniArrowTrendingUp className=" font15 text-green" /> {courier.total_percentage}
              <span className="text-gray-light ">({(courier.total_percentage * 100).toFixed(2)}%)</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourierWiseDashboard;
