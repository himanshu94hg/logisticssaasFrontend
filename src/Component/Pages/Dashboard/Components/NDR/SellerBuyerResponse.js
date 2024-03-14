import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SellerVsBuyerResponseChart = () => {
    const seriesData = [76, 67]; // Seller Response, Buyer Response
    const options = {
        chart: {
            height: 390,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                    }
                }
            }
        },
        colors: ['#1975C9', '#60a9eb'], // Seller Response Color, Buyer Response Color
        labels: ['Seller Response', 'Buyer Response'],
        legend: {
            show: true,
            floating: true,
            fontSize: '14px',
            position: 'left',
            offsetX: 20,
            offsetY: 40,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
                vertical: 3
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: false
                }
            }
        }]
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={seriesData} type="radialBar" height={390} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

const SellerBuyerResponse = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Seller/Buyer Response</h4>
                <SellerVsBuyerResponseChart />
            </div>
        </>
    )
}

export default SellerBuyerResponse