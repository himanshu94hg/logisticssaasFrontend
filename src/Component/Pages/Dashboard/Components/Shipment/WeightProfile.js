import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const WeightOrdersChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
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
                            show: true,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            offsetY: -10,
                            color: '#888',
                            formatter: function (val) {
                                return val;
                            },
                        },
                        value: {
                            show: true,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#888',
                            offsetY: 10,
                            formatter: function (val) {
                                return val + ' Order(s)'
                            },
                        },
                    },
                },
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
            labels: [],
            legend: {
                show: true,
                floating: true,
                fontSize: '12px',
                position: 'right',
                offsetX: 180,
                offsetY: 10,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    size: 0,
                },
                formatter: function (seriesName, opts) {
                    return seriesName;
                },
                itemMargin: {
                    vertical: 3,
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            show: false,
                        },
                    },
                },
            ],
        },
    });

    useEffect(() => {
        const orders = [
            { id: 1, count: 75 },
            { id: 2, count: 80 },
            { id: 3, count: 50 },
            { id: 4, count: 69 },
        ];

        const slabs = [
            { id: 1, min: 0.5, max: 3, label: '0.5kg - 3kg' },
            { id: 2, min: 3, max: 5, label: '3kg - 5kg' },
            { id: 3, min: 5, max: 10, label: '5kg - 10kg' },
            { id: 4, min: 10, max: Infinity, label: '10kg Above' },
        ];

        const ordersInSlabs = slabs.map(slab => ({
            weight_slab_id: slab.id,
            number_of_orders: orders.find(order => order.id === slab.id).count
        }));

        setChartData(prevState => ({
            ...prevState,
            series: ordersInSlabs.map(slabs => slabs.number_of_orders),
            options: {
                ...prevState.options,
                labels: slabs.map(slab => slab.label)
            }
        }));
    }, []);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="radialBar" height={390} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const WeightProfile = () => {
    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h4 className="title">Weight Profile in Kgs</h4>
                    <WeightOrdersChart />
                </div>
            </div>
        </div>
    )
}

export default WeightProfile;
