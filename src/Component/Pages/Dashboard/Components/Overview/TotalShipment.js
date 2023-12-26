import React, { useState, useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import axios from "axios";
import Col from "react-bootstrap/Col";
import StateSplitDashboard from "./StateSplitDashboard";
import DeliveryPerformance from "./DeliveryPerformance";

function TotalShipment() {
  const [shipmentData, setShipmentData] = useState(null);
  const [totalCreated, setTotalCreated] = useState(null);
  const [totalToBePicked, setToBePicked] = useState(null);
  const [totalPicked, setPicked] = useState(null);
  const [totalInTransit, setInTransit] = useState(null);
  const [totalOutForDelivery, setOutForDelivery] = useState(null);
  const [totalDelivery, setDelivery] = useState(null);
  const [totalNdr, setNdr] = useState(null);
  const [totalRto, setRto] = useState(null);


  const requestData = {
    sellerId: "150",
    start: "2023-10-01 00:00:00",
    end: "2023-10-30 00:00:00",
  };

  useEffect(() => {
    axios
      .post(
        "https://www.shipease.in/api/microservices/dashboard/overview/get-shipment-overview",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setShipmentData(response.data.data);
        if (response.data.data) {
          const shipmentTotalData = response.data.data;
          const toBePickedPercentage =
            shipmentTotalData?.to_be_picked +
            shipmentTotalData?.picked +
            shipmentTotalData?.in_transit +
            shipmentTotalData?.out_for_delivery +
            shipmentTotalData?.delivered +
            shipmentTotalData?.ndr +
            shipmentTotalData?.rto;
          const totalCreate = shipmentTotalData?.today_created * 100 / toBePickedPercentage;
          setTotalCreated(totalCreate.toFixed(2));
          const to_be_picked = shipmentTotalData?.to_be_picked * 100 / toBePickedPercentage;
          setToBePicked(to_be_picked.toFixed(2));
          const picked = shipmentTotalData?.picked * 100 / toBePickedPercentage;
          setPicked(picked.toFixed(2));
          const in_transit = shipmentTotalData?.in_transit * 100 / toBePickedPercentage;
          setInTransit(in_transit.toFixed(2));
          const out_for_delivery = shipmentTotalData?.out_for_delivery * 100 / toBePickedPercentage;
          setOutForDelivery(out_for_delivery.toFixed(2));
          const delivered = shipmentTotalData?.delivered * 100 / toBePickedPercentage;
          setDelivery(delivered.toFixed(2));
          const ndr = shipmentTotalData?.ndr * 100 / toBePickedPercentage;
          setNdr(ndr.toFixed(2));
          const rto = shipmentTotalData?.rto * 100 / toBePickedPercentage;
          setRto(rto.toFixed(2));
        }
      })
      .catch((error) => {
        console.error(error);
        setShipmentData(null);
      });
  }, [requestData]);

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
                <p className="font13 text-gray m-0">Total Shipment</p>
                <h2 className="font20 title-text bold-600 m0">25,560</h2>
                {/* <h2 className="font20 title-text p-y bold-600 m0">{shipmentData?.today_shipment}</h2> */}
                {/* <p className="font12 text-red">Created {shipmentData?.today_created} </p> */}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="text-end">
              <img src="graph-red.png" className="inline-block w-100" />
              <span className="text-color font13 pt20 bold-600 d-block">
                ({totalCreated}%)
              </span>
              <p className="text-xs text-gray font13 m0 text-gray-600">
                this month
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="progress-widget">
              <div className="d-flex justify-content-between">
                <p className="font12 bold-600 mb-10">Yet to Pick</p>
                <p className="font12 bold-600 mb-10">
                  {shipmentData?.to_be_picked}
                  <span className="text-gray-light ">
                    ({totalToBePicked}%)
                  </span>
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
                <p className="font12 bold-600 mb-10">Picked</p>
                <p className="font12 bold-600 mb-10">
                  {shipmentData?.picked}{" "}
                  <span className="text-gray-light ">
                    ({totalPicked}%)
                  </span>
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
                <p className="font12 bold-600 mb-10">In-Transit</p>
                <p className="font12 bold-600 mb-10">
                  {shipmentData?.in_transit}{" "}
                  <span className="text-gray-light ">
                    ({totalInTransit}%)
                  </span>
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

              <div className="d-flex justify-content-between">
                <p className="font12 bold-600 mb-10">Out Of Delivery</p>
                <p className="font12 bold-600 mb-10">
                  {shipmentData?.out_for_delivery}{" "}
                  <span className="text-gray-light ">
                    ({totalOutForDelivery}%)
                  </span>
                </p>
              </div>

              <div className="progress  mb-15">
                <div
                  className="progress-bar bg-orange w50"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <div className="d-flex justify-content-between">
                <p className="font12 bold-600 mb-10">Delivered</p>
                <p className="font12 bold-600 mb-10">
                  {shipmentData?.delivered}{" "}
                  <span className="text-gray-light ">
                    ({totalDelivery}%)
                  </span>
                </p>
              </div>

              <div className="progress  mb-15">
                <div
                  className="progress-bar bg-aqua w50"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <div className="d-flex justify-content-between">
                <p className="font12 bold-600 mb-10">NDR</p>
                <p className="font12 bold-600 mb-10">
                  {shipmentData?.ndr}{" "}
                  <span className="text-gray-light ">
                    ({totalNdr}%)
                  </span>
                </p>
              </div>

              <div className="progress mb-15">
                <div
                  className="progress-bar bg-purple w50"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <div className="d-flex justify-content-between">
                <p className="font12 bold-600 mb-10">RTO</p>
                <p className="font12 bold-600 mb-10">
                  {shipmentData?.rto}{" "}
                  <span className="text-gray-light ">
                    ({totalRto}%)
                  </span>
                </p>
              </div>

              <div className="progress">
                <div
                  className="progress-bar bg-pink w50"
                  role="progressbar"
                  aria-valuenow="20"
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

export default TotalShipment;
