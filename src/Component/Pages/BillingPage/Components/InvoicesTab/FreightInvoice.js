import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DateFormatter = ({ dateTimeString }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const formattedDateTime = formatDateTime(dateTimeString);
        setFormattedDate(formattedDateTime);
    }, [dateTimeString]);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const dateObject = new Date(dateTimeString);
        const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(dateObject);

        return formattedDateTime;
    };

    return <p>{formattedDate}</p>;
};

const FreightInvoice = ({billingCard}) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(data.map(row => row.id));
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
        if (selectedRows.length === data.length - 1 && isSelected) {
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
                    {billingCard?.map((row, index) => (
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
                                                {row?.inv_id ?? 1}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* Courier detail */}
                                        <div className='cell-inside-box'>
                                            <p className=''>
                                                {row?.invoice_date ?? "2024-01-01"}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* AWB Assigned Date */}
                                        <div className='cell-inside-box'>
                                            <p className=''>
                                                {row?.due_date ?? "2024-01-01"}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* Shipment Status */}
                                        <div className='cell-inside-box'>
                                            <p className=''>
                                                {row?.total ?? 0}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* Applied Weight Charges */}
                                        <div className='cell-inside-box'>
                                            <p className=''>
                                                {row?.status ?? "Paid"}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        {/* View Transaction Details */}
                                        <div className='cell-inside-box'>
                                            <p className=''>
                                                <button className='btn main-button' style={{ width: '100px' }}>View</button>
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