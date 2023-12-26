import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const NetIncomeChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'TEAM B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
      {
        name: 'TEAM C',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false, // Remove the right-side toolbar
        },
      },
      stroke: {
        width: [0, 3],
        curve: 'smooth',
      },
      fill: {
        opacity: [0.85, 1],
      },
      labels: [
        '01/01/2003',
        '02/01/2003',
        '03/01/2003',
        '04/01/2003',
        '05/01/2003',
        '06/01/2003',
        '07/01/2003',
        '08/01/2003',
        '09/01/2003',
        '10/01/2003',
        '11/01/2003',
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' points';
            }
            return y;
          },
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default NetIncomeChart;
