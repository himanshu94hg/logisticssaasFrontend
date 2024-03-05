import React, { useState, useEffect } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";

function TotalShipment() {
  const [data, setData] = useState(null);

  // Simulate fetching data from API
  useEffect(() => {
    // Simulate API call delay with setTimeout
    const fetchData = () => {
      const dummyData = {
        total_status_wise_count: 1000,
        channel_percentage_data: [
          {
            name: "delivered",
            total_count: 200,
            total_percentage: 20
          },
          {
            name: "in_transit",
            total_count: 300,
            total_percentage: 30
          },
          {
            name: "ndr",
            total_count: 100,
            total_percentage: 10
          },
          {
            name: "out_for_delivery",
            total_count: 150,
            total_percentage: 15
          },
          {
            name: "picked_up",
            total_count: 100,
            total_percentage: 10
          },
          {
            name: "shipped",
            total_count: 150,
            total_percentage: 15
          }
        ]
      };
      // Simulate delay
      setTimeout(() => {
        setData(dummyData);
      }, 1000); // Simulate 1 second delay
    };

    fetchData();
  }, []);

  // Updated function to get predefined color scale for each channel
  const getColorScale = () => {
    const colorScale = {
      delivered: "rgb(255, 0, 0)",
      in_transit: "rgb(255, 165, 0)",
      ndr: "rgb(255, 255, 0)",
      out_for_delivery: "rgb(0, 255, 0)",
      picked_up: "rgb(0, 0, 255)",
      shipped: "rgb(75, 0, 130)"
    };

    return colorScale;
  };

  // Declare colorScale here
  const colorScale = getColorScale();

  return (
    <>
      <div className="box-shadow shadow-sm p10">
        {data && data.channel_percentage_data && Array.isArray(data.channel_percentage_data) && data.channel_percentage_data.length > 0 ? (
          <div className="">
            <div className="row">
              <div className="col-8">
                <div className="d-flex justify-content-start align-items-center">
                  <div className="infoCardIconContainer bg-red">
                    <LiaShippingFastSolid className="text-white font30" />
                  </div>
                  <div className="">
                    <p className="font13 text-gray m-0">Total Shipment</p>
                    <h2 className="font20 title-text bold-600 m0">{data.total_status_wise_count}</h2>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-end">
                  {/* Assuming you have a graph image for each channel, replace 'graph-red.png' with the actual image path */}
                  <img src="graph-red.png" className="inline-block w-100" alt="Graph" />
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
                  {data.channel_percentage_data.map((item, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="font12 bold-600 mb-2">{item.name}</p>
                        <p className="font12 text-gray mb-0">
                          {item.total_count} ({item.total_percentage}%)
                        </p>
                      </div>
                      <div className="progress mb-2">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${item.total_percentage}%`,
                            backgroundColor: colorScale[item.name],
                          }}
                          aria-valuenow={item.total_percentage}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>

                    </div>
                  ))}
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
