import React from 'react';
import Chart from 'react-apexcharts';

const generateDateLabels = () => {
    const dates = [];
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    for (let i = 4; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(formatter.format(date)); // Format date as '02 Sep 2024'
    }

    return dates;
};

const ShipmentGraph = () => {
    const series = [
        {
            name: 'Shipments',
            data: [50, 40, 60, 30, 20],
        },
        {
            name: 'Yet to Pick',
            data: [10, 15, 5, 7, 12],
        },
        {
            name: 'Picked',
            data: [30, 20, 40, 20, 25],
        },
        {
            name: 'In-Transit',
            data: [15, 10, 20, 15, 18],
        },
        {
            name: 'NDR',
            data: [20, 18, 35, 12, 30],
        },
        {
            name: 'Delivered',
            data: [5, 3, 7, 4, 6],
        },
        {
            name: 'RTO',
            data: [3, 5, 2, 6, 4],
        },
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: generateDateLabels(), // Use dynamic date labels with new format
        },
        yaxis: {
            title: {
                text: 'Count',
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            shared: true, // Enable shared tooltips
            intersect: false, // Set intersect to false to allow shared tooltips
            y: {
                formatter: function (val) {
                    return val;
                },
            },
        },
        colors: [
            '#0A3C66', // Color for 'Total Shipment'
            '#4A9BE3', // Color for 'Yet to Pick'
            '#145F9F', // Color for 'Picked'
            '#1975C9', // Color for 'In-Transit'
            '#9FC4F6', // Color for 'Delivered'
            '#7AAEF1', // Color for 'NDR Pending'
            '#0F4A7D', // Color for 'NDR Delivered'
        ],
    };

    return (
        <>
            <div className='box-shadow shadow-sm p10' style={{ maxHeight: '500px' }}>
                <h4 className='title'>Shipment Overview</h4>
                <div id="chart">
                    <Chart options={options} series={series} type="bar" height={350} />
                </div>
            </div>
        </>
    );
};

export default ShipmentGraph;
