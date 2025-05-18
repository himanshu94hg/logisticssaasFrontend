// src/LineGraph.js

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const LineGraph = ({ cardColor }) => {
  const { screenWidthData } = useSelector(state => state?.authDataReducer);

  const series = [
    {
      name: '',
      data: [10, 20, 15, 25, 30]
    }
  ];

  const options = {
    chart: {
      type: 'line',
      height: 50,
      toolbar: { show: false },
      sparkline: {
        enabled: true // Hide axes, legend, tooltips for a minimal sparkline look
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: [cardColor],
    markers: {
      size: 0
    },
    tooltip: {
      enabled: false
    },
    grid: {
      show: false
    }
  };

  return (
    <>
      {screenWidthData > 991 && (
        <div style={{ height: '2rem', width: '6rem', display: 'flex', justifyContent: 'flex-end' }}>
          <ReactApexChart options={options} series={series} type="line" height={30} width={60} />
        </div>
      )}
    </>
  );
};

export default LineGraph;
