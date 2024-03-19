import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const RTOChart = () => {
    const { rtoCountMonthwise } = useSelector(state => state?.dashboardRtoReducer)
    const [weekNumbers, setWeekNumbers] = useState([]);
    const [rtoStatusCounts, setRTOStatusCounts] = useState([]);

    useEffect(() => {
        const extractedWeekNumbers = rtoCountMonthwise.map(item => "Week "+item.week_number);
        const extractedRTOStatusCounts = rtoCountMonthwise.map(item => item.rto_status_count);
        setWeekNumbers(extractedWeekNumbers);
        setRTOStatusCounts(extractedRTOStatusCounts);
    }, [rtoCountMonthwise]);


    const seriesData = [{
        name: "RTO Count",
        data: rtoStatusCounts, // example data for RTO count week-wise
        color: '#1975C9',
    }];

    const chartOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            background: '#fff'
        },
        dataLabels: {
            enabled: true,
            colors: ['#8ec2f1'],
            style: {
                colors: ['#8ec2f1'], // specify data label text color
                lineHeight: '1.2',
                fontSize: '14px',
                borderColor: ['#1975C9'], // specify border color for data labels
                borderWidth: 1 // specify border width for data labels
            }
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
                colors: ['#1975C9', 'transparent'],
                opacity: 0.5
            },
        },
        yaxis: {
            show: true, // Hide y-axis line
        },
        xaxis: {
            categories: weekNumbers
        },

        tooltip: {
            theme: 'dark' // or 'light' for light theme
        },

    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartOptions} series={seriesData} type="line" height={350} />
            </div>
        </div>
    );
};

const RTOCount = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">RTO Count</h4>
                <RTOChart />
            </div>
        </>
    );
};

export default RTOCount;
