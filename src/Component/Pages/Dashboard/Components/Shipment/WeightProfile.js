import React from 'react'
import WeightGraph from '../../../../../assets/image/WeightGraph.png'
import ReactApexChart from 'react-apexcharts';

const WeightProfile = () => {

    const options = {
        chart: {
            height: 350,
            type: 'area',
            stacked: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        series: [
            {
                name: 'Series 1',
                data: [30, 40, 35, 50, 49, 60, 70, 91],
            },
            {
                name: 'Series 2',
                data: [20, 30, 25, 40, 39, 50, 60, 81],
            },
        ],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100],
            },
        },
        xaxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
            ],
        },
    };

    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Weight Profile in Kgs</h4>
                        {/* <img className="graph-image" src={WeightGraph} alt="WeightGraph" /> */}
                        <div id="chart">
                            <ReactApexChart
                                options={options}
                                series={options.series}
                                type={options.chart.type}
                                height={options.chart.height}
                            />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default WeightProfile