import React, { useState } from "react";
import { HiArrowNarrowDown, HiArrowNarrowUp } from 'react-icons/hi';
import EkartLogo from '../../../../../assets/image/integration/Ekart.png'
import ShadowFax from '../../../../../assets/image/integration/ShadowFax.png'
import Delhivery from '../../../../../assets/image/integration/Delhivery.png'
import Bluedart from '../../../../../assets/image/integration/Bluedart.png'
import XpressBees from '../../../../../assets/image/integration/XpressBees.png'
import Professional from '../../../../../assets/image/integration/Professional.png'

const TopRTOCourier = () => {
  const [loading, setLoading] = useState(false); // No loading state needed for dummy data
  const [error, setError] = useState(null);

  // Dummy data
  const dummyCourierAllocation = [
    {
      courier_partner: {
        title: "Ekart",
        image: EkartLogo
      },
      rto_count: 20
    },
    {
      courier_partner: {
        title: "Shadowfax",
        image: ShadowFax
      },
      rto_count: 15
    },
    {
      courier_partner: {
        title: "Delhivery",
        image: Delhivery
      },
      rto_count: 15
    },
    {
      courier_partner: {
        title: "Bluedart",
        image: Bluedart
      },
      rto_count: 15
    },
    {
      courier_partner: {
        title: "XpressBees",
        image: XpressBees
      },
      rto_count: 15
    },
    {
      courier_partner: {
        title: "The Professional Courier",
        image: Professional
      },
      rto_count: 15
    }
    // Add more dummy data as needed
  ];

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Top RTO - Courier</h4>
      <ul className="list-ui list-ui-point mt20">
        {error ? (
          <p>{error}</p>
        ) : (
          dummyCourierAllocation.map((courier, index) => (
            <li key={index} className="">
              <p className="font12 bold-600 mb-10">
                <img
                  src={courier.courier_partner.image}
                  className="inline-block"
                  alt={courier.courier_partner.title}
                  style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                />
                &nbsp;&nbsp;&nbsp;{courier.courier_partner.title}
              </p>

              <p className="font12 bold-600 mb-10">
                <HiArrowNarrowDown className="font15 text-green" /> {courier.rto_count}
                <span className="text-gray-light">(50)</span>
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TopRTOCourier;
