import React from "react";
import DatamapsIndia from "react-datamaps-india";

const IndiaMapp = () => {
  return (
    <div style={{ position: "relative" }}>
      <DatamapsIndia
        style={{ width: "25%", height: "25%", position: "relative", left: "25%" }}
        responsive
        regionData={{
          // ... your regionData
        }}
        hoverComponent={({ value }) => {
          return (
            <div>
              <div>
                {value.name} {value.value} OCs
              </div>
            </div>
          );
        }}
        mapLayout={{
          legendTitle: "Number of OCs",
          startColor: "#b3d1ff",
          endColor: "#005ce6",
          hoverTitle: "Count",
          noDataColor: "#f5f5f5",
          borderColor: "#8D8D8D",
          hoverColor: "blue",
          hoverBorderColor: "green",
          height: 10,
          weight: 30
        }}
      />
    </div>
  );
};
export default IndiaMapp;
