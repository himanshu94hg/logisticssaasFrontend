import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";

const RTOOrderDetails = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col-8">
                        <div className="d-flex justify-content-start align-items-center">
                            <div className="infoCardIconContainer bg-red">
                                <LiaShippingFastSolid className="text-white font30" />
                            </div>
                            <div className="">
                                <p className="font13 text-gray m-0">RTO Order Details</p>
                                <h2 className="font20 title-text bold-600 m0">2,543</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="text-end mb-3">
                            <img src="graph-red.png" className="inline-block w-100 invisible" />
                            <span className="text-green font13 bold-600 d-block">
                                40%
                            </span>
                            <p className="text-xs text-gray font13 m0 text-gray-600">
                                RTO Percentage
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="progress-widget">
                            <div className="d-flex justify-content-between">
                                <p className="font12 bold-600 mb-10">RTO Initiated</p>
                                <p className="font12 bold-600 mb-10">
                                    122<span className="text-gray-light "> (40%)</span>
                                </p>
                            </div>

                            <div className="progress mb-15">
                                <div
                                    className="progress-bar bg-blue w50"
                                    role="progressbar"
                                    aria-valuenow="60"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>

                            <div className="d-flex justify-content-between">
                                <p className="font12 bold-600 mb-10">RTO In Transit</p>
                                <p className="font12 bold-600 mb-10">
                                    1,653<span className="text-gray-light "> (80%)</span>
                                </p>
                            </div>

                            <div className="progress mb-15">
                                <div
                                    className="progress-bar bg-red w50"
                                    role="progressbar"
                                    aria-valuenow="50"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>

                            <div className="d-flex justify-content-between">
                                <p className="font12 bold-600 mb-10">RTO Delivered</p>
                                <p className="font12 bold-600 mb-10">
                                    166<span className="text-gray-light "> (70%)</span>
                                </p>
                            </div>

                            <div className="progress mb-15">
                                <div
                                    className="progress-bar bg-green w50"
                                    role="progressbar"
                                    aria-valuenow="50"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default RTOOrderDetails