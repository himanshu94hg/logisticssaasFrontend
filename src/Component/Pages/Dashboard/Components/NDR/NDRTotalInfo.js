import React, { useState } from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import NDRicon from '../../../../../assets/image/icons/NDRicon.png'
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png'
import NDRdelivered from '../../../../../assets/image/icons/NDRdelivered.png'
import { useSelector } from "react-redux";

function NDRTotalInfo() {
  // Dummy data
  const dummyData = {
    totalNdr: { total_ndr_count: 100 },
    actionRequested: { total_ndr_count: 50 },
    actionReq: { total_ndr_count: 25 },
    ndrdeleverd: { total_delivered_ndr_count: 75 }
  };

  const {counterData}=useSelector(state=>state?.dashboardNdrReducer)

  const [totalNdr, setTotalNdr] = useState(dummyData.totalNdr);
  const [actionRequested, setActionRequested] = useState(dummyData.actionRequested);
  const [actionReq, setActionreq] = useState(dummyData.actionReq);
  const [ndrdeleverd, setndrDeleverd] = useState(dummyData.ndrdeleverd);

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
                      <img src={NDRicon} alt="iconOrders" width={24} />
                    </div>
                  <div>
                  <p className="font14 text-gray m-0 ws-nowrap">Total NDR</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{counterData?.total_ndr}</h3>
                  </div>
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
                   <div>
                   <p className="font14 text-gray m-0 ws-nowrap">Action Required</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{counterData?.action_required}</h3>
                   </div>
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
                   <div>
                   <p className="font14 text-gray m-0 ws-nowrap">Action Requested</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{counterData?.action_requested}</h3>
                   </div>
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
                      <img src={NDRdelivered} alt="iconRTO" width={24} />
                    </div>
                     <div>
                     <p className="font14 text-gray m-0 ws-nowrap">NDR Delivered</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{counterData?.ndr_delivered}</h3>
                     </div>
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

export default NDRTotalInfo;
