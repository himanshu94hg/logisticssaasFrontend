import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ForwardReverseOrder = () => {
    const [series] = useState([
        {
            name: 'Forward Orders',
            data: [100, 150, 200, 180, 220] // Sample data for forward orders for each week
        },
        {
            name: 'Reverse Orders',
            data: [50, 70, 60, 80, 90] // Sample data for reverse orders for each week
        }
    ]);

    const [options] = useState({
        chart: {
            height: 'auto',
            type: 'area',
            zoom: {
                enabled: false // Disable zooming
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'category',
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        colors: ['#FF5733', '#3366FF'], // Change colors for each series
        toolbar: {
            show: false // Hide the download option icon
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
    });

    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h3 className="title">Forward Orders vs Reverse Orders (Weekly)</h3>
                    <div id="chart">
                        <ReactApexChart options={options} series={series} type="area" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForwardReverseOrder;
