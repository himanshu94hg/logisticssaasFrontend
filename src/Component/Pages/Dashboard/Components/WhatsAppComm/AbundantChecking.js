import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const WhatsAppNDRChart = () => {
    const [chartData, setChartData] = useState({
        series: [{
            name: 'WhatsApp Orders',
            data: [20, 25, 30, 35, 40] // Sample data for weeks 1 to 5
        }],
        options: {
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
                    text: 'Number of Orders'
                }
            },
            fill: {
                opacity: 1
            }
        }
    });

    return (
        <div id="chart">
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
}

const AbundantChecking = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Abundant Checking</h4>
                <WhatsAppNDRChart />
            </div>
        </>
    )
}

export default AbundantChecking