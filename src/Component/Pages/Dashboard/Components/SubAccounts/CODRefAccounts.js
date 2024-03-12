import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';

const CodOrdersChartChildOne = () => {
    const [chartWidth, setChartWidth] = useState(380);
    const [resOffsetX, setresOffsetX] = useState(180)

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            // Adjust the chart width based on screen size
            if (screenWidth >= 1720) {
                setChartWidth(290); // for larger screens
                setresOffsetX(180); // for larger screens
                console.log(resOffsetX)
            } else if (screenWidth >= 768) {
                setChartWidth(265); // for medium screens
                setresOffsetX(100); // for medium screens
            } else {
                setChartWidth(200); // default width for smaller screens
                setresOffsetX(100); // default width for smaller screens
            }
        };

        // Call the handleResize function on initial load
        handleResize();

        // Add event listener to window resize event
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures that this effect runs only once on component mount


    const [chartData, setChartData] = useState({
        series: [76, 67, 61, 90],
        options: {
            chart: {
                height: 390,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 5,
                        size: '10%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: true,
                            floating: true,
                            position: 'left',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            offsetY: 95,
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
                            offsetY: 94,
                            formatter: function (val) {
                                return val + ' Order(s)'
                            },
                        },
                    },
                },
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#4CAF50'],
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            legend: {
                show: true,
                floating: true,
                fontSize: '12px',
                position: 'right',
                offsetX: 120,
                offsetY: 0,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    size: 0,
                },
                formatter: function (seriesName, opts) {
                    // return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
                    return seriesName;
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
                                        offsetY: 85,
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
                                        offsetY: 85,
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

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="radialBar"
                    width={chartWidth}
                />
            </div>
        </div>
    );
};

const CODRefAccounts = () => {
    const [selectedOption, setSelectedOption] = useState('Child One');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <div className="box-shadow shadow-sm p10 subaccount-perf radial-bar">
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                    <h4 className="title mb-0">COD Referral Accounts</h4>
                    <div>
                        <label className="d-flex flex-row align-items-center gap-2 font12" htmlFor="selectOption">Account
                            <select className="select-field font12" id="selectOption" value={selectedOption} onChange={handleSelectChange}>
                                <option value="Child One">Child One</option>
                                <option value="Child Two">Child Two</option>
                                <option value="Child Three">Child Three</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <CodOrdersChartChildOne />
                </div>
            </div>
        </>
    )
}

export default CODRefAccounts;
