import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';

const TopRTOCourier = () => {
  const [courierAllocation, setCourierAllocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get('http://dev.shipease.in:8088/api/v1/top-rto-courier/')
  //     .then((response) => {
  //       setCourierAllocation(response.data || []);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setError('Error fetching data. Please try again.');
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Top RTO - Courier</h4>
      <ul className="list-ui list-ui-point mt20">
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          courierAllocation.map((courier, index) => (
            <li key={index} className="">
              <p className="font12 bold-600 mb-10">
                <img
                  src={`https://shipease.in/${courier.courier_partner.image}`}
                  className="inline-block"
                  alt={courier.courier_partner.title}
                  style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                />
                &nbsp;&nbsp;&nbsp;{courier.courier_partner.title}
              </p>
              <img src="graph-red.png" className="inline-block" style={{ width: '60px' }} />

              <p className="font12 bold-600 mb-10">
                <HiMiniArrowTrendingUp className=" font15 text-green" /> {courier.rto_count}
                <span className="text-gray-light ">(50)</span>
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TopRTOCourier;
