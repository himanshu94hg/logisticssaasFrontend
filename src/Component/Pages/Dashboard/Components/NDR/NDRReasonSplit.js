import React from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const NDRPieChart = () => {
    const ndrSplit =useSelector(state=>state?.dashboardNdrReducer?.splitStatus)
    console.log("NDR RESPONSE Data",ndrSplit)
    const seriesData = ndrSplit?.map(item => item?.count) || [];
    const reasonsLabels = ndrSplit?.map(item => item?.reason) || [];

    const chartOptions = {
        chart: {
            width: '100%',
            type: 'pie',
        },
        labels: reasonsLabels ?? [],
        theme: {
            monochrome: {
                enabled: true
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5
                }
            }
        },
        title: {
            text: ""
        },
        dataLabels: {
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, val.toFixed(1) + '%'];
            },
            style: {
                fontWeight: "bold",
                colors: ["#000"] 
            }
        },
        legend: {
            show: false
        }
    };

    return (
        <div>
            <div id="ndr-chart">
                <ReactApexChart options={chartOptions} series={seriesData ?? []} type="pie" />
            </div>
        </div>
    );
};

const NDRReasonSplit = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">NDR Reason Split</h4>
                        <NDRPieChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NDRReasonSplit