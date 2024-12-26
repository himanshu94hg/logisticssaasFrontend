import React, { useState } from "react";
import '../Overview/totalInfoDashboard.css'
import './WhatsAppTotalInfo.css'
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import NdrIcon from "../../../../common/Icons/InfoCardsIcons/NdrIcon";
import ActionRequiredIcon from "../../../../common/Icons/InfoCardsIcons/ActionRequiredIcon";
import ActionRequestedIcon from "../../../../common/Icons/InfoCardsIcons/ActionRequestedIcon";
import NdrDeliveredIcon from "../../../../common/Icons/InfoCardsIcons/NdrDeliveredIcon";

function WhatsAppTotalInfo({ totalMessage }) {
  const [totalNdr, setTotalNdr] = useState(null);
  const [actionRequested, setActionRequested] = useState(null);
  const [ndrdeleverd, setndrDeleverd] = useState(null);
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
                    <div className="infoCardIconContainer bg-green-light">
                      <NdrIcon />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Total Orders</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{totalNdr?.total_ndr_count || 0}</h3>
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
                    <div className="infoCardIconContainer bg-orange-light">
                      <ActionRequiredIcon />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Total Message Sent</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{totalMessage?.total_message}</h3>
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
                    <div className="infoCardIconContainer bg-blue-light">
                      <ActionRequestedIcon />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Message read rate</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{actionRequested?.total_ndr_count}</h3>
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
                    <div className="infoCardIconContainer bg-red-light">
                      <NdrDeliveredIcon />
                    </div>
                    <p className="font14 text-gray m-0 ws-nowrap">Queries resolved</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{ndrdeleverd?.total_delivered_ndr_count}</h3>
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

export default WhatsAppTotalInfo;
