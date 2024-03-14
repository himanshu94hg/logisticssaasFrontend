import React from 'react';
import ReactApexChart from 'react-apexcharts';

const WeeklyChart = () => {
    const seriesData = [
        {
            name: 'NDR Response',
            type: 'column',
            data: [514, 456, 900, 528, 485],
        },
        {
            name: 'Successful NDR',
            type: 'line',
            data: [200, 425, 500, 410, 485],
        },
    ];

    const optionsData = {
        chart: {
            height: '100%', // Set height to 100% to make it responsive
            type: 'line',
            toolbar: {
                show: false, // Removing the toolbar (including panning option)
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '30%', // Adjust the width of the columns (bars) here
            }
        },
        colors: ['#1975C9', '#3BB54B'], // Specify custom colors for the series
        stroke: {
            width: [0, 4],
        },
        title: {
            text: '', // Set title text to empty string to remove the title
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
        },
        xaxis: {
            type: 'category',
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // Explicitly specify categories
            labels: {
                rotateAlways: true, // Rotate labels always
                rotate: -45,
            },
        },
        yaxis: {
            title: {
                text: 'Orders',
            },
            min: 0, // Setting minimum value for y-axis
        },
        responsive: [
            {
                // Making the chart responsive
                breakpoint: 1366, // Breakpoint for screen width of 1366
                options: {
                    chart: {
                        height: 400, // Adjust height for screen width of 1366
                    },
                },
            },
        ],
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={optionsData} series={seriesData} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const WhatsAppNDR = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">NDR Flow</h4>
                <WeeklyChart />
            </div>
        </>
    )
}

export default WhatsAppNDR