import React from 'react';
import ReactApexChart from 'react-apexcharts';

const OverallPerformanceChart = () => {
    const series = [44, 55, 41, 17, 15];
    const options = {
        chart: {
            type: 'donut',
        },
        legend: {
            position: 'bottom'
        },
        colors: ['#1975C9', '#60a9eb', '#C5DCF1', '#FF4560', '#775DD0'], // Specify custom colors here
        responsive: [{
            breakpoint: 1600,
            options: {
                chart: {
                    height: 320
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="donut" />
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