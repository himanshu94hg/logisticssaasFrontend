import { useEffect, useState } from "react";
import ReactDatamapsIndiaUmd from "react-datamaps-india";
import DatamapsIndia from 'react-datamaps-india'
const IndiaMapp = ({ stateMapData }) => {
  const hasData = (stateName) => {
    return stateMapData.hasOwnProperty(stateName);
  };
  const [stateData, setStateData] = useState({})

  const colorWithData = "#00FF00"; // Green color when data is present
  const colorWithoutData = "#ccc"; // Default color when data is absent

  useEffect(() => {
    if (stateMapData) {
      const transformedData = {}
      for (const state in stateMapData) {
        const { value, sales } = stateMapData[state];
        transformedData[state] = { value: sales };
      }
      setStateData(transformedData)
    }
  }, [stateMapData])


  return (
    <>
      <div style={{ position: "relative" }}>
        <ReactDatamapsIndiaUmd
          style={{ width: "50%", height: "50%", position: "relative", left: "25%" }}
          responsive
          regionData={stateData}
          customFill={(geography) => {
            console.log(geography, "the data is coming the the "); // Debugging log
          }}
          hoverComponent={({ value }) => {
            if (!value) return null;
            const stateData = stateMapData[value?.name];
            if (stateData) {
              return (
                <div className="hover-tooltip">
                  <div className="tooltip-content">
                    <p>{stateData?.value}</p>
                    <p>Orders: {stateData?.sales}</p>
                  </div>
                </div>
              );
            } else {
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
    </>

  );
};

export default IndiaMapp;
