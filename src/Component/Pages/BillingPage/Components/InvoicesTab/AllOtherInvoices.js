import axios from 'axios';
import React, { useState } from 'react'
import NoData from '../../../../common/noData';

const AllOtherInvoices = ({ billingCard }) => {
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
                {/* <tbody>
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
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.id}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.invoice_date}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.due_date}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.total}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row?.status}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            <button className='btn main-button' style={{ width: '100px' }}>View</button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody> */}
            </table>
            <NoData />
        </div>
    )
}

export default AllOtherInvoices