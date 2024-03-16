import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const ForwardReverseOrder = () => {
    const { assignPick } = useSelector(state => state?.dashboardOrderReducer)
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Assigned Orders',
                data: []
            },
            {
                name: 'Picked Orders',
                data: []
            }
        ]
        ,
        options: {
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
                categories: []
            },
            colors: ['#1975c9', '#FF5733'],
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
                    bottom: 10
                }
            }
        }
    });

    useEffect(() => {
        if (assignPick) {
            const categories = [];
            const assignedData = [];
            const pickedData = [];
            assignPick.forEach(item => {
                categories.push("Week "+item.week_number);
                assignedData.push(item.assigned);
                pickedData.push(item.picked);
            });
            setChartData(prevState => ({
                ...prevState,
                series: [
                    { ...prevState.series[0], data: assignedData },
                    { ...prevState.series[1], data: pickedData }
                ],
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: categories
                    }
                }
            }));
        }
    }, [assignPick]);


    console.log(chartData,"chartDatachartData")

    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h3 className="title">Assigned Orders vs Picked Orders</h3>
                    <div id="chart">
                        <ReactApexChart options={chartData?.options} series={chartData?.series} type="bar" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForwardReverseOrder;
