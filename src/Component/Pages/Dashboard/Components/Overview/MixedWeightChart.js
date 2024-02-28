import React from 'react';
import ReactApexChart from 'react-apexcharts';

const OrdersChart = () => {
  const seriesData = [
    {
      name: 'Total Orders',
      type: 'column',
      data: [60, 40, 80, 70, 50], // Total orders for the last 5 weeks
    },
    {
      name: 'Orders with Discrepancies',
      type: 'line',
      data: [30, 20, 40, 35, 25], // Orders with discrepancies for the last 5 weeks
    },
  ];

  const optionsData = {
    chart: {
      height: '100%', // Set height to 100% to make it responsive
      type: 'line',
      toolbar: {
        show: false, // Removing the toolbar (including panning option)
      },
    },
    colors: ['#008FFB', '#FF4560'], // Specify custom colors for the series
    stroke: {
      width: [0, 4],
    },
    title: {
      text: '', // Set title text to empty string to remove the title
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    xaxis: {
      type: 'category',
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // Explicitly specify categories
      labels: {
        rotateAlways: true, // Rotate labels always
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Orders',
      },
      min: 0, // Setting minimum value for y-axis
    },
    responsive: [
      {
        // Making the chart responsive
        breakpoint: 1366, // Breakpoint for screen width of 1366
        options: {
          chart: {
            height: 400, // Adjust height for screen width of 1366
          },
        },
      },
    ],
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={optionsData} series={seriesData} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default OrdersChart;
