import React from "react";
import axios from "axios";
import Chart from 'react-apexcharts';

class MyChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                series: [{
                    data: [],
                }],
                chart: {
                    type: 'bar',
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                },
            },
            stateAllocation: [],
        };
    }

    componentDidMount() {
        const requestData = {
            sellerId: "16",
            start: "2023-09-01",
            end: "2023-10-30",
        };

        axios
            .post(
                "https://www.shipease.in/api/microservices/dashboard/overview/state-split-wise",
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const stateAllocation = response.data.data;

                const categories = stateAllocation.map((state) => state.s_state);
                const seriesData = stateAllocation.map((state) => state.total);

                this.setState({
                    stateAllocation,
                    options: {
                        ...this.state.options,
                        xaxis: {
                            categories,
                        },
                        series: [{
                            data: seriesData,
                        }],
                    },
                });

                if (stateAllocation) {
                    console.log(stateAllocation);
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({ stateAllocation: [] });
            });
    }

    render() {

        return (
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">State Wise Split</h4>
                <div>
                    <Chart options={this.state.options} series={this.state.options.series} type="bar" height={350} />
                </div>
            </div>
        );
    }
}

export default MyChart;
