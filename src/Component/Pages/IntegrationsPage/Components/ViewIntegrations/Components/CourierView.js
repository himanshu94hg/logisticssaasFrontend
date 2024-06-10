import React from 'react';

const CourierView = () => {
    const integrations = [
      
    ];

    return (
        <div className='view-integration-page'>
            <div className="position-relative">
                <div className='table-container'>
                    <table className="w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th>Courier Name</th>
                                <th>Mode</th>
                                <th>Call Before Delivery</th>
                                <th>Tracking Service</th>
                                <th>POD</th>
                                <th>Delivery Boy Number</th>
                                <th>Status</th>
                                <th>Activation Date</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {integrations.map((row, index) => (
                                <React.Fragment key={row.id}>
                                    {index > 0 && <tr className="blank-row"><td colSpan="8"></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td>{row.courier_name}</td>
                                        <td>{row.mode}</td>
                                        <td>{row.call_before_delivery}</td>
                                        <td>{row.tracking_service}</td>
                                        <td>{row.pod}</td>
                                        <td>{row.delivery_boy_number}</td>
                                        <td>{row.status}</td>
                                        <td>{row.activation_date}</td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CourierView;
