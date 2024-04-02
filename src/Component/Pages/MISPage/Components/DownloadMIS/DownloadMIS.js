import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const DownloadMIS = () => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [orders, setAllOrders] = useState([
        {
            id: 1,
            name: 'Bulk Labels',
            type: 'Label',
            status: 'In Progress',
            requested_date: '24 Mar 2024',
            completed_date: '',
            d_file: 'labels.pdf'
        },
        {
            id: 2,
            name: 'Bulk invoice',
            type: 'Invoice',
            status: 'Done',
            requested_date: '24 Mar 2024',
            completed_date: '24 Mar 2024',
            d_file: 'invoice.pdf'
        }
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
        <section className='position-relative downloads-mis'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label style={{ width: '500px' }}>
                            <input className='input-field' type="text" placeholder="Search your downloads" />
                            <button>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </label>
                    </div>
                    <div className='button-container'>
                        <button className='btn main-button'>Export Report</button>
                    </div>
                </div>
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
                                <th style={{ width: '25%' }}>Name</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Request Date</th>
                                <th>Completed Date</th>
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
                                            {/* Name */}
                                            <div className='cell-inside-box'>
                                                {row.name}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Type */}
                                            <div className='cell-inside-box'>
                                                {row.type}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Status */}
                                            <div className='cell-inside-box'>
                                                {row.status}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Request Date */}
                                            <div className='cell-inside-box'>
                                                {row.requested_date}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Completed Date */}
                                            <div className='cell-inside-box'>
                                                {row.completed_date}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Action */}
                                            <button className='btn main-button'><FontAwesomeIcon icon={faDownload} /></button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default DownloadMIS;
