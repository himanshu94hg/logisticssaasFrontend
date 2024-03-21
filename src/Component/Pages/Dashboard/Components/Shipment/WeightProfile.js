import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const WeightOrdersChart = () => {
    const [chartWidth, setChartWidth] = useState(380);
    const [resOffsetX, setresOffsetX] = useState(180)
    const {weightProfile}=useSelector(state=>state?.dashboardShipmentReducer)


    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1720) {
                setChartWidth(380);
                setresOffsetX(180);
            } else if (screenWidth >= 768) {
                setChartWidth(300); 
                setresOffsetX(100); 
            } else {
                setChartWidth(200);
                setresOffsetX(100);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                width: 390,
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
                            fontSize: '12px',
                            fontWeight: 'bold',
                            offsetY: 130,
                            color: '#888',
                            formatter: function (val) {
                                return val;
                            },
                        },
                        value: {
                            show: true,
                            fontSize: '14px',
                            fontWeight: 'bold',
                            offsetY: 130,
                            color: '#888',
                            formatter: function (val) {
                                return val + ' Order(s)'
                            },
                        },
                    },
                },
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#4CAF50'],
            labels: [],
            legend: {
                show: true,
                floating: true,
                fontSize: '12px',
                position: 'right',
                offsetX: 180,
                offsetY: 3,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    size: 0,
                },
                formatter: function (seriesName, opts) {
                    return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
                },
                itemMargin: {
                    vertical: 3,
                },
            },
            responsive: [
                {
                    breakpoint: 1600,
                    options: {
                        legend: {
                            show: true,
                            offsetX: 180,
                            offsetY: -3,
                        },
                        plotOptions: {
                            radialBar: {
                                dataLabels: {
                                    name: {
                                        show: true,
                                        floating: true,
                                        position: 'left',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        offsetY: 100,
                                        color: '#888',
                                        formatter: function (val) {
                                            return val;
                                        },
                                    },
                                    value: {
                                        show: true,
                                        floating: true,
                                        position: 'right',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: '#888',
                                        offsetY: 98,
                                        formatter: function (val) {
                                            return val + ' Order(s)'
                                        },
                                    },
                                },
                            }
                        }
                    },
                },
            ],
        },
    });


    useEffect(() => {
       if(weightProfile){
        const orders = Object.entries(weightProfile)?.map(([key, count], index) => ({ id: index, count }));
        const slabs = Object.entries(weightProfile)?.map(([label, value], index) => ({ id: index, label, value }));
        // const slabs = Object.entries(weightProfile)?.map(([key, value], index) => ({ id: index, key, value }));
        // const slabs = [
        //     { id: 1, min: 0.5, max: 3, label: '0.5kg - 3kg' },
        //     { id: 2, min: 3, max: 5, label: '3kg - 5kg' },
        //     { id: 3, min: 5, max: 10, label: '5kg - 10kg' },
        //     { id: 4, min: 10, max: Infinity, label: '10kg Above' },
        // ];

        const ordersInSlabs = slabs.map(slab => ({
            weight_slab_id: slab.id,
            number_of_orders: orders.find(order => order.id === slab.id).count
        }));
        setChartData(prevState => ({
            ...prevState,
            series: ordersInSlabs.map(slabs => slabs.number_of_orders),
            options: {
                ...prevState.options,
                labels: slabs.map(slab => slab.label.split("_").join(' '))
            }
        }));
       }
    }, [weightProfile]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="radialBar" width={chartWidth} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const WeightProfile = () => {
    return (
        <div className="box-shadow shadow-sm p10 radial-bar">
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
