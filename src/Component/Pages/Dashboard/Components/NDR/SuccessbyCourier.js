import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { capatlize } from '../../../../../customFunction/functionLogic';

const CourierNDRChart = () => {
    const { successByCourier } = useSelector(state => state?.dashboardNdrReducer)

    const [chartData, setChartData] = useState({
        series: [{
            name: 'NDR Raised',
            data: []
        }, {
            name: 'NDR Delivered',
            data: []
        }],
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
                categories: ['Courier A', 'Courier B', 'Courier C', 'Courier D', 'Courier E',],
            },
            yaxis: {
                title: {
                    text: ''
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " NDRs"
                    }
                }
            }
        }
    });

    useEffect(() => {
        if (successByCourier && successByCourier?.length > 0) {
            const seriesData = [{
                name: 'NDR Raised',
                data: successByCourier.map(courier => courier.ndr_raised)
            }, {
                name: 'NDR Delivered',
                data: successByCourier.map(courier => courier.ndr_delivered)
            }];
            const categories = successByCourier?.map(courier => capatlize(courier.courier_partner));
            setChartData(prevState => ({
                ...prevState,
                series: seriesData,
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories: categories
                    }
                }
            }));
        }
    }, [successByCourier]);


    return (
        <div>
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
};

const SuccessbyCourier = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Success by Courier</h4>
                        <CourierNDRChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuccessbyCourier