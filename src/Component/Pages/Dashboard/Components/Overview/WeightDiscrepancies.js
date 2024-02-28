import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import CombinedChart from '../../../../common/Graph/WeightDiterpenses';
import weightDChart from './MixedWeightChart'
import MixedWeightChart from './MixedWeightChart';

const MixedChart = ({ labels, totalOrders, ordersWithDiscrepancies }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current;

    if (ctx) {
      // If chart instance already exists, destroy it first
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create new chart instance
      chartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Orders',
            data: totalOrders,
            backgroundColor: 'rgba(25, 117, 201, 0.5)', // Blue color
            borderRadius: 4, // Add border radius to the bars
            barPercentage: 0.5, // Add border radius to the bars
          }, {
            label: 'Orders with Discrepancies',
            data: ordersWithDiscrepancies,
            borderColor: 'rgba(255, 99, 132, 1)', // Red color
            backgroundColor: 'rgba(255, 99, 132, 0)', // Transparent background
            type: 'line',
            order: 9,
          }]
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Number of Orders',
              },
              ticks: {
                beginAtZero: true
              },
            }
          }
        }
      });
    }
  }, [labels, totalOrders, ordersWithDiscrepancies]);

  return <canvas ref={chartRef} id="mixed-chart" />;
};

const WeightDiscrepancies = () => {
  // Dummy data for demonstration
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
  const totalOrders = [50, 60, 70, 80, 90];
  const ordersWithDiscrepancies = [0, 15, 20, 0, 15];

  return (
    <div className="box-shadow shadow-sm p10">
      <div className="row">
        <div className="col">
          <h4 className="title">Weight Discrepancies</h4>
          {/* <MixedChart labels={labels} totalOrders={totalOrders} ordersWithDiscrepancies={ordersWithDiscrepancies} /> */}
          {/* <CombinedChart /> */}
          <MixedWeightChart />
        </div>
      </div>
    </div>
  );
};

export default WeightDiscrepancies;
