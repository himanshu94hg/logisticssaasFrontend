import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const ZoneOrdersChart = () => {
    const [chartWidth, setChartWidth] = useState(380);
    const [seriesArrayData, setSeriesArrayData] = useState([]);
    const [zoneData, setZoneData] = useState([]);
    const { zoneWiseData } = useSelector(state => state?.dashboardShipmentReducer)

    useEffect(() => {
        if (zoneWiseData) {
            const keysArray = [];
            const valuesArray = [];

            Object.entries(zoneWiseData).forEach(([key, value], index) => {
                const formattedKey = key.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                keysArray.push(`${formattedKey.slice(0, 4)} ${formattedKey.charAt(5).toUpperCase()}`);
                valuesArray.push(value);
            });
            setSeriesArrayData(valuesArray)
            setZoneData(keysArray)
        }
    }, [zoneWiseData])

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1720) {
                setChartWidth(380);
            } else if (screenWidth >= 768) {
                setChartWidth(290);
            } else {
                setChartWidth(200);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const seriesData = seriesArrayData
    const total = seriesData.reduce((acc, curr) => acc + curr, 0);
    const percentages = total !== 0
        ? seriesData.map(val => ((val / total) * 100).toFixed(2) + '%')
        : seriesData.map(() => '0%');

    const chartData = {
        series: seriesData,
        options: {
            chart: {
                width: 380,
                type: 'polarArea'
            },
            labels: zoneData,
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
            colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val;
                },
                offsetY: -10,
                style: {
                    fontSize: '12px',
                    colors: ['#000']
                },
                formatter: function (val, { seriesIndex }) {
                    return percentages[seriesIndex];
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

const ZoneWiseData = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Zone Wise Data</h4>
                        <ZoneOrdersChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ZoneWiseData