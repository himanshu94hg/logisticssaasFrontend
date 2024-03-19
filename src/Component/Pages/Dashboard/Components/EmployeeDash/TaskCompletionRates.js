import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const EmployeeTaskCompletionChart = () => {
    const [chartWidth, setChartWidth] = useState(380);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            // Adjust the chart width based on screen size
            if (screenWidth >= 1720) {
                setChartWidth(380); // for larger screens
            } else if (screenWidth >= 768) {
                setChartWidth(290); // for medium screens
            } else {
                setChartWidth(200); // default width for smaller screens
            }
        };

        // Call the handleResize function on initial load
        handleResize();

        // Add event listener to window resize event
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures that this effect runs only once on component mount


    const seriesData = [42, 47, 52, 58, 65];
    const total = seriesData.reduce((acc, curr) => acc + curr, 0);
    const percentages = seriesData.map(val => ((val / total) * 100).toFixed(2) + '%');

    const chartData = {
        series: seriesData,
        options: {
            chart: {
                width: 380,
                type: 'polarArea'
            },
            labels: ['Employee A', 'Employee B', 'Employee C', 'Employee D', 'Employee E'],
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
            theme: {
                monochrome: {
                    enabled: true,
                    shadeTo: 'light',
                    shadeIntensity: 0.6
                }
            },
            colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'], // Change colors here
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val;
                },
                offsetY: -30,
                offsetX: -25,
                rotate: -45,
                style: {
                    fontSize: '10px',
                    colors: ['#000']
                },
                // Use percentages as labels
                formatter: function (val, { seriesIndex }) {
                    const percentage = percentages[seriesIndex];
                    const employeeName = chartData.options.labels[seriesIndex];
                    return `${employeeName}: ${percentage}`;
                }
            },
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" width={chartWidth} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const TaskCompletionRates = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Task Completion Rates</h4>
                <EmployeeTaskCompletionChart />
            </div>
        </>
    )
}

export default TaskCompletionRates