import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
    const [chartData, setChartData] = useState({
        series: [44, 55, 40],
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            labels: ['1st Attempt', '2nd Attempt', '3rd Attempt'], // Change the legend text here
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

const NDRtoDeliveryAttempt = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">NDR to Delivery Attempt</h4>
                        <ApexChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NDRtoDeliveryAttempt