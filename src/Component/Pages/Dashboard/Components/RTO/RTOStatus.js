import React from 'react'
import ReactApexChart from 'react-apexcharts';

const StatusBarChart = () => {
    const seriesData = [
        {
            name: 'Initiated',
            data: [44, 55, 41, 37, 22]
        },
        {
            name: 'In Transit',
            data: [53, 32, 33, 52, 13]
        },
        {
            name: 'Delivered',
            data: [12, 17, 11, 9, 15]
        }
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%'
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: ''
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        },
        tooltip: {
            enabled: true, // Ensure tooltips are enabled
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        },
        colors: ['#8ec2f1', '#9fe0a7', '#fdd7da',]
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
        </div>
    );
};

const RTOStatus = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">RTO Status</h4>
                <StatusBarChart />
            </div>
        </>
    )
}

export default RTOStatus