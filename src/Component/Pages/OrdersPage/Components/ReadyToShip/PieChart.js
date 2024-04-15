import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ rating }) => {
    return (
        <ReactApexChart
            options={{
                chart: {
                    height: 130,
                    type: 'radialBar',
                    toolbar: {
                        show: false // Hide toolbar
                    }
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 225,
                        hollow: {
                            margin: 0,
                            size: '70%',
                            background: '#fff',
                            image: undefined,
                            imageOffsetX: 0,
                            imageOffsetY: 0,
                            position: 'front',
                            dropShadow: {
                                enabled: true,
                                top: 3,
                                left: 0,
                                blur: 4,
                                opacity: 0.24
                            }
                        },
                        track: {
                            background: '#fff',
                            strokeWidth: '67%',
                            margin: 0,
                            dropShadow: {
                                enabled: true,
                                top: -3,
                                left: 0,
                                blur: 4,
                                opacity: 0.35
                            }
                        },
                        dataLabels: {
                            show: true,
                            name: {
                                offsetY: -10,
                                show: true,
                                color: '#888',
                                fontSize: '0px'
                            },
                            value: {
                                formatter: function () {
                                    return rating + "/5"; // Display rating in the center
                                },
                                offsetY: -10,
                                color: '#111',
                                fontSize: '20px',
                                show: true,
                            }
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'horizontal',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#ABE5A1'],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
                stroke: {
                    lineCap: 'round'
                },
                labels: ['Rating'],
            }}
            series={[rating * 20]} // Convert rating to a percentage
            type="radialBar"
            height={130}
        />
    );
}

export default PieChart;