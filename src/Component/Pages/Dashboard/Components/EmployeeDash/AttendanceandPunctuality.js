import React from 'react';
import Chart from 'react-apexcharts';

const AttendanceChart = () => {
    const data = [
        { name: 'Employee 1', attendance: 90, punctuality: 85 },
        { name: 'Employee 2', attendance: 95, punctuality: 90 },
        { name: 'Employee 3', attendance: 95, punctuality: 90 },
        { name: 'Employee 4', attendance: 95, punctuality: 90 },
        // Add more employees as needed
    ];

    const employeeNames = data.map(employee => employee.name);
    const attendanceData = data.map(employee => employee.attendance);
    const punctualityData = data.map(employee => employee.punctuality);

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories: employeeNames,
        },
        legend: {
            position: 'top',
        },
        fill: {
            opacity: 1
        },
    };

    const series = [
        {
            name: 'Attendance',
            data: attendanceData,
        },
        {
            name: 'Punctuality',
            data: punctualityData,
        },
    ];

    return (
        <div>
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

const AttendanceandPunctuality = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="title">Attendance and Punctuality</h4>
                <AttendanceChart />
            </div>
        </>
    )
}

export default AttendanceandPunctuality