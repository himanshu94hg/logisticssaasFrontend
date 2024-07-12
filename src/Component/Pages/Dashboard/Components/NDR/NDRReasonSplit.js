import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const NDRPieChart = () => {
    const ndrSplit = useSelector(state => state?.dashboardNdrReducer?.splitStatus || []);
    const dummyData = [
        { reason: "Consignee Unavailable", count: 60 },
        { reason: "No customer response from IVR call", count: 40 },
        { reason: "Maximum attempts reached", count: 37 },
        { reason: "Delivery Rescheduled by Customer", count: 8 },
        { reason: "UNDELIVERED SHIPMENT HELD AT LOCATION ", count: 6 },
        { reason: "Damaged shipment to be attempted ", count: 6 },
        { reason: "IVR verified cancellation", count: 5 },
        { reason: "Consignee to collect from branch", count: 5 },
        { reason: "NETWORK DELAY, WILL IMPACT DELIVERY ", count: 4 },
        { reason: "CONSIGNEE REFUSED TO ACCEPT ", count: 3 },
        { reason: "Consignee will collect from branch", count: 3 },
        { reason: "CONSIGNEE'S ADDRESS INCOMPLETE/INCORRECT ", count: 3 },
        { reason: "Recipient wants open delivery", count: 2 },
        { reason: "Incomplete address & contact details", count: 2 },
    ];

    const dataToUse = ndrSplit;
    // const dataToUse = ndrSplit.length ? ndrSplit : dummyData;

    const topTenData = useMemo(() => {
        return dataToUse
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [dataToUse]);

    const seriesData = useMemo(() => topTenData.map(item => item.count), [topTenData]);
    const reasonsLabels = useMemo(() => topTenData.map(item => item.reason), [topTenData]);

    const chartOptions = {
        chart: {
            type: 'pie',
            height: '100%',
            width: '100%',
        },
        labels: reasonsLabels,
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
        },
        responsive: [
            {
                breakpoint: 1600,
                options: {
                    chart: {
                        height: '350px', // Set a specific height for smaller screens
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    return (
        <div id="ndr-chart">
            <ReactApexChart options={chartOptions} series={seriesData} type="pie" />
        </div>
    );
};

const NDRReasonSplit = () => {
    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h4 className="title">NDR Reason Split</h4>
                    <NDRPieChart />
                </div>
            </div>
        </div>
    );
};

export default NDRReasonSplit;
