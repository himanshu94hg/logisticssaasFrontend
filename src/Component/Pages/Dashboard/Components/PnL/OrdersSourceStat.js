import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = () => {
    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    };

    const series = [
        {
            name: 'Online',
            data: [44, 55, 57, 56, 61]
        },
        {
            name: 'Offline',
            data: [76, 85, 101, 98, 87]
        },
        {
            name: 'Sales Order',
            data: [35, 41, 36, 26, 45]
        },
        {
            name: 'Direct',
            data: [55, 49, 62, 42, 65]
        },
        {
            name: 'Marketplace',
            data: [35, 41, 36, 26, 45]
        }
    ];

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
        </div>
    );
}

const OrdersSourceStat = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Profit and Loss</h4>
                <ChartComponent />
            </div>
        </>
    )
}

export default OrdersSourceStat