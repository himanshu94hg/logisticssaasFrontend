
import { forEach } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const OFDChart = () => {
    const { ofdData } = useSelector(state => state?.dashboardShpmentReducer)

    const [chartData, setChartData] = useState({
        seriesData: [
            {
                name: 'OFD',
                data: []
            }
        ],
        options: {
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
                categories: [],
            }
        }
    })
    useEffect(() => {
        if (ofdData) {
            const ofdCounts = [];
            const catData = [];
            ofdData.forEach((item) => {
                ofdCounts.push(item.ofd_count);
                catData.push("Week " + item.week);
            });
            setChartData(prev => ({
                ...prev,
                seriesData: [{ ...prev.seriesData[0], data: ofdCounts }],
                options: {
                    ...prev.options,
                    xaxis: {
                        categories: catData
                    }
                }
            }))
        }
    }, [ofdData])
    console.log(chartData, "this is my ofd data")

    return (
        <div>
            <div id="ofd-chart">
                <ReactApexChart options={chartData?.options} series={chartData?.seriesData} type="line" height={350} />
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