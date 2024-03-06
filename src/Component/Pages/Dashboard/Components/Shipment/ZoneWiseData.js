import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ZoneOrdersChart = () => {
    const seriesData = [42, 47, 52, 58, 65];
    const total = seriesData.reduce((acc, curr) => acc + curr, 0);
    const percentages = seriesData.map(val => ((val / total) * 100).toFixed(2) + '%');

    const chartData = {
        series: seriesData,
        options: {
            chart: {
                width: 380,
                type: 'polarArea'
            },
            labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
            fill: {
                opacity: 1
            },
            stroke: {
                width: 1,
                colors: undefined
            },
            yaxis: {
                show: false
            },
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeWidth: 0
                    },
                    spokes: {
                        strokeWidth: 0
                    },
                }
            },
            theme: {
                monochrome: {
                    enabled: true,
                    shadeTo: 'light',
                    shadeIntensity: 0.6
                }
            },
            colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'], // Change colors here
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val;
                },
                offsetY: -10,
                style: {
                    fontSize: '12px',
                    colors: ['#000']
                },
                // Use percentages as labels
                formatter: function (val, { seriesIndex }) {
                    return percentages[seriesIndex];
                }
            },
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" width={380} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const ZoneWiseData = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Zone Wise Data</h4>
                        <ZoneOrdersChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ZoneWiseData