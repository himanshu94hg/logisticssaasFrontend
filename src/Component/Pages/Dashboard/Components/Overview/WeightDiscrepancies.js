import React, {useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import {useDispatch, useSelector} from "react-redux";

const MixedWeightChart = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(currentDate);

    dispatch({
      type: "DASHBOARD_OVERVIEW_WEIGHT_DISCREPANCIES_ACTION",
      payload: {
        start_date: formattedStartDate,
        end_date: formattedEndDate
      }
    });
  }, [dispatch]);

  const deliveryData = useSelector(state => state?.dashboardOverviewReducer.weightDispenceryData);
  console.log(deliveryData, "weightDispenceryData Performance Data");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const seriesData = [
    {
      name: 'Total Orders',
      type: 'column',
      data: deliveryData?.map(item=>item.total_order), // Total orders for the last 5 weeks
    },
    {
      name: 'Orders with Discrepancies',
      type: 'line',
      data: deliveryData?.map(item=>item.disputed_order), // Orders with discrepancies for the last 5 weeks
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
      categories: deliveryData?.map(item=>`Week ${item.week}`),
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

const WeightDiscrepancies = () => {
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
