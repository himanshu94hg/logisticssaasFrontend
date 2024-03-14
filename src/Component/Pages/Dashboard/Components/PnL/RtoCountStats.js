import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RTOChart = () => {
    const seriesData = [{
        name: "RTO Count",
        data: [10, 20, 15, 25, 30], // Placeholder data, you can replace it with your actual RTO counts
        color: '#1975C9'
    }];

    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: '',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#C5DCF1', 'transparent'], // takes an array which will be repeated on columns
                opacity: 1
            },
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={seriesData} type="line" height={350} />
            </div>
        </div>
    );
};

const RtoCountStats = () => {
    return (
        <div className="box-shadow shadow-sm p10">
            <h4 className="title">RTO Count</h4>
            <RTOChart />
        </div>
    )
}

export default RtoCountStats