import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const chartData = {
    series: [{
      name: 'Prepaid',
      data: [30, 40, 45, 50, 55] // Prepaid orders data for each week
    }, {
      name: 'COD',
      data: [20, 25, 30, 35, 40] // COD orders data for each week
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      },
      yaxis: {
        title: {
          text: 'Orders'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " orders"
          }
        }
      }
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>
    </div>
  );
};

const PrepaidCOD = () => {
  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <div className="row">
          <div className="col">
            <h4 className="title">Prepaid V/S COD Orders</h4>
          </div>
        </div>
        <ApexChart />
      </div>
    </>
  )
}

export default PrepaidCOD