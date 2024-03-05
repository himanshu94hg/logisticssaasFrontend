import React from 'react'
import ReactApexChart from 'react-apexcharts';

const StatusBarChart = () => {
    const seriesData = [{
        name: 'Delivered',
        data: [44, 55, 41, 37, 22]
    }, {
        name: 'RTO',
        data: [53, 32, 33, 52, 13]
    }, {
        name: 'Pending',
        data: [12, 17, 11, 9, 15]
    }, {
        name: 'Reattempt',
        data: [9, 7, 5, 8, 6]
    }, {
        name: 'Lost',
        data: [5, 10, 12, 10, 8]
    }];

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
            text: 'Delivery Status Week Wise'
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
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
        </div>
    );
};
const NDRStatus = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">NDR Status</h4>
                        <StatusBarChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NDRStatus