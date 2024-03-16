import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';

const OrdersChart = () => {

    const { intVsDom } = useSelector(state => state?.dashboardOrderReducer)

    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Domestic',
                data: []
            },
            {
                name: 'International',
                data: []
            }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350
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
            },
            yaxis: {
                title: {
                    text: 'Orders'
                }
            },
            fill: {
                opacity: 1
            }
        }
    })


    useEffect(() => {
        if (intVsDom) {
            const categories = [];
            const domestic = [];
            const international = [];
            intVsDom?.domestic.forEach(item => {
                categories.push("Week " + item.week_number);
                domestic?.push(item.count);
            });
            intVsDom?.international.forEach(item => {
                categories.push("Week " + item.week_number);
                international?.push(item.count);
            });
            setChartData(prevState => ({
                ...prevState,
                series: [
                    { ...prevState.series[0], data: domestic },
                    { ...prevState.series[1], data: international }
                ],
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: [...new Set(categories)]
                    }
                }
            }));
        }
    }, [intVsDom]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData?.options} series={chartData?.series} type="bar" height={350} />
            </div>
        </div>
    );
}

const DomesticInternational = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className='title'>Domestic Vs International</h4>
                <OrdersChart />
            </div>
        </>
    )
}

export default DomesticInternational