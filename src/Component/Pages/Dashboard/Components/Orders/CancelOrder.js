import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const CanceledOrdersChart = ({ }) => {
    const [canceledOrdersData, setCanceledOrdersData] = useState([])
    const { orderCancel } = useSelector(state => state?.dashboardOrderReducer)

    useEffect(() => {
        if (orderCancel) {
            let temp = []
            orderCancel?.map((item,index) => {
                temp.push({
                    week: `Week ${index+1}`,
                    count: item?.total_orders
                })
            })
            setCanceledOrdersData(temp)
        }
    }, [orderCancel])


    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: '',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: canceledOrdersData?.map(item => item.week),
        }
    };

    const series = [{
        name: "Canceled Orders",
        data: canceledOrdersData?.map(item => item.count),
    }];

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
        </div>
    );
};

function CancelOrder() {
    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h4 className="title">Cancelled Orders</h4>
                    <CanceledOrdersChart />
                </div>
            </div>
        </div>
    );
}

export default CancelOrder;
