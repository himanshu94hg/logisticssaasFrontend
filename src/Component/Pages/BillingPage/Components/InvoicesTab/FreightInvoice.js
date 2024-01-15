import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FreightInvoice = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [orders, setAllOrders] = useState([]);

    useEffect(() => {
        axios
            .get('http://35.154.133.143/order/v1/allorderdetail/') // Replace with your API endpoint
            .then(response => {
                console.log('Data is data:', response.data);
                setAllOrders(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%55", orders)

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
                        <th>Invoice Id</th>
                        <th>Invoice Date</th>
                        <th>Due Date</th>
                        <th>Total</th>
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
                                    {/* order detail */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row.order_number}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Courier detail */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row.order_number}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* AWB Assigned Date */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row.order_number}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Shipment Status */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row.order_number}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Applied Weight Charges */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row.order_number}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Excess Weight Charges */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row.order_number}
                                        </p>
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

export default FreightInvoice