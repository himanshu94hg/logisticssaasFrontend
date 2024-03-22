import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const OverallPerformanceChart = () => {
    const [chartData, setChartData] = useState({
        series: [44, 55, 40],
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [
                {
                    breakpoint: 1800,
                    options: {
                        chart: {
                            width: 400
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                },
                {
                    breakpoint: 1600,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ],
            labels: ["Alice", "Bob", "Charlie", "", ""], // Change the legend text here
            colors: ['#1975C9', '#60a9eb', '#C5DCF1'] // Set custom colors here
        }
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const EmployeesPerformance = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Overall Performance</h4>
                <OverallPerformanceChart />
            </div>
        </>
    )
}

export default EmployeesPerformance