import React, { useEffect, useState } from "react";
import "./courierwiseCard.css";
import Chart from 'react-apexcharts';
import { BASE_URL_CORE } from "../../../../../axios/config";
import axios from "axios";
import Cookies from 'js-cookie';


function TicketsChart() {
  const authToken = Cookies.get("access_token")

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
    // {
    //   name: 'Open Tickets',
    //   type: 'bar',
    //   data: [30, 40, 35, 50],
    //   dataLabels: {
    //     enabled: false, 
    //   },
    // },
    // {
    //   name: 'Closed Tickets',
    //   type: 'bar', 
    //   data: [20, 30, 25, 45],
    //   dataLabels: {
    //     enabled: false, 
    //   },
    // },
    // {
    //   name: 'Closed Within TAT',
    //   type: 'line', 
    //   data: [10, 15, 12, 20],
    //   dataLabels: {
    //     enabled: true, 
    //   },
    // },
  ]);

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/escallation-dashboard/`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        const mappedData = [
          {
            name: "Open Tickets",
            type: "bar",
            data: response?.data.open_tickets.length > 0 ? response?.data.open_tickets : [0],
            dataLabels: {
              enabled: false,
            },
          },
          {
            name: "Closed Tickets",
            type: "bar",
            data: response?.data.closed_tickets.length > 0 ? response?.data.closed_tickets : [0],
            dataLabels: {
              enabled: false,
            },
          },
          {
            name: "Closed Within TAT",
            type: "line",
            data: response?.data.closed_within_tat.length > 0 ? response?.data.closed_within_tat : [0],
            dataLabels: {
              enabled: true,
            },
          },
        ];
        setSeries(mappedData);
      } catch (err) {
      }
    };

    fetchData();
  }, []);
  console.log(data,series,'kkkkkkkk')

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
