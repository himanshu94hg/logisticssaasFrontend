// src/LineGraph.js

import React from 'react';
import { Line } from 'react-chartjs-2';

const ScreenWidth = window.innerWidth

const LineGraph = ({ cardColor }) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: ' ',
        data: [10, 20, 15, 25, 30],
        fill: false,
        borderColor: cardColor,
        tension: 0.1,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Set background color to transparent
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // Hide the x-axis
      },
      y: {
        display: false, // Hide the y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    elements: {
      point: {
        radius: 0, // Hide data points
      },
    },
    animation: false,
    hover: {
      mode: null, // Disable hover interactions
    },
    tooltips: {
      enabled: false, // Disable tooltips on hover
    },
  };


  return (
    <>
      {
        ScreenWidth > 991 &&
        <div style={{ height: '2rem', width: '6rem', display: 'flex', justifyContent: 'flex-end' }}>
          {/* <h2>Linear Line Graph</h2> */}
          <Line data={data} options={options} />
        </div>
      }
    </>
  );
};

export default LineGraph;
