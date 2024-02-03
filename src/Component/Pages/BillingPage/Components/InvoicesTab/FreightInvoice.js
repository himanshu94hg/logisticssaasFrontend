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

const FreightInvoice = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://35.154.133.143/billing/v1/invoicelog/') // Replace with your API endpoint
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);


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
                    {data?.invoice_log?.map((row, index) => (
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
                                            {row.inv_id}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Courier detail */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                        <DateFormatter dateTimeString={row.invoice_date} />
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* AWB Assigned Date */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                        <DateFormatter dateTimeString={row.due_date} />
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Shipment Status */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                        ₹ {row.total}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Applied Weight Charges */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row.status}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Excess Weight Charges */}
                                    <div className='cell-inside-box'>
                                        <button className='btn main-button' style={{width:'100px'}}>View</button>
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