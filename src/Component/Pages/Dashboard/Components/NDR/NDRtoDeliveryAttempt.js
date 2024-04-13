import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
    const ndrDelivery = useSelector(state => state?.dashboardNdrReducer?.deliveryStatus);
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 1800,
                options: {
                    chart: {
                        width: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            labels: [],
            dataLabels: {
                enabled: true,
                enabledOnSeries: undefined,
                formatter: function (val, opts) {
                    return val.toFixed(2);
                },
                style: {
                    fontWeight: "bold",
                    colors: ["#000000"] 
                }
            }
        }
    });

    useEffect(() => {
        if (ndrDelivery) {
            const seriesData = ndrDelivery.map(item => item.total) || [];
            const labelsData = ndrDelivery.map(item => `Attempt ${item.ndr_attempt}`) || [];
            setChartData(prevState => ({
                ...prevState,
                series: seriesData,
                options: {
                    ...prevState.options,
                    labels: labelsData,
                }
            }));
        }
    }, [ndrDelivery]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const NDRtoDeliveryAttempt = () => {
    const ndrDelivery = useSelector(state => state?.dashboardNdrReducer?.deliveryStatus);

    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h4 className="title">NDR to Delivery Attempt</h4>
                    <ApexChart ndrDelivery={ndrDelivery} />
                </div>
            </div>
        </div>
    )
}

export default NDRtoDeliveryAttempt;
