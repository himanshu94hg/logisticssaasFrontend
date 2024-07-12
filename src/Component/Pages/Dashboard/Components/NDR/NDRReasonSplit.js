import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';



const NDRPieChart = () => {

    const ndrSplit = useSelector(state => state?.dashboardNdrReducer?.splitStatus || [])
    // const dummyData = [
    //     { reason: 'Reason 1', count: 10 },
    //     { reason: 'Reason 2', count: 20 },
    //     { reason: 'Reason 3', count: 30 },
    //     { reason: 'Reason 4', count: 40 },
    //     { reason: 'Reason 4', count: 40 },
    // ];

    // const dataToUse = ndrSplit?.length ? ndrSplit : dummyData;
    // const seriesData = useMemo(() => dataToUse.map(item => item.count), [dataToUse]);
    // const reasonsLabels = useMemo(() => dataToUse.map(item => item.reason), [dataToUse]);


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
                fontWeight: "Medium",
                colors: ["#00000000"]
            }
        },
        legend: {
            show: true,
            position: 'bottom'
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