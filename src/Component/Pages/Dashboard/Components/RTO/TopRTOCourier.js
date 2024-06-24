import React, { useState } from "react";
import { HiArrowNarrowDown, HiArrowNarrowUp } from 'react-icons/hi';
import EkartLogo from '../../../../../assets/image/integration/Ekart.png'
import ShadowFax from '../../../../../assets/image/integration/ShadowFax.png'
import Delhivery from '../../../../../assets/image/integration/Delhivery.png'
import Bluedart from '../../../../../assets/image/integration/Bluedart.png'
import XpressBees from '../../../../../assets/image/integration/XpressBees.png'
import Professional from '../../../../../assets/image/integration/Professional.png'
import { useSelector } from "react-redux";

const TopRTOCourier = () => {
  const [loading, setLoading] = useState(false); // No loading state needed for dummy data
  const [error, setError] = useState(null);
  const { rtoTopCourier } = useSelector(state => state?.dashboardRtoReducer)


  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Top RTO - Courier</h4>
      <ul className="list-ui list-ui-point mt20">
        {error ? (
          <p>{error}</p>
        ) : (
          rtoTopCourier?.map((courier, index) => (
            <li key={index} className="d-flex justify-content-between">
              <p className="font12 bold-600 mb-10">
                <img
                  src={courier.courier_image}
                  className="inline-block"
                  alt={courier.courier}
                  style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                />
                &nbsp;&nbsp;&nbsp;{courier.courier}
              </p>

              <p className="bold-600 mb-10">
                {/* <HiArrowNarrowDown className="font15 text-green" /> */}
                {courier.count}
                {/* <span className="text-gray-light">(50)</span> */}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TopRTOCourier;
