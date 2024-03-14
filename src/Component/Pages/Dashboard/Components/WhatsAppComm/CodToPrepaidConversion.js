import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartComponent = () => {
    const [chartData, setChartData] = useState({
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49],
            color: '#1975C9'
        }],
        options: {
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
                    colors: ['#C5DCF1', 'transparent'],
                    opacity: 1
                },
            },
            xaxis: {
                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            }
        }
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const CodToPrepaidConversion = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">COD To Prepaid Conversion</h4>
                <ChartComponent />
            </div>
        </>
    )
}

export default CodToPrepaidConversion