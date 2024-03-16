import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'

const DownloadMIS = () => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [orders, setAllOrders] = useState([
        {
            id: 1,
            userDetails: 'John Doe',
            date: '2024-03-15',
            time: '10:00 AM',
            action: 'Logged In',
            description: 'User logged into the system.'
        },
        {
            id: 2,
            userDetails: 'Jane Smith',
            date: '2024-03-15',
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
        <section className='position-relative'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label>
                            <input type="text" placeholder="" />
                            <button>
                                <img src={SearchIcon} alt="Search" />
                            </button>
                        </label>
                    </div>
                    <div className='button-container'></div>
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
                                <th style={{ width: '25%' }}>User Details</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Action</th>
                                <th>Description</th>
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
                                                {row.userDetails}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Date */}
                                            <div className='cell-inside-box'>
                                                {row.date}
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
            </div>
        </section>
    );
};

export default DownloadMIS;
