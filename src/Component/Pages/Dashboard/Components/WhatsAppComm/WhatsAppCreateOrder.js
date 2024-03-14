import React from 'react';
import ReactApexChart from 'react-apexcharts';

const OrdersChart = () => {
    const seriesData = [42, 47, 52, 58, 65];
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

    const options = {
        chart: {
            width: 380,
            type: 'polarArea'
        },
        labels: labels,
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
        dataLabels: {
            enabled: true, // Enable data labels
            enabledOnSeries: undefined, // By default, enable data labels on all series
            textAnchor: 'middle',
            formatter: function (val, { seriesIndex, w }) {
                return labels[seriesIndex] + ': ' + w.config.series[seriesIndex]; // Display week label and absolute value
            }
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6
            }
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={seriesData} type="polarArea" width={380} />
            </div>
        </div>
    );
}

const WhatsAppCreateOrder = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10 w-create-order">
                <h4 className="title">Create Order Flow</h4>
                <OrdersChart />
            </div>
        </>
    )
}

export default WhatsAppCreateOrder