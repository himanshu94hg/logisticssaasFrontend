import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RTOChart = () => {
    const seriesData = [{
        name: "RTO Count",
        data: [0, 10, 5, 25, 10] // example data for RTO count week-wise
    }];

    const chartOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: '',
            align: 'left'
        },
        grid: {
            // show: false,
            row: {
                colors: ['#c5dcf1', 'transparent'],
                opacity: 0.5
            },
        },
        yaxis: {
            show: true, // Hide y-axis line
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartOptions} series={seriesData} type="line" height={350} />
            </div>
        </div>
    );
};

const RTOCount = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">RTO Count</h4>
                <RTOChart />
            </div>
        </>
    );
};

export default RTOCount;
