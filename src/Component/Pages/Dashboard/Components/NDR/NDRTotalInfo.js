import React, { useState } from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import NDRicon from '../../../../../assets/image/icons/NDRicon.png'
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png'
import NDRdelivered from '../../../../../assets/image/icons/NDRdelivered.png'
import { useSelector } from "react-redux";
import NdrIcon from "../../../../common/Icons/InfoCardsIcons/NdrIcon";
import NdrDeliveredIcon from "../../../../common/Icons/InfoCardsIcons/NdrDeliveredIcon";
import ActionRequiredIcon from "../../../../common/Icons/InfoCardsIcons/ActionRequiredIcon";
import ActionRequestedIcon from "../../../../common/Icons/InfoCardsIcons/ActionRequestedIcon";

function NDRTotalInfo() {
  // Dummy data
  const dummyData = {
    totalNdr: { total_ndr_count: 100 },
    actionRequested: { total_ndr_count: 50 },
    actionReq: { total_ndr_count: 25 },
    ndrdeleverd: { total_delivered_ndr_count: 75 }
  };

  const { counterData } = useSelector(state => state?.dashboardNdrReducer)

  const [totalNdr, setTotalNdr] = useState(dummyData.totalNdr);
  const [actionRequested, setActionRequested] = useState(dummyData.actionRequested);
  const [actionReq, setActionreq] = useState(dummyData.actionReq);
  const [ndrdeleverd, setndrDeleverd] = useState(dummyData.ndrdeleverd);

  const { screenWidthData } = useSelector(state => state?.authDataReducer)

  return (
    <>
      <div className="grid gap-3">
        {/* Card 1 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className="d-flex justify-content-start gap-10">
                  <div className="">
                    <div className="infoCardIconContainer bg-green-light">
                      <NdrIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Total NDR</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterData?.total_ndr}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <div className="card-footer">
                  <span className="text-green font13 pt20 bold-600 d-block text-end">
                    {0}%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-nowrap">
                    Comparative analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Card 2 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className="d-flex justify-content-start gap-10">
                  <div className="">
                    <div className="infoCardIconContainer bg-orange-light">
                      <ActionRequiredIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Action Required</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterData?.action_required}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <div className="card-footer">
                  <span className="text-yellow font13 pt20 bold-600 d-block text-end">
                    +0%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-nowrap">
                    Comparative analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>




        {/* Card 3 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className="d-flex justify-content-start gap-10">
                  <div className="">
                    <div className="infoCardIconContainer bg-blue-light">
                      <ActionRequestedIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">Action Requested</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterData?.action_requested}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <div className="card-footer">
                  <span className="text-blue font13 pt20 bold-600 d-block text-end">
                    +0%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-nowrap">
                    Comparative analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>




        {/* Card 4 */}
        <div className="">
          <div className="box-shadow shadow-sm p10 card-height">
            <div className="row">
              <div className="col-10 col-lg-10 col-sm-12 col-md-12 px-0">
                <div className="d-flex justify-content-start gap-10">
                  <div className="">
                    <div className="infoCardIconContainer bg-red-light">
                      <NdrDeliveredIcon />
                    </div>
                  </div>
                  <div className="alignWord">
                    <p className="font13 text-gray m-0">NDR Delivered</p>
                    <h2 className="font20r title-text p-y bold-600 m0">
                      {counterData?.ndr_delivered}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="col-2 col-lg-2 col-sm-12 col-md-12 chartContainer">
                <div className="card-footer">
                  <span className="text-red font13 pt20 bold-600 d-block text-end">
                    + 0%
                  </span>
                  <p className="text-xs text-gray font12 m0 text-gray-600 ws-nowrap">
                    Comparative analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>








      </div>
    </>
  );
}

export default NDRTotalInfo;
