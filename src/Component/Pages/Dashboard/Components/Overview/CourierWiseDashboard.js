import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';

function CourierWiseDashboard() {
  const [cData, setcData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://35.154.133.143/api/v1/top-couriar-pathner/')
      .then(response => {
        setcData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Courier Wise allocation</h4>
      <ul className="list-ui list-ui-point mt20">
        {cData.map((courier, index) => (
          <li key={index} className="">
            <p className="font12 bold-600 mb-10">
              {/* <img src={`https://shipease.in/${courier.courier_partner.image}`} className="inline-block" alt={courier.courier_partner.title} style={{ width: '35px', height: '35px', borderRadius: '50%' }} /> */}
              &nbsp;&nbsp;&nbsp;{courier.courier_partner.title}
            </p>
            <img src="graph-red.png" className="inline-block" style={{ width: '60px' }} />

            <p className="font12 bold-600 mb-10">
              <HiMiniArrowTrendingUp className=" font15 text-green" /> {courier.total_percentage}

              <span className="text-gray-light ">({((courier.total_percentage) * 100).toFixed(2)}%)</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourierWiseDashboard;
