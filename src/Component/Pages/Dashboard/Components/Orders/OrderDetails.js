import React from 'react';
import ReactApexChart from 'react-apexcharts';

const OrdersChart = () => {
    const [chartData, setChartData] = React.useState({
        series: [
            {
                name: 'SPS Orders',
                data: [30, 40, 35, 50, 49] // SPS orders data for each week
            },
            {
                name: 'MPS Orders',
                data: [20, 35, 30, 40, 45] // MPS orders data for each week
            }
        ],
        options: {
            chart: {
                type: 'line',
                height: 350
            },
            title: {
                text: '',
                align: 'left'
            },
            xaxis: {
                categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
            },
            legend: {
                position: 'bottom'
            }
        }
    });

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
