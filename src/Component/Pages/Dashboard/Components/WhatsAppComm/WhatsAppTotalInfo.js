import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import '../Overview/totalInfoDashboard.css'
import DataTable from "../Overview/DataTable/DataTable";
import TableDashboard from '../Overview/TableDashboard'
import './WhatsAppTotalInfo.css'
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import iconRTO from '../../../../../assets/image/icons/RTO_icon.png'
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png'
import NDRicon from '../../../../../assets/image/icons/NDRicon.png'
import NDRdelivered from '../../../../../assets/image/icons/NDRdelivered.png'
import NdrIcon from "../../../../common/Icons/InfoCardsIcons/NdrIcon";
import ActionRequiredIcon from "../../../../common/Icons/InfoCardsIcons/ActionRequiredIcon";
import ActionRequestedIcon from "../../../../common/Icons/InfoCardsIcons/ActionRequestedIcon";
import NdrDeliveredIcon from "../../../../common/Icons/InfoCardsIcons/NdrDeliveredIcon";

function WhatsAppTotalInfo() {
  const [totalNdr, setTotalNdr] = useState(null);
  const [actionRequested, setActionRequested] = useState(null);
  const [actionReq, setActionreq] = useState(null);
  const [ndrdeleverd, setndrDeleverd] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [
  //         totalNdrResponse,
  //         actionRequestedResponse,
  //         actionReqResponse,
  //         ndrdeleverdResponse,
  //       ] = await Promise.all([
  //         axios.get('http://dev.shipease.in:8088/api/v1/total-ndr/'),
  //         axios.get('http://dev.shipease.in:8088/api/v1/total-requested-ndr/'),
  //         axios.get('http://dev.shipease.in:8088/api/v1/total-required-ndr/'),
  //         axios.get('http://dev.shipease.in:8088/api/v1/total-deleverd-ndr/'),
  //       ]);
  //       setTotalNdr(totalNdrResponse.data);
  //       setActionreq(actionReqResponse.data);
  //       setActionRequested(actionRequestedResponse.data);
  //       setndrDeleverd(ndrdeleverdResponse.data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
                    <h3 className="font20 title-text p-y bold-600 m0">{totalNdr?.total_ndr_count}</h3>
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
                    <h3 className="font20 title-text p-y bold-600 m0">{actionReq?.total_ndr_count}</h3>
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
      {/* <TableDashboard /> */}
      {/* <div className="mt-3 datatable-container">
        <h4 className="title">Last 30 Days Order</h4>
        <DataTable />
      </div> */}
    </>
  );
}

export default WhatsAppTotalInfo;
