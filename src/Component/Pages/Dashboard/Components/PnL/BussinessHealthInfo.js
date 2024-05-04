import React, { useState } from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import NDRicon from '../../../../../assets/image/icons/NDRicon.png'
import iconDelivery from '../../../../../assets/image/icons/delivery_icon.png'
import NDRdelivered from '../../../../../assets/image/icons/NDRdelivered.png'
import NdrIcon from "../../../../common/Icons/InfoCardsIcons/NdrIcon";
import ActionRequiredIcon from "../../../../common/Icons/InfoCardsIcons/ActionRequiredIcon";
import NdrDeliveredIcon from "../../../../common/Icons/InfoCardsIcons/NdrDeliveredIcon";
import ActionRequestedIcon from "../../../../common/Icons/InfoCardsIcons/ActionRequestedIcon";

function BussinessHealthInfo() {
    // Dummy data
    const dummyData = {
        totalNdr: { total_ndr_count: 100 },
        actionRequested: { total_ndr_count: 50 },
        actionReq: { total_ndr_count: 25 },
        ndrdeleverd: { total_delivered_ndr_count: 75 }
    };

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
                                        <div className="infoCardIconContainer bg-green-light">
                                            <NdrIcon />
                                        </div>
                                        <p className="font14 text-gray m-0 ws-nowrap">Total Sales Volume</p>
                                        <h3 className="font20 title-text p-y bold-600 m0">{totalNdr.total_ndr_count}</h3>
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
                                        <p className="font14 text-gray m-0 ws-nowrap">Total Credited Volume</p>
                                        <h3 className="font20 title-text p-y bold-600 m0">{actionReq.total_ndr_count}</h3>
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
                                        <p className="font14 text-gray m-0 ws-nowrap">Total COD Sales</p>
                                        <h3 className="font20 title-text p-y bold-600 m0">{actionRequested.total_ndr_count}</h3>
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
                                        <p className="font14 text-gray m-0 ws-nowrap">Total Prepaid Sales</p>
                                        <h3 className="font20 title-text p-y bold-600 m0">{ndrdeleverd.total_delivered_ndr_count}</h3>
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

export default BussinessHealthInfo;
