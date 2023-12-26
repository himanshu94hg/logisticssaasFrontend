import React, { useState, useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import axios from "axios";

function TotalShipment() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/v1/status-wise-graph/')
      .then(response => {
        console.log('Data:', response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      {data && (
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
                  {/* Replace '25,560' with the actual value you want to display */}
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="text-end">
                <img src="graph-red.png" className="inline-block w-100" />
                <span className="text-color font13 pt20 bold-600 d-block">
                  {/* Replace '({totalCreated}%)' with the actual value you want to display */}
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
                {data.map((item, index) => (
                  <div key={index} className="mb-3">
                    <p className="font12 bold-600 mb-2">{item.name}</p>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar bg-blue"
                        role="progressbar"
                        style={{ width: `${item.total_percentage}%` }}
                        aria-valuenow={item.total_percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="font12 text-gray mb-0">
                      {item.total_count} ({item.total_percentage}%)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TotalShipment;
