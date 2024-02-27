import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const DeliveryPerformance = () => {
    // Sample delivery data for the last 30 days
    const lateDeliveries = [15, 12, 10, 8, 5];
    const onTimeDeliveries = [65, 70, 75, 78, 80];
    // Labels for each week
    const labels = ['Week One', 'Week Two', 'Week Three', 'Week Four', 'Week Five'];

    // Ensure both arrays have the same length
    const maxLength = Math.max(lateDeliveries.length, onTimeDeliveries.length);
    const adjustedLateDeliveries = Array(maxLength).fill(0).map((_, i) => lateDeliveries[i] || 0);
    const adjustedOnTimeDeliveries = Array(maxLength).fill(0).map((_, i) => onTimeDeliveries[i] || 0);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Late Deliveries',
                data: adjustedLateDeliveries,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 0.6)', // Red color with transparency
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red background color with transparency
                borderWidth: 2, // Increase line thickness
                pointRadius: 5, // Increase point size
                pointBackgroundColor: 'rgba(255, 99, 132, 0.6)', // Red points with transparency
                tension: 0.4 // Adjust curve tension
            },
            {
                label: 'On-Time Deliveries',
                data: adjustedOnTimeDeliveries,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 0.6)', // Green color with transparency
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Green background color with transparency
                borderWidth: 2, // Increase line thickness
                pointRadius: 5, // Increase point size
                pointBackgroundColor: 'rgba(75, 192, 192, 0.6)', // Green points with transparency
                tension: 0.4 // Adjust curve tension
            }
        ]
    };

    const chartOptions = {
        maintainAspectRatio: false, // Disable default aspect ratio
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Week',
                    font: {
                        weight: 'bold'
                    }
                },
                grid: {
                    display: false // Hide x-axis grid lines
                },
                ticks: {
                    font: {
                        size: 14 // Increase font size
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Deliveries',
                    font: {
                        weight: 'bold'
                    }
                },
                grid: {
                    display: false // Hide y-axis grid lines
                },
                ticks: {
                    font: {
                        size: 14 // Increase font size
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16 // Increase legend font size
                    }
                }
            }
        }
    };

    const chartRef = useRef(null);
    const [canvasHeight, setCanvasHeight] = useState(200); // Initial height

    useEffect(() => {
        const updateCanvasHeight = () => {
            if (chartRef.current) {
                const canvasParent = chartRef.current.parentElement;
                if (canvasParent) {
                    const parentHeight = canvasParent.clientHeight;
                    setCanvasHeight(parentHeight);
                }
            }
        };

        updateCanvasHeight();
        window.addEventListener('resize', updateCanvasHeight);

        return () => window.removeEventListener('resize', updateCanvasHeight);
    }, []);

    return (
        <div className='box-shadow shadow-sm p10' style={{ minHeight: '300px', maxHeight: '500px' }}>
            <h4 className='title'>Delivery Performance</h4>
            <div ref={chartRef} style={{ height: canvasHeight }}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default DeliveryPerformance;
