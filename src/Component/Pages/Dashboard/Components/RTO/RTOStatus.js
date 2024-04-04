import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const StatusBarChart = ( ) => {
    const  data  = useSelector(state => state?.dashboardRtoReducer?.rtoStatus);
    const latestData = data.slice(-5);
    const weeks = latestData.map(item => `Week ${item.week_number}`);

    const initiatedData = latestData.map(item => item.rto_initiated);
    const inTransitData = latestData.map(item => item.rto_intransit);
    const deliveredData = latestData.map(item => item.rto_delivered);

    const seriesData = [
        { name: 'Initiated', data: initiatedData },
        { name: 'In Transit', data: inTransitData },
        { name: 'Delivered', data: deliveredData }
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
            enabled: true,
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        },
        colors: ['#8ec2f1', '#9fe0a7', '#fdd7da']
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
        </div>
    );
};

const RTOStatus = ({ data }) => {
    return (
        <div className="box-shadow shadow-sm p10">
            <h4 className="title">RTO Status</h4>
            <StatusBarChart data={data} />
        </div>
    );
};

export default RTOStatus;
