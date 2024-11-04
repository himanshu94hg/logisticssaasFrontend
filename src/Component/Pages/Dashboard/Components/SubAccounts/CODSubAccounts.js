import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import { BASE_URL_ORDER } from "../../../../../axios/config";
import { globalGetApiCallFunction } from "../../../../../customFunction/apicall";

const CodOrdersChartChildOne = ({ data }) => {
    const [chartWidth, setChartWidth] = useState(380);
    const [resOffsetX, setresOffsetX] = useState(180)

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1720) {
                setChartWidth(290);
                setresOffsetX(180);
            } else if (screenWidth >= 768) {
                setChartWidth(265);
                setresOffsetX(100);
            } else {
                setChartWidth(200);
                setresOffsetX(100);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const [chartData, setChartData] = useState({
        series: [76, 67, 61, 10],
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

    useEffect(() => {
        if (data) {
            setChartData((prev) => ({
                ...prev,
                series: data.series,
                labels: data.labels
            }))
        }
    }, [data])

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

const CODSubAccounts = ({ labeldata, activeTab }) => {
    const [data, setData] = useState(null);
    const [selectedOption, setSelectedOption] = useState("0");
    const orderEndPoint = BASE_URL_ORDER

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        let urlParams = `${orderEndPoint}/orders-api/dashboard/cod-sub-account/?sub_account_id=${selectedOption}`;
        const fetchData = async () => {
            try {
                const response = await globalGetApiCallFunction(urlParams);
                setData(response)
            } catch (error) {
            }
        };
        if (activeTab === "Sub Accounts") {
            fetchData();
        }
    }, [selectedOption]);



    return (
        <>
            <div className="box-shadow shadow-sm p10 subaccount-perf radial-bar">
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                    <h4 className="title mb-0">COD Sub Accounts</h4>
                    <div>
                        <label className="d-flex flex-row align-items-center gap-2 font12" htmlFor="selectOption">Account
                            <select className="select-field font12" id="selectOption" onChange={handleSelectChange}>
                                <option value="0">Select</option>
                                {labeldata && labeldata?.map((item) =>
                                    <option value={item?.value}>{item.label}</option>
                                )}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <CodOrdersChartChildOne data={data} />
                </div>
            </div>
        </>
    )
}

export default CODSubAccounts;
