import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ZoneWiseNDRChart = () => {
    const chartData = {
        series: [{
            name: 'NDR Raised',
            data: [20, 30, 25, 40, 35] // Sample data for NDR Raised
        }, {
            name: 'NDR Delivered',
            data: [15, 25, 20, 30, 28] // Sample data for NDR Delivered
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
                categories: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
            },
            yaxis: {
                title: {
                    text: ''
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " counts";
                    }
                }
            }
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
            </div>
        </div>
    );
}

const SuccessByZone = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Success by Zone</h4>
                        <ZoneWiseNDRChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuccessByZone