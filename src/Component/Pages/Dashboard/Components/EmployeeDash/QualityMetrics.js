import React from 'react';
import ReactApexChart from 'react-apexcharts';

const QualityMetricsChart = () => {
    const series = [
        {
            name: 'Attendance',
            data: [44, 55, 41, 37]
        },
        {
            name: 'Task Completion Rate ',
            data: [53, 32, 33, 52]
        },
        {
            name: 'Queries Resolved',
            data: [12, 17, 11, 9]
        }
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    total: {
                        enabled: true,
                        offsetX: 0,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
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
            categories: ['Emp 1', 'Emp 2', 'Emp 3', 'Emp 4',],
            labels: {
                formatter: function (val) {
                    return val + "K"
                }
            }
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "K"
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        },
        colors: ['#1975C9', '#60a9eb', '#C5DCF1', '#33FF42', '#FF33EC'] // Define your custom colors here
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
        </div>
    );
};

const QualityMetrics = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Quality Metrics</h4>
                <QualityMetricsChart />
            </div>
        </>
    )
}

export default QualityMetrics