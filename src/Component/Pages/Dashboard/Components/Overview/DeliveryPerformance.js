import ApexCharts from 'apexcharts';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { dateRangeDashboard } from '../../../../../customFunction/dateRange';

const DeliveryPerformance = () => {
    const chartRef = useRef(null);
    const dispatch = useDispatch();
    const deliveryData = useSelector(state => state?.dashboardOverviewReducer.deliveryPerformanceData);

    // useEffect(() => {
    //     dispatch({
    //         type: "DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE_ACTION",
    //         payload: dateRangeDashboard
    //     });
    // }, [dispatch]);


    useEffect(() => {
        if (deliveryData) {
            renderChart(deliveryData);
        }
    }, [deliveryData]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const renderChart = (data) => {
        if (chartRef.current && chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        if (data && data.on_time_orders && data.late_orders) {
            const options = {
                series: [{
                    name: "Late Deliveries",
                    data: data.late_orders.map(item => item.count)
                }, {
                    name: "On-time Deliveries",
                    data: data.on_time_orders.map(item => item.count)
                }],
                chart: {
                    height: 350,
                    type: 'bar'
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
                    labels: {
                        rotateAlways: true,
                        rotate: -45,
                    },
                },
                yaxis: {
                    title: {
                        text: 'Deliveries'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " deliveries";
                        }
                    }
                },
                responsive: [
                    {
                        breakpoint: 768,
                        options: {
                            chart: {
                                height: 300
                            }
                        }
                    }
                ]
            };

            chartRef.current = new ApexCharts(document.getElementById('chart'), options);
            chartRef.current.render();
            return () => {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }
            };
        } else {
            // console.error('Delivery data is not valid:', data);
        }
    };

    return (
        <div className='box-shadow shadow-sm p10' style={{ maxHeight: '500px' }}>
            <h4 className='title'>Delivery Performance</h4>
            <div id="chart" />
        </div>
    );
};

export default DeliveryPerformance;
