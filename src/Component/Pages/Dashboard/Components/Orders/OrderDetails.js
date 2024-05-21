import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';

const OrdersChart = () => {
    const { mpsData } = useSelector(state => state?.dashboardOrderReducer)
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'SPS Orders',
                data: []
            },
            {
                name: 'MPS Orders',
                data: []
            }
        ],
        options: {
            chart: {
                type: 'line',
                height: 350,
                toolbar: {
                    show: true, 
                    tools: {
                        download: true,
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
                    }
                }
            },
            title: {
                text: '',
                align: 'left'
            },
            xaxis: {
                categories: []
            },
            legend: {
                position: 'bottom'
            }
        }
    });

    useEffect(() => {
        if (mpsData) {
            const mpsValues = [];
            const spsValues = [];
            const weekValues = [];
            mpsData.forEach((item,index) => {
                mpsValues.push(item.mps);
                spsValues.push(item.sps);
                weekValues.push(`Week ${index+1}`);
               
            });
            setChartData(prevState => ({
                ...prevState,
                series: [
                    { ...prevState.series[0], data: spsValues },
                    { ...prevState.series[1], data: mpsValues }
                ],
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: weekValues
                    }
                }
            }));
        }
    }, [mpsData]);

    return (
        <div>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );
};


function OrderDetails() {
    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h4 className="title">SPS vs MPS</h4>
                    <OrdersChart />
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
