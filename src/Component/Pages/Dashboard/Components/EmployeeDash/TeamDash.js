import React from 'react';

const TeamDash = () => {
    // Sample data for demonstration
    const employeeData = [
        { name: 'John Doe', task: 'Project A', progress: '50%', performance: 'Good' },
        { name: 'Jane Smith', task: 'Project B', progress: '75%', performance: 'Excellent' },
        { name: 'Jane Smith', task: 'Project B', progress: '75%', performance: 'Excellent' },
        { name: 'Jane Smith', task: 'Project B', progress: '75%', performance: 'Excellent' },
        { name: 'Jane Smith', task: 'Project B', progress: '75%', performance: 'Excellent' },
        { name: 'Jane Smith', task: 'Project B', progress: '75%', performance: 'Excellent' },
        { name: 'Jane Smith', task: 'Project B', progress: '75%', performance: 'Excellent' },
        { name: 'Jane Smith', task: 'Project B', progress: '75%', performance: 'Excellent' },
        // Add more employee data as needed
    ];

    return (
        <>
            <div className="box-shadow shadow-sm p10 dashboard-table">
                <h4 className="title">Your Team</h4>
                <div className="table-responsive">
                    <table className="custom-table w-100">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Task</th>
                                <th>Progress</th>
                                <th>Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeData.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.name}</td>
                                    <td>{employee.task}</td>
                                    <td>{employee.progress}</td>
                                    <td>{employee.performance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default TeamDash;
