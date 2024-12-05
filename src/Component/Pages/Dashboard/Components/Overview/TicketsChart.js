import React, { useEffect, useState } from "react";
import "./courierwiseCard.css";
import Chart from 'react-apexcharts';

function TicketsChart() {

  // useEffect(() => {
  //   const style = document.createElement('style');
  //   style.type = 'text/css';
  //   style.innerHTML = `
  //     .apexcharts-bar-series .apexcharts-datalabels {
  //       display: none !important;
  //     }
  //   `;
  //   document.head.appendChild(style);
  //   return () => {
  //     document.head.removeChild(style); // Cleanup when the component unmounts
  //   };
  // }, []);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'line', // Mixed chart type
      height: 350,
      toolbar: {
        show: false, // Disable toolbar icons
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: true, // Disable data labels globally
    },
    stroke: {
      width: [0, 0, 3], // Increased line width for visibility
      curve: 'smooth', // Smooth curve for the line
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // X-axis labels
    },
    yaxis: [
      {
        title: {
          text: 'Number of Tickets',
        },
      },
    ],
    legend: {
      position: 'top', // Legend position
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Open Tickets',
      type: 'bar', // Bar for Open Tickets
      data: [30, 40, 35, 50],
      dataLabels: {
        enabled: false, // Disable data labels for this series
      },
    },
    {
      name: 'Closed Tickets',
      type: 'bar', // Bar for Closed Tickets
      data: [20, 30, 25, 45],
      dataLabels: {
        enabled: false, // Disable data labels for this series
      },
    },
    {
      name: 'Closed Within TAT',
      type: 'line', // Line for Closed Within TAT
      data: [10, 15, 12, 20],
      dataLabels: {
        enabled: true, // Enable data labels for this series
      },
    },
  ]);

  return (
    <div className="box-shadow shadow-sm p10 tickets-chart">
      <h4 className="title">Tickets Chart</h4>
      <div>
        <Chart options={chartOptions} series={series} height={350} />
      </div>
    </div>
  );
}

export default TicketsChart;
