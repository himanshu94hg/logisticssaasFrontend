import ReactDatamapsIndiaUmd from "react-datamaps-india";

const IndiaMapp = ({ stateMapData }) => {
  const hasData = (stateName) => {
    return stateMapData.hasOwnProperty(stateName);
  };

  const colorWithData = "#111";
  const colorWithoutData = "#ccc";

  return (
    <div style={{ position: "relative" }}>
      <ReactDatamapsIndiaUmd
        style={{ width: "50%", height: "50%", position: "relative", left: "25%" }}
        responsive
        customFill={(geography) => {
          const stateName = geography?.properties?.name;
          return hasData(stateName) ? colorWithData : colorWithoutData; 
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
  );
};

export default IndiaMapp;
