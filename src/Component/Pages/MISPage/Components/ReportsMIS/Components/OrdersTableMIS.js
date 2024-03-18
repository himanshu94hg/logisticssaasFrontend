import React, { useState } from 'react'

const OrdersTableMIS = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [orders, setAllOrders] = useState([
        {
            id: 1,
            orderDetails: 'Order #123',
            customerDetails: 'John Doe',
            orderDate: '2024-03-15',
            packageDetails: '10:00 AM',
            paymentStatus: 'Logged In',
            pickupAddress: '123 Main St, City, Country',
            status: 'Processing',
            action: 'View Details'
        },
        {
            id: 2,
            orderDetails: 'Jane Smith',
            customerDetails: '2024-03-15',
            time: '11:30 AM',
            action: 'Logged Out',
            description: 'User logged out of the system.'
        },
        // Add more dummy data as needed
    ]);

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(orders.map(row => row.id));
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
        if (selectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };
    return (
        <div className='table-container'>
            <table className=" w-100">
                <thead className="sticky-header">
                    <tr className="table-row box-shadow">
                        <th style={{ width: '1%' }}>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th style={{ width: '25%' }}>Order Details</th>
                        <th>Customer Details</th>
                        <th>Package Details</th>
                        <th>Payment</th>
                        <th>Pickup Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr className="blank-row"><td></td></tr>
                </thead>
                <tbody>
                    {orders.map((row, index) => (
                        <React.Fragment key={row.id}>
                            {index > 0 && <tr className="blank-row"><td></td></tr>}
                            <tr className='table-row box-shadow'>
                                <td className='checkbox-cell'>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(row.id)}
                                        onChange={() => handleSelectRow(row.id)}
                                    />
                                </td>
                                <td>
                                    {/* User Details */}
                                    <div className='cell-inside-box'>
                                        {row.orderDetails}
                                    </div>
                                </td>
                                <td>
                                    {/* Date */}
                                    <div className='cell-inside-box'>
                                        {row.customerDetails}
                                    </div>
                                </td>
                                <td>
                                    {/* Time */}
                                    <div className='cell-inside-box'>
                                        {row.time}
                                    </div>
                                </td>
                                <td>
                                    {/* Action */}
                                    <div className='cell-inside-box'>
                                        {row.action}
                                    </div>
                                </td>
                                <td>
                                    {/* Description */}
                                    <div className='cell-inside-box'>
                                        {row.description}
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTableMIS