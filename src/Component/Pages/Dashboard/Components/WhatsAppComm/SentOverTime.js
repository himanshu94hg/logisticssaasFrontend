import ReactApexChart from 'react-apexcharts';
import React, { useEffect, useState } from 'react'

const TopStatusChart = () => {
    const [chartHeight, setChartHeight] = useState(380);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1694) {
                setChartHeight(220);
            } else if (screenWidth >= 768) {
                setChartHeight(265);
            } else {
                setChartHeight(200);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const statusData = [
        { status: 'Pending', count: 120 },
        { status: 'In Progress', count: 250 },
        { status: 'Completed', count: 180 },
        { status: 'Cancelled', count: 90 },
        { status: 'Delayed', count: 150 }
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 220
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
            categories: statusData.map(item => item.status),
            labels: {
                rotate: -45,
                style: {
                    fontSize: '12px'
                }
            }
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
                    return val;
                }
            }
        },
        colors: ['#1975C9', '#1975C9', '#1975C9', '#1975C9', '#1975C9'] 
    };

    const seriesData = [{
        name: 'Count',
        data: statusData.map(item => item.count)
    }];

    return (
        <div id="chart">
            <ReactApexChart options={options} series={seriesData} type="bar" height={chartHeight} />
        </div>
    );
};

const SentOverTime = () => {

    return (
        <>
            <div className="box-shadow shadow-sm p10" style={{ height: '284px' }}>
                <div className="row">
                    <div className="col">
                        <h4 className="title">Messages sent over time</h4>
                    </div>
                    <TopStatusChart />
                </div>
            </div>
        </>
    )
}

export default SentOverTime