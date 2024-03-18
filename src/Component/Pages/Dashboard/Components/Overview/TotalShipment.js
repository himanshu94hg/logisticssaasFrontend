import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { dateRangeDashboard } from "../../../../../customFunction/dateRange";
import { percentage } from "../../../../../customFunction/functionLogic";

function TotalShipment() {
  const dispatch = useDispatch()
  const [data, setData] = useState(null);
  const [totalShipment, setTotalShipment] = useState(null);
  const { shimpmetCard } = useSelector(state => state?.dashboardOverviewReducer)



  useEffect(() => {
    dispatch({ type: "DASHBOARD_OVERVIEW_SHIPMENTCARD_ACTION", payload: dateRangeDashboard })
  }, [])

  useEffect(() => {
    if (shimpmetCard) {
      const total_shipment = Object.values(shimpmetCard).reduce((acc, value) => acc + value, 0)
      setTotalShipment(total_shipment)
    }
    setTimeout(() => {
      setData(shimpmetCard);
    }, 1000);
  }, [shimpmetCard]);

  const getColorScale = () => {
    const colorScale = {
      yet_to_pick: "#2489BE",
      delivered: "#3BB54B",
      in_transit: "#FFD300",
      ndr: "#F31429",
      out_for_delivery: "#1975C9",
      picked_up: "#A020F0",
      shipped: "#0F3C5B"
    };
    return colorScale;
  };

  const colorScale = getColorScale();


  return (
    <>
      <div className="box-shadow shadow-sm p10">
        {data ? (
          <div className="">
            <div className="row">
              <div className="col-8">
                <div className="d-flex justify-content-start align-items-center">
                  <div className="infoCardIconContainer bg-red">
                    <LiaShippingFastSolid className="text-white font30" />
                  </div>
                  <div className="">
                    <p className="font13 text-gray m-0">Total Shipment</p>
                    <h2 className="font20 title-text bold-600 m0">{totalShipment}</h2>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-end">
                  <img src="graph-red.png" className="inline-block w-100" alt="Graph" />
                  <span className="text-color font13 pt20 bold-600 d-block">
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
                  {/* Yet To Pick */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="font12 bold-600 mb-2">Yet To Pick</p>
                      <p className="font12 text-gray mb-0">
                        {shimpmetCard?.delivered_orders} {percentage(shimpmetCard?.delivered_orders, totalShipment)}
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${shimpmetCard?.delivered_orders}%`,
                          backgroundColor: colorScale.yet_to_pick,
                        }}
                        aria-valuenow={shimpmetCard?.delivered_orders}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  {/* Delivered */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="font12 bold-600 mb-2">Delivered</p>
                      <p className="font12 text-gray mb-0">
                        {shimpmetCard?.delivered_orders} {percentage(shimpmetCard?.delivered_orders, totalShipment)}
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${shimpmetCard?.delivered_orders}%`,
                          backgroundColor: colorScale.delivered,
                        }}
                        aria-valuenow={shimpmetCard?.delivered_orders}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  {/* In Transit */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="font12 bold-600 mb-2">In Transit</p>
                      <p className="font12 text-gray mb-0">
                        {shimpmetCard?.intransit_orders} {percentage(shimpmetCard?.intransit_orders, totalShipment)}
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${shimpmetCard?.intransit_orders}%`,
                          backgroundColor: colorScale?.in_transit,
                        }}
                        aria-valuenow={shimpmetCard?.intransit_orders}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  {/* NDR */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="font12 bold-600 mb-2">NDR</p>
                      <p className="font12 text-gray mb-0">
                        {shimpmetCard?.ndr_orders} {percentage(shimpmetCard?.ndr_orders, totalShipment)}
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${shimpmetCard?.ndr_orders}%`,
                          backgroundColor: colorScale.ndr,
                        }}
                        aria-valuenow={shimpmetCard?.ndr_orders}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  {/* OFD */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="font12 bold-600 mb-2">Out For Delivery</p>
                      <p className="font12 text-gray mb-0">
                        {shimpmetCard?.out_for_delivery}  {percentage(shimpmetCard?.out_for_delivery, totalShipment)}
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${shimpmetCard?.out_for_delivery}%`,
                          backgroundColor: colorScale?.out_for_delivery,
                        }}
                        aria-valuenow={shimpmetCard?.out_for_delivery}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  {/* Picked Up */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="font12 bold-600 mb-2">Picked Up</p>
                      <p className="font12 text-gray mb-0">
                        {shimpmetCard?.picked_up_orders}   {percentage(shimpmetCard?.picked_up_orders, totalShipment)}
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${shimpmetCard?.picked_up_orders}%`,
                          backgroundColor: colorScale.picked_up,
                        }}
                        aria-valuenow={shimpmetCard?.picked_up_orders}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  {/* Shipped */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="font12 bold-600 mb-2">Shipped</p>
                      <p className="font12 text-gray mb-0">
                        {shimpmetCard?.shipped_orders}   {percentage(shimpmetCard?.shipped_orders, totalShipment)}
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${shimpmetCard?.shipped_orders}%`,
                          backgroundColor: colorScale?.shipped,
                        }}
                        aria-valuenow={shimpmetCard?.shipped_orders}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default TotalShipment;
