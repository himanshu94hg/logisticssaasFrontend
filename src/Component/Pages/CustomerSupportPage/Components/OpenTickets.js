import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faEye } from '@fortawesome/free-solid-svg-icons';
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

const OpenTickets = (props) => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const[openTicket,setOpenTicket]=useState()
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NjAzMjcxLCJpYXQiOjE3MDc5OTg0NzEsImp0aSI6Ijc5YWVlNzMyNTFlZDQ0NjNhMGFkNGI3OTkzNGUwZTkzIiwidXNlcl9pZCI6Mn0.jc415vB2ZKPUhJ26b7CyEvlYgPRdRzoA43EliQk2WRo'
                const response = await axios.get(
                    'http://dev.shipease.in:8081/core-api/features/support-tickets/',
                    {
                        params: {
                            // sub_category: 14,
                            status: 'Open',
                            // resolution_due_by: '2024-01-01',
                            // last_updated: '2024-02-01',
                        },
                        headers: {
                            Authorization: `Bearer ${hardcodedToken}`,
                        },
                    }
                );
                setOpenTicket(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

   

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(openTicket.map(ticket => ticket.id));
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
        if (selectedRows.length === openTicket.length - 1 && !isSelected) {
            setSelectAll(true);
        } else if (selectedRows.length === openTicket.length && isSelected) {
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
                            {openTicket?.map((ticket, index) => (
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
                                                {ticket.awb_number}
                                            </div>
                                        </td>
                                        <td>
                                            {/* subcategory */}
                                            <div className='cell-inside-box'>
                                                {ticket.category}
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
                                                {ticket.updated_at}
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

export default OpenTickets;