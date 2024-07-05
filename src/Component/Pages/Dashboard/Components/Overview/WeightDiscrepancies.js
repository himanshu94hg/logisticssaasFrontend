import React, {useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import {useDispatch, useSelector} from "react-redux";
import { dateRangeDashboard } from '../../../../../customFunction/dateRange';

const MixedWeightChart = () => {
  const deliveryData = useSelector(state => state?.dashboardOverviewReducer.weightDispenceryData);

  const seriesData = [
    {
      name: 'Total Orders',
      type: 'line',
      data: deliveryData?.map(item=>item.total_order),
    },
    {
      name: 'Orders with Discrepancies',
      type: 'column',
      data: deliveryData?.map(item=>item.disputed_order), 
    },
  ];

  const optionsData = {
    chart: {
      height: '100%', 
      type: 'column',
      toolbar: {
        show: false, 
      },
    },
    colors: ['#008FFB', '#FF4560'], 
    stroke: {
      width: [0, 4],
    },
    title: {
      text: '', 
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    xaxis: {
      type: 'category',
      categories: deliveryData?.map((item,index)=>`Week ${index+1}`),
      labels: {
        rotateAlways: true, 
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Orders',
      },
      min: 0, 
    },
    responsive: [
      {
      
        breakpoint: 1366, 
        options: {
          chart: {
            height: 400, 
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

const WeightDiscrepancies = () => {
  return (
    <div className="box-shadow shadow-sm p10">
      <div className="row">
        <div className="col">
          <h4 className="title">Weight Discrepancies</h4>
          <MixedWeightChart />
        </div>
      </div>
    </div>
  );
};

export default WeightDiscrepancies;
