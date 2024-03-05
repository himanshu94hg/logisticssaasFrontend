import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Overview/totalInfoDashboard.css'
import './CourierDelaysInfo.css'
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import iconRTO from '../../../../../assets/image/icons/RTO_icon.png'
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png'
import iconOrders from '../../../../../assets/image/icons/Orders_icon.png'

function CourierDelaysInfo() {
  // const [misroutedDeley, setMisroutedDeley] = useState(null);
  // const [lostdeley, setLostdeley] = useState(null);
  // const [damageDeley, setDamageDeley] = useState(null);
  // const [destroyedDeley, setDestroyedDeley] = useState(null);

  const misroutedDeley = {
    miss_routed_deley: 10 // Replace 10 with your desired value
  };
  const lostdeley = {
    lost_delay: 5 // Replace 5 with your desired value
  };
  const damageDeley = {
    damage_delay: 3 // Replace 3 with your desired value
  };
  const destroyedDeley = {
    destroyed_delay: 2 // Replace 2 with your desired value
  };

  return (
    <>
      <div className="grid gap-3">
        {/* Card 1 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg green-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-10 left-text">
                    <div className="CardIconContainer icon-bg">
                      <img src={iconOrders} alt="iconOrders" width={24} />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Misrouted Shipments</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{misroutedDeley.miss_routed_deley}</h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingUp className="trending-icon" />
                  </div>
                </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg yellow-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-10 left-text">
                    <div className="CardIconContainer icon-bg">
                      <img src={iconDelivery} alt="iconDelivery" width={24} />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Lost Shipments</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{lostdeley.lost_delay}</h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingUp className="trending-icon" />
                  </div>
                </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg blue-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-10 left-text">
                    <div className="CardIconContainer icon-bg">
                      <img src={iconDelivery} alt="iconDelivery" width={24} />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Damaged Shipments</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{damageDeley.damage_delay}</h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingUp className="trending-icon" />
                  </div>
                </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height wave-bg red-wave">
            <div className="row">
              <div className="col-12">
                <div className="row align-items-center">
                  <div className="col-10 left-text">
                    <div className="CardIconContainer icon-bg">
                      <img src={iconRTO} alt="iconRTO" width={24} />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Destroyed Shipments</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{destroyedDeley.destroyed_delay}</h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingDown className="trending-icon" />
                  </div>
                </div>
              </div>
              <div className="col-12">
                {/* <img src={redSineWave} alt="redSineWave" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourierDelaysInfo;
