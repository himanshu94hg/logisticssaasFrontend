import React, { useState, useEffect } from "react";
import { VectorMap } from "react-jvectormap"

const map = [
  { code: "IN-RJ", value: 10000 },
  { code: "IN-MP", value: 800 },
  { code: "IN-DL", value: 900 },
  { code: "IN-KL", value: 500 }
];

function StateSplitDashboard() {
  const getdata = (key) => {
    const countryData = {};
    map.forEach((obj) => {
      countryData[obj.code] = obj.value;
    });
    return countryData[key];
  };

  const getalldata = () => {
    const countryData = {};
    map.forEach((obj) => {
      countryData[obj.code] = obj.value;
    });
    return countryData;
  };

  const handleshow2 = (e, el, code) => {
    el.html(el.html() + ` <br> Statistics: ${getdata(code)}`);
  };

  return (
    <div className="box-shadow shadow-sm p10 state-wise-card">
      <div className="card-heading">
        <h4 className="title">State Wise Split</h4>
        <p className="export-report">Export Report</p>
      </div>
      <div className="card-count">
        <h5 className="total-count">0<span className="font12 text-gray">Sales</span></h5>
        <p className="font12 text-gray">Compared To Last Month</p>
      </div>

      <div>
        <VectorMap
          map={"in_mill"}
          backgroundColor="transparent"
          focusOn={{
            x: 0.5,
            y: 0.5,
            scale: 0,
            animate: false
          }}
          zoomOnScroll={true}
          containerStyle={{
            width: "100%",
            height: "500px"
          }}
          onRegionClick={(e, code) => console.log(code)} // Handle region click
          onRegionTipShow={handleshow2}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer"
            },
            selected: {
              fill: "#2938bc" // onclick color of state
            }
          }}
          regionsSelectable={false}
          series={{
            regions: [
              {
                values: getalldata(), // Can be directly served with API response or any data
                scale: ["#C8EEFF", "#0071A4"], // Color range
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
      </div>

    </div>
  );
}


export default StateSplitDashboard;
