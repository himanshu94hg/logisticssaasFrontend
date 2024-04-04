import React, { useState } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ScheduledReportsMIS = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    // Dummy data
    const dummyData = [
        { id: 1, reportTitle: 'Report 1', reportType: 'Type 1', status: 'Pending', recipients: 'Recipient 1' },
        { id: 2, reportTitle: 'Report 2', reportType: 'Type 2', status: 'Completed', recipients: 'Recipient 2' },
        { id: 3, reportTitle: 'Report 3', reportType: 'Type 1', status: 'Pending', recipients: 'Recipient 3' },
        // Add more dummy data as needed
    ];

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(dummyData.map(row => row.id));
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
        if (selectedRows.length === dummyData.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    return (
        <section className='position-relative reports-mis downloads-mis'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label style={{ width: '500px' }}>
                            <input className='input-field' type="text" placeholder="Search Report Title" />
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
                                <th style={{ width: '25%' }}>Report Title</th>
                                <th>Report Type</th>
                                <th>Status</th>
                                <th>Recipients</th>
                                <th>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {dummyData.map((row, index) => (
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
                                                {row.reportTitle}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {row.reportType}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                {row.status}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {row.recipients}
                                            </div>
                                        </td>
                                        <td>
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

export default ScheduledReportsMIS;
