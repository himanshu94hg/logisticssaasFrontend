import React from 'react';
import ReactApexChart from 'react-apexcharts';

const OrdersChart = () => {
    const series = [
        {
            name: 'B2B',
            data: [30, 40, 45, 50, 55] // Weekly B2B orders data
        },
        {
            name: 'B2C',
            data: [45, 50, 55, 60, 65] // Weekly B2C orders data
        },
        {
            name: 'Hyperlocal',
            data: [20, 25, 30, 35, 40] // Weekly Hyperlocal orders data
        },
        {
            name: 'International',
            data: [10, 15, 20, 25, 30] // Weekly International orders data
        }
    ];

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
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // Weeks
        },
        yaxis: {
            title: {
                text: 'Orders'
            }
        },
        fill: {
            opacity: 1
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
        </div>
    );
}

const DomesticInternational = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <OrdersChart />
            </div>
        </>
    )
}

export default DomesticInternational