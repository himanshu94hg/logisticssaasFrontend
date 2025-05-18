import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import axios from "axios";
import Cookies from 'js-cookie';
import "./courierwiseCard.css";
import { BASE_URL_CORE } from "../../../../../axios/config";

function TicketsChart() {
  const authToken = Cookies.get("access_token");

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'line', // base type - overridden by series types
      height: 350,
      toolbar: {
        show: false,
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
      enabled: false, // globally false, can enable per series
    },
    stroke: {
      width: [0, 0, 3], // line width only on the line series
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    },
    yaxis: {
      title: {
        text: 'Number of Tickets',
      },
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/escallation-dashboard/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = response?.data || {};
        setSeries([
          {
            name: "Open Tickets",
            type: "bar",
            data: data.open_tickets?.length ? data.open_tickets : [0],
            dataLabels: { enabled: false },
          },
          {
            name: "Closed Tickets",
            type: "bar",
            data: data.closed_tickets?.length ? data.closed_tickets : [0],
            dataLabels: { enabled: false },
          },
          {
            name: "Closed Within TAT",
            type: "line",
            data: data.closed_within_tat?.length ? data.closed_within_tat : [0],
            dataLabels: { enabled: true },
          },
        ]);
      } catch (error) {
        // Handle error or fallback state here
        console.error("Error fetching ticket chart data:", error);
      }
    };

    fetchData();
  }, [authToken]);

  return (
    <div className="box-shadow shadow-sm p10 tickets-chart">
      <h4 className="title">Support</h4>
      <Chart options={chartOptions} series={series} height={350} />
    </div>
  );
}

export default TicketsChart;
