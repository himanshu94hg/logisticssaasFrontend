import moment from "moment";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';
import { useSelector } from "react-redux";

function CourierWiseDashboard() {
  const dispatch = useDispatch();
  const endDate = moment(new Date()).format("YYYY-MM-DD")
  const startDate = moment(new Date()).subtract(1, 'months').format("YYYY-MM-DD"); 

  const [cData] = useState([
    { courier_partner: "eKart", total_percentage: 0.75, image_url: 'https://www.shipease.in/public/assets/admin/images/20220608000026.png' },
    { courier_partner: "Shadowfax", total_percentage: 0.65, image_url: 'https://www.shipease.in/public/assets/admin/images/20210102174032.jpeg' },
    { courier_partner: "Delhivery Lite", total_percentage: 0.85, image_url: '	https://www.shipease.in/public/assets/admin/images/20230708174144.jpeg' },
    { courier_partner: "BlueDart Surface", total_percentage: 0.85, image_url: 'https://www.shipease.in/public/assets/admin/images/20230622130433.png' },
    { courier_partner: "XpressBees", total_percentage: 0.85, image_url: 'https://www.shipease.in/public/assets/admin/images/20210102174413.png' },
    { courier_partner: "The Professional Courier", total_percentage: 0.85, image_url: 'https://www.shipease.in/public/assets/admin/images/20231021174726.jpg' },
  ]);

  useEffect(() => {
    dispatch({
      type: "DASHBOARD_OVERVIEW_COURIERWISE_ALLOCATION_ACTION", payload: {
        start_date:startDate,
        end_date:endDate
      }
    })
  }, [])

  const {courierWiseData}=useSelector(state=>state?.dashboardOverviewReducer)

  console.log(courierWiseData,"courierWiseDatacourierWiseDatacourierWiseData")
  

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
