import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const ApexChart = () => {
  const { orderPrepaidData } = useSelector(state => state?.dashboardOrderReducer)

  const [chartData, setChartData] = useState({
    series: [{
      name: 'Prepaid',
      data: []
    }, {
      name: 'COD',
      data: []
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
  })

  useEffect(() => {
    if (orderPrepaidData) {
      const codValues = [];
      const prepaidValues = [];
      const weekValues = [];
      orderPrepaidData?.forEach(item => {
        codValues.push(item.cod);
        prepaidValues.push(item.prepaid);
        weekValues.push("Week " + item.week_number);
      });
      setChartData(prevState => ({
        ...prevState,
        series: [
          { ...prevState.series[0], data: prepaidValues },
          { ...prevState.series[1], data: codValues }
        ],
        options: {
          ...prevState.options,
          xaxis: {
            categories: weekValues
          }
        }
      }));
    }
  }, [orderPrepaidData]);

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