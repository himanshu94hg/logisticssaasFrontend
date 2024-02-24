import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThreeDots from '../../../../assets/image/icons/ThreeDots.png'


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

const InProgressTickets = ({ setViewTicketInfo, allTicket, setTicketId, handleViewButtonClick }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(allTicket?.map(ticket => ticket.id));
        } else {
            setSelectedRows([]);
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (TicketId) => {
        const isSelected = selectedRows.includes(TicketId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== TicketId));
        } else {
            setSelectedRows([...selectedRows, TicketId]);
        }
        if (selectedRows.length === allTicket?.length - 1 && !isSelected) {
            setSelectAll(true);
        } else if (selectedRows.length === allTicket?.length && isSelected) {
            setSelectAll(false);
        }
    };

    return (
        <section className='position-relative'>
            <div className="position-relative">

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
                                <th>Ticket ID</th>
                                <th>AWB(s)</th>
                                <th>Subcategory</th>
                                <th>Ticket Status</th>
                                <th>Resolution Due By</th>
                                <th>Last Updated</th>
                                <th style={{ width: '6%' }}>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {allTicket?.map((item, index) => (
                                <React.Fragment key={item?.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item?.id)}
                                                onChange={() => handleSelectRow(item?.id)}
                                            />
                                        </td>
                                        <td>
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                {item?.id}
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB */}
                                            <div className='cell-inside-box'>
                                                {item?.awb_number}
                                            </div>
                                        </td>
                                        <td>
                                            {/* subcategory */}
                                            <div className='cell-inside-box'>
                                                {item?.sub_category}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Status */}
                                            <div className='cell-inside-box'>
                                                {item?.status}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* resolutionDueBy */}
                                            <div className='cell-inside-box'>
                                                {item?.resolution_due_by}
                                            </div>
                                        </td>
                                        <td>
                                            {/* last Updated */}
                                            <div className='cell-inside-box'>
                                                {moment(item?.updated_at).format("DD MMM YYYY")}
                                            </div>
                                        </td>

                                        <td className='align-middle'>
                                            {/* {row.ndr_action}
                                             {row.ndr_status} */}
                                            <div className='d-flex align-items-center gap-3'>
                                                <button
                                                    onClick={() => { setViewTicketInfo(true); handleViewButtonClick(item?.id) }}
                                                    className='btn main-button'>
                                                    <FontAwesomeIcon icon={faEye} /> View
                                                </button>
                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li>Escalate</li>
                                                            <li>Re-open</li>
                                                            <li>Close</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    );
};

export default InProgressTickets;
