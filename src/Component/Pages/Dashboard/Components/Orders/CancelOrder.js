import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const CanceledOrdersChart = ({orderCancelled}) => {
    const canceledOrdersData = [
        { week: 'Week 1', count: 10 },
        { week: 'Week 2', count: 41 },
        { week: 'Week 3', count: 35 },
        { week: 'Week 4', count: 51 },
        { week: 'Week 5', count: 49 }
    ];

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
            categories: canceledOrdersData.map(item => item.week),
        }
    };

    const series = [{
        name: "Canceled Orders",
        data: canceledOrdersData.map(item => item.count),
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

    const {orderCancelled}=useSelector(state=>state?.dashboardOrderReducer)

    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h4 className="title">Cancel Orders</h4>
                    <CanceledOrdersChart orderCancelled={orderCancelled} />
                </div>
            </div>
        </div>
    );
}

export default CancelOrder;
