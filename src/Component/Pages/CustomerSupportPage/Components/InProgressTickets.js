import moment from 'moment';
import { useDispatch } from 'react-redux';
import NoData from '../../../common/noData';
import React, { useState, useEffect } from 'react';
import globalDebouncedClick from '../../../../debounce';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThreeDots from '../../../../assets/image/icons/ThreeDots.png'
import { capatlize } from '../../../../customFunction/functionLogic';
import CustomTooltip from '../../../common/CustomTooltip/CustomTooltip';
import { FaRegCopy } from 'react-icons/fa';

const InProgressTickets = ({ setViewTicketInfo,setCounterReset, allTicket, activeTab, handleViewButtonClick }) => {
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [copyText, setcopyText] = useState("Tracking Link")

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(allTicket?.map(ticket => ticket.id));
        } else {
            setSelectedRows([]);
        }
    };

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

    const handleCloseOpenTicket = (id, status) => {
        setCounterReset(new Date())
        dispatch({
            type: "UPDATE_TICKET_STATUS_ACTION", payload: {
                status: status,
                ticket_ids: [id]
            }
        })
    }

    const handleEscalateTicket = (id) => {
        dispatch({
            type: "TICKET_ESCALATE_ACTION", payload: {
                ticket_ids: [id]
            }
        })
    }

    const handleCopy = (awb) => {
        const temp_url = `https://shipease.in/order-tracking/${awb}`
        navigator.clipboard.writeText(temp_url)
            .then(() => {
                setcopyText("Copied")
                setTimeout(() => {
                    setcopyText('Tracking Link');
                }, 2000);
            })
            .catch(err => {
            });
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
                                <th>Severity</th>
                                <th>Subcategory</th>
                                <th>Ticket Status</th>
                                <th>Due Date</th>
                                <th>Created</th>
                                <th>Updated</th>
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
                                            <div className='cell-inside-box'>
                                                {item?.id}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box shipping-details'>
                                            <div className='d-flex'>
                                                    <p className='details-on-hover anchor-awb'>
                                                        {item?.awb_number}
                                                    </p>
                                                    {item?.awb_number &&
                                                        <CustomTooltip
                                                            triggerComponent={<button className='btn copy-button p-0 ps-1' onClick={() => handleCopy(item?.awb_number)}><FaRegCopy /></button>}
                                                            tooltipComponent={copyText}
                                                            addClassName='copytext-tooltip'
                                                        />
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <span className={`fw-bold ${item?.severity === "critical" ? "text-danger" : item?.severity === "high" ? "text-warning" : item?.severity === "low" ? "text-success" : "text-info"}`}> {capatlize(item?.severity)}</span>

                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {item?.sub_category}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {item?.status}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                {moment(item?.resolution_due_by).format("DD MMM YYYY")}
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                {moment(item?.created_at).format("DD MMM YYYY")}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {moment(item?.updated_at).format("DD MMM YYYY")}
                                            </div>
                                        </td>

                                        <td className='align-middle'>
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
                                                            <li onClick={() => globalDebouncedClick(() => handleEscalateTicket(item?.id))}>Escalate</li>
                                                            {activeTab != "openTickets" && <li onClick={() => globalDebouncedClick(() => handleCloseOpenTicket(item?.id, "Open"))}>Re-open</li>}
                                                            {activeTab != "closedTickets" && <li onClick={() => globalDebouncedClick(() => handleCloseOpenTicket(item?.id, "Closed"))}>Close</li>}
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
                    {allTicket?.length === 0 && <NoData />}
                </div>
            </div>
        </section >
    );
};

export default InProgressTickets;
