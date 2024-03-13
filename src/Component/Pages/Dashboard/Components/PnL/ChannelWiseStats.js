import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const TopStatusChart = () => {

    const [chartHeight, setChartHeight] = useState(380);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            // Adjust the chart width based on screen size
            if (screenWidth >= 1694) {
                setChartHeight(220); // for larger screens
            } else if (screenWidth >= 768) {
                setChartHeight(265); // for medium screens
            } else {
                setChartHeight(200); // default width for smaller screens
            }
        };

        // Call the handleResize function on initial load
        handleResize();

        // Add event listener to window resize event
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures that this effect runs only once on component mount


    const statusData = [
        { status: 'Channel1', count: 120 },
        { status: 'Channel2', count: 250 },
        { status: 'Channel3', count: 180 },
        { status: 'Channel4', count: 90 },
        { status: 'Channel5', count: 150 }
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 220 // Adjust the height here
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
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
        colors: ['#1975C9', '#1975C9', '#1975C9', '#1975C9', '#1975C9'] // Set colors here
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

const ChannelWiseStats = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10" style={{ height: '284px' }}>
                <h4 className="title">Channel Wise Sales</h4>
                <TopStatusChart />
            </div>
        </>
    )
}

export default ChannelWiseStats