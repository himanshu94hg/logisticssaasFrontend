import React, { useState, useEffect } from "react";
import axios from "axios";
import { LiaShippingFastSolid } from "react-icons/lia";

const RTOOrderDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://35.154.133.143/api/v1/calculate-status-wise-rto/")
      .then((response) => {
        setData(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const progressBarColors = ["blue", "red", "green", "orange", "purple"]; // Add more colors as needed

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
                <h2 className="font20 title-text bold-600 m0">
                  {loading ? "Loading..." : data.total_rto_count}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="text-end mb-3">
              <img
                src="graph-red.png"
                className="inline-block w-100 invisible"
                alt="Graph"
              />
              <span className="text-green font13 bold-600 d-block">
                {loading
                  ? "N/A"
                  : data.status_wise_percentages.length > 0
                  ? `${data.status_wise_percentages[0].percentage}%`
                  : "N/A"}
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
              {loading ? (
                <p>Loading data...</p>
              ) : error ? (
                <p>{error}</p>
              ) : data && data.status_wise_percentages && data.status_wise_percentages.length > 0 ? (
                data.status_wise_percentages.map((status, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between">
                      <p className="font12 bold-600 mb-10">{`RTO ${status.status.replace(
                        "_",
                        " "
                      )}`}</p>
                      <p className="font12 bold-600 mb-10">
                        {status.status_count}
                        <span className="text-gray-light ">
                          {` (${status.percentage}%)`}
                        </span>
                      </p>
                    </div>

                    <div className="progress mb-15">
                      <div
                        className={`progress-bar bg-${progressBarColors[index % progressBarColors.length]}`}
                        role="progressbar"
                        style={{ width: `${status.percentage}%` }}
                        aria-valuenow={status.percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RTOOrderDetails;
