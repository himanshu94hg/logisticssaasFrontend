import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ForwardReverseOrder = () => {
    const [series] = useState([
        {
            name: 'Assigned Orders',
            data: [100, 150, 200, 180, 220] // Sample data for assigned orders for each week
        },
        {
            name: 'Picked Orders',
            data: [50, 70, 60, 80, 90] // Sample data for picked orders for each week
        }
    ]);

    const [options] = useState({
        chart: {
            height: 'auto',
            type: 'bar'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'category',
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
        },
        colors: ['#1975c9', '#FF5733'], // Change colors for each series
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
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
        ],
        grid: {
            padding: {
                bottom: 10 // Adjust the bottom padding to accommodate negative margin
            }
        }
    });

    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h3 className="title">Assigned Orders vs Picked Orders</h3>
                    <div id="chart">
                        <ReactApexChart options={options} series={series} type="bar" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForwardReverseOrder;
