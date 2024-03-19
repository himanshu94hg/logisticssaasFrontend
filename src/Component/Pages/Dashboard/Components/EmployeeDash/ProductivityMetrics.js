import React from 'react';
import ReactApexChart from 'react-apexcharts';

const EmployeeChart = () => {
    const seriesData = [
        {
            name: 'Actual',
            data: [
                {
                    x: 'John',
                    y: 12,
                    goals: [
                        {
                            name: 'Expected',
                            value: 14,
                            strokeWidth: 2,
                            strokeDashArray: 2,
                            strokeColor: '#1975C9'
                        }
                    ]
                },
                {
                    x: 'Alice',
                    y: 44,
                    goals: [
                        {
                            name: 'Expected',
                            value: 54,
                            strokeWidth: 5,
                            strokeHeight: 10,
                            strokeColor: '#1975C9'
                        }
                    ]
                },
                {
                    x: 'Alice',
                    y: 30,
                    goals: [
                        {
                            name: 'Expected',
                            value: 25,
                            strokeWidth: 5,
                            strokeHeight: 10,
                            strokeColor: '#1975C9'
                        }
                    ]
                },
                {
                    x: 'Alice',
                    y: 34,
                    goals: [
                        {
                            name: 'Expected',
                            value: 30,
                            strokeWidth: 5,
                            strokeHeight: 10,
                            strokeColor: '#1975C9'
                        }
                    ]
                },
                // Add more data points as needed
            ]
        }
    ];

    const options = {
        chart: {
            height: 350,
            type: 'bar'
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        colors: ['#C5DCF1'],
        dataLabels: {
            formatter: function (val, opt) {
                const goals =
                    opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                        .goals

                if (goals && goals.length) {
                    return `${val} / ${goals[0].value}`
                }
                return val
            }
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Actual', 'Expected'],
            markers: {
                fillColors: ['#C5DCF1', '#1975C9']
            }
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const ProductivityMetrics = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Productivity Metrics</h4>
                <EmployeeChart />
            </div>
        </>
    )
}

export default ProductivityMetrics