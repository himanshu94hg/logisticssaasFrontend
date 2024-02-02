import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [{
      data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
    }],
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false, // Hide the toolbar
        },
      },
      stroke: {
        curve: 'stepline',
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Stepline Chart',
        align: 'left',
      },
      markers: {
        hover: {
          sizeOffset: 4,
        },
      },
      noData: {
        text: 'No data available', // Display a message when there is no data
      },
      legend: {
        show: false, // Hide legend
      },
      dataLabels: {
        enabled: false, // Hide data labels
      },
      tooltip: {
        enabled: false, // Disable tooltip
      },
      xaxis: {
        labels: {
          show: false, // Hide X-axis labels
        },
      },
      yaxis: {
        labels: {
          show: false, // Hide Y-axis labels
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

export default ApexChart;
