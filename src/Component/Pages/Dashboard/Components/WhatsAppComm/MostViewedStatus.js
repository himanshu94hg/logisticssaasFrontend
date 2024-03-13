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
        { status: 'Pending', count: 120 },
        { status: 'In Progress', count: 250 },
        { status: 'Completed', count: 180 },
        { status: 'Cancelled', count: 90 },
        { status: 'Delayed', count: 150 }
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
        }
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

const MostViewedStatus = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10" style={{ height: '284px' }}>
                <div className="row">
                    <div className="col">
                        <h4 className="title">Top 5 most viewed status</h4>
                    </div>
                    {/* <div className="p-18px">
                        <div className="text-center" style={{ padding: "6rem" }}>
                            <p className="noDataHeader">No Data Available</p>
                            <img width="62" height="67" src="https://app.shiprocket.in/app/img/trackingpage/noData.png" alt="" />
                        </div>
                    </div> */}
                    <TopStatusChart />
                </div>
            </div>
        </>
    )
}

export default MostViewedStatus