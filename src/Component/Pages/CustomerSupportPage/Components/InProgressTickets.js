import React, { useState } from 'react';
import ThreeDots from '../../../../assets/image/icons/ThreeDots.png'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const InProgressTickets = (props) => {

    const [filter, setFilter] = useState('All'); // Initial filter state

    // Sample data for demonstration
    const ticketData = [
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

    // State to manage sorting (if needed)
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // Function to handle sorting
    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    // Function to render table headers
    const renderTableHeaders = () => {
        const headers = [
            'Ticket ID',
            'AWB(s)',
            'Subcategory',
            'Ticket Status',
            'Resolution Due By',
            'Last Updated',
            'Action',
        ];

        return headers.map((header, index) => (
            <th key={index} onClick={() => handleSort(header)}>
                {header}
                {/* {sortColumn === header && (sortDirection === 'asc' ? '↑' : '↓')} */}
            </th>
        ));
    };

    const filterTickets = (ticket) => {
        if (filter === 'All') {
            return true; // Show all tickets if no specific filter is selected
        }

        // Implement your logic to match the ticket's subcategory with the selected filter
        // For simplicity, we are assuming that the subcategory is a direct match with the filter
        return ticket.subcategory === filter;
    };

    const renderFilterDropdown = () => {
        const filterOptions = [
            // Define your filter options here
            'All',
            'Delay in Forward Delivery',
            'Delay in RTO Delivery',
            'Delay in Pickup',
            'Shipment Showing as Lost/Damaged in Tracking',
            // ... (other options)
        ];
        return (
            <select className="select-field" value={filter} onChange={(e) => setFilter(e.target.value)}>
                {filterOptions.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    };

    const renderTableRows = () => {
        const filteredData = ticketData.filter(filterTickets);

        return filteredData.map((ticket) => (
            <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.awb}</td>
                <td>{ticket.subcategory}</td>
                <td>{ticket.status}</td>
                <td>{ticket.resolutionDueBy}</td>
                <td>{ticket.lastUpdated}</td>
                <td className='d-flex'>
                    <button
                        onClick={() => props.setViewTicketInfo(!props.ViewTicketInfo)}
                        className='btn main-button'>
                        <FontAwesomeIcon icon={faEye} /> View
                    </button>                    <div className='action-options ms-3'>
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
                </td>
            </tr>
        ));
    };



    return (
        <div>
            {/* <div className='d-flex'>
                <div>{renderFilterDropdown()}</div>
                <div>{renderFilterDropdown()}</div>
                <div>{renderFilterDropdown()}</div>
            </div> */}
            <table className='Tickets-table w-100'>
                <thead>
                    <tr>{renderTableHeaders()}</tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </table>
        </div>
    );
};

export default InProgressTickets;
