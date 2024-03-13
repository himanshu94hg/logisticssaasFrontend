import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import DataTable from "../Overview/DataTable/DataTable";
import TableDashboard from '../Overview/TableDashboard';
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import iconRTO from '../../../../../assets/image/icons/RTO_icon.png';
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png';
import NDRicon from '../../../../../assets/image/icons/NDRicon.png';
import NDRdelivered from '../../../../../assets/image/icons/NDRdelivered.png';

function SubAccountsInfo() {
  const [totalNdr, setTotalNdr] = useState({ total_ndr_count: 100 }); // Dummy data
  const [actionRequested, setActionRequested] = useState({ total_ndr_count: 50 }); // Dummy data
  const [actionReq, setActionreq] = useState({ total_ndr_count: 75 }); // Dummy data
  const [ndrdeleverd, setndrDeleverd] = useState({ total_delivered_ndr_count: 25 }); // Dummy data

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
                    <p className="font14 text-gray m-0 ws-nowrap">Total Accounts</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{totalNdr.total_ndr_count}</h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingUp className="trending-icon" />
                  </div>
                </div>
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
                    <p className="font14 text-gray m-0 ws-nowrap">Sub Accounts</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{actionReq.total_ndr_count}</h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingUp className="trending-icon" />
                  </div>
                </div>
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
                    <p className="font14 text-gray m-0 ws-nowrap">Referral Accounts</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{actionRequested.total_ndr_count}</h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingUp className="trending-icon" />
                  </div>
                </div>
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
                    <p className="font14 text-gray m-0 ws-nowrap">Refferal Amount</p>
                    <h3 className="font20 title-text p-y bold-600 m0">{ndrdeleverd.total_delivered_ndr_count}</h3>
                  </div>
                  <div className="col-2">
                    <HiTrendingDown className="trending-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubAccountsInfo;
