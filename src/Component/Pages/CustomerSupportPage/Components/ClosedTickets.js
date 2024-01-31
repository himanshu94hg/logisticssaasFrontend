import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ThreeDots from '../../../../assets/image/icons/ThreeDots.png'

const dummyData = [
    {
        id: 1,
        awb: '24235235234234',
        subcategory: 'Technical Support',
        status: 'In Progress',
        resolutionDueBy: '2024-01-30',
        lastUpdated: '2024-01-20',
    },
    {
        id: 2,
        awb: '24235235234234',
        subcategory: 'Technical Support',
        status: 'In Progress',
        resolutionDueBy: '2024-01-30',
        lastUpdated: '2024-01-20',
    },
    {
        id: 3,
        awb: '24235235234234',
        subcategory: 'Technical Support',
        status: 'In Progress',
        resolutionDueBy: '2024-01-30',
        lastUpdated: '2024-01-20',
    },
    {
        id: 4,
        awb: '24235235234234',
        subcategory: 'Technical Support',
        status: 'In Progress',
        resolutionDueBy: '2024-01-30',
        lastUpdated: '2024-01-20',
    },
    // Add more data as needed
];

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

const ClosedTickets = (props) => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    // const [orders, setAllOrders] = useState([]);  //for API
    const [orders, setAllOrders] = useState(dummyData); //for dummy data

    // useEffect(() => {
    //     axios
    //         .get('http://35.154.133.143/order/v1/allorderdetail/') // Replace with your API endpoint
    //         .then(response => {
    //             console.log('Data is data:', response.data);
    //             setAllOrders(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }, []);

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%55", orders)

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(orders.map(ticket => ticket.id));
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

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === orders.length - 1 && !isSelected) {
            setSelectAll(true);
        } else if (selectedRows.length === orders.length && isSelected) {
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
                            {orders.map((ticket, index) => (
                                <React.Fragment key={ticket.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(ticket.id)}
                                                onChange={() => handleSelectRow(ticket.id)}
                                            />
                                        </td>
                                        <td>
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                {ticket.id}
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB */}
                                            <div className='cell-inside-box'>
                                                {ticket.awb}
                                            </div>
                                        </td>
                                        <td>
                                            {/* subcategory */}
                                            <div className='cell-inside-box'>
                                                {ticket.subcategory}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Status */}
                                            <div className='cell-inside-box'>
                                                {ticket.status}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* resolutionDueBy */}
                                            <div className='cell-inside-box'>
                                                {ticket.resolutionDueBy}
                                            </div>
                                        </td>
                                        <td>
                                            {/* last Updated */}
                                            <div className='cell-inside-box'>
                                                {ticket.lastUpdated}
                                            </div>
                                        </td>

                                        <td className='align-middle'>
                                            {/* {row.ndr_action}
                                             {row.ndr_status} */}
                                            <div className='d-flex align-items-center gap-3'>
                                                <button
                                                    onClick={() => props.setViewTicketInfo(!props.ViewTicketInfo)}
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

export default ClosedTickets;
