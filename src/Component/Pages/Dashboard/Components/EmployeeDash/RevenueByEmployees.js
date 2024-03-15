import React from 'react';
import ReactApexChart from 'react-apexcharts';

const EmployeeTaskCompletionChart = () => {
    const seriesData = [42, 47, 52, 58, 65]; // Example data for Task Completion Rate of employees
    const chartOptions = {
        chart: {
            width: 380,
            type: 'polarArea'
        },
        labels: ['Employee A', 'Employee B', 'Employee C', 'Employee D', 'Employee E'],
        fill: {
            opacity: 1
        },
        stroke: {
            width: 1,
            colors: undefined
        },
        yaxis: {
            show: false
        },
        legend: {
            position: 'bottom'
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                },
                spokes: {
                    strokeWidth: 0
                },
            }
        },
        theme: {
            monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6
            }
        }
    };

    return (
        <div>
            <div id="employeeTaskCompletionChart">
                <ReactApexChart options={chartOptions} series={seriesData} type="polarArea" width={380} />
            </div>
        </div>
    );
};

const RevenueByEmployees = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Task Completion Rates</h4>
                <EmployeeTaskCompletionChart />
            </div>
        </>
    )
}

export default RevenueByEmployees