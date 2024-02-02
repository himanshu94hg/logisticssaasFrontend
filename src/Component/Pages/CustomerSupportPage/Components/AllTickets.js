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

const AllTickets = (props) => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    // const [orders, setAllOrders] = useState([]);  //for API
    const [allTicket, setAllTicket] = useState(); //for dummy data

    const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODYxNDk3LCJpYXQiOjE3MDY2MTUwOTcsImp0aSI6IjI0MTllNzg2NWY0NDRjNjM5OGYxZjAxMzlmM2Y2Y2M2IiwidXNlcl9pZCI6OX0.LNk9C0BFIgkIZpkYHNz2CvjzzcdwXkwYSOVpcK5A7Sw'
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/core-api/features/support-tickets/', {
                headers: {
                    'Authorization': `Bearer ${hardcodedToken}`,
                },
            })
            .then(response => {
                console.log('Data is data:', response.data);
                setAllTicket(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    console.log("########################all ticket is",allTicket)
    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(allTicket.map(ticket => ticket.id));
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
        if (selectedRows.length === allTicket.length - 1 && !isSelected) {
            setSelectAll(true);
        } else if (selectedRows.length === allTicket.length && isSelected) {
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
                            {allTicket?.map((ticket, index) => (
                                <React.Fragment key={ticket.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(ticket?.id)}
                                                onChange={() => handleSelectRow(ticket?.id)}
                                            />
                                        </td>
                                        <td>
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                {ticket?.id}
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB */}
                                            <div className='cell-inside-box'>
                                                {ticket?.awb_number}
                                            </div>
                                        </td>
                                        <td>
                                            {/* subcategory */}
                                            <div className='cell-inside-box'>
                                                {ticket?.support_type}
                                            </div>
                                        </td>
                                        <td>
                                            {/* Status */}
                                            <div className='cell-inside-box'>
                                                {ticket?.status}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* resolutionDueBy */}
                                            <div className='cell-inside-box'>
                                                {ticket?.resolutionDueBy}
                                            </div>
                                        </td>
                                        <td>
                                            {/* last Updated */}
                                            <div className='cell-inside-box'>
                                                {ticket?.lastUpdated}
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

export default AllTickets;
