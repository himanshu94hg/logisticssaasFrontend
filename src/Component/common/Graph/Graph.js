import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Graph = () => {
  const data = {
    labels: ['Jan','Feb','Mar','Apr','May'],
    datasets: [
      {
        label: ' ',
        data: [100,120,100,110],
        data2: [220,100,140,80],
        fill: false,
        border: '4px solid red',
        borderColor: 'red',
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false, // Remove x-axis
      },
      y: {
        display: false, // Remove y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Remove legend
      },
    },
    elements: {
      point: {
        radius: 0, // Remove data points
      },
    },
    tooltips: {
      enabled: false, // Remove tooltips
    },
  };

  return (
    <div style={{ height: '50px', width: '120px' }}>
      <Line type="monotone" data={data} options={options}/>
    </div>
  );
};

export default Graph;