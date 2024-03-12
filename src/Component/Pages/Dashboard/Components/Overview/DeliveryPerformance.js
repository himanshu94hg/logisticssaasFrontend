import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const DeliveryPerformance = () => {
    useEffect(() => {
        // Sample data for demonstration
        const data = {
            lateDeliveries: [5, 7, 3, 8, 4], // Number of late deliveries for each week
            onTimeDeliveries: [20, 18, 22, 17, 21] // Number of on-time deliveries for each week
        };

        // Chart options
        const options = {
            series: [{
                name: "Late Deliveries",
                data: data.lateDeliveries
            }, {
                name: "On-time Deliveries",
                data: data.onTimeDeliveries
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
                    rotateAlways: true, // Rotate labels always
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
    }, []); 

    return (
        <div className='box-shadow shadow-sm p10' style={{ minHeight: '300px', maxHeight: '500px' }}>
            <h4 className='title'>Delivery Performance</h4>
            <div id="chart" />
        </div>
    );
};

export default DeliveryPerformance;
