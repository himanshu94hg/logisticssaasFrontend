import React from 'react';
import GaugeChart from 'react-gauge-chart';

const RiskGauge = ({ riskLevel }) => {
  // Set initial values for percentage and colors
  let percent = 0;
  let colors = [];

  // Determine percentage and color based on the riskLevel
  switch (riskLevel) {
    case 'Low':
      percent = 0.2; // 20% for Low risk
      colors = ['yellow', 'orange', 'red']; // Blue to Yellow to Red
      break;
    case 'Medium':
      percent = 0.5; // 50% for Medium risk
      colors = ['yellow', 'orange', 'red']; // Blue to Yellow to Red
      break;
    case 'High':
      percent = 0.8; // 80% for High risk
      colors = ['yellow', 'orange', 'red']; // Blue to Yellow to Red
      break;
    default:
      percent = 0.0; // Default to 0 if invalid
      colors = ['yellow', 'orange', 'red']; // Blue to Yellow to Red
  }

  return (
    <div style={{ width: '60px', textAlign: 'center' }}>
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={30}
        colors={colors}  // Set dynamic colors
        arcWidth={0.3}
        percent={percent}  // Set dynamic percentage based on riskLevel
      />

    </div>
  );
};

export default RiskGauge;
