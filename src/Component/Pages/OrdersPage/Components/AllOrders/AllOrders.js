import React, { useState } from 'react';

const AllOrders = () => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    // Sample data for the table
    const tableData = [
        { id: 1, orderDetails: 'Details 1', customerDetails: 'Customer 1', packagingDetails: 'Packaging 1', payment: 'Payment 1', deliveryAddress: 'Address 1', courierPartner: 'Courier 1', status: 'Status 1', action: 'Action 1' },
        { id: 2, orderDetails: 'Details 2', customerDetails: 'Customer 2', packagingDetails: 'Packaging 2', payment: 'Payment 2', deliveryAddress: 'Address 2', courierPartner: 'Courier 2', status: 'Status 2', action: 'Action 2' },
        { id: 3, orderDetails: 'Details 2', customerDetails: 'Customer 2', packagingDetails: 'Packaging 2', payment: 'Payment 2', deliveryAddress: 'Address 2', courierPartner: 'Courier 2', status: 'Status 2', action: 'Action 2' },
        { id: 4, orderDetails: 'Details 2', customerDetails: 'Customer 2', packagingDetails: 'Packaging 2', payment: 'Payment 2', deliveryAddress: 'Address 2', courierPartner: 'Courier 2', status: 'Status 2', action: 'Action 2' },
        { id: 5, orderDetails: 'Details 2', customerDetails: 'Customer 2', packagingDetails: 'Packaging 2', payment: 'Payment 2', deliveryAddress: 'Address 2', courierPartner: 'Courier 2', status: 'Status 2', action: 'Action 2' },
        { id: 6, orderDetails: 'Details 2', customerDetails: 'Customer 2', packagingDetails: 'Packaging 2', payment: 'Payment 2', deliveryAddress: 'Address 2', courierPartner: 'Courier 2', status: 'Status 2', action: 'Action 2' },
        // Add more rows as needed
    ];

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(tableData.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === tableData.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    return (
        <section>
            <div className="mt-1">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">

                </div>

                <table className="w-100">
                    <thead>
                        <tr className="table-row">
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>AWB Number</th>
                            <th>Order Details</th>
                            <th>Customer Details</th>
                            <th>Packaging Details</th>
                            <th>Payment</th>
                            <th>Delivery Address</th>
                            <th>Courier Partner</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        <tr className="blank-row"><td></td></tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <React.Fragment key={row.id}>
                                {index > 0 && <tr className="blank-row"><td></td></tr>}
                                <tr className='table-row'>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => handleSelectRow(row.id)}
                                        />
                                    </td>
                                    <td>{row.id}</td>
                                    <td>{row.orderDetails}</td>
                                    <td>{row.customerDetails}</td>
                                    <td>{row.packagingDetails}</td>
                                    <td>{row.payment}</td>
                                    <td>{row.deliveryAddress}</td>
                                    <td>{row.courierPartner}</td>
                                    <td>{row.status}</td>
                                    <td>{row.action}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllOrders;
