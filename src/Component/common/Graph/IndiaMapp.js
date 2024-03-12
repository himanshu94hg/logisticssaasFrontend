import React, { useEffect, useState } from "react";
import ReactDatamapsIndiaUmd from "react-datamaps-india";
import { useSelector } from "react-redux";

const IndiaMapp = ({statewiseData}) => {
  const [stateData,setStateData]=useState([])

  console.log(statewiseData,"statewiseDatastatewiseDatastatewiseData")

  const dummyData = {
    Maharashtra: { sales: 0, value: 'Maharashtra' },
    Karnataka: { sales: 80, value: 'Karnataka' },
    Delhi: { sales: 80, value: 'Delhi' },
    'Madhya Pradesh': { sales: 10, value: 'Madhya Pradesh' },
    'Uttar Pradesh': { sales: 10, value: 'Uttar Pradesh' },
    Gujarat: { sales: 10, value: 'Gujarat' },
  };

  
  // useEffect(()=>{
  //   if(statewiseData){
  //     const mappedData = Object.keys(statewiseData).reduce((acc, key) => {
  //       if (key !== "null") {
  //         acc[key] = { sales: statewiseData[key], value: key };
  //       }
  //       return acc;
  //     }, {});
  //    }
  // },[statewiseData])

  const hasData = (stateName) => {
    return dummyData.hasOwnProperty(stateName);
  };

  const colorWithData = "#111"; // Color for states with data
  const colorWithoutData = "#ccc"; // Color for states without data

  return (
    <div style={{ position: "relative" }}>
      <ReactDatamapsIndiaUmd
        style={{ width: "50%", height: "50%", position: "relative", left: "25%" }}
        responsive
        customFill={(geography) => {
          const stateName = geography.properties.name;
          return hasData(stateName) ? colorWithData : colorWithoutData; // Return color based on data presence
        }}
        hoverComponent={({ value }) => {
          // Check if value is defined to avoid errors
          if (!value) return null;
          // Check if dummy data exists for the hovered state
          const stateData = dummyData[value.name];
          if (stateData) {
            // Display dummy data if available
            return (
              <div className="hover-tooltip">
                <div className="tooltip-content">
                  <p>{stateData.value}</p>
                  <p>Orders: {stateData.sales}</p>
                </div>
              </div>
            );
          } else {
            // If no dummy data is available, display a message
            return (
              <div className="hover-tooltip">
                <div className="tooltip-content">
                  <p>No data available</p>
                </div>
              </div>
            );
          }
        }}
        mapLayout={{
          legendTitle: "",
          startColor: "#1975c9",
          endColor: "#1975c9",
          hoverTitle: "Count",
          noDataColor: "#fff",
          borderColor: "#1975c9",
          hoverColor: "#1975c9",
          hoverBorderColor: "#1975c9",
          height: 10,
          weight: 30
        }}
      />
    </div>
  );
};

export default IndiaMapp;
