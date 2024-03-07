
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const OFDChart = () => {
    const seriesData = [
        {
            name: 'OFD',
            data: [3, 4, 2, 5, 3] // Example data for Order Fulfillment Duration (OFD) for Week 1 to Week 5
        }
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
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        }
    };

    return (
        <div>
            <div id="ofd-chart">
                <ReactApexChart options={options} series={seriesData} type="line" height={350} />
            </div>
        </div>
    );
};

const OFDDataCard = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">OFD Data</h4>
                        <OFDChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OFDDataCard