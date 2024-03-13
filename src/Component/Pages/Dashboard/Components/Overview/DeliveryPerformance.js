import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { useDispatch, useSelector } from "react-redux";

const DeliveryPerformance = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - 30);

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(currentDate);

        dispatch({
            type: "DASHBOARD_OVERVIEW_DELIVERY_PERFORMANCE_ACTION",
            payload: {
                start_date: formattedStartDate,
                end_date: formattedEndDate
            }
        });
    }, [dispatch]);

    const deliveryData = useSelector(state => state?.dashboardOverviewReducer.deliveryPerformanceData);

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
        console.log('Rendering chart with data:', data);

        // Handle empty late_orders array
        const lateDeliveriesData = data.late_orders.length > 0 ? data.late_orders : [{ week_number: 0, count: 0 }];

        const options = {
            series: [{
                name: "Late Deliveries",
                data: lateDeliveriesData.map(item => item.count)
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
                categories: lateDeliveriesData.map(item => `Week ${item.week_number}`),
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

        const chart = new ApexCharts(document.getElementById('chart'), options);
        chart.render();
        return () => {
            chart.destroy();
        };
    };

    return (
        <div className='box-shadow shadow-sm p10' style={{ minHeight: '300px', maxHeight: '500px' }}>
            <h4 className='title'>Delivery Performance</h4>
            <div id="chart" />
        </div>
    );
};

export default DeliveryPerformance;
